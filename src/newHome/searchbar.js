import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '8px 8px',
    display: 'flex',
    alignItems: 'center',
    width:800,
    borderRadius:40,
    paddingLeft:20,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    autoFocus:true,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


export default function CustomizedInputBase(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Enter the URL of the product"
        inputProps={{ 'aria-label': 'search' }}
        onChange={props.set}
      />
    <Divider className={classes.divider} orientation="vertical" />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" style={{ color: '#0088cc' }}>
        <SearchIcon />
      </IconButton>
      </Paper>
  );
}