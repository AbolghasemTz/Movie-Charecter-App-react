import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { Children } from "react";
import Loading from "./Loading";

function CharacterList({
  characters,
  isLoading,
  onselectCharacter,
  selectedId,
}) {
  if (isLoading)
    return (
      <div className="characters-list">
        <Loading />
      </div>
    );
  return (
    <div className="character-list">
      {characters.map((item) => {
        return (
          <Character
            key={item.id}
            item={item}
            onselectCharacter={onselectCharacter}
            selectedId={selectedId}
          >
            <button
              className="icon red"
              onClick={() => onselectCharacter(item.id)}
            >
            
              {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </Character>
        );
      })}
    </div>
  );
}

export default CharacterList;

export function Character({
  item,
 children,
  selectedId = { selectedId },
}) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "🤠" : "👧"}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span className={`status${item.status === "Dead" ? "red" : ""}`}></span>
        <span className=""> {item.status} </span>
        <span className=""> - {item.species} </span>
      </div>
      {children}
    </div>
  );
}
