import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Searchbar from '../newHome/searchbar';
import Table from '../newHome/table';
import Chart from '../newHome/chart';
import Details from '../newHome/productdetail';
import { Image } from 'react-fullscreen-image';






export default class FullWidthGrid extends Component {
  

  render()
  {



    if(this.props.loading==="in")
    {
      return (
        <Image
          src="Spinner3.gif"
          alt="nature"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height:"100%",
            width:"100%"
          }}
        />
        )
    }
    else if(this.props.notfound==="in")
    {
      return(<div>
      <Grid container 
        spacing={3}
        direction="column"
        justify="space-around"
        alignItems="flex-start"
          >
          <Grid item xs={12}>   
            <form onSubmit={this.props.getURL}>
            <Searchbar url={this.props.url} set={this.props.set}/>      
            </form>  
          </Grid>
        </Grid>
        <br/>
        <Grid container
  direction="row"
  justify="center"
  alignItems="center"
>
        <img src="notfound.png" alt="not found"/>
        </Grid>
      </div>);
    }
    else if(this.props.visible==="")
    {
      return(    

        <div style={{minHeight:'100vh'}}>  
        <img src="pb.svg" alt="dsbg" height="250" width="250" style={{marginBottom:30}}/>
        <Grid container 
        spacing={3}
        direction="column"
        justify="space-around"
        alignItems="center"
          >
          <Grid>        
        </Grid>
          <Grid item xs={12}>   
            <form onSubmit={this.props.getURL}>
            <Searchbar url={this.props.url} set={this.props.set}/>      
            </form>  
          </Grid>
        </Grid>
        </div>  
          );
    }
    else{
    return(
      <div>
      <Grid container 
      spacing={3}
      direction="column"
      justify="space-around"
      alignItems="stretch"
        >
        <Grid item xs={12}>   
          <form onSubmit={this.props.getURL}>
          <Searchbar url={this.props.url} set={this.props.set}/>      
          </form>  
        </Grid>
        <Grid container item xs={12} spacing={3}>
        <Grid  item xs={6}>
          <Details name={this.props.name} url={this.props.url} todayprice={this.props.todayprice}/>
        </Grid>
        <Grid  item xs={6}>
          <Paper><Table rows={this.props.tableData}/></Paper>
        </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper><Chart data={this.props.graphData}/></Paper>
        </Grid>
        
        
      </Grid>
    </div>
        );
  }
}
}
