import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const Form = () => {
  const [emotion, setEmotion] = useState(emotionOptions[0].value);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    console.log("FORM IS MOUNTED / CREATED");
    const getPokemon = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      console.log("data", data);
      const {result} = data;
      setPokemonList(results);
    };
    getPokemon();
  },[emotion]);

  const handleChange = (e) => {
    if (e.target) {
      setEmotion(e.target.value);
    }
  };

  return (
    <form>
      <Label labelID="emotion" content="Select emotions" />
      <Selection
        selectionID="emotions"
        options={emotionOptions}
        value={emotion}
        onSelectionChange={handleChange}      
      />
      <Label labelID="reaction" content="Reaction"/>      
      <Input
        InputID="reaction"
        defaultValue={reactions[emotion]}
      />
      {pokemonList.map((pokemon)=>(
        <h1 key={pokemon.name}>{pokemon.name}</h1>
      ))}      
    </form>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form/>
      </header>
    </div>
  );
}

export default App;
