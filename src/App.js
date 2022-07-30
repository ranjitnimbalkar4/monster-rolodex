import './App.css';
import { Component } from 'react';

class App extends Component{
  
  constructor() {
    super();
    console.log("Constructor..");
    this.state = {
      monsters : [],
      searchField : ""
    };
  }

  componentDidMount(){
    console.log("compoenentDidMount..")
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState( 
          () => { return {monsters : users}},          
          () => {console.log(this.state);}
      ));
      
  }

  render() {
    console.log("Rendering Compnent..");

    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField);
    });
    
    return (
      <div className="App">
         <input className='serach-box' type='search' placeholder='search monsters' onChange={(event) => {
            const searchField = event.target.value.toLocaleLowerCase();           
            this.setState(() => {
              return { searchField };
            });
         }}/>

          { filteredMonsters.map(monster => {
             return (
              <div key={monster.id}>
                <h1>{monster.name}</h1>
              </div>)
            })}              
      </div>
    );
  }

}


export default App;
