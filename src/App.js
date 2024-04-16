import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Clg from "./scenes/Clg";
import Stu from "./scenes/Stu";
import RAL from "./scenes/RAL";
// import DropdownPage from "./scenes/Test";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./scenes/Login/Login";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import DropdownPage from "./scenes/Test/test";
const firebaseConfig = {
  apiKey: "AIzaSyArk7JKtGDyrJUz-OsfHzEXp4JfqWLewog",
  authDomain: "safarkar-7e056.firebaseapp.com",
  projectId: "safarkar-7e056",
  storageBucket: "safarkar-7e056.appspot.com",
  messagingSenderId: "597613136003",
  appId: "1:597613136003:web:32e8094e351200e505f3b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
function App() {
  
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <main className="content">
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/clg" element={<Clg />} />
              <Route path="/stu" element={<Stu />} />
              <Route path="/ral" element={<RAL />} />
              <Route path="/login" element={<Login />} />
              <Route path="/test" element={<DropdownPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
