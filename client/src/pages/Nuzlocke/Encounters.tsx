import React, { Dispatch, SetStateAction } from 'react';
import { Position, Tooltip } from '@blueprintjs/core';

import styles from './Nuzlocke.module.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface EncountersProps {
  pokemons: {
    _id: string;
    nickname: string;
    location: string;
    pokemon: {
      _id: number;
      name: string;
      image: string;
    };
  }[];
  selectPokemon: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      pokemon: null;
    }>
  >;
}

function Encounters({ pokemons, selectPokemon }: EncountersProps) {
  console.log(pokemons);
  return (
    <Droppable droppableId='SEEN'>
      {provided => (
        <div
          className={styles.Encounters}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>Seen</h2>
          <div className={styles.EncounterList}>
            {pokemons.length > 0 ? (
              pokemons.map((pokemon: any, index: number) => (
                <div key={pokemon._id} className={styles.Encounter}>
                  <Tooltip
                    key={pokemon._id}
                    content={
                      pokemon.nickname ? pokemon.nickname : pokemon.pokemon.name
                    }
                    position={Position.TOP}
                  >
                    <Draggable draggableId={pokemon._id} index={index}>
                      {provided => (
                        <img
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          onClick={() =>
                            selectPokemon({
                              isOpen: true,
                              pokemon
                            })
                          }
                          src={pokemon.pokemon.sprite}
                          alt={pokemon.pokemon.name}
                        />
                      )}
                    </Draggable>
                  </Tooltip>
                  <span>{pokemon.location}</span>
                </div>
              ))
            ) : (
              <span>No encounters yet</span>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Encounters;
