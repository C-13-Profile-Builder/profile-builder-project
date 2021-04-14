import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Loginpage from './components/Loginpage';
import Homepage from './components/Homepage';
import Changepwd from './components/Changepwd';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import './App.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        
          <Route exact path="/" component={Loginpage}/>
          <Route exact path="/homepage/:uname" component={Homepage}/>
          <Route exact path="/passwordChange/:email" component={Changepwd}/>
       
      </BrowserRouter>
    </div>
  );
}
export default App;
