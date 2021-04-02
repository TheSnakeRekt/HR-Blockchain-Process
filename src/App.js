import React, { Component } from "react";
import {HR, HR_ADDRESS, ABI} from "./hr";
import keccak from 'keccak256';
import "./App.css";

class App extends Component {
  state = {web3: null, accounts: null, contract: null, resp: null, mailHashed: null, mail: null};

  componentDidMount = async () => {
    try {
      let web3;

      if(window.ethereum){
        await window.ethereum.enable();
        web3 =  HR(window.web3.currentProvider);
      }else if(window.web3){
        web3 =  HR(window.web3.currentProvider);
      }

      const instance = await new web3.eth.Contract(ABI, HR_ADDRESS);
      const accounts = await web3.eth.getAccounts();

      
      this.setState({accounts: accounts, web3: web3, contract: instance})
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>The stored accounts are: {this.state.accounts}</div>
        <div>The stored email hash is: {this.state.mailHashed}</div>
        <div style={{marginTop:'20px'}}>
          <input onChange={this.handleInput} placeholder="E-mail"></input>
          <button onClick={()=>{this.apply(this.state);}}>Send Contract</button>
        </div>
        <div style={{marginTop:'20px'}}>
            Application ID:
           <div>{this.state.resp}</div>
        </div>
      </div>
    );
  }
  
  async apply(state){
    this.getApplicationID(state).then(async res=>{
      if(!res){
        try {
          await state.contract.methods.apply(state.mailHashed).send({from: state.accounts[0]});
          this.getApplicationID(state);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }

  getApplicationID(state){
    if(state.mail){
      return state.contract.methods.getApplicationID(state.mail).call().then((response)=>{
        if(response > 0){
          this.setState({resp: response});
          return true;
        }
        return false;
      });
    }
  }

  handleInput = event =>{
    const mailHashedInput = "0x"+keccak(event.target.value).toString('hex');
    this.setState({mailHashed:mailHashedInput, mail:event.target.value});
  }
}

export default App;
