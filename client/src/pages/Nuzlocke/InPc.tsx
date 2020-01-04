import React, { Dispatch, SetStateAction } from 'react';
import { Position, Tooltip } from '@blueprintjs/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import styles from './Nuzlocke.module.css';

interface InPcProps {
  pokemons: {
    _id: string;
    nickname: string;
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

function InPc({ pokemons, selectPokemon }: InPcProps) {
  return (
    <Droppable droppableId='IN_PC'>
      {provided => (
        <div
          className={styles.InPc}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>In PC</h2>
          <div>
            {pokemons.length > 0 ? (
              pokemons.map((pokemon: any, index: number) => (
                <Tooltip
                  key={pokemon._id}
                  content={
                    pokemon.nickname ? pokemon.nickname : pokemon.pokemon.name
                  }
                  position={Position.TOP}
                >
                  <Draggable draggableId={pokemon._id} index={index}>
                    {provided => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={() =>
                          selectPokemon({
                            isOpen: true,
                            pokemon
                          })
                        }
                      >
                        <img
                          src={pokemon.pokemon.sprite}
                          alt={pokemon.pokemon.name}
                        />
                      </div>
                    )}
                  </Draggable>
                </Tooltip>
              ))
            ) : (
              <span>No pokemon in pc</span>
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default InPc;
