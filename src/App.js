import Auth from './components/Auth';
import Game from './components/Game';
import Loading from './components/Loading';
import Quiz from './components/Quiz';
import Score  from "./components/Score";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
function App() {
  return (

    <Router>
    <div className="App">
    <Switch>
      <Route exact path="/Auth" component={Auth} />
      <Route exact path="/Game" component={Game} />
      <Route exact path="/Loading" component={Loading} />
      <Route exact path="/round" component={Quiz} />
      <Route exact path="/score" component={Score} />
      <Redirect from="/" to="Auth" />
    </Switch>
    </div>
  </Router>
  );
}

export default App;