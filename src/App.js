import './App.css';
import UploadImage from './pages/upload';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterUser from './pages/Register';
import LoginUser from './pages/Login';
import NavigationBar from './pages/Navbar';
import ImageHub from './pages/imagehub';
import Logout from './pages/logout';
import HomePage from './pages/home';
import ImageView from './pages/imageView';
function App() {
  return (
    <Router>
    <div className="App">
    <NavigationBar/>
    <Routes>
          <Route path="image/:id" element={<ImageView/>} />
          <Route element={<HomePage/>} path="/"/>
          <Route element={<ImageHub/>} path="/hub"/>
          <Route element={<RegisterUser/>} path="/register"/>
          <Route element={<LoginUser/>} path="/login"/>
          <Route element={<UploadImage/>} path="/upload"/>
          <Route element={<Logout/>} path="/logout"/>

        </Routes>
    </div>
    </Router>
  );
}

export default App;
