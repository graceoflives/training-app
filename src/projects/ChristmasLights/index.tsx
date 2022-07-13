import { Grid } from "@mui/material";
import { useState } from "react";
import LightBulb from "./LightBulb";
import Settings from "./Settings";

export interface ILight {
    size: number;
    color: string;
    isOn: boolean;
}

const initialLights: ILight[] = [
    {
        size: 80,
        color: "#2196f3",
        isOn: true,
    },
    {
        size: 80,
        color: "#f44336",
        isOn: true,
    },
    {
        size: 80,
        color: "#009688",
        isOn: true,
    },
    {
        size: 80,
        color: "#ffeb3b",
        isOn: true,
    },
    {
        size: 80,
        color: "#ff9800",
        isOn: true,
    },
    {
        size: 80,
        color: "#9c27b0",
        isOn: true,
    },
    {
        size: 80,
        color: "#3f51b5",
        isOn: true,
    },
];

const ChristmasLights = () => {
    const [lights, setLights] = useState<ILight[]>(initialLights);
    const [row, setRow] = useState<number>(1);

    const handleToggleLightBulb = (index: number) => {
        setLights(ls => ls.map((l, i)=> {
            if (i === index) {
                return {
                    ...l,
                    isOn: !l.isOn
                };
            }
            return l;
        }));
    }
    const handleColor = (index: number, newColor: string) => {
        setLights(ls => ls.map((l, i)=> {
            if (i === index) {
                return {
                    ...l,
                    color: newColor
                };
            }
            return l;
        }));
    }
    const handleSize = (index: number, newSize: number) => {
        setLights(ls => ls.map((l, i)=> {
            if (i === index) {
                return {
                    ...l,
                    size: newSize
                };
            }
            return l;
        }));
    }

    const handleRow = (v: number) => {
        setRow(v);
    }

    return (
        <Grid
            container 
            direction={"column"}
            sx={{height: "100%", overflowX: "hidden"}}
        >
            <Settings
                lights={lights}
                row={row}
                onToggleBulb={handleToggleLightBulb}
                onChangeColor={handleColor}
                onChangeSize={handleSize}
                onChangeRow={handleRow}
            />
            <Grid
                container
                flex="1"
                alignItems="center"
                justifyContent="space-around"
                sx={{backgroundColor: "grey.800"}}
                gap={2}
            >
                {lights.map((light, lightIndex) => {
                    return (
                        <Grid
                            container
                            flexDirection="column"
                            alignItems={"center"}
                            flex={`1 0 ${2 * light.size}px`}
                            gap={2}
                            key={lightIndex}
                        >
                            {Array.from({length: row}).map((_, index) => (
                                <LightBulb
                                    key={index}
                                    size={light.size}
                                    color={light.color}
                                    isOn={light.isOn}
                                    delay={`${0.2 * index}s`}
                                />
                            ))}
                            
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
};

export default ChristmasLights;