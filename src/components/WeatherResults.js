import React, { Component } from 'react';
import '../App.scss';

class WeatherResults extends Component {
  
  constructor(props){
    super(props)
    this.convertMonth = this.convertMonth.bind(this)
    this.prettifyTimeStamp = this.prettifyTimeStamp.bind(this)
    this.renderResults = this.renderResults.bind(this)
  }

// Take datetime and convert time into a user friendly format
  prettifyTimeStamp(timeStamp) {
    let amOrPm = timeStamp.substr(11, 2) > 12 ? 'PM' : 'AM';
    let hour = amOrPm === 'PM' ? (timeStamp.substr(11, 2) - 12) : timeStamp.substr(11, 2);
    return `${hour}:${timeStamp.substr(14, 2)} ${amOrPm}`;
  }

// Take datetime and convert month number into corresponding month
  convertMonth(day) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date(day)
    let monthDate = ''
    months.forEach(function(month,index) {
      if (date.getMonth() === index) {
        monthDate = month;
      }
    });
    return `${monthDate} ${date.getDate()}, ${this.prettifyTimeStamp(day)}`;
  }

  averagePressure() {
    let pressure = 0
    this.props.results.list.map(day => {
      pressure += day.main.pressure
    })
    pressure = pressure * 0.1
    return (pressure / this.props.results.list.length).toFixed(2)
  }

// Render the results by mapping through each
  renderResults() {
    return this.props.results.list.map((day,index) => {
      return (
        <div key={index} className="results__container">
          <p className="results__date">{this.convertMonth(day.dt_txt)}</p>
          <div className="results__temp">
            {day.main.temp} C
          </div>
        </div>
      )
    })
  }

  render() {
    const { results, isLoading } = this.props
    if (isLoading) {
      return (
        <p>Loading...</p>
      )
    }
    return (
      <div className="results-main">
        <h3>{this.props.results.city.name}</h3>
        <p>Average Pressure for these 5 days: {this.averagePressure()} kPa</p>
        <div className="results">
         {this.renderResults()}
        </div>
      </div>
    )
  }
}

export default WeatherResults;