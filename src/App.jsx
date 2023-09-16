import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharactarList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { Toaster } from "react-hot-toast";

import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [query, setQuery] = useState("");

 const {isLoading , characters} = useCharacter(query)
  const [selectedId, setSelectedId] = useState(null);
 
  const [favourites, setFavourites] = useLocalStorage("favourites")
  // const [favourites, setFavourites] = useState(() => JSON.parse(localStorage.getItem('favourites')) || []);



// useEffect(() => {
// localStorage.setItem('favourites',JSON.stringify(favourites))
// },[favourites])

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
