import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loginpage from './components/Loginpage';
import Homepage from './components/Homepage';
import Changepwd from './components/Changepwd';
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import './App.css';
import Activateaccount from './components/Activateaccount';


function App() {
  console.log(document.cookie)
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Loginpage}/>
          <Route exact path="/homepage/:uname/:rating" component={Homepage}/>
          <Route exact path="/passwordChange/:uname" component={Changepwd}/>
          <Route exact path="/activate_account/:uname" component={Activateaccount}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
