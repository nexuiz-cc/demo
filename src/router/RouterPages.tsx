import React, { lazy,Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
const User = lazy(()=> import ('../pages/ListUser'))
const HomePage = lazy(()=> import ('../pages/HomePage'))
const NewUser = lazy(()=> import ('../pages/NewUser'))
function RouterPages() {
    return (
        <Routes>
            <Route path="/"  element={<Suspense><HomePage /></Suspense>} />
            <Route path='/user' element={<Suspense><User /></Suspense>} >
              <Route path='/user/newuser' element={<Suspense><NewUser /></Suspense>} />
            </Route>
        </Routes>
    );
}

export default RouterPages;