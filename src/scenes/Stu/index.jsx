import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../App.js";
import { useLocation } from "react-router-dom";

function Stu() {
  const [email, setEmail] = useState("");
  const [registernumber, setRegisterNumber] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [classValue, setClassValue] = useState("");
  const [college, setCollege] = useState("");
  const [number, setNumber] = useState(""); // State to store the number
  const { state: { registerNumber } } = useLocation();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegisterNumberChange = (event) => {
    setRegisterNumber(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleClassChange = (event) => {
    setClassValue(event.target.value);
  };

  const handleCollegeChange = (event) => {
    setCollege(event.target.value);
  };

  const handleGetNumber = async () => {
    try {
      const docRef = doc(db, `Clg-Con/response/${registerNumber}/${registerNumber}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const number = docSnap.data().number;
        setNumber(number); // Update the number state
        // Delete the number from Firestore
        await deleteDoc(docRef);
      } else {
        setNumber("Number not found. Request number again.");
      }
    } catch (error) {
      console.error("Error getting number: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add student information to Firestore
      await setDoc(doc(db, `Clg-Con/Student/${college}/${registernumber}/`), {
        Name: email,
        registernum: registernumber,
        src: source,
        dest: destination,
        Duration: duration,
        clas: classValue,
        College: college
      });

      console.log("Student information stored successfully in Firestore!");

      // Clear form fields
      setEmail("");
      setRegisterNumber("");
      setSource("");
      setDestination("");
      setDuration("");
      setClassValue("");
      setCollege("");

      // Redirect to another page
      navigate("/success");
    } catch (error) {
      console.error("Error storing student information: ", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1" gutterBottom>
          Student Concession Form
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGetNumber}>
          Get Your Number
        </Button>
        <Typography>{number}</Typography> {/* Display the number */}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            label="Register Number"
            variant="outlined"
            margin="normal"
            value={registernumber}
            onChange={handleRegisterNumberChange}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            label="Source"
            variant="outlined"
            margin="normal"
            value={source}
            onChange={handleSourceChange}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <TextField
            label="Destination"
            variant="outlined"
            margin="normal"
            value={destination}
            onChange={handleDestinationChange}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <Box sx={{ display: "flex", flexDirection: "Row", alignItems: "center" }}>
            <Typography gutterBottom style={{ marginLeft: "20px" }}>
              Select Duration
            </Typography>
            <Select
              value={duration}
              onChange={handleDurationChange}
              style={{ marginLeft: "20px" }}
            >
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Quarterly">Quarterly</MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
            <Typography gutterBottom style={{ marginLeft: "100px" }}>
              Select Class
            </Typography>
            <Select
              value={classValue}
              onChange={handleClassChange}
              style={{ margin: "20px" }}
            >
              <MenuItem value="First">First (I)</MenuItem>
              <MenuItem value="Second">Second (II)</MenuItem>
            </Select>
            <TextField
              label="College"
              variant="outlined"
              margin="normal"
              value={college}
              onChange={handleCollegeChange}
              style={{ width: "100%", marginBottom: "20px" }}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" size="large" style={{ width: "100%" }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Stu;
