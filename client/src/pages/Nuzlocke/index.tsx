import React from 'react';
import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { ProgressBar } from '@blueprintjs/core';

import styles from './Nuzlocke.module.css';

const QUERY_GET_NUZLOCKE = loader('./queryGetNuzlocke.graphql');


const Nuzlocke = () =>
{
  const { nuzlockeId } = useParams()

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
  console.log(data)

  return (
    <div className={ styles.Nuzlocke }>
      <div className={ styles.Header }>
        { nuzlocke && <h1>{ nuzlocke.name }</h1> }
        <h2>{ nuzlocke.game.name }</h2>
        <span>{ nuzlocke.type }</span>
        { nuzlocke.team.length > 0 ? (
          <div className={ styles.Team }>
            { nuzlocke.team.map((pokemon: any) => (
              <div key={ pokemon._id }>
                <img src={ pokemon.pokemon.image } alt={ pokemon.pokemon.name } />
              </div>
            )) }
          </div>
        ) : <span>No Pokemons added yet :(</span> }
      </div>
    </div>
  )
}

export default Nuzlocke
