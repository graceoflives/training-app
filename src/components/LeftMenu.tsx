import { Button, Divider, Drawer, MenuItem, MenuList } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 360;
const LeftMenu = () => {
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
                    <Button component={Link} to="/" variant="outlined" fullWidth>
                        Home
                    </Button>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Button component={Link} to="/bin2dec" fullWidth>
                        Bin2Dec
                    </Button>
                </MenuItem>
                <MenuItem>
                    <Button component={Link} to="/borderRadiusPreviewer" fullWidth>
                        Border Radius Previewer
                    </Button>
                </MenuItem>
            </MenuList>
        </Drawer>
    )
}

export default LeftMenu;