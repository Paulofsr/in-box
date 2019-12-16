/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { searchMovies, getMovie } from '../actions'

class Movies extends Component {
  
  static propTypes = {
    searchParmeter: PropTypes.string.isRequired,
    yearParameter: PropTypes.string,
    list: PropTypes.object
  }

  state = {
    searchParmeter: '',
    yearParameter: '',
    list: {}
  }

  clearList = () => {
    this.setState({
      list: {}
    });
  }

  fetchMovies = () => {
    if (this.props.searchParmeter !== this.state.searchParmeter || this.props.yearParameter !== this.state.yearParameter) {
      this.setState({
        searchParmeter: this.props.searchParmeter,
        yearParameter: this.props.yearParameter
      });
      this.clearList();
      searchMovies(this.props.searchParmeter, this.props.yearParameter)
        .then(Response => {
          const update = Response.data.Search.map((item) => {
            return getMovie(item.imdbID)
              .then(ResponseMovie => {
                item["imdbRating"] = ResponseMovie.data.imdbRating;
              });
          })
          Promise.all(update).then(() => {
            this.setState({
              list: Response.data
            });
          })
        });
    }
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate() {
    this.fetchMovies();
  }


  render() {
    const { list } = this.state
    if(!this.state.searchParmeter){
      return <div className="container"><h1><i>Informe the movie title</i></h1></div>
    }
    if (!list || !list.Search || list.Search.length === 0) {
      return  <div className="container"><h1><i>Loading...</i></h1></div>
    }

    return (
      <div>
        <div className="container">
            <div className = "row">
              {
                (list.Search).map(function(item, key) {
                  return (
                  <div  key={key} className="card p-3 col-12 col-md-6 col-lg-4">
                      <div className="card-wrapper">
                          <div className="">
                              <img src={item.Poster} alt={item.Title} className="img-thumbnail"  />
                          </div>
                          <div className="card-box">
                              <h4 className="card-title mbr-fonts-style display-7">
                                  {item.Title} - <small>{item.Year} [{item.imdbRating}]</small>
                              </h4>
                          </div>
                          <div className="mbr-section-btn text-center">
                              <a href={`/info/${item.imdbID}`}
                              className="btn btn-primary display-4" >
                                  Learn More
                              </a>
                          </div>
                      </div>
                  </div>
                  )
                })
              }
            </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  list: store.searched
});


const mapDispatchToProps = dispatch => ({
  searchMovies: bindActionCreators({ searchMovies }, dispatch),
  getMovie: bindActionCreators({ getMovie }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Movies));
