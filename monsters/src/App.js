import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((allpokemon) => {
        // Create an array of fetch promises
        const fetchPromises = allpokemon.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        );

        // Use Promise.all to fetch all Pokémon data in parallel
        Promise.all(fetchPromises).then((pokeDataArray) => {
          this.setState({ monsters: pokeDataArray });
        });
      });
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <SearchBox
          placeholder="Search-monsters"
          handleChange={e => this.setState({ searchField: e.target.value })}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
