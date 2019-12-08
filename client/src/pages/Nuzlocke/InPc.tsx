import React from 'react';
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
}

function InPc({ pokemons }: InPcProps) {
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
