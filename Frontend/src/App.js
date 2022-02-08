import React from 'react';
import './App.css';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Main from './pages/Main';
import Header from './components/Header';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;