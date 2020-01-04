import React from 'react';
import { Drawer, Button } from '@blueprintjs/core';
import { Formik, Form, Field } from 'formik';

import CustomInput from '../../components/Formik/CustomInput';
import CustomSelect from '../../components/Formik/CustomSelect';

import styles from './Nuzlocke.module.css';

interface PokemonDrawerProps {
  onClose: () => void;
  isOpen: boolean;
  pokemon: {
    _id: string;
    nickname: string;
    location: string;
    status: string;
    pokemon: {
      _id: number;
      name: string;
      image: string;
    };
  };
}

const PokemonDrawer = ({ pokemon, onClose, isOpen }: PokemonDrawerProps) => {
  if (!pokemon) {
    return null;
  }
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size={Drawer.SIZE_SMALL}
      title='Edit Pokemon'
    >
      <Formik
        initialValues={{
          nickname: pokemon.nickname,
          location: pokemon.location,
          status: pokemon.status
        }}
        onSubmit={() => {}}
      >
        {() => (
          <Form className={styles.EditPokemonForm}>
            <img src={pokemon.pokemon.image} alt='pokemon' />
            <Field
              id='nickname'
              name='nickname'
              label='Nickname'
              component={CustomInput}
            />
            <Field
              id='location'
              name='location'
              label='Location'
              component={CustomInput}
            />
            <Field
              id='status'
              name='status'
              component={CustomSelect}
              label='Status'
              placeholder='Select a Status'
              options={[
                {
                  value: 'IN_TEAM',
                  label: 'in team'
                },
                {
                  value: 'IN_PC',
                  label: 'in pc'
                },
                {
                  value: 'SEEN',
                  label: 'seen'
                },
                {
                  value: 'DEAD',
                  label: 'Dead'
                }
              ]}
            />
            <Button intent='success' large rightIcon='floppy-disk'>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default PokemonDrawer;
