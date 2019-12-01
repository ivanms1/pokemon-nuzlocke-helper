import React from 'react';
import { Position, Tooltip } from '@blueprintjs/core';

import styles from './Nuzlocke.module.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface TeamProps {
  pokemons: {
    _id: string;
    nickname: string;
    pokemon: {
      _id: number;
      name: string;
      image: string;
    };
  }[];
  nuzlockeType: string;
}

const Team = ({ pokemons, nuzlockeType }: TeamProps) => {
  return (
    <Droppable droppableId='team'>
      {provided => (
        <div
          className={styles.Team}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>Team</h2>
          {pokemons.length > 0 ? (
            <div className={styles.TeamGrid}>
              {pokemons.map((pokemon: any, index: number) => (
                <Tooltip
                  key={pokemon._id}
                  className={styles.TooltipWrapper}
                  content={
                    nuzlockeType === 'SOUL_LINK' ? (
                      <img
                        className={styles.PartnerImage}
                        src={pokemon.partner.sprite}
                        alt={pokemon.partner.name}
                      />
                    ) : pokemon.nickname ? (
                      pokemon.nickname
                    ) : (
                      pokemon.pokemon.name
                    )
                  }
                  position={Position.TOP}
                >
                  <Draggable draggableId={pokemon._id} index={index}>
                    {provided => (
                      <div
                        className={styles.TeamPokemon}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <img
                          src={pokemon.pokemon.image}
                          alt={pokemon.pokemon.name}
                        />
                      </div>
                    )}
                  </Draggable>
                </Tooltip>
              ))}
            </div>
          ) : (
            <span>No Pokemons added yet :(</span>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Team;
