import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Loginpage from './components/Loginpage';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import './App.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Loginpage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
