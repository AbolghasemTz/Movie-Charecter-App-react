import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharactarList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Modal from "./components/Modal";
function App() {
  const [characters, setcharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [count, setCount] = useState(0);

  // console.log(query);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );
        //  console.log(data.results);
        setcharacters(data.results.slice(0, 4));
      } catch (err) {
        if (axios.isCancel()) {
          setcharacters([]);
          toast.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    // if(query.length < 3) {
    //   setcharacters([])
    //   return
    // }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);

  // useEffect(() => {
  //  const interval = setInterval(() => setCount((c) => c + 1 ),1000)
  //   return () => clearInterval(interval)
  // },[count])
  const handleSelectChracter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
    setFavourites((prevFav) => [...prevFav, char]);
  };
  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);
  // [1,2,3]

  const handleDeleteFavourite = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };
  return (
    <div className="app">
      <Toaster />

      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites
          favourites={favourites}
          onDeleteFavourite={handleDeleteFavourite}
        />
      </Navbar>

      <div className="main">
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onselectCharacter={handleSelectChracter}
        />
        <CharacterDetails
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          isAddToFavourite={isAddToFavourite}
        />
      </div>
    </div>
  );
}

export default App;
