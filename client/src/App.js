import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/home.js';
import AddAct from './Components/AddAct/index.js';
import Details from './Components/Details';

function App() {

  //<Route path = '' element = {</>}></Route>
  return (
    <Routes>
      <Route path = '/home' element = {<Home/>}></Route>
      <Route path = '/home/:id' element = {<Details/>}></Route>
      <Route path = '/add' element = {<AddAct/>}></Route>
    </Routes>
  );
}

export default App;
