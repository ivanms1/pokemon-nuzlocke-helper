import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ProgressBar, Button } from '@blueprintjs/core';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { ADD } from '@blueprintjs/icons/lib/esm/generated/iconNames';

import AddNewPokemon from './AddNewPokemon';
import Team from './Team';
import InPc from './InPc';
import Dead from './Dead';

import styles from './Nuzlocke.module.css';
import Encounters from './Encounters';

const QUERY_GET_NUZLOCKE = loader('./queryGetNuzlocke.graphql');
const MUTATION_UPDATE_POKEMON_STATUS = loader(
  './mutationUpdatePokemonStatus.graphql'
);

const getType = (type: string) => {
  switch (type) {
    case 'NORMAL':
      return 'Normal';
    case 'CAGELOCKE':
      return 'Cagelocke';
    case 'SOUL_LINK':
      return 'Soul Link';
    default:
      return null;
  }
};

const Nuzlocke = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { nuzlockeId } = useParams();

  const { data, loading } = useQuery(QUERY_GET_NUZLOCKE, {
    variables: {
      id: nuzlockeId
    }
  });

  const [updatePokemonStatus] = useMutation(MUTATION_UPDATE_POKEMON_STATUS);

  if (loading || !data) {
    return <ProgressBar />;
  }

  const { nuzlocke } = data;

  const onDragEnd: OnDragEndResponder = async result => {
    const { draggableId, destination } = result;

    if (!draggableId || !destination) {
      return;
    }

    const {
      pokemon,
      partner,
      _id,
      status,
      __typename,
      ...pokemonToUpdate
    } = nuzlocke.pokemons.find((pokemon: any) => pokemon._id === draggableId);

    await updatePokemonStatus({
      variables: {
        id: nuzlocke._id,
        pokemon: {
          id: _id,
          pokemon: pokemon._id,
          partner: partner ? partner._id : null,
          status: destination.droppableId,
          ...pokemonToUpdate
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updatePokemon: {
          ...nuzlocke,
          pokemons: [
            ...nuzlocke.pokemons.filter(
              (pok: { _id: string }) => pok._id !== _id
            ),
            {
              _id,
              pokemon,
              partner,
              __typename,
              status: destination.droppableId,
              ...pokemonToUpdate
            }
          ]
        }
      }
    });
  };

  const team = nuzlocke.pokemons.filter(
    (pok: { status: string }) => pok.status === 'IN_TEAM'
  );
  const inPc = nuzlocke.pokemons.filter(
    (pok: { status: string }) => pok.status === 'IN_PC'
  );
  const deadMons = nuzlocke.pokemons.filter(
    (pok: { status: string }) => pok.status === 'DEAD'
  );

  return (
    <div className={styles.Nuzlocke}>
      <div className={styles.Header}>
        {nuzlocke && <h1>{nuzlocke.name}</h1>}
        <h2>{nuzlocke.game.name}</h2>
        <span>{getType(nuzlocke.type)}</span>
      </div>
      <div className={styles.Pokemons}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Team pokemons={team} nuzlockeType={nuzlocke.type} />
          <InPc pokemons={inPc} />
          <Dead pokemons={deadMons} />
          <Encounters pokemons={nuzlocke.pokemons} />
        </DragDropContext>
      </div>
      <Button
        icon={ADD}
        intent='primary'
        onClick={() => setIsAddModalOpen(true)}
        large
      >
        Add Pokemon
      </Button>
      <AddNewPokemon
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        regionId={nuzlocke.game.region.id}
        nuzlocke={nuzlocke}
      />
    </div>
  );
};

export default Nuzlocke;
