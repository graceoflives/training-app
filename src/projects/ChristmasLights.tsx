import { 
    Box,
    Checkbox,
    darken,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Input,
    lighten,
    Slider,
    Typography
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useState } from "react";

const spin = (color: string, size: number) => keyframes`
  from {
    background-color: ${lighten(color, 0.5)};
    box-shadow: 0 0 ${size / 20}px ${size / 20}px ${lighten(color, 0.9)};
  }
  to {
    background-color: ${color};
    box-shadow: 0 0 0px 0px ${color};
  }
`;

interface ILightBulbProps {
    size: number;
    color: string;
    isOn: boolean;
    delay: string;
}
const LightBulb = styled(Box)<ILightBulbProps>(({ size, color, isOn, delay }) => ({
    width: size,
    aspectRatio: "1",
    borderRadius: "50%",
    backgroundColor: isOn ? color : darken(color, 0.5),
    animation: isOn ? `1s ease-in-out ${delay} infinite alternate ${spin(color, size)}` : "unset"
})); 

interface ILight {
    size: number;
    color: string;
    isOn: boolean;
    delay: string;
}
const initialLights: ILight[] = [
    {
        size: 80,
        color: "#2196f3",
        isOn: true,
        delay: "0s"
    },
    {
        size: 80,
        color: "#f44336",
        isOn: true,
        delay: "0.2s"
    },
    {
        size: 80,
        color: "#009688",
        isOn: true,
        delay: "0.4s"
    },
    {
        size: 80,
        color: "#ffeb3b",
        isOn: true,
        delay: "0.6s"
    },
    {
        size: 80,
        color: "#ff9800",
        isOn: true,
        delay: "0.8s"
    },
    {
        size: 80,
        color: "#9c27b0",
        isOn: true,
        delay: "1s"
    },
    {
        size: 80,
        color: "#3f51b5",
        isOn: true,
        delay: "1.2s"
    },
];

interface ISettingProps {
    lights: ILight[];
    onToggleBulb: (index: number) => void;
    onChangeColor: (index: number, color: string) => void;
    onChangeSize: (index: number, size: number) => void;
}

const Settings = ({lights, onToggleBulb, onChangeColor, onChangeSize}: ISettingProps) => {
    return (
        <Grid p={2}>
            <Typography variant="h2" fontSize={16}>Settings</Typography>
            <Grid container gap={2}>
                {lights.map(
                    (light, index) => (
                        <Grid item flex="1" key={index}>
                            <FormControl fullWidth>
                                <FormLabel component="legend">{`Light #${1+index}`}</FormLabel>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={light.isOn}
                                            onChange={() => onToggleBulb(index)}
                                        />
                                    }
                                    label="On/Off"
                                />
                                <Input
                                    type="color"
                                    fullWidth
                                    value={light.color}
                                    onChange={(e) => onChangeColor(index, e.target.value)}
                                />
                                <Slider
                                    value={light.size}
                                    onChange={(_, newValue) => onChangeSize(index, newValue as number)}
                                    valueLabelDisplay="auto"
                                    min={10}
                                    max={80}
                                    size="small"
                                />
                            </FormControl>
                        </Grid>
                    )
                )}
            </Grid>
        </Grid>
    )
};

const ChristmasLights = () => {
    const [lights, setLights] = useState<ILight[]>(initialLights);
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
    return (
        <Grid
            container 
            direction={"column"}
            sx={{height: "100%", overflowX: "hidden"}}
        >
            <Settings
                lights={lights}
                onToggleBulb={handleToggleLightBulb}
                onChangeColor={handleColor}
                onChangeSize={handleSize}
            />
            <Grid
                container
                flex="1"
                alignItems="center"
                justifyContent="space-around"
                sx={{backgroundColor: "grey.800"}}
                gap={2}
            >
                {lights.map((light, index) => {
                    return (
                        <Grid
                            container
                            justifyContent={"center"}
                            flex={`1 0 ${2 * light.size}px`}
                            key={index}
                        >
                            <LightBulb
                                size={light.size}
                                color={light.color}
                                isOn={light.isOn}
                                delay={light.delay}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
};

export default ChristmasLights;