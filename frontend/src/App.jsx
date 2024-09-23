import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Send from './pages/Send';
import Header from './components/Header';
import ProtectedRoute from './utils/ProtectedRoute';
import PublicRoutes from './utils/PublicRoutes';
import NotFound from './pages/NotFound';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import { UserProvider } from './context/UserContext';

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/send/:id' element={<Send />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/logout' element={<Logout />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App;
