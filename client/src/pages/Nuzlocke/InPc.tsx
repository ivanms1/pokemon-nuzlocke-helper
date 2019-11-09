import React from 'react';
import { Position, Tooltip } from '@blueprintjs/core';

import styles from './Nuzlocke.module.css';

interface InPcProps
{
  pokemons: {
    _id: string;
    nickname: string;
    pokemon: {
      _id: number;
      name: string;
      image: string;
    }
  }[];
}


function InPc ({ pokemons }: InPcProps)
{
  return (
    <div className={ styles.InPc }>
      <h2>In PC</h2>
      <div>
        { pokemons.length > 0 ? (
          pokemons.map((pokemon: any) => (
            <Tooltip
              key={ pokemon._id }
              content={ pokemon.nickname ? pokemon.nickname : pokemon.pokemon.name }
              position={ Position.TOP }
            >
              <div>
                <img src={ pokemon.pokemon.sprite } alt={ pokemon.pokemon.name } />
              </div>
            </Tooltip>
          ))

        ) : (
            <span>No pokemon in pc</span>
          ) }
      </div>
    </div>
  )
}

export default InPc;
