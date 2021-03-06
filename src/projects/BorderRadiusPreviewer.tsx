import { Box, Card, CardContent, Grid, Slider, TextareaAutosize, Tooltip, Typography } from "@mui/material";
import { kebabCase } from "lodash";
import { 
    Fragment,
    MouseEvent,
    MouseEventHandler,
    Reducer,
    useReducer,
    useState
} from "react";

interface IBorderRadiusSide {
    side: string;
    value: number;
}

interface IBorderRadiusCorner {
    corner: string;
    sides: [IBorderRadiusSide, IBorderRadiusSide];
}
interface IBorderRadiusReducerAction extends IBorderRadiusSide {
    type: string;
    corner: string;
}

const initialState : IBorderRadiusCorner[] = [
    {
        corner: "TopLeft",
        sides: [
            {
                side: "Top",
                value: 0,
            },
            {
                side: "Left",
                value: 0
            }
        ]
    }, {
        corner: "TopRight",
        sides: [
            {
                side: "Top",
                value: 0,
            },
            {
                side: "Right",
                value: 0
            }
        ]
    },{
        corner: "BottomLeft",
        sides: [
            {
                side: "Bottom",
                value: 0,
            },
            {
                side: "Left",
                value: 0
            }
        ]
    },{
        corner: "BottomRight",
        sides: [
            {
                side: "Bottom",
                value: 0,
            },
            {
                side: "Right",
                value: 0
            }
        ]
    },
];


const reducer: Reducer<IBorderRadiusCorner[], IBorderRadiusReducerAction> = (state, action) => {
    switch (action.type) {
    case "update": 
        return state.map(item => {
            if (item.corner === action.corner) {
                return {
                    ...item,
                    sides: item.sides.map((s) => {
                        if (s.side === action.side) {
                            return {
                                ...s,
                                value: action.value
                            }
                        }
                        return s;
                    }) as [IBorderRadiusSide, IBorderRadiusSide]
                };
            }
            return item;
        });
    default:
        return state;
    }
};
const BorderRadiusPreviewer = () => {
    const [borderRadius, dispatch] = useReducer(reducer, initialState);
    const [openTooltip, setOpenTooltip] = useState<boolean>(false);

    const handleChange = (e: {side: string, value: number}, corner: string) => {
        dispatch({
            type: "update",
            corner: corner,
            side: e.side,
            value: e.value
        });
    }
    const cssLines = borderRadius.map((corner: IBorderRadiusCorner) => {
        return `border-${kebabCase(corner.corner)}-radius: ${corner.sides[0].value}px ${corner.sides[1].value}px;`;
    });
    const handleClick: MouseEventHandler<HTMLTextAreaElement> = (e: MouseEvent<HTMLTextAreaElement>) => {
        const element = e.target as HTMLInputElement;
        navigator.clipboard.writeText(element.value);
        setOpenTooltip(true);
        setTimeout(() => {
            setOpenTooltip(false);
        }, 1000);
    };
    return (
        <Grid container p={2}>
            <Grid container spacing={2}>
                {borderRadius.map(
                    (c) => <InputCorner
                        key={c.corner}
                        corner={c}
                        onChange={(e:{side: string, value: number}) => handleChange(e, c.corner)}
                    />
                )}
            </Grid>
            <Grid container mt={2}>
                <Grid item xs={6}>
                    <Typography variant="body1" mb={2}>Preview</Typography>
                    <Box
                        sx={{
                            width: "50vh",
                            height: "50vh",
                            borderWidth: 4,
                            borderStyle: "solid",
                            borderColor: "primary.dark",
                            ...borderRadius.reduce((prev: Record<string, unknown>, {corner, sides}) => ({
                                ...prev, 
                                [`border${corner}Radius`]: `${sides[0].value}px ${sides[1].value}px`
                            }), {})
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" mb={2}>CSS</Typography>
                    <Card variant="outlined">
                        <CardContent>
                            <Tooltip 
                                open={openTooltip}
                                title="Copied!"
                            >
                                <TextareaAutosize
                                    minRows={1}
                                    style={{
                                        width: "100%",
                                        border: "0",
                                        padding: "0",
                                        resize: "none",
                                        outline: "0",
                                        cursor: "pointer"
                                    }}
                                    value={cssLines.join("\n")}
                                    onClick={handleClick}
                                />
                            </Tooltip>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
};

interface InputCornerProps {
    corner: IBorderRadiusCorner;
    onChange: ({side, value}: {side: string, value: number}) => void
}

const InputCorner = (props: InputCornerProps) => {
    const {corner, onChange} = props;
    return (
        <Grid item xs={6} md={4} lg={3} p={2}>
            <Typography variant="h6">{corner.corner}</Typography>
            {corner.sides.map((s) => (
                <Fragment key={s.side}>
                    <Typography my={2}>{s.side}</Typography>
                    <Slider
                        value={s.value}
                        size="small"
                        valueLabelDisplay="auto"
                        onChange={
                            (e: Event) => onChange({
                                side: s.side,
                                value: (e.target as HTMLInputElement).value as unknown as number
                            })
                        }
                    />
                </Fragment>
            ))}
        </Grid>
    )
}

export default BorderRadiusPreviewer;