import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom' ;
import LandingPage from './components/landingPage';
import Home from './components/Home';
import VideogameDetails from './components/VideogameDetails';
import SearchResults from './components/SearchResults';
import NewVideogame from './components/NewVideogame';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= "/" component= {LandingPage} />
        <Route exact path= "/home" component= {Home} />
        <Route exact path= '/videogames/createvideogame' component= {NewVideogame} />
        <Route exact path='/videogames/:id' component={VideogameDetails} />
        <Route exact path='/results/:name' component={SearchResults} />
       
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
