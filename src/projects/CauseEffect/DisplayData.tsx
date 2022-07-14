import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    LinearProgress, Typography
} from "@mui/material";
import { IItem, stats } from ".";

interface IDisplayData {
    item: IItem;
}

const DisplayData = (props: IDisplayData) => {
    const showImage = false;
    const {item} = props;
    const displayName = item.evolution?.name ?? item.name;

    const stats : {value: stats, title: string}[] = [
        {
            value: "hp",
            title: "Hit Point"
        },
        {
            value: "attack",
            title: "Attack"
        },
        {
            value: "defense",
            title: "Defense"
        },
        {
            value: "sp_atk",
            title: "Special Attack"
        },
        {
            value: "sp_def",
            title: "Special Defense"
        },
        {
            value: "speed",
            title: "Speed"
        },
    ]
    return (
        <Card variant="outlined">
            <CardHeader title={item.national_number + " - " + displayName} />
            <CardContent>
                {!showImage && 
                <ImageList
                    variant="quilted"
                    sx={{height: 250, width: "50%"}}
                    cols={3}
                    rowHeight={250}
                    key={item.national_number}
                >
                    {Object.entries(item.sprites).map(([spriteType, spriteUrl]) => (
                        <ImageListItem key={spriteType} cols={1} rows={1}>
                            <img
                                style={{objectFit: "contain"}}
                                src={spriteUrl}
                                alt={spriteType}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={spriteType[0].toUpperCase() + spriteType.slice(1)}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                }
                <Typography variant="h4">Type: {item.type.join(", ")}</Typography>
                <Typography variant="h4" my={2}>Stats</Typography>
                <Typography variant="h5" mb={1}>Total: {item.total}</Typography>
                {stats.map(({value, title}) => (
                    <Grid key={value} container alignItems="center">
                        <Grid item xs={2}>
                            <Typography variant="body1">{title}</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <LinearProgress
                                variant="determinate"
                                value={item[value]/2.55}
                                sx={{height: 10, borderRadius: 5}}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body1" textAlign="right">{item[value]}</Typography>
                        </Grid>
                    </Grid>
                ))}
            </CardContent>
        </Card>
    )
};

export default DisplayData;