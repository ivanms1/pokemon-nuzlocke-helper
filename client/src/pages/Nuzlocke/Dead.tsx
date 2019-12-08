import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Position, Tooltip } from '@blueprintjs/core';

interface DeadProps {
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

function Dead({ pokemons }: DeadProps) {
  return (
    <Droppable droppableId='DEAD'>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <h2>RIP</h2>
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
              <span>Impressive, no dead mons</span>
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Dead;
