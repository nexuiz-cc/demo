
import React from 'react';
import Grid from '@mui/material/Grid';
import './task.css';



function TaskList() {
  return (
    <div>
      MyTaskList

      <Grid container sx={{display:'flex',alignContent:'center',justifyContent:'center'}}>
        <Grid item xs={2.2} className='item'>
          item
        </Grid>
        <Grid item xs={2.2} className='item'>
          item
        </Grid>
        <Grid item xs={2.5} className='item'>
          item
        </Grid>
        <Grid item xs={2.2} className='item'>
          item
        </Grid>
        <Grid item xs={2.2} className='item'>
          item
        </Grid>

      </Grid>


    </div>
  );
}

export default TaskList;