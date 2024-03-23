import { Button } from '@mui/material';

function HomePage() {
    const logout = ()=>{
        localStorage.setItem('userToken','logout');
        window.location.reload();
    }
    return (
        <div>
            HomePage
            <Button variant="contained" onClick={logout}>Logout</Button>
        </div>
    );
}

export default HomePage;