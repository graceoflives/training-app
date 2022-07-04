import { TextField, TextFieldProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Bin2Dec = () => {
    const [binary, setBinary] = useState<string>("");
    const [helperText, setHelperText] = useState<string>("");
    const [color, setColor] = useState<TextFieldProps["color"]>("primary");
    const handleChange = (e: any) => {
        setBinary(e.target.value);
    }
    useEffect(() => {
        const invalid = binary.split("").some(i => i !== "0" && i !== "1");
        if (invalid) {
            setHelperText("Invalid binary number!");
            setColor("error");
        } else {
            setHelperText("");
            setColor("primary");
        }
    }, [binary]);

    return <>
        <Typography variant="h2">Binary to Decimal</Typography>
        <TextField
            value={binary}
            onChange={handleChange}
            label="Binary number"
            color={color}
            helperText={helperText}
            fullWidth
            inputProps={{ inputMode: "numeric", pattern: "[0-1]*", maxLength: 32 }} 
        />
        {
            color === "primary"
            && binary !== ""
            && <Typography variant="body1" mt={2}>Decimal number is: {parseInt(binary, 2)}</Typography>
        }
    </>
}

export default Bin2Dec;