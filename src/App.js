import 'bootstrap/dist/css/bootstrap.min.css';
import Loginpage from './components/Loginpage';
import Homepage from './components/Homepage';
import Changepwd from './components/Changepwd';
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Loginpage}/>
          <Route exact path="/homepage/:uname/:rating" component={Homepage}/>
          <Route exact path="/passwordChange/:email" component={Changepwd}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
