import { useNavigate } from 'react-router-dom';
import React from 'react';
import TextField from '@mui/material/TextField';
import styles from './login.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

function Login() {
  const navgate = useNavigate();
  const handleLogin = () => {
    let token = "token123";
    localStorage.setItem('userToken', token);
    navgate(0);
  }

  const card = (
    <React.Fragment>
      <CardContent className={styles.form}>
        <TextField required id="username" label="username" variant="standard" className={styles.input} />
        <TextField required label="Password" id='password' type="password" variant="standard" className={styles.input}/>
        <Button  variant="contained"  className={styles.btn}onClick={handleLogin}>Login</Button>
      </CardContent>
    </React.Fragment>
  );

  return (
    <div className={styles.box}>
      <div className={styles.div1}>
      <Typography variant="h3" component="h2" sx={{fontFamily:"calling code"}}>Student Management</Typography>
        <Typography variant="h1" component="h2" sx={{fontFamily:"calling code"}}>Login</Typography>
      </div>
      <Card component="form" className={styles.card} noValidate autoComplete="off">
        {card}
      </Card>
    </div>
  );
}

export default Login;