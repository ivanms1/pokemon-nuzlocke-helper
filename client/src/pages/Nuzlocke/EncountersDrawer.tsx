import React from 'react';
import { Drawer, Tooltip } from '@blueprintjs/core';

import styles from './Nuzlocke.module.css';

interface EncountersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pokemons: {
    _id: string;
    nickname: string;
    location: string;
    pokemon: {
      _id: number;
      name: string;
      sprite: string;
    };
  }[];
}

const EncountersDrawer = ({
  isOpen,
  onClose,
  pokemons
}: EncountersDrawerProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size={Drawer.SIZE_SMALL}
      title='Encounters'
    >
      <div className={styles.Encounters}>
        {pokemons.map(pok => (
          <div key={pok._id} className={styles.Encounter}>
            <Tooltip
              key={pok._id}
              content={pok.nickname ? pok.nickname : pok.pokemon.name}
              position='top'
            >
              <img
                src={pok.pokemon.sprite}
                alt={pok.nickname || pok.pokemon.name}
              />
            </Tooltip>
            <span>{pok.location}</span>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default EncountersDrawer;
