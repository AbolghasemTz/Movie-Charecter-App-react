import React, { useEffect, useState } from "react";
import { episodes } from "../../data/data";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "./Loading";
function CharecterDetails({ selectedId, isAddToFavourite,onAddFavourite }) {
  const [character, setCharacter] = useState(null);
  const [episodes, setepisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setepisodes([episodeData].flat().slice(0, 5));
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) fetchData();
  }, [selectedId]);

  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "white" }}>Please select a character</div>
    );
  if (isLoading)
    return (
      <div style={{ flex: 1 }}>
        <Loading />
      </div>
    );
  return (
    <div style={{ flex: 1 }}>
     <CharacterSubInfo character={character} isAddToFavourite={isAddToFavourite} onAddFavourite={onAddFavourite}/>
      <EpisodeList episodes={episodes}/>
    </div>
  );
}

export default CharecterDetails;


function CharacterSubInfo({isAddToFavourite,character,onAddFavourite}) {
  return(
    <div className="character-detail">
    <img
      src={character.image}
      alt={character.name}
      className="character-detail__img"
    />
    <div className="character-detail__info">
      <h3 className="name">
        <span>{character.gender === "Male" ? "🤠" : "👧"}</span>
        <span>&nbsp;{character.name}</span>
      </h3>
      <div className="info">
        <span
          className={`status ${character.status === "Dead" ? "red" : ""}`}
        ></span>
        <span className="">&nbsp;{character.status} </span>
        <span className="">&nbsp;{character.species} </span>
      </div>
      <div className="location">
        <p>Last Know location:</p>
        <span>{character.location.name}</span>
      </div>
      <div className="actions">
        {isAddToFavourite ? (
          <p>Already Add To Favourite ✅</p>
        ) : (
          <button
            className="btn btn--primary"
            onClick={() => onAddFavourite(character)}
          >
            Add to favorite
          </button>
        )}
      </div>
    </div>
  </div>
  )
}

function EpisodeList({episodes}) {
  const [sortBy,setSortBy] = useState(true);

  let sortedEpisodes;
  if(sortBy){
    sortedEpisodes = [...episodes].sort((a,b) => new Date(a.created) - new Date(b.created))
  }else {
    sortedEpisodes = [...episodes].sort((a,b) => new Date(b.created) - new Date(a.created))
  }

  return(
    <div className="character-episodes">
        <div className="title">
          <h2>List of opisodes:</h2>
          <button onClick={() => setSortBy((is) => !is)}>
            <ArrowUpCircleIcon className="icon" style={{rotate: sortBy ? "0deg" : "180deg"}}/>
          </button>
        </div>
        <ul>
          {sortedEpisodes.map((item, index) => (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2, "0")} {item.episode} :{" "}
                <strong>{item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
  )
}