import './App.css';

import { styled, useTheme, Theme, CSSObject, createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListUser from './pages/user/ListUser';
import NewUser from './pages/NewUser';
import { Button } from '@mui/material';
import { changeMode } from './api/user';
import TaskList from './pages/task/TaskList';
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));


function App() {
  const theme = useTheme();
  const username = localStorage.getItem('username');
  const [open] = React.useState(true);
  const colorMode = React.useContext(ColorModeContext);
  const logout = () => {
    localStorage.setItem('userToken', 'logout')
    window.location.reload();
  }

  const menuItems = [
    { name: 'User', path: '/user', icon: <PersonIcon /> },
    { name: 'Task', path: '/task', icon: <AssignmentIcon /> },
  ];
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ width: 1680 }}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>My APP</Typography>
          <Typography variant='h6' noWrap component='div' className='username'>{username}</Typography>

          {theme.palette.mode === 'light' ? <Button variant="contained" onClick={logout} className='btn'
            sx={{ backgroundColor: "#3B44F6", color: "#fff" }}
          >Logout</Button> :
            <Button variant="contained" onClick={logout} className='btn'
              sx={{ backgroundColor: "#2D3250" }}>Logout</Button>}
          <ListItemButton
            className='colorModeBtn'
            onClick={colorMode.toggleColorMode}>
            <ListItemIcon >
              {theme.palette.mode === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
            </ListItemIcon>
          </ListItemButton>

        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <Divider />
        <List>
          <ListItem sx={{ height: 62, top: -8, left: 5, fontSize: 20 }}>Student Management</ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            {menuItems.map((item) => (
              <ListItemButton key={item.name} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }} href={item.path}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            ))}
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/user' element={<ListUser />} />
          <Route path='/newUser' element={<NewUser />} />
          <Route path='/task' element={<TaskList />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function ToggleColorMode() {
  const storedMode = localStorage.getItem('colorMode') || 'light';
  // 将存储的模式转换为 'light' 或 'dark' 类型
  const initialMode = storedMode === 'light' ? 'light' : 'dark';
  const [mode, setMode] = React.useState<'light' | 'dark'>(initialMode);
  const theme = React.useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          primary: { main: '#B5C0D0' },
          secondary: { main: '#5755FE' },
          background: {
            default: '#e1e1e3',
            paper: '#B5C0D0',
          },
          text: {
            primary: '#000000',
          },
        }
        : {
          primary: { main: '#1B1A55' },
          secondary: { main: '#5755FE' },
          background: {
            default: '#3b3a39',
            paper: '#1B1A55',
          },
          text: {
            primary: '#fff',
          },
        }),
    },
  }),
    [mode],
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        // 切换模式
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        // 保存模式到本地存储
        localStorage.setItem('colorMode', mode === 'light' ? 'dark' : 'light');
        // 发送模式更改请求
        changeMode(1, mode === 'light' ? 'dark' : 'light')
      },
    }),
    [mode]
  );



  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}
