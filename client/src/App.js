import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import UploadMovies from "./components/UploadMovies/UploadMovies";
import AddMovie from "./components/AddMovie/AddMovie";
import Navigation from "./components/Navigation/Navigation";
import EditMovie from "./components/EditMovie/EditMovie";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/upload">
          <UploadMovies />
        </Route>
        <Route path="/add">
          <AddMovie />
        </Route>
        <Route path="/edit">
          <EditMovie />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
