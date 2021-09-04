import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DeleteMeme from './Components/Gallery/DeleteMeme/DeleteMeme';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/deleteMeme">
            <DeleteMeme></DeleteMeme>
          </Route>
         
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
