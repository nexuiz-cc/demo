import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Login() {
  return (
    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off" >
      <div>
        <TextField error  id="username"  label="username"/>
        <TextField error  id="outlined-error-helper-text"  label="Error" defaultValue="Hello World" helperText="Incorrect entry." />
      </div>
    </Box>
  );
}

export default Login;