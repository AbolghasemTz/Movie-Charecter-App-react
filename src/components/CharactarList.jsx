import { EyeIcon } from "@heroicons/react/24/outline";
import React from "react";

function CharacterList({characters}) {
  return (
    <div className="character-list">
      {characters.map((item) => {
        return <Character key={item.id} item={item} />;
      })}
    </div>
  );
}

export default CharacterList;

function Character({ item }) {
  return <div className="list__item">
    <img src={item.image} alt={item.name}/>
    <h3 className="name">
      <span>{item.gender === "Male" ? "🤠" : "👧"}</span>
      <span>{item.name}</span>
    </h3>
    <div className="list-item__info info">
      <span className={`status${item.status === "Dead" ? "red" : ""}`}></span>
      <span className=""> {item.status} </span>
      <span className=""> - {item.species} </span>
    </div>
    <button className="icon red"><EyeIcon /></button>
  </div>;
}
