import { ListItemButton } from "@mui/material";
import { memo } from "react";
import { areEqual } from "react-window";
import { IItem } from ".";

interface IMenuItem {
    data: {
        items: IItem[];
        onClickItem: (v: number) => void;
        selected: number | null;
    };
    index: number;
    style: object;
}

const MenuItem = memo((props: IMenuItem) => {
    const {items, onClickItem, selected} = props.data;
    const item = items[props.index];
    return (item ?
        <ListItemButton
            key={item.national_number}
            selected={selected === props.index}
            onClick={() => onClickItem(props.index)}
            sx={{
                ...props.style,
                "&:hover": {
                    backgroundColor: "primary.main"
                },
                "&.Mui-selected": {
                    backgroundColor: "primary.main"
                },
                "&.Mui-selected:hover": {
                    backgroundColor: "primary.main"
                }
            }}
        >
            {item.evolution?.name ?? item.name}
        </ListItemButton> : null
    );
}, areEqual);

MenuItem.displayName = "MenuItem";

export default MenuItem;