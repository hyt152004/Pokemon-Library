import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [pokemon, setPokemon] = useState("");

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  const searchPokemon = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          setPokemon("");
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setData(error);
        });
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleInputChange = (event) => {
    setPokemon(event.target.value.toLowerCase());
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={pokemon}
          onChange={handleInputChange}
          onKeyPress={searchPokemon}
          placeholder="Enter Pokémon Name"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div>
            <div className="name">
              {data.species ? (
                <p>{capitalizeFirstLetter(data.species.name)}</p>
              ) : (
                <p> No Pokemon data available</p>
              )}
            </div>
          </div>
        </div>

        <div className="middle">
          <div className="pokemonImages">
            {data.sprites ? (
              <img src={data.sprites.front_default} height="300"></img>
            ) : null}
            {data.sprites ? (
              <img src={data.sprites.back_default} height="300"></img>
            ) : null}
          </div>
        </div>

        <div className="bottom">
          <div className="abilities">
            <ul className="ability">
              {data.abilities ? (
                <ul>
                  {data.abilities.map((ability) => (
                    <li>{capitalizeFirstLetter(ability.ability.name)}</li>
                  ))}
                </ul>
              ) : (
                <p>No abilities available</p>
              )}
            </ul>

            <p className="bold">Abilities</p>
          </div>
          <div className="weight">
            <p>{data.weight !== undefined ? `${data.weight / 10}kg` : "N/A"}</p>
            <p className="bold">Weight</p>
          </div>

          <div className="height">
            <p>{data.height !== undefined ? `${data.height / 10}m` : "N/A"}</p>
            <p className="bold">Height</p>
          </div>

          <div className="base_experience">
            <p>
              {data.base_experience !== undefined
                ? `${data.base_experience}`
                : "N/A"}
            </p>
            <p className="bold">Base Experience</p>
          </div>
        </div>
      </div>

      <footer className="credits">
        <p className="bold">Programmed by: Yetaek(David) Hong</p>
        <p className="bold">
          Source: <a href="https://pokeapi.co/">https://pokeapi.co/</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
