import { Button, Divider, Drawer, Link, MenuItem, MenuList } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
interface IMenuItem {
    link: string;
    title: string;
}

const drawerWidth = 240;
const LeftMenu = () => {
    const items: IMenuItem[] = [
        {
            link: "/bin2dec",
            title: "Bin2Dec"
        },
        {
            link: "/borderRadiusPreviewer",
            title: "Border Radius Previewer"
        },
        {
            link: "/calculator",
            title: "Calculator"
        },
        {
            link: "/christmasLights",
            title: "Christmas Lights"
        }
    ];
    return (
        <Drawer
            anchor={"left"}
            variant="permanent"
            sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <MenuList>
                <MenuItem>
                    <Button component={RouterLink} to="/" variant="outlined" fullWidth>
                        Home
                    </Button>
                </MenuItem>
                <Divider />
                {items.map(item =>(
                    <MenuItem key={item.title}>
                        <Link component={RouterLink} to={item.link} underline="none" sx={{width: "100%"}}>
                            {item.title}
                        </Link>
                    </MenuItem>    
                ))}
            </MenuList>
        </Drawer>
    )
}

export default LeftMenu;