import { Button } from "@mui/material";
import styles from './listUser.module.scss'


function ListUser() {
  return (
    <div>
      ListUser
      <Button variant="contained"  className={styles.newbtn} href='/newUser'>New User</Button>
    </div>
  );
}

export default ListUser;