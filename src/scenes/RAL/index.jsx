import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { getFirestore, collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';

const RAL = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(); // Get Firestore instance
        const querySnapshot = await getDocs(collection(db, "Rail")); // Query the "Rail" collection
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setColleges(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "Name",
      headerName: "College Name",
      flex: 1,
    },
    {
      field: "requestButton",
      headerName: "Submit",
      flex: 1,
      renderCell: ({ row }) => (
        <Button variant="contained" color="primary" onClick={() => handleRequest(row)}>
          Submit
        </Button>
      ),
    },
  ];

  const handleRequest = async (row) => {
    try {
      if (!row || !row.Name) {
        console.error("Invalid row data");
        return;
      }

      // Generate an array of random numbers
      const randomNumberArray = Array.from({ length: 6 }, () => Math.floor(100000 + Math.random() * 900000));  
      // Update Firestore document with the generated array
      const db = getFirestore();
      await setDoc(doc(db, "Clg-Con/clg", row.Name, row.Name), { "Numbers": randomNumberArray });

      // Delete the row from the table and Firestore
      const updatedColleges = colleges.filter((college) => college.id !== row.id);
      setColleges(updatedColleges);
      await deleteDoc(doc(db, "Rail", row.id));

      console.log(`Generated array ${randomNumberArray} for college ${row.Name} and deleted row with ID ${row.id}`);
    } catch (error) {
      console.error("Error handling request: ", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Railway"/>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={colleges} columns={columns} />
      </Box>
    </Box>
  );
};

export default RAL;
