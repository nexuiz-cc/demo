import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import styles from './login.module.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { login } from '../../api/user';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './login.scss';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [sever,setSeverity]= useState('error');
  const navgate = useNavigate();
  const [inputError, setInputError] = useState(false);
  const [msg1, setMsg1] = useState('');
  const [msg2, setMsg2] = useState('');
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClose1 = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') { return; } setOpen1(false)
  };
  const handleClose2 = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') { return; } setOpen2(false)
  };

  const handleLogin = () => {
    login().then((res) => {
      if (username === res.data[0].username && password === res.data[0].password) {
        setMessage1('login success');
        setOpen1(true);
        let token = "token123";
        localStorage.setItem('userToken', token);
        navgate(0);
      } else {
        if (username === "") {
          setInputError(true);
          setMsg1('Please Enter username.');
        }
        if (password === "") {
          setInputError(true);
          setMsg2('Please Enter password.');
        }
        if (username !== "" && username !== res.data[0].username) {
          setMessage1('You Iput Useranme is incorrect.')
          setOpen1(true);
        }
        if (password !== "" && password !== res.data[0].password) {
          setMessage2('You Iput password is incorrect.')
          setOpen2(true);
        }

        let token = "logout";
        localStorage.setItem('userToken', token);
      }

    })
  }

  const card = (
    <React.Fragment>
      <CardContent className={styles.form}>
        <TextField
          required
          onChange={(e) => { setUsername(e.target.value) }}
          id="username"
          label="username"
          variant="standard"
          className={styles.input}
          error={inputError}
          helperText={msg1}
          value={username} />
        <TextField
          required
          onChange={(e) => { setPassword(e.target.value) }}
          label="Password"
          error={inputError}
          id='password'
          type="password"
          variant="standard"
          helperText={msg2}
          className={styles.input}
          value={password} />
        <Button variant="contained" className={styles.btn} onClick={handleLogin}>Login</Button>
      </CardContent>
    </React.Fragment>
  );

  return (
    <div className={styles.box}>
      <div className={styles.div1}>
        <Typography variant="h3" component="h2" sx={{ fontFamily: "calling code" }}>Student Management</Typography>
        <Typography variant="h1" component="h2" sx={{ fontFamily: "calling code" }}>Login</Typography>
      </div>
      <Card component="form" className={styles.card} noValidate autoComplete="off">
        {card}
      </Card>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open1} >
        <Alert onClose={handleClose1} variant="filled" severity="error" className={styles.alert1}>
          {message1}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open2} >
        <Alert onClose={handleClose2} variant="filled" severity="error" className={styles.alert2}>
          {message2}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;