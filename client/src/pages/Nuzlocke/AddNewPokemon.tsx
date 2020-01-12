import React from 'react';
import { Dialog, Button, Spinner } from '@blueprintjs/core';
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
  gameId: string;
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
  nuzlocke,
  gameId
}: AddNewPokemonProps) => {
  const { data, loading } = useQuery<PokemonDataProps, any>(
    QUERY_ADD_POKEMON_DATA,
    {
      variables: {
        regionId,
        gameId
      },
      skip: !isOpen
    }
  );

  const [updatePokemons, { loading: addLoading }] = useMutation(
    MUTATION_ADD_POKEMON
  );

  if (loading || !data) {
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        className={styles.AddNewPokemon}
        title='Enter Encounter Details'
      >
        <div className={styles.AddNewPokemonContainer}>
          <Spinner />
        </div>
      </Dialog>
    );
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
            nickname: '',
            status: '',
            isLocationCustom: false
          }}
          validationSchema={yup.object().shape({
            pokemon: yup
              .string()
              .required()
              .label('This'),
            status: yup
              .string()
              .required()
              .label('This'),
            location: yup.string().when('isLocationCustom', {
              is: false,
              then: yup
                .string()
                .required()
                .label('This'),
              otherwise: yup.string()
            }),
            customLocation: yup.string().when('isLocationCustom', {
              is: true,
              then: yup
                .string()
                .required()
                .label('This'),
              otherwise: yup.string()
            })
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
                  partner: nuzlocke.type === 'SOUL_LINK' ? values.partner : null
                }
              }
            });

            onClose();
          }}
        >
          {({ values }) => (
            <Form>
              <div className={styles.AddNewPokemonForm}>
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
                      className={styles.CustomLocationInput}
                      label='Enter Location'
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
                      placeholder='Search'
                      options={region.locations.map(location => ({
                        label: location.replace(/-/g, ' '),
                        value: location
                      }))}
                    />
                  )}
                  <Field
                    id='isLocationCustom'
                    className={styles.LocationCheckbox}
                    checkboxLabel='Custom Location'
                    name='isLocationCustom'
                    type='checkbox'
                    component={CustomInput}
                  />
                </div>
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
                {(values.status === 'IN_TEAM' || values.status === 'IN_PC') && (
                  <Field
                    id='nickname'
                    name='nickname'
                    className={styles.NicknameInput}
                    label='Enter Pokemon nickname'
                    component={CustomInput}
                    placeholder='Pebbles'
                  />
                )}
              </div>
              <Button
                className={styles.SubmitButton}
                icon={ADD}
                type='submit'
                loading={addLoading}
              >
                Add
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default AddNewPokemon;
