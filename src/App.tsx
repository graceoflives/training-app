import "./App.css";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import LeftMenu from "./components/LeftMenu";
import Bin2Dec from "./projects/Bin2Dec";

function App() {
    return (
        <Box sx={{ display: "flex" }}>
            <LeftMenu />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/bin2dec" element={<Bin2Dec />} />
                </Routes>
            </Box>
        </Box>
    );
}

function Home() {
    return (
        <>
            <main>
                <h2>Welcome to the homepage!</h2>
                <p>You can do this, I believe in you.</p>
            </main>
        </>
    );
}

export default App;
