import React from 'react';
import { Dialog, Button } from '@blueprintjs/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';
import { loader } from 'graphql.macro';

import CustomInput from '../../components/Formik/CustomInput';
import CustomSelect from '../../components/Formik/CustomSelect';

import styles from './Nuzlocke.module.css';
import { ADD } from '@blueprintjs/icons/lib/esm/generated/iconNames';

const QUERY_ADD_POKEMON_DATA = loader('./queryAddPokemonData.graphql');
const MUTATION_ADD_POKEMON = loader('./mutationAddPokemon.graphql');

interface AddNewPokemonProps
{
  isOpen: boolean;
  onClose: () => void;
  regionId: string;
  nuzlocke: {
    _id: string;
    encounters: {
      pokemon: {
        _id: string;
      };
      location: string;
      isCaptured: boolean;
    }[]
  };
}

interface PokemonDataProps
{
  pokemons: {
    _id: string;
    name: string;
    sprite: string;
  }[];
  region: {
    locations: string[];
  };

}

const AddNewPokemon = ({ isOpen, onClose, regionId, nuzlocke }: AddNewPokemonProps) =>
{
  const { data, loading } = useQuery<PokemonDataProps, any>(QUERY_ADD_POKEMON_DATA, {
    variables: {
      regionId
    }
  });

  const [updatePokemons, { loading: addLoading }] = useMutation(MUTATION_ADD_POKEMON);

  if (loading || !data)
  {
    return null
  }

  const { pokemons, region } = data;



  return (
    <Dialog
      isOpen={ isOpen }
      onClose={ onClose }
      className={ styles.AddNewPokemon }
      title="Enter Encounter Details"
    >
      <div
        className={ styles.AddNewPokemonContainer }
      >
        <Formik
          initialValues={ {
            location: '',
            customLocation: '',
            pokemon: '',
            isCaptured: false,
            inTeam: true,
            nickname: '',
            isLocationCustom: false
          } }
          onSubmit={ async ({ isLocationCustom, customLocation, location, ...values }) =>
          {

            await updatePokemons({
              variables: {
                id: nuzlocke._id,
                pokemon: {
                  ...values,
                  location: isLocationCustom ? customLocation : location,
                  status: values.isCaptured ? 'ALIVE' : 'SEEN'
                }
              }
            })

            onClose()
          } }
        >
          { ({ values }) => (
            <Form>
              <Field
                id="pokemon"
                name="pokemon"
                label="Select a Pokemon"
                component={ CustomSelect }
                initialContent={ null }
                placeholder="Search Pokemon"
                options={ pokemons.map(pokemon => ({
                  value: pokemon._id,
                  label: pokemon.name,
                  icon: pokemon.sprite
                })) }
              />
              <div className={ styles.LocationFields }>
                { values.isLocationCustom ? (
                  <Field
                    id="customLocation"
                    name="customLocation"
                    label="Enter Custom Location"
                    component={ CustomInput }
                    placeholder="Input Location"
                  />

                ) : (
                    <Field
                      id="location"
                      name="location"
                      label="Select a Location"
                      component={ CustomSelect }
                      initialContent={ null }
                      placeholder="Search Location"
                      options={ region.locations.map(location => ({
                        label: location.replace(/-/g, ' '),
                        value: location
                      })) }
                    />
                  )
                }
                <Field
                  id="isLocationCustom"
                  label="&nbsp;"
                  className={ styles.LocationCheckbox }
                  checkboxLabel="Custom Location"
                  name="isLocationCustom"
                  type="checkbox"
                  component={ CustomInput }
                />
              </div>
              <Field
                id="isCaptured"
                name="isCaptured"
                checkboxLabel="pokemon was captured"
                type="checkbox"
                component={ CustomInput }
              />
              { values.isCaptured ? (
                <React.Fragment>
                  <Field
                    id="nickname"
                    name="nickname"
                    label="Enter Pokemon nickname"
                    component={ CustomInput }
                    placeholder="Pebbles"
                  />
                  <Button
                    type="submit"
                    loading={ addLoading }
                  >
                    Add Pokemon
                </Button>
                </React.Fragment>
              ) : (
                  <Button
                    icon={ ADD }
                    type="submit"
                    loading={ addLoading }
                  >
                    Add Encounter
                </Button>
                ) }
            </Form>
          ) }
        </Formik>
      </div>
    </Dialog>
  )
}

export default AddNewPokemon;
;