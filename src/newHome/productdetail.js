import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Button } from 'reactstrap';


const useStyles = makeStyles(theme => ({
  root: {
  },
  header:{
    backgroundColor:'#0088cc',
    fontSize:1,
    color:'#FFFFFF',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function DetailsCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader className = {classes.header}
        title="Product Details"
        titleTypographyProps={{variant:'body2' }}
      />
      <CardContent>
        <Typography variant="h6" color="textSecondary" component="p">
          {props.name.substring(0,props.name.indexOf("<!"))}
                </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            Price : ₹ {props.todayprice}
        </Typography>
        <br/>
        <Button style={{backgroundColor:'#0088cc',color:'white'}} href={props.url}>Buy Now</Button>
      </CardContent>
    </Card>
  );
}
