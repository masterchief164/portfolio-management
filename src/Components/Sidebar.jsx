import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import {Avatar, Button, ListItem} from '@mui/material';
import {Link} from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import StoreIcon from '@mui/icons-material/Store';
import GoogleIcon from '../assets/Google.svg';

const drawerWidth = 240;

const Sidebar = () =>  (
    <>
    <AppBar position="fixed" color="default"
            sx={{ width: `100%`, zIndex: (theme) => theme.zIndex.drawer + 1  }}
    >
        <Toolbar sx={{display: 'flex', justifyContent:'space-between'}}>
            {/*todo: need an app icon here*/}
            <Typography variant="h6" noWrap component="div">
                Portfolio Manager
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <Typography>Shaswat Gupta</Typography>
            <Button>
                <Avatar src={GoogleIcon} alt={'Google Icon'} />
            </Button>
            </Box>
        </Toolbar>
    </AppBar>
<Drawer
    variant="permanent"
    sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
>
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
        <List>
            <ListItem sx={{px: '0'}} component={Link} to={'/'}>
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Dashboard'} sx={{color: 'black'}}/>
                </ListItemButton>
            </ListItem>
            <ListItem sx={{px: '0'}} component={Link} to={'/assets'}>
                <ListItemButton>
                    <ListItemIcon>
                        <StoreIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Assets'} sx={{color: 'black'}}/>
                </ListItemButton>
            </ListItem>
            <ListItem sx={{px: '0'}} component={Link} to={'/about'}>
                <ListItemButton>
                    <ListItemIcon>
                        <InfoIcon />
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