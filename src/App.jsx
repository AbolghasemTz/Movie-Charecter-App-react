import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharactarList";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="app">
     
      <Navbar />
      <div className="main">
        <CharacterList characters={allCharacters} />
        <CharacterDetails />
      </div>
    </div>
  );
}

export default App;
