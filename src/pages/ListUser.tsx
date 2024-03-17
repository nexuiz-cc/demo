
import { NavLink } from 'react-router-dom';

function ListUser() {
    return (
        <div>
            ListUser
            <NavLink  to='/user/newuser'>New User</NavLink>
        </div>
    );
}

export default ListUser;