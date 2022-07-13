import {
    Checkbox, FormControl,
    FormControlLabel,
    FormLabel,
    Grid, InputLabel, OutlinedInput, TextField,
    Typography
} from "@mui/material";
import { ILight } from ".";

interface ISettingProps {
    lights: ILight[];
    row: number;
    onToggleBulb: (index: number) => void;
    onChangeColor: (index: number, color: string) => void;
    onChangeSize: (index: number, size: number) => void;
    onChangeRow: (value: number) => void;
}

const Settings = ({lights, row, onToggleBulb, onChangeColor, onChangeSize, onChangeRow}: ISettingProps) => {
    return (
        <Grid p={2}>
            <Typography variant="h2" fontSize={16}>Settings</Typography>
            <Grid container mt={1}>
                <TextField
                    type="number"
                    value={row}
                    onChange={(e) => onChangeRow((e.target as HTMLInputElement).valueAsNumber)}
                    inputProps={{
                        min: 1,
                        max: 7
                    }}
                    label="Number of lights"
                    fullWidth
                />
            </Grid>
            <Grid container mt={1} gap={2}>
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
                                <FormControl fullWidth>
                                    <InputLabel htmlFor={`color-${index}`}>Color</InputLabel>
                                    <OutlinedInput
                                        id={`color-${index}`}
                                        type="color"
                                        fullWidth
                                        value={light.color}
                                        onChange={(e) => onChangeColor(index, e.target.value)}
                                        sx={{
                                            "&:hover:not(.Mui-disabled):before": {
                                                borderBottom: "0"
                                            }
                                        }}
                                        label="Color"
                                    />
                                </FormControl>
                                <Grid container mt={2}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor={`size-${index}`}>Size</InputLabel>
                                        <OutlinedInput 
                                            id={`size-${index}`}
                                            type="range"
                                            fullWidth
                                            value={light.size}
                                            onChange={(e) => onChangeSize(index, parseInt(e.target.value))}
                                            inputProps={{
                                                min: 10,
                                                max: 80
                                            }}
                                            label="Size"
                                        />
                                    </FormControl>
                                </Grid>
                            </FormControl>
                            
                        </Grid>
                    )
                )}
            </Grid>
        </Grid>
    )
};

export default Settings;