/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getMovie } from '../actions'

class Movie extends Component {
  
  static propTypes = {
    imdbID: PropTypes.string.isRequired,
    info: PropTypes.object
  }

  state = {
    imdbID: '',
    info: {}
  }

  
  componentDidMount() {
    getMovie(this.props.imdbID)
      .then(Response => {
        this.setState({
          info: Response.data
        });
      });
  }


  render() {
    const { info } = this.state
    if(!this.props.imdbID){
      return <Redirect to='../' />
    }
    if (!info || !info.Title) {
      return <h1><i>Invalid movie</i></h1>
    }

    return (
        <div className="well well-sm container">
          <div className="row">
              <div className="col-sm-6 col-md-4">
                  <img src={info.Poster} alt="" className="img-rounded img-responsive"/>
              </div>
              <div className = "col-sm-6 col-md-8" >
                  <h4>{info.Title}</h4>
                  <small>{info.Released} - {info.Country}</small>
                  <p>
                      Director: {info.Director}
                      <br/>
                      Time: {info.Runtime}
                      <br/>
                      Awards: {info.Awards}
                      </p>
                  <p>{info.Plot}</p>
                      <a href="../" type="button" className="btn btn-primary">Return</a>
              </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  imdbID: ownProps.match.params.imdbID.toLowerCase(),
  info: {}
});


const mapDispatchToProps = dispatch => ({
  getMovie: bindActionCreators({ getMovie }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Movie));
