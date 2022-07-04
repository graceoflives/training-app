import { Button, Divider, Drawer, MenuItem, MenuList } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const LeftMenu = (props: any) => {
    return (
        <Drawer
            anchor={"left"}
            variant="permanent"
            sx={{
                width: drawerWidth,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <MenuList>
                <MenuItem>
                    <Button component={Link} to="/" variant="outlined">
                        Home
                    </Button>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Button component={Link} to="/bin2dec">
                        Bin2Dec
                    </Button>
                </MenuItem>
            </MenuList>
        </Drawer>
    )
}

export default LeftMenu;