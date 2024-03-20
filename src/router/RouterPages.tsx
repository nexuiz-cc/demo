
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ListUser from '../pages/user/ListUser';
import NewUser from '../pages/NewUser';

function RouterPages() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/user' element={<ListUser />} />
      <Route path='/newUser' element={<NewUser />} />
    </Routes>
  );
}

export default RouterPages;