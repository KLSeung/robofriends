import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import '../containers/App.css';


class App extends Component { //this is a state, used to communicate between children and parent
  constructor(){
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users =>this.setState({robots: users}));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render(){
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robots => { //we are receiving properties here from the parent
      return robots.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    if (!robots.length){
      return <h1>Loading</h1>
    }
    else{
      return(
        <div className = 'tc'>
          <h1 className='f1'>robofriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList robots = {filteredRobots}/> {/*this is a children component of the Scroll component which allows a component to be wrapped in another */}
          </Scroll>
        </div>
      );
    }
  }
// }

export default App;
