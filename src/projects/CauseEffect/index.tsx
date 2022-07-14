import {
    Grid
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import DisplayData from "./DisplayData";
import MenuItem from "./MenuItem";

export type stats = "hp" | "attack" | "defense" | "sp_atk" | "sp_def" | "speed" | "total";
export type IItem = {
    [k in stats]: number;
} & {
    national_number: string;
    name: string;
    evolution: {
        name: string;
    } | null;
    sprites: {
        [k: string]: string;
    };
    type: string[];
};

const CauseEffect = () => {
    const [items, setItems] = useState<IItem[]>([]);
    const [selected, setSelected] = useState<number|null>(null);

    useEffect(() => {
        const fetcher = async () => {
            const response = await fetch("https://raw.githubusercontent.com/joseluisq/pokemons/master/pokemons.json");
            const data = await response.json();
            setItems(data.results);
        };
        fetcher();
    }, []);

    const handleClickItem = useCallback((index: number) => {
        setSelected(index);
    }, []);

    const itemData = useMemo(() => ({
        items,
        onClickItem: handleClickItem,
        selected
    }), [items, handleClickItem, selected]);

    const selectedItem = items[selected || 0] ?? null;

    return (<>
        <Grid container
            sx={{
                width: "100%",
                height: "100%",
                overflowY: "hidden"
            }}
        >
            <Grid item lg={2} sx={{
                height: "100%"
            }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={height}
                            itemCount={items.length}
                            itemSize={34}
                            width={width}
                            itemData={itemData}
                            overscanCount={5}
                        >
                            {MenuItem}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </Grid>
            <Grid item flex="1">
                {selectedItem ? <DisplayData item={selectedItem} /> : null}
            </Grid>
        </Grid>
    </>);
}

export default CauseEffect;