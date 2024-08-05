
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ListUser from '../pages/user/ListUser';
import NewUser from '../pages/NewUser';
import Login from '../pages/login/Login';
import CalendarPage from '../pages/calendar/CalendarPage';

export const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/user' element={<ListUser />} />
      <Route path='/newUser' element={<NewUser />} />
      <Route path='/login' element={<Login />} />
      <Route path='/calendar' element={<CalendarPage />} />
    </Routes>
  );
}

