// import React, { useState, useEffect } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { useTheme } from "@mui/material/styles"; // Import useTheme
// import { getFirestore, doc, getDoc, deleteDoc,setDoc,updateDoc, arrayRemove } from "firebase/firestore";


// const DropdownPage = () => {
//   const theme = useTheme();
//   // Other state variables
//   var [dropdownOptions, setDropdownOptions] = useState([]);
//   var [selectedOption, setSelectedOption] = useState("");
//   let [num,setNum] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const db = getFirestore();
//         const docRef = doc(db, "Clg-Con", "clg","SAKEC","SAKEC");
//         const docSnap = await getDoc(docRef);
//         const data = docSnap.data();
//         setDropdownOptions(data.Numbers);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDropdownChange = (event) => {
//     setSelectedOption(event.target.value);
//     setNum(event.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       const db = getFirestore();
//       console.log(num);
//       const arrDoc = doc(db,`Clg-Con/clg/SAKEC/SAKEC`);
//       await updateDoc(arrDoc,{
//         Numbers:arrayRemove(num)
//       });
//       const updatedDropdownOptions = dropdownOptions.filter(option => option !== num);
//       setDropdownOptions(updatedDropdownOptions);      
//       console.log("Document deleted successfully");
//       console.log(dropdownOptions);
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   };

//   return (
//     <Box m="20px">
//       {/* Your header component */}
//       <Typography variant="body1" gutterBottom>
//         {/* Display some info if needed */}
//       </Typography>
//       <select value={selectedOption} onChange={handleDropdownChange}>
//         <option value="" hidden>Select an option</option>
//         {dropdownOptions.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       <Button variant="contained" color="primary" onClick={handleSubmit}>
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default DropdownPage;

// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme
import { getFirestore, doc, getDoc, deleteDoc,setDoc,updateDoc, arrayRemove } from "firebase/firestore";

const DropdownPage = () => {
  // State to store dropdown options
  const [dropdownOptions, setDropdownOptions] = useState([1, 2, 3, 4, 5]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, "Clg-Con", "clg","SAKEC","SAKEC");
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setDropdownOptions(data.Numbers);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle dropdown option selection
  const handleDropdownChange = (event, index) => {
    const selectedOption = parseInt(event.target.value);
    const updatedOptions = dropdownOptions.filter(option => option !== selectedOption);
    setDropdownOptions(updatedOptions);
  };

  // Function to handle form submission
  const handleSubmit = event => {
    event.preventDefault();
    // Implement your submit logic here
    console.log("Form submitted!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Render 5 dropdowns */}
        {[0, 1, 2, 3, 4].map(index => (
          <div key={index}>
            <select onChange={(event) => handleDropdownChange(event, index)}>
              <option value="" hidden>Select an option</option>
              {dropdownOptions.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DropdownPage;
