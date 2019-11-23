import React from 'react';
import { Position, Tooltip } from '@blueprintjs/core';

import styles from './Nuzlocke.module.css';

interface TeamProps {
  pokemons: {
    _id: string;
    nickname: string;
    pokemon: {
      _id: number;
      name: string;
      image: string;
    };
  }[];
  nuzlockeType: string;
}

const Team = ({ pokemons, nuzlockeType }: TeamProps) => {
  return (
    <div className={styles.Team}>
      <h2>Team</h2>
      {pokemons.length > 0 ? (
        <div className={styles.TeamGrid}>
          {pokemons.map((pokemon: any) => (
            <Tooltip
              key={pokemon._id}
              className={styles.TooltipWrapper}
              content={
                nuzlockeType === 'SOUL_LINK' ? (
                  <img
                    className={styles.PartnerImage}
                    src={pokemon.partner.sprite}
                    alt={pokemon.partner.name}
                  />
                ) : pokemon.nickname ? (
                  pokemon.nickname
                ) : (
                  pokemon.pokemon.name
                )
              }
              position={Position.TOP}
            >
              <div className={styles.TeamPokemon}>
                <img src={pokemon.pokemon.image} alt={pokemon.pokemon.name} />
              </div>
            </Tooltip>
          ))}
        </div>
      ) : (
        <span>No Pokemons added yet :(</span>
      )}
    </div>
  );
};

export default Team;
