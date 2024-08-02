import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from "./Components/Sidebar.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Sidebar />
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="/assets" element={<h1>Assets</h1>} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
