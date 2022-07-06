import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";

const Calculator = () => {
    return (
        <Grid container alignItems="center" justifyContent="center" sx={{height: "100%"}}>
            <Box
                width={{xs: "100%", md: "70%", lg: "50%", xl: "30%"}}
                sx={{ border: 2, borderColor: "grey.200", borderRadius: 2 }}
                p={2}
            >
                <Screen/>
                <ButtonArrange/>
            </Box>
        </Grid>
    )
}

const Screen = () => {
    return (<>
        <Typography variant="body1" sx={{color: "grey.400"}} align="right">1+2=</Typography>
        <Typography variant="body1" sx={{fontSize: "2.5rem"}} align="right">3</Typography>
    </>);
}

interface IButton {
    value: string;
    title: string;
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
    size: number;
}
const ButtonArrange = () => {
    const buttonList: IButton[] = [
        {
            value: "clearInput",
            title: "C",
            color: "secondary",
            size: 1,
        },
        {
            value: "clearAll",
            title: "AC",
            color: "secondary",
            size: 1
        },
        {
            value: "percent",
            title: "%",
            color: "warning",
            size: 1
        },
        {
            value: "div",
            title: "/",
            color: "warning",
            size: 1
        },
        {
            value: "9",
            title: "9",
            size: 1
        },
        {
            value: "8",
            title: "8",
            size: 1
        },
        {
            value: "7",
            title: "7",
            size: 1
        },
        {
            value: "multiply",
            title: "*",
            color: "warning",
            size: 1
        },
        {
            value: "6",
            title: "6",
            size: 1
        },
        {
            value: "5",
            title: "5",
            size: 1
        },
        {
            value: "4",
            title: "4",
            size: 1
        },
        {
            value: "subtract",
            title: "-",
            color: "warning",
            size: 1
        },
        {
            value: "3",
            title: "3",
            size: 1
        },
        {
            value: "2",
            title: "2",
            size: 1
        },
        {
            value: "1",
            title: "1",
            size: 1
        },
        {
            value: "add",
            title: "+",
            color: "warning",
            size: 1
        },
        {
            value: "0",
            title: "0",
            size: 2
        },
        {
            value: "dot",
            title: ".",
            size: 1
        },
        {
            value: "equals",
            title: "=",
            color: "success",
            size: 1
        }
    ]
    return (
        <Grid container spacing={2}>
            {buttonList.map(button => (
                <Grid item xs={3 * button.size} key={button.value}>
                    <Button
                        variant="contained"
                        color={button.color || "primary"}
                        sx={{
                            display: "flex",
                            height: "10vh",
                            fontSize: "2.5rem",
                        }}
                        fullWidth
                    >
                        {button.title}
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
}

export default Calculator;