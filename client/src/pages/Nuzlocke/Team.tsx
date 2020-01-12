import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Position, Tooltip } from '@blueprintjs/core';

import styles from './Nuzlocke.module.css';

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
  selectPokemon: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      pokemon: null;
    }>
  >;
}

const Team = ({ pokemons, nuzlockeType, selectPokemon }: TeamProps) => {
  return (
    <Droppable droppableId='IN_TEAM'>
      {provided => (
        <div
          className={styles.Team}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>Team</h2>
          <div
            className={classNames(styles.TeamGrid, {
              [styles.empty]: pokemons.length < 1
            })}
          >
            {pokemons.length > 0 ? (
              pokemons.map((pokemon: any, index: number) => (
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
                        onClick={() =>
                          selectPokemon({
                            isOpen: true,
                            pokemon
                          })
                        }
                      >
                        <img
                          src={pokemon.pokemon.image}
                          alt={pokemon.pokemon.name}
                        />
                      </div>
                    )}
                  </Draggable>
                </Tooltip>
              ))
            ) : (
              <span>No mons in the team</span>
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Team;
