
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { searchMovies, getMovie, Options, sortMovies } from '../actions'
import Select from 'react-select';



class Movies extends Component {
  
  static propTypes = {
    searchParmeter: PropTypes.string.isRequired,
    yearParameter: PropTypes.string,
    list: PropTypes.object
  }

  state = {
    invalid: false,
    searchParmeter: '',
    yearParameter: '',
    list: {}
  }

  clearList = () => {
    this.setState({
      invalid: false,
      list: {}
    });
  }

  fetchMovies = () => {
    if (this.props.searchParmeter !== this.state.searchParmeter || this.props.yearParameter !== this.state.yearParameter) {
      this.setState({
        invalid: false,
        searchParmeter: this.props.searchParmeter,
        yearParameter: this.props.yearParameter
      });
      this.clearList();
      searchMovies(this.props.searchParmeter, this.props.yearParameter)
        .then(Response => {
            if(Response.data.Search && Response.data.Search.length > 0) {
              const update = Response.data.Search.map((item) => {
                return getMovie(item.imdbID)
                  .then(ResponseMovie => {
                    item["imdbRating"] = ResponseMovie.data.imdbRating;
                  });
              })
              Promise.all(update).then(() => {
                this.setState({
                  invalid: false,
                  list: Response.data
                });
              })
          } else
            this.setState({
              invalid: true
            })
        });
    }
  }

  componentDidMount() {
    console.log('Mount')
    this.fetchMovies();
  }

  componentDidUpdate() {
    console.log('Update')
    this.fetchMovies();
  }

  selectChange = selectedOption => {
    this.setState({
      list: sortMovies(selectedOption.value, this.state.list)
    });
  }

  render() {
    const { list } = this.state
    if(this.state.invalid){
      return <div className="container"><h1><i>Invalid search.</i></h1></div>
    }
    if(!this.state.searchParmeter){
      return <div className="container"><h1><i>Informe the movie title</i></h1></div>
    }
    if (!list || !list.Search || list.Search.length === 0) {
      return  <div className="container"><h1><i>Loading...</i></h1></div>
    }

    return (
      <div>
        <div className="container">
            <div className = "row d-flex flex-row-reverse">
              <div className="col-5 row">
                <div className="align-center align-right align-self-xl-center col-4">Ordey by: </div>
                <div className="col-8"><Select onChange={this.selectChange} options={Options} /></div> 
              </div>
            </div>
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
                              <a href={`/${item.imdbID}`}
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
  getMovie: bindActionCreators({ getMovie }, dispatch),
  sortMovies: bindActionCreators({ sortMovies }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Movies));
