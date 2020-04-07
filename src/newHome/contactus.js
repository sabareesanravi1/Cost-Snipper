import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from '@material-ui/icons/Facebook';
import Popover from '@material-ui/core/Popover';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginRight:50
  },
  media: {
    height: 140,
  },
});

export default function contact()
{
  return(
  <div style={{height:'100vh'}}>
    <div style={{  float: 'left'}}><MediaCard name="dev name1" phone="+91 xxxxxxxxxx" mail="mailto:test@test.com" fb="https://www.facebook.com" rollno="no1" imgsrc="1.jpg"/></div>
    <div style={{  float: 'left'}}><MediaCard name="dev name2" phone="+91 xxxxxxxxxx" mail="mailto:test@test.com" fb="https://www.facebook.com" rollno="no2" imgsrc="2.jpg"/></div>
    <div style={{  float: 'left'}}><MediaCard name="dev name3" phone="+91 xxxxxxxxxx" mail="mailto:test@test.com" fb="https://www.facebook.com" rollno="no3" imgsrc="3.jpg"/></div>

  </div>);
}

function MediaCard(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.imgsrc}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <p>{props.rollno}</p>
            <p>Computer Science Department</p>
            <p>Sri Krishna College Of Engineering and Technology</p>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClick}>
          <CallIcon/>
        </Button>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography} style={{padding:10}}>{props.phone}</Typography>
      </Popover>
        <Button href={props.mail} size="small" color="primary">
          <MailIcon/>
        </Button>
        <Button href ={props.fb} size="small" color="primary">
          <FacebookIcon/>
        </Button>
      </CardActions>
    </Card>
  );
}
