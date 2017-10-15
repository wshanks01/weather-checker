import React, { Component } from 'react';
import WeatherResults from './WeatherResults';
import '../App.css';

class WeatherSearch extends Component {
  
  constructor(props){
    super(props)

    this.renderResults = this.renderResults.bind(this)
}

// Render results only is the result state contains info
  renderResults() {
    if (this.props.results != null) {
      return (
        <WeatherResults
          city={this.props.search}
          results={this.props.results}
          updateResults={this.props.updateResults}
          isLoading={this.props.isLoading}
          loading={this.props.loading}
        />
      )
    }
  }


  render() {
    return (
      <div className="search">
        <form className="search__form" onSubmit={this.props.fetchResults}>
          <div>
            <label className="search__label">Search for your 5 day/3 hour Weather Forecast</label>
          </div>
          <input className="search__input" type="text" id="search" onChange={this.props.handleChange} />
        </form>
        {this.renderResults()}
      </div>
    )
  }
}

export default WeatherSearch;