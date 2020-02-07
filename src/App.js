import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const dataBus = require('./data.json');

const SearchBar = props => {
  const {destination, source, travelDate, returnDate} = props.propsData;
  return(
    <div>
      <p>Search Bus</p>
      <div>
          <TextField id="source" label="Enter Source" variant="outlined" onChange={(event)=>props.handleSourceChange(event)} />
          <TextField id="destination" label="Enter Destination" variant="outlined" onChange={(event)=>props.handleDestinationChange(event)} />
          <label for="start">Travel Date:</label>
          <input type="date" id="start" name="trip-start" value={travelDate?travelDate:null} min="2020-01-01" max="2020-12-31" onChange={(event)=>props.handleTravelDate(event)}></input>
          <label for="return">Return Date:</label>
          <input type="date" id="return" name="trip-return" value={returnDate?returnDate:'select'} min="2020-01-01" max="2020-12-31" onChange={(event)=>props.handleReturnDate(event)}></input>
          <Button variant="contained" color="primary" onClick={()=>props.handleSubmitSerach()} >Search Bus</Button>
      </div>
    </div>
  )
}

const BusList = ( props ) => {
  console.log(props);
  return(
    <div>
      <p>Bus Details</p>
      <p>Total Result : {dataBus.travelBusList.length} </p>
      {
        dataBus.travelBusList.map((item, index) => (
          <div key={index+'1q1q1q'} >
            <p>{index+1}</p>
            <p>{item.BusOperatorName} - {item.BusNo}</p>
            <p>Departure - {item.arrivalTime} , Arrival- {item.departureTime}</p>
            <p>Ticket Amount - {item.price}</p>
            <Button variant="contained" color="secondary" onClick={()=>props.handleBookBus(item)} >Select Bus</Button>
          </div>
        ))
      }
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      source: '',
      destination: '',
      travelDate:'',
      returnDate:'',
      ShowBusList: false,
    };
  }

  componentDidMount(){
    this.setState({ dataLoaded: true })
  }

  handleSourceChange = event => {
    this.setState({source: event.target.value});
  }

  handleDestinationChange = event => {
    this.setState({source: event.target.value});
  }

  handleTravelDate = event => {
    this.setState({travelDate: event.target.value});
  }

  handleReturnDate = event => {
    this.setState({returnDate: event.target.value});
  }

  handleSubmitSerach = () =>{
    // do validation
    // make api call
    this.setState({ dataLoaded: false })
    setTimeout(()=>{ this.setState({ ShowBusList: true, dataLoaded: true }) },2000);
  }

  handleBookBus = (busData) => {
    console.log('selected busData', busData);
  }

  render(){
    const { ShowBusList, dataLoaded } = this.state;
    console.log('%cState Variable','color:blue', this.state);
    if ( !dataLoaded ){
      return (
        <p>Loading...</p>
      )
    }
    return (
      <div className="App">
        <div className='HeaderText'>
          <h3>Bus Booking Application</h3>
        </div>
        {
          !ShowBusList
          ?
            <SearchBar propsData= {this.state} 
              handleSourceChange= {(event) =>this.handleSourceChange(event)}
              handleDestinationChange= {(event) =>this.handleDestinationChange(event)} 
              handleTravelDate= {(event) =>this.handleTravelDate(event)}
              handleReturnDate= {(event) =>this.handleReturnDate(event)}
              handleSubmitSerach= {() =>this.handleSubmitSerach()}
            />
          :
            <BusList handleBookBus={(busData)=>this.handleBookBus(busData)} />
        }
      </div>
    );
  }
}

export default App;

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));