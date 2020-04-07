import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Box from '@material-ui/core/Box';
import {BrowserRouter,Route} from 'react-router-dom';
import Dashboard from '../newHome/dashboard';
import Prediction from '../newHome/prediction';
import Contactus from '../newHome/contactus';
import Livechat from '../newHome/displayLiveChart';
import {NavLink} from 'react-router-dom';
import axios from 'axios';





const drawerWidth = 240;







const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background : '#000000',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7)+1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));




export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [visible,setVisible] = React.useState("");
  const [loading,setLoading] = React.useState("");
  const [notfound,setNotfound] = React.useState("");
  const [name,setName] = React.useState("");
  const [todayprice,setTodayprice] = React.useState("");
  const[url,setURL] = React.useState("");
  const[graphData,setGraphData] = React.useState([]);
  const[tableData,setTablehData] = React.useState([]);
  const handleVisible= () =>{
      setVisible("true");
  }

  const getDataFromNode= (url) =>{
    setLoading("in");
    axios.get('http://127.0.0.1:8081/graphdata',{
      params: {
        url : url
      }
    })
    .then(function (response) {
      if(response.data==="failed")
      {
        setVisible("");
        setLoading("");
        setNotfound("in");
      }
      else{
      setGraphData(response.data.graphData);
      setName(response.data.name);
      var actualarr =  response.data.graphData[0].data;
      var actualpopObject = Object.keys(actualarr).sort();
      setTodayprice(actualarr[actualpopObject.pop()]);
      var arr =  response.data.graphData[1].data;
      var popObject = Object.keys(arr).sort();
      var date;
      const rows = [
        createData(new Date(date=popObject.pop()).toDateString(), arr[date]),
        createData(new Date(date=popObject.pop()).toDateString(), arr[date]),
        createData(new Date(date=popObject.pop()).toDateString(), arr[date]),
     ];
     setTablehData(rows);
     setVisible("true");
     setLoading("");
     setNotfound("");
      }
    })
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getURL=(e)=>{
    e.preventDefault();
    let gdata = [
      {"name":"Actual", "data": {"2017-01-01": 3, "2017-01-02": 4, "2017-01-03": 2, "2017-01-04": 6, "2017-01-05": 5}},
      {"name":"Predicted", "data": {"2017-01-01": 5, "2017-01-02":3, "2017-01-03": 6, "2017-01-04": 4, "2017-01-05": 7}}
    ];
    setGraphData(gdata);
    getDataFromNode(url);
  }

  const createData = (name,predicted) => {
    return { name,predicted};
  }
  
  const  set=(event)=>{
    let value = event.target.value;
    setURL(value);
  }

 

  return (
    <div className={classes.root}>
    <BrowserRouter>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Box bgcolor="#666666">
          <img src="flogo2.png" 
                height="70"
                width="200"
                alt="logo" className={classes.logo}/>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <NavLink to="/"   style={{textDecoration:"none",color: "black"}}>
            <ListItem button key="Dashboard">
              <ListItemIcon><DashboardIcon/></ListItemIcon>
              <ListItemText primary="Dashboard"/>
            </ListItem>
            </NavLink>

            <NavLink to="/prediction" style={{textDecoration:"none",color: "black"}}>
            <ListItem button key="Prediction">
              <ListItemIcon>< LocalOfferIcon  /></ListItemIcon>
              <ListItemText primary="Prediction"/>
            </ListItem>
            </NavLink>

            
            <NavLink to="/livechat"  style={{textDecoration:"none",color: "black"}}>
            <ListItem button key="livechat">
              <ListItemIcon><ChatBubbleIcon/></ListItemIcon>
              <ListItemText primary="Live Chat" />
            </ListItem>
            </NavLink>

            <NavLink to="/contactus"  style={{textDecoration:"none",color: "black"}}>
            <ListItem button key="contactus">
              <ListItemIcon><ContactSupportIcon  /></ListItemIcon>
              <ListItemText primary="Contact Us"/>
            </ListItem>
            </NavLink>


        </List>


        
      </Drawer>
      <main style={{backgroundColor:'#CCEEFF',height:'100%'}} className={classes.content}>
        <div  className={classes.toolbar} />
              <Route exact path='/' component={Dashboard}></Route>
              <Route path='/prediction'  render={()=>(<Prediction  name={name} notfound={notfound} todayprice={todayprice} loading={loading} visible={visible} setVisible={handleVisible} setURL={setURL} getURL={getURL} url={url} graphData={graphData} tableData={tableData} set={set}/>)}></Route>
              <Route path='/contactus' component={Contactus}></Route>
              <Route path='/livechat' component={Livechat}></Route>
      </main>
      </BrowserRouter>
    </div>
  );
}
