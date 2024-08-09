import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from "./Components/Sidebar.jsx";
import HomePage from "./Pages/Home/HomePage.jsx";
import AboutPage from "./Pages/About/AboutPage.jsx";
import AssetsPage from "./Pages/Assets/AssetsPage.jsx";
import Box from "@mui/material/Box";
function App() {
  return (
    <>
        <BrowserRouter>
            <Box sx={{display: 'flex'}}>
            <Sidebar />
                <Box sx={{width: '100%'}} mt={'100px'}>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/assets" element={<AssetsPage/>} />
                        <Route path="/about" element={<AboutPage/>} />
                    </Routes>
                </Box>
            </Box>
        </BrowserRouter>
    </>
  );
}

export default App;
