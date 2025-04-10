import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import { UserAuth } from './core/models/auth/UserModel'
import { useDispatch, useSelector } from 'react-redux'
import { IStateSelector } from './redux/types/interface'
import { useEffect } from 'react'
import { AuthVModelInstance } from './core/vmodels/auth/AuthVModel'

function App() {

  const { validateUser } = AuthVModelInstance;
  const dispatch = useDispatch();

  const user: UserAuth = useSelector((state: IStateSelector) => state.authentication);

  useEffect(() => {
    validateUser(dispatch);
  }, []);

  return (
    <div style={{
      width: "100%",
      display: "absolute",
      height: "100vh"
    }}>
      <Router>
        <Routes>
          <Route path='/' element={user.auth ? <Home /> : <Navigate to="/login" />} />
          <Route path='/login' element={user.auth ? <Navigate to='/' /> : <Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
