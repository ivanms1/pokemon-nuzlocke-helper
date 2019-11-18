import React from 'react';

import styles from './Profile.module.css';
import { Tooltip, Position } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

interface NuzlockePreviewProps {
  nuzlocke: {
    _id: string;
    name: string;
    game: {
      name: string;
    };
    pokemons: {
      _id: number;
      inTeam: boolean;
      nickname: string;
      pokemon: {
        _id: string;
        name: string;
        sprite: string;
      };
    }[];
  };
}

const NuzlockePreview = ({ nuzlocke }: NuzlockePreviewProps) => {
  const team = nuzlocke.pokemons.filter(pok => pok.inTeam);
  console.log(team);
  return (
    <Link to={`/nuzlocke/${nuzlocke._id}`}>
      <div className={styles.NuzlockePreview}>
        {nuzlocke.name && <h4>{nuzlocke.name}</h4>}
        <span>Pokemon {nuzlocke.game.name}</span>
        <div className={styles.TeamSprites}>
          {team.length > 0 ? (
            team.map(pokemon => (
              <Tooltip
                key={pokemon.pokemon._id}
                content={pokemon.nickname || pokemon.pokemon.name}
                position={Position.TOP}
              >
                <img
                  src={pokemon.pokemon.sprite}
                  alt={`${pokemon.pokemon.name}`}
                />
              </Tooltip>
            ))
          ) : (
            <span>Click here to add pokemons to your team</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NuzlockePreview;
