import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom' ;
import LandingPage from './components/LandingPage/landingPage';
import Home from './components/Home/Home';
import VideogameDetails from './components/DetailCard/VideogameDetails';
import SearchResults from './components/SearchResults/SearchResults';
import NewVideogame from './components/NewVgCreated/NewVideogame';
import ErrorPage from './components/ErrorPage/ErrorPage';

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
        <Route path="*" component={ErrorPage} />
       
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
