import React, { Component } from 'react';
import WeatherResults from './WeatherResults';
import '../App.css';

class WeatherSearch extends Component {
  
  constructor(props){
    super(props)

    this.renderResults = this.renderResults.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      error: undefined
    }
  }
// Handle submit here, test for empty strings and fetch results in home container, return error if value is empty
  handleSubmit(e) {
    e.preventDefault()
    const search = e.target.elements.search.value
    const error = this.props.fetchResults(search)
    this.setState({ error })

    if (!error) {
      e.target.elements.search.value = ''
    }
  }

// Render results only is the result state contains info
  renderResults() {
    if (this.props.fetchError === false) {
      return (
        <WeatherResults
          city={this.props.search}
          results={this.props.results}
          valueError={this.props.valueError}
          updateResults={this.props.updateResults}
          isLoading={this.props.isLoading}
          loading={this.props.loading}
        />
      )
    } else if (this.props.fetchError === true) {
      return (
        <p>No city found with that name. Please try again</p>
      )
    }
  }


  render() {
    return (
      <div className="search">
        <form className="search__form" onSubmit={this.handleSubmit}>
          <div>
            <label className="search__label">Search for your 5 day/3 hour Weather Forecast in Canada</label>
          </div>
          <input className="search__input" type="text" id="search" onChange={this.props.handleChange} />     
        </form>
        {this.state.error && <p>{this.state.error}</p>}
        {this.renderResults()}
      </div>
    )
  }
}

export default WeatherSearch;