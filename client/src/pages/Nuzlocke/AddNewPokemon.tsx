import React from 'react';
import { Dialog, Button } from '@blueprintjs/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';
import { loader } from 'graphql.macro';
import * as yup from 'yup';

import CustomInput from '../../components/Formik/CustomInput';
import CustomSelect from '../../components/Formik/CustomSelect';

import styles from './Nuzlocke.module.css';
import { ADD } from '@blueprintjs/icons/lib/esm/generated/iconNames';

const QUERY_ADD_POKEMON_DATA = loader('./queryAddPokemonData.graphql');
const MUTATION_ADD_POKEMON = loader('./mutationAddPokemon.graphql');

interface AddNewPokemonProps {
  isOpen: boolean;
  onClose: () => void;
  regionId: string;
  nuzlocke: {
    _id: string;
    type: string;
    pokemons: {
      pokemon: {
        _id: string;
      };
      location: string;
      isCaptured: boolean;
    }[];
  };
}

interface PokemonDataProps {
  pokemons: {
    _id: string;
    name: string;
    sprite: string;
  }[];
  region: {
    locations: string[];
  };
}

const AddNewPokemon = ({
  isOpen,
  onClose,
  regionId,
  nuzlocke
}: AddNewPokemonProps) => {
  const { data, loading } = useQuery<PokemonDataProps, any>(
    QUERY_ADD_POKEMON_DATA,
    {
      variables: {
        regionId
      }
    }
  );

  const [updatePokemons, { loading: addLoading }] = useMutation(
    MUTATION_ADD_POKEMON
  );

  if (loading || !data) {
    return null;
  }

  const { pokemons, region } = data;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className={styles.AddNewPokemon}
      title='Enter Encounter Details'
    >
      <div className={styles.AddNewPokemonContainer}>
        <Formik
          initialValues={{
            location: '',
            customLocation: '',
            pokemon: '',
            partner: '',
            isCaptured: false,
            inTeam: false,
            nickname: '',
            isLocationCustom: false
          }}
          validationSchema={yup.object().shape({
            pokemon: yup
              .string()
              .required()
              .label('This')
          })}
          onSubmit={async ({
            isLocationCustom,
            customLocation,
            location,
            ...values
          }) => {
            await updatePokemons({
              variables: {
                id: nuzlocke._id,
                pokemon: {
                  ...values,
                  location: isLocationCustom ? customLocation : location,
                  status: values.isCaptured ? 'ALIVE' : 'SEEN',
                  partner: nuzlocke.type === 'SOUL_LINK' ? values.partner : null
                }
              }
            });

            onClose();
          }}
        >
          {({ values }) => (
            <Form>
              <Field
                id='pokemon'
                name='pokemon'
                label='Select a Pokemon'
                component={CustomSelect}
                initialContent={null}
                placeholder='Search Pokemon'
                options={pokemons.map(pokemon => ({
                  value: pokemon._id,
                  label: pokemon.name,
                  icon: pokemon.sprite
                }))}
              />
              {nuzlocke.type === 'SOUL_LINK' && (
                <Field
                  id='partner'
                  name='partner'
                  label='Select a soulink partner'
                  component={CustomSelect}
                  initialContent={null}
                  placeholder='Search Pokemon'
                  options={pokemons.map(pokemon => ({
                    value: pokemon._id,
                    label: pokemon.name,
                    icon: pokemon.sprite
                  }))}
                />
              )}
              <div className={styles.LocationFields}>
                {values.isLocationCustom ? (
                  <Field
                    id='customLocation'
                    name='customLocation'
                    label='Enter Custom Location'
                    component={CustomInput}
                    placeholder='Input Location'
                  />
                ) : (
                  <Field
                    id='location'
                    name='location'
                    label='Select a Location'
                    component={CustomSelect}
                    initialContent={null}
                    placeholder='Search Location'
                    options={region.locations.map(location => ({
                      label: location.replace(/-/g, ' '),
                      value: location
                    }))}
                  />
                )}
                <Field
                  id='isLocationCustom'
                  label='&nbsp;'
                  className={styles.LocationCheckbox}
                  checkboxLabel='Custom Location'
                  name='isLocationCustom'
                  type='checkbox'
                  component={CustomInput}
                />
              </div>
              <Field
                id='isCaptured'
                name='isCaptured'
                checkboxLabel='pokemon was captured'
                type='checkbox'
                component={CustomInput}
              />
              {values.isCaptured ? (
                <React.Fragment>
                  <Field
                    id='nickname'
                    name='nickname'
                    label='Enter Pokemon nickname'
                    component={CustomInput}
                    placeholder='Pebbles'
                  />
                  <Field
                    id='inTeam'
                    name='inTeam'
                    checkboxLabel='add to team'
                    type='checkbox'
                    component={CustomInput}
                  />
                  <Button type='submit' loading={addLoading}>
                    Add Pokemon
                  </Button>
                </React.Fragment>
              ) : (
                <Button icon={ADD} type='submit' loading={addLoading}>
                  Add Encounter
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default AddNewPokemon;
