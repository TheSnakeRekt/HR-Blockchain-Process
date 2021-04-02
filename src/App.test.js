import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import keccak from 'keccak256';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('converts to Keccak-256 correctly',()=>{
  const mail = 'jorgeradasilva@gmail.com';
  const pre_built_hash = '0x484f17c6608bd854a2ba350e632ec442a2db833a48d6557ae413ac5a17794ecc';

  if(pre_built_hash != "0x"+keccak(mail).toString('hex')){
    throw 'not valid hash';
  }
})