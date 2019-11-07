import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { ProgressBar, Tooltip, Position, Button } from '@blueprintjs/core';

import styles from './Nuzlocke.module.css';
import { ADD } from '@blueprintjs/icons/lib/esm/generated/iconNames';
import AddNewPokemon from './AddNewPokemon';

const QUERY_GET_NUZLOCKE = loader('./queryGetNuzlocke.graphql');


const Nuzlocke = () =>
{
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { nuzlockeId } = useParams();

  const { data, loading } = useQuery(QUERY_GET_NUZLOCKE, {
    variables: {
      id: nuzlockeId
    }
  });

  if (loading || !data)
  {
    return <ProgressBar />
  }

  const { nuzlocke } = data;

  return (
    <div className={ styles.Nuzlocke }>
      <div className={ styles.Header }>
        { nuzlocke && <h1>{ nuzlocke.name }</h1> }
        <h2>{ nuzlocke.game.name }</h2>
        <span>{ nuzlocke.type }</span>
      </div>
      { nuzlocke.pokemons.length > 0 ? (
        <div className={ styles.Team }>
          { nuzlocke.pokemons.map((pokemon: any) => (
            <Tooltip
              key={ pokemon._id }
              content={ pokemon.nickname ? pokemon.nickname : pokemon.pokemon.name }
              position={ Position.TOP }
            >
              <div className={ styles.TeamPokemon }>
                <img src={ pokemon.pokemon.image } alt={ pokemon.pokemon.name } />
              </div>
            </Tooltip>
          )) }
        </div>
      ) : <span>No Pokemons added yet :(</span> }
      <Button
        icon={ ADD }
        intent="primary"
        onClick={() => setIsAddModalOpen(true)}
        large
      >
        Add Encounter
      </Button>
      <AddNewPokemon
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        regionId={nuzlocke.game.region.id}
        nuzlocke={nuzlocke}
      />
    </div>
  )
}

export default Nuzlocke
