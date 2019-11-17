import React from 'react';
import { Position, Tooltip } from '@blueprintjs/core';

import styles from './Nuzlocke.module.css';

interface EncountersProps
{
  pokemons: {
    _id: string;
    nickname: string;
    location: string;
    pokemon: {
      _id: number;
      name: string;
      image: string;
    }
  }[];
}

function Encounters ({ pokemons }: EncountersProps)
{
  return (
    <div className={ styles.Encounters }>
      <h2>Encounters</h2>
      <div className={ styles.EncounterList }>
        { pokemons.length > 0 ? (
          pokemons.map((pokemon: any) => (
            <div className={ styles.Encounter }>
              <Tooltip
                key={ pokemon._id }
                content={ pokemon.nickname ? pokemon.nickname : pokemon.pokemon.name }
                position={ Position.TOP }
              >

                <img src={ pokemon.pokemon.sprite } alt={ pokemon.pokemon.name } />
              </Tooltip>
              <span>{ pokemon.location }</span>
            </div>

          ))
        ) : (
            <span>No encounters yet</span>
          ) }
      </div>
    </div>
  )
}

export default Encounters;
