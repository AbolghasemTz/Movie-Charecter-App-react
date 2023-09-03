import { useState } from "react";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharactarList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
function App() {
  const [characters, setcharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  
  // console.log(query);
  useState(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        //  console.log(data.results);
        setcharacters(data.results.slice(0, 4));
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query]);

  const handleSelectChracter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        {/* <Favourites /> */}
      </Navbar>

      <div className="main">
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onselectCharacter={handleSelectChracter}
        />
        <CharacterDetails selectedId={selectedId} />
      </div>
    </div>
  );
}

export default App;
