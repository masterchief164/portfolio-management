import HomeIcon from '@mui/icons-material/Home';
import {
    AppBar,
    ListItem,
    Toolbar,
    Typography,
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {Link} from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import StoreIcon from '@mui/icons-material/Store';
import AccountMenu from "./AccountMenu.jsx";

const drawerWidth = 240;

const Sidebar = () => (
    <>
        <AppBar position="fixed" color="default"
                sx={{width: `100%`, zIndex: (theme) => theme.zIndex.drawer + 1}}
        >
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                {/*todo: need an app icon here*/}
                <Typography variant="h6" noWrap component="div">
                    Portfolio Pilot
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <AccountMenu/>
                </Box>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <List>
                    <ListItem sx={{px: '0'}} component={Link} to={'/'}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Dashboard'} sx={{color: 'black'}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{px: '0'}} component={Link} to={'/assets'}>
                        <ListItemButton>
                            <ListItemIcon>
                                <StoreIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'Assets'} sx={{color: 'black'}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{px: '0'}} component={Link} to={'/about'}>
                        <ListItemButton>
                            <ListItemIcon>
                                <InfoIcon/>
                            </ListItemIcon>
                            <ListItemText primary={'About'} sx={{color: 'black'}}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    </>
);

export default Sidebar;