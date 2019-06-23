import React from 'react';
import fetchPokeList from '../../services/PokeServer';
// import { Switch, Route, Link } from 'react-router-dom';
import PokeList from '../PokeList/index';
import PokeSeach from '../PokeSearch/index';
// import PokeCard from '../PokeCard/index';
// import PokeDetail from '../PokeDetail/index';
import './App.scss';
import pokelogo from '../../img/pokelogo.png';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pokeData: [],
      pokeNameFilter: '',
      isLoading: true
    };
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
  }

  componentDidMount() {
    this.getPokeFetch ();
  }

  getPokeFetch () {
    fetchPokeList()
      .then(data => {
        data.results.forEach(item => {
          fetchPokeList(item.url)
            .then(pokemon => {
              this.setState(state => {
                return {
                  pokeData: [...this.state.pokeData.sort((a, b) => a.id - b.id), pokemon],
                  isLoading: true
                };
              });
            }).then(()=> {
              if(this.state.pokeData.length === 25){
                this.setState({isLoading: false})
              }
            })
        })
        
      })
    }

  handleChangeFilter(event) {
    const currentValue = event.currentTarget.value;

    this.setState({
      pokeNameFilter: currentValue
    });
  }

  render() {
    const { pokeData, pokeNameFilter, isLoading, } = this.state;

    return (
      <div className="app__container">

        <header className="header__container">
            <img src={pokelogo} alt="pokelogo" className="pokelogo"/>
        </header>

        {isLoading ? (
          <p className="loading__text">Loading...</p>
        ) : (
          <main className="main__container">
            <PokeSeach
              handleChangeFilter = {this.handleChangeFilter}
            />
            <PokeList
              pokeData = {pokeData}
              pokeNameFilter = {pokeNameFilter}
              handleChangeFilter = {this.handleChangeFilter}
            />

            {/* <Link to="pokedetail">Ir a detalle</Link> */}

            {/* <Switch>
              <Route
                path='/pokedetail/:id'
                component = {PokeDetail}
                render = {props => (
                  <PokeCard
                    match = {props.match}
                  />
                )} />
            </Switch> */}

          </main>
        )}

          <footer className="footer__container">
            <p className="footer__text">Made with <i className="fas fa-heart"></i> by Victoria Diro with HTML, CSS, ReactJs</p>
          </footer>
      </div>
    );
  }
}

export default App;
