import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/home.js';



function App() {

  //<Route path = '' element = {</>}></Route>
  return (
    <Routes>
      <Route path = '/home' element = {<Home/>}></Route>
    </Routes>
  );
}

export default App;
