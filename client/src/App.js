// import logo from './logo.svg';
import './App.css';
import Home from './View/Home';
import { BrowserRouter, Route,Routes  } from "react-router-dom";
import Linechart from './View/Linechart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/linechart/:feed' element={<Linechart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
