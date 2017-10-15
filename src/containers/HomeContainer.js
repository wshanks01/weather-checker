import React, { Component } from 'react';
import WeatherSearch from '../components/WeatherSearch'
import '../App.css';


class HomeContainer extends Component {
  constructor(props) {
    super(props);


    this.state = {
      search:null,
      results:null,
      isLoading:false
    }

    this.fetchResults = this.fetchResults.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

// Fetch weather results based on search state
  fetchResults(event){
    event.preventDefault()
    this.setState({isLoading:true})

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.search},CA&units=metric&APPID=0bf8663d6eb57b9496082f891d847720`)
    .then(results => {
      return results.json()
    })
    .then(data => {
      this.setState({
        isLoading:false,
        results:data
      })
    })
  }

  render() {
    return (
      <div className="home">
        <WeatherSearch 
          search={this.state.search}
          results={this.state.results}
          fetchResults={this.fetchResults}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}
export default HomeContainer;