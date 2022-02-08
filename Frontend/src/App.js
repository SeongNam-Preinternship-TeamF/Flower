import React from 'react';
import './App.css';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Main from './pages/Main';
import Result from './pages/Result';
import Header from './components/Header';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main/>}/>
          <Route exact path="/result" element={<Result/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;