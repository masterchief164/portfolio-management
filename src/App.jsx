import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from "./Components/Sidebar.jsx";
import HomePage from "./Pages/Home/HomePage.jsx";
import AboutPage from "./Pages/About/AboutPage.jsx";
import AssetsPage from "./Pages/Assets/AssetsPage.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Sidebar />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/assets" element={<AssetsPage/>} />
                <Route path="/about" element={<AboutPage/>} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
