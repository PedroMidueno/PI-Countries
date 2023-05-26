import './App.css';
import React from 'react';
import { useLocation, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Cards from '../src/Components/Cards/Cards';
import Detail from '../src/Components/Detail/Detail';
import Form from '../src/Components/Form/Form';
import NavBar from '../src/Components/NavBar/NavBar';
import Landing from '../src/Components/Landing/Landing';
import NotFound from './Components/NotFound/NotFound';
import About from './Components/About/About';
import Footer from './Components/Footer/Footer';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/'

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  // const [access, setAccess] = useState(false)

  const goToHome = () => {
    // setAccess(true);
    navigate("/home");
  }

  // useEffect(() => {
  //   !access && navigate("/")
  // }, [access, navigate])

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path='/' element={<Landing goToHome={goToHome} />} />
        <Route path='/home' element={<Cards />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:idPais' element={<Detail />} />
        <Route path='/activity/create' element={<Form />} />
        <Route path='/detail' element={<Navigate to='/detail/null' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
