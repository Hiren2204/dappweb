import React, { useState } from "react";
import { Container, Typography, TextField, Checkbox, FormControlLabel, Button, Box, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Login() {
  const [loginType, setLoginType] = useState("student"); // Default login type
  let navigate= useNavigate();
  const [email, setEmail] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegisterNumberChange = (event) => {
    setRegisterNumber(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Logic based on login type
    switch (loginType) {
      case "student":
        console.log(`Student login submitted: Email - ${email}, Register Number - ${registerNumber}, Password - ${password}`);
        navigate("/stu", { state: { registerNumber } });
        break;
      case "railway":
        console.log(`Railway login submitted: Username - ${username}, Password - ${password}`);
        navigate("/ral");
        break;
      case "college":
        console.log(`College login submitted: College Name - ${username}, Username - ${username}, Password - ${password}`);
        if(username === "SAKEC" && password === "123456"){
          navigate("/clg", { state: { username } });
        }
        

        break;
      default:
        break;
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1" gutterBottom>
          Login
        </Typography>
        <Select
          value={loginType}
          onChange={(event) => setLoginType(event.target.value)}
          style={{ marginBottom: "20px" }}
        >
          <MenuItem value="student">Student Login</MenuItem>
          <MenuItem value="railway">Railway Login</MenuItem>
          <MenuItem value="college">College Login</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {loginType === "student" && (
            <>
              <TextField
                label="Email"
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
                value={registerNumber}
                onChange={handleRegisterNumberChange}
                style={{ width: "100%", marginBottom: "20px" }}
              />
            </>
          )}
          {(loginType === "railway" || loginType === "college") && (
            <TextField
              label={loginType === "railway" ? "Username" : "College Name"}
              variant="outlined"
              margin="normal"
              value={username}
              onChange={handleUsernameChange}
              style={{ width: "100%", marginBottom: "20px" }}
            />
          )}
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <Button type="submit" variant="contained" color="primary" size="large" style={{ width: "100%" }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
