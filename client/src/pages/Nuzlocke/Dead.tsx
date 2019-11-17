import React from 'react';
import { Position, Tooltip } from '@blueprintjs/core';

interface DeadProps
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

function Dead ({ pokemons }: DeadProps)
{
  return (
    <div>
      <h2>RIP</h2>
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
            <span>Impressive, no dead mons</span>
          ) }
      </div>
    </div>
  )
}

export default Dead;
