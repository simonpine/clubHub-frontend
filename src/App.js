import './App.scss';
import Bg from './components/bg';
import Title from './components/title';
import Content from './components/content';
import clubHub from './img/clubHub.svg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
function App() {
  return (
    <div id='Welcome' className="App">
      <Bg />
      <div className='LandingNav'>
        <a href='#Welcome' className='logoCont'>
          <img src={clubHub} alt='clubHub, app logo' />
        </a>
        <button className='getIn'>Get in</button>
      </div>
      <Title />
      <Content/>
    </div>
  );
}

export default App;
