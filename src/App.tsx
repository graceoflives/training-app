import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LeftMenu from "./components/LeftMenu";
import Bin2Dec from "./projects/Bin2Dec";
import BorderRadiusPreviewer from "./projects/BorderRadiusPreviewer";
import Calculator from "./projects/Calculator";
import CauseEffect from "./projects/CauseEffect";
import ChristmasLights from "./projects/ChristmasLights";
import ColorCycle from "./projects/ColorCycle";

function App() {
    const routes : {path: string, Component: () => JSX.Element}[] = [
        {
            path: "",
            Component: Home
        },
        {
            path: "bin2dec",
            Component: Bin2Dec
        },
        {
            path: "borderRadiusPreviewer",
            Component: BorderRadiusPreviewer
        },
        {
            path: "calculator",
            Component: Calculator
        },
        {
            path: "christmasLights",
            Component: ChristmasLights
        },
        {
            path: "causeEffect",
            Component: CauseEffect
        },
        {
            path: "colorCycle",
            Component: ColorCycle
        },
    ]
    return (
        <Box sx={{ display: "flex" }}>
            <LeftMenu />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh" }}
            >
                <Routes>
                    {routes.map(({path, Component}) => (
                        <Route key={path} path={`/${path}`} element={<Component />} />    
                    ))}
                </Routes>
            </Box>
        </Box>
    );
}

const Home = () => {
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
