import React, { Component } from 'react';
import WeatherSearch from '../components/WeatherSearch'
import '../App.css';


class HomeContainer extends Component {
  constructor(props) {
    super(props);


    this.state = {
      search:'',
      results:null,
      isLoading:false,
      valueError:false,
      fetchError:undefined,
    }

    this.fetchResults = this.fetchResults.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  handleError(response) {
    if (!response.ok) {
      throw Error(response.status) 
    }
    return response
  }

// Fetch weather results based on search state
  fetchResults(search){
    if (!search) {
      this.setState({fetchError:undefined})
      return 'Enter valid value to search for city'
    }
    this.setState({isLoading:true})
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.search},CA&units=metric&APPID=0bf8663d6eb57b9496082f891d847720`)
    .then(this.handleError)
    .then(results => {
      return results.json()
    })
    .then(data => {
      this.setState({
        isLoading:false,
        results:data,
        fetchError:false,
      })
    })  
    .catch(error =>{
      this.setState({
        fetchError:true,
      })
    })
  }

  render() {
    return (
      <div className="home">
        <WeatherSearch 
          search={this.state.search}
          fetchError={this.state.fetchError}
          results={this.state.results}
          valueError={this.state.valueError}
          fetchResults={this.fetchResults}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}
export default HomeContainer;