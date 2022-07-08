import { Box, Button, Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";

const Calculator = () => {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState("");
    const canContinueWithResult = useRef(false);

    const handleClick = (value: string) => {
        switch (value) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if (canContinueWithResult.current) {
                setExpression(value);
                canContinueWithResult.current = false;
            } else {
                setExpression(expr => `${expr}${value}`);
            }
            break;
        case "dot":
            if (canContinueWithResult.current) {
                setExpression(".");
                canContinueWithResult.current = false;
            } else {
                setExpression(expr => `${expr}.`);
            }
            break;
        case "add":
            if (canContinueWithResult.current) {
                setExpression(`${result}+`);
            } else {
                setExpression(expr => `${expr}+`);
            }
            canContinueWithResult.current = false;
            break;
        case "subtract":
            if (canContinueWithResult.current) {
                setExpression(`${result}-`);
            } else {
                setExpression(expr => `${expr}-`);
            }
            canContinueWithResult.current = false;
            break;
        case "multiply":
            if (canContinueWithResult.current) {
                setExpression(`${result}*`);
            } else {
                setExpression(expr => `${expr}*`);
            }
            canContinueWithResult.current = false;
            break;
        case "div":
            if (canContinueWithResult.current) {
                setExpression(`${result}/`);
            } else {
                setExpression(expr => `${expr}/`);
            }
            canContinueWithResult.current = false;
            break;
        case "percent":
            if (canContinueWithResult.current) {
                setExpression(`${result}%`);
            } else {
                setExpression(expr => `${expr}%`);
            }
            break;
        case "clear":
            setExpression(expr => expr.slice(0, -1));
            break;
        case "clearAll":
            setExpression("");
            setResult("");
            canContinueWithResult.current = false;
            break;
        case "equals": {
            const evaluableExpr = expression.replaceAll("%", "/100");
            try {
                const maybeResult = (new Function("return " + evaluableExpr))();
                setResult(maybeResult);
                canContinueWithResult.current = true;
            } catch (error) {
                alert("Malformed Expression!");
            }
            
            break;
        }
        default: 
        }
    }
    return (
        <Grid container alignItems="center" justifyContent="center" sx={{height: "100%"}}>
            <Box
                width={{xs: "100%", md: "70%", lg: "50%", xl: "30%"}}
                sx={{ border: 2, borderColor: "grey.200", borderRadius: 2 }}
                p={2}
            >
                <Screen expr={expression} result={result}/>
                <ButtonArrange onClick={handleClick}/>
            </Box>
        </Grid>
    )
}

interface IScreenProps {
    expr: string;
    result: string;
}

const Screen = (props: IScreenProps) => {
    return (<>
        <Typography
            variant="body1"
            sx={{color: "grey.400", fontFamily: "monospace" }}
            align="right">
            {props.expr || "\u00A0"}
        </Typography>
        <Typography 
            variant="body1" 
            sx={{fontSize: "2.5rem", fontFamily: "monospace" }}
            align="right">
            {props.result || "\u00A0"}
        </Typography>
    </>);
}

interface IButton {
    value: string;
    title: string;
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
    size: number;
}

interface IButtonArrangeProps {
    onClick: (value: string) => void;
}

const ButtonArrange = (props: IButtonArrangeProps) => {
    const buttonList: IButton[] = [
        {
            value: "clear",
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
                        onClick={() => props.onClick(button.value)}
                    >
                        {button.title}
                    </Button>
                </Grid>
            ))}
        </Grid>
    )
}

export default Calculator;