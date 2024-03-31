import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { collection, getDocs, doc, getFirestore, addDoc, deleteDoc } from "firebase/firestore";
import { useTheme } from "@mui/material/styles"; // Import useTheme
import {  getDoc ,setDoc } from "firebase/firestore";

const Clg = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [consignmentNumberOptions, setConsignmentNumberOptions] = useState([]);
  const { state: { username } } = useLocation(); // Extract username from location state

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, "Clg-Con", "clg",username,username);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        console.log(data.Numbers);
        setConsignmentNumberOptions(data.Numbers);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [username]); // Fetch data whenever username changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(doc(db, "Clg-Con", "Student"), username));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // Make sure the 'consignmentNumber' is properly set in the 'data' array
        const updatedData = data.map(item => ({ ...item, consignmentNumber: item.consignmentNumber }));
        setRows(updatedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    fetchData();
  }, [username]); // Fetch data whenever username changes
  
   // Fetch data whenever username changes

  
const handleDropdownChange = (event, row) => {
  const selectedValue = event.target.value;
  // Update the 'row' object with the selected consignment number
  const updatedRow = { ...row, consignmentNumber: selectedValue };
  // Remove the selected value from options
  const updatedOptions = consignmentNumberOptions.filter(option => option !== selectedValue);
  setConsignmentNumberOptions(updatedOptions);

  // Update the 'rows' state with the updated 'row'
  const updatedRows = rows.map(r => (r.id === row.id ? updatedRow : r));
  setRows(updatedRows);

  // Use selectedValue as needed
  console.log(`Selected consignment number for row with ID ${row.id}: ${selectedValue}`);
};

const submitRequest = async (row) => {
  let clgname = username;
  console.log(row.registernum);
  try {
    const db = getFirestore();
    const clgname = username; // Assuming clgname is the same as username
    
    // Reference to the consignment numbers document
    const consignmentNumRef = doc(db, "University/SeasonalBooking", clgname, clgname);
    const docReff = doc(db, `Clg-Con/response/${row.registernum}/${row.registernum}`);
    const reqRef = doc(db,`Clg-Con/clg/${clgname}/${row.registernum}`);
    await setDoc(docReff,{"number":row.consignmentNumber});
    // Set the consignment number in the University/SeasonalBooking document
    await setDoc(consignmentNumRef, { [row.consignmentNumber]: true }, { merge: true });
    console.log(reqRef);
    // Fetch the consignment numbers array from the Clg-Con document
    const clgConRef = doc(db, "Clg-Con", "clg", clgname, clgname);
    const clgConDoc = await getDoc(clgConRef);

    if (clgConDoc.exists()) {
      const clgConData = clgConDoc.data();

      // // Remove the consignment number from the array
      // const updatedNumbers = clgConData.numbers.filter(num => num !== row.consignmentNumber);
      
      // // Update the Clg-Con document with the updated array
      // await setDoc(clgConRef, { numbers: updatedNumbers });

      // Delete the row from the table
      await deleteDoc(doc(db, "Clg-Con", "clg", clgname, row.id));
      await deleteDoc(reqRef);

      // Remove the selected consignment number from options
      const updatedOptions = consignmentNumberOptions.filter(option => option !== row.consignmentNumber);
      setConsignmentNumberOptions(updatedOptions);

      // Remove the row from the state
      const updatedRows = rows.filter(r => r.id !== row.id);
      setRows(updatedRows);
      

      console.log(`Request processed for row with ID ${row.id}`);
    } else {
      console.error("Clg-Con document does not exist.");
    }
  } catch (error) {
    console.error("Error processing request:", error);
  }
};









  
  const handleRequest = async () => {
    try {
      // Add a document to the "Rail" collection with a random ID
      const db = getFirestore();
      const randomId = Math.random().toString(36).substring(7);
      await addDoc(collection(db, "Rail"), { Name: username });
      console.log("Document added to Firestore at path 'Rail' with ID:", randomId);
    } catch (error) {
      console.error("Error adding document to Firestore:", error);
    }

    // Handle request button click
    console.log(`Request button clicked for row with `);
  };

  // Define columns directly here
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "registernum", headerName: "Register Number", flex: 1 },
    { field: "src", headerName: "Source", flex: 1 },
    { field: "dest", headerName: "Destination", flex: 1 },
    { field: "Duration", headerName: "Duration", flex: 1 },
    { field: "clas", headerName: "Class", flex: 1 },
    { field: "College", headerName: "College", flex: 1 },
    {
      field: "consignmentNumber",
      headerName: "Concession Number",
      flex: 1,
      renderCell: ({ row }) => (
        <select value={row.consignmentNumber} onChange={(event) => handleDropdownChange(event, row)} style={{alignContent:"center", width:"70%", marginLeft:"10px"}}>
          <option value=""  hidden>Select Concession Number</option>
          {consignmentNumberOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ),
    },
    {
      field: "requestButton",
      headerName: "Submit",
      flex: 1,
      renderCell: ({ row }) => (
        <Button variant="contained" color="primary" onClick={() => submitRequest(row)}>
          Submit
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title={username} subtitle={`Managing the ${username} Student`}>
      </Header>
      <Typography variant="body1" gutterBottom>
        Concession numbers left: {consignmentNumberOptions.length}
      </Typography>
      <Button style={{width:"300px",marginLeft:"60%" , background:"red"}} onClick={() => handleRequest()}>
          Request 
      </Button>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Clg;
