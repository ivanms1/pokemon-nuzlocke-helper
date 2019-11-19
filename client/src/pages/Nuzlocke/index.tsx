import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { ProgressBar, Button } from '@blueprintjs/core';
import { ADD } from '@blueprintjs/icons/lib/esm/generated/iconNames';

import AddNewPokemon from './AddNewPokemon';
import Team from './Team';
import InPc from './InPc';
import Dead from './Dead';

import styles from './Nuzlocke.module.css';
import Encounters from './Encounters';

const QUERY_GET_NUZLOCKE = loader('./queryGetNuzlocke.graphql');

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

  if (loading || !data) {
    return <ProgressBar />;
  }

  const { nuzlocke } = data;

  const team = nuzlocke.pokemons.filter(
    (pok: { inTeam: boolean }) => pok.inTeam
  );
  const inPc = nuzlocke.pokemons.filter(
    (pok: { inTeam: boolean; status: string }) =>
      !pok.inTeam && pok.status !== 'DEAD'
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
        <Team pokemons={team} />
        <InPc pokemons={inPc} />
        <Dead pokemons={deadMons} />
        <Encounters pokemons={nuzlocke.pokemons} />
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
