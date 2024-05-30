import React from "react";
import "./card.styles.css";

export const Card = (props) => {
    const { name, sprites, abilities } = props.monster;
  return (
    <div className="card-container">
      <img
        alt={name}
        src={sprites.other.dream_world.front_default}
        style={{ width: "100px", height: "100px" }}
      />
      <h1>{name}</h1>
      <p> Abilities: {abilities.map(ability => ability.ability.name).join(', ')}</p>
    </div>
  );
};
