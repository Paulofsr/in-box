import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';
import {  Route, Switch } from 'react-router-dom';
import './App.css';
import Movies from './components/Movies';
import Movie from './components/Movie';
import { Provider } from 'react-redux';


class App extends Component {
  
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  state = {
    inputValue: '',
    yearValue: '',
    list: {
    }
  }

  inputChange = event => {
    this.setState({
      inputValue: event.target.value
    })
  }

  yearChange = event => {
    this.setState({
      yearValue: event.target.value
    })
  }

  render() {
    const {
      clickButton,
      newValue,
      newYear
    } = this.props;

    const { inputValue, yearValue } = this.state;

      return (
        <Provider store={this.props.store}>
          <div className="App" style={{ paddingTop: '10px' }}>
            <Switch>
              <Route path="/info/:imdbID" component={Movie}  />
              <Route path="/">
                  <div className="container">
                    <input onChange={this.inputChange} type='text' value={inputValue} placeholder="Title" />
                    <input onChange={this.yearChange} type='text' value={yearValue} placeholder="Year" />
                    <button onClick={() => clickButton(inputValue, yearValue)}>
                      Search
                    </button>
                  </div>
                  <Movies searchParmeter={newValue} yearParameter={newYear} />
              </Route>
            </Switch>
          </div>
        </Provider>
      );
  }
}



const mapStateToProps = (store, ownProps) => ({
  newValue: store.clickState.newValue,
  newYear: store.clickState.newYear
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

