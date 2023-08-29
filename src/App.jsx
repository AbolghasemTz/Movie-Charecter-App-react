import { useState } from "react";
import "./App.css";
import { allCharacters } from "../data/data";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharactarList";
import Navbar from "./components/Navbar";
function App() {
  const [characters,setcharacters] = useState(allCharacters)

  return (
    <div className="app">
     
      <Navbar numOfResult={characters}/>
      <div className="main">
        <CharacterList characters={characters} />
        <CharacterDetails />
      </div>
    </div>
  );
}

export default App;
