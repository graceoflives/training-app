import { Box, Grid, Input, Paper, TextField, Typography } from "@mui/material";
import chroma from "chroma-js";
import { useEffect, useRef, useState } from "react";

interface InputColorProps {
    color: string;
    setColor: (color: string) => void;
    error: string;
    label: string;
    [k: string]: unknown;
}
const InputColor = (props: InputColorProps) => {
    const {color, setColor, error, label, ...otherProps} = props;

    return (
        <TextField
            fullWidth
            value={color}
            label={label}
            inputProps={{
                pattern: "#[0-9A-Fa-f]{1,2}"
            }}
            onChange={(e) => setColor(e.target.value)}
            variant="outlined"
            color={error.length > 0 ? "error" : "primary"}
            helperText={error}
            {...otherProps}
        />
    )
}

interface ColorBoxProps {
    startingColor: string;
    duration: number;
    increment: number;
}

const ColorBox = (props: ColorBoxProps) => {
    const chromaObject = chroma(props.startingColor);
    const [luminance, setLuminance] = useState(chromaObject.luminance());

    const trend = useRef("increment");
    // const [currentColor, setCurrentColor] = useState(props.startingColor);

    const currentColor = chromaObject.luminance(luminance).hex();
    useEffect(() => {
        const interval = setInterval(() => {
            setLuminance(l => {
                if (trend.current === "increment") {
                    if (l + props.increment / 100 <= 1) {
                        return l + props.increment / 100;
                    } else {
                        trend.current = "decrement";
                        return l - props.increment / 100
                    }
                } else {
                    if (l - props.increment / 100 >= 0) {
                        return l - props.increment / 100;
                    } else {
                        trend.current = "increment";
                        return l + props.increment / 100
                    }
                }
            });
        }, props.duration);
        return () => {
            clearInterval(interval);
        }
    }, [props]);
    return (
        <Box
            sx={{
                width: 250,
                height: 250,
            }}
            style={{
                backgroundColor: currentColor,
                transition: `background-color ${props.duration}ms ease-in-out`
            }}
        ></Box>
    )
}

type IRGBColor = [string, string, string];

const initRGB : {colors: IRGBColor, errors: string[]} = {
    colors: ["", "", ""],
    errors: ["", "", ""]
}

const colorLabels : IRGBColor = ["Red", "Green", "Blue"];
const ColorCycle = () => {
    const [color, setColor] = useState(initRGB);
    
    const onUpdateColor = (value: string, index: number) => {
        const regex = new RegExp(/^[0-9A-Fa-f]{0,2}$/g);
        const fit = regex.test(value);
        let error = "";
        if (!fit) {
            error = "Invalid color!";
        }
        setColor(x => {
            return {
                colors: x.colors.map((c, i) => (i === index) ? value : c) as IRGBColor,
                errors: x.errors.map((e, i) => (i === index) ? error : e)
            };
        });
    };
    const showColor = color.errors.every(e => e.length === 0)
        ? `#${color.colors.map(c => c.padStart(2, "0")).join("")}`
        : "#000000";

    const [showProperties, setShowProperties] = useState<{
        duration: number,
        increment: number,
        state: string;
    }>({
        duration: 250,
        increment: 2,
        state: "stop"
    });

    const updateShowOptions = (key: string, value: unknown) =>{
        setShowProperties(p => ({
            ...p,
            [key]: value
        }));
    }
    return (
        <Box p={2}>
            <Typography variant="h4">Starting Color</Typography>
            <Grid container my={2} spacing={2}>
                {color.colors.map((c, i) => (
                    <Grid item xs={3} key={colorLabels[i]}>
                        <InputColor
                            color={c}
                            setColor={(value) => onUpdateColor(value, i)}
                            error={color.errors[i]}
                            label={colorLabels[i]}
                        />
                    </Grid>
                ))}
                <Grid item xs={3}>
                    <Paper
                        variant="outlined"
                        sx={{
                            backgroundColor: showColor,
                            height: "1.4375em", padding: "15.5px 13px", borderRadius: 1}}/>
                </Grid>
            </Grid>
            <Typography variant="h4">Showcase</Typography>
            <Grid container mt={2} spacing={2}>
                <Grid item xs={3}>
                    <TextField 
                        fullWidth
                        type="number"
                        value={showProperties.duration}
                        inputProps={{
                            max: "1000",
                            min: "100"
                        }}
                        onChange={e => updateShowOptions("duration", parseInt(e.target.value))}
                        label="Duration (ms)"
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField 
                        fullWidth
                        type="number"
                        value={showProperties.increment}
                        inputProps={{
                            max: "10",
                            min: "1"
                        }}
                        onChange={e => updateShowOptions("increment", parseInt(e.target.value))}
                        label="Increment"
                    />
                    
                </Grid>
            </Grid>
            <ColorBox 
                startingColor={showColor}
                duration={showProperties.duration} 
                increment={showProperties.increment}
                key={showColor}
            />
        </Box>
    )
}

export default ColorCycle;