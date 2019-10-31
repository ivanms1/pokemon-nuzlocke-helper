import React from 'react';
import { Dialog } from '@blueprintjs/core';
import { useQuery } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';
import { loader } from 'graphql.macro';

import CustomInput from '../../components/Formik/CustomInput';
import CustomSelect from '../../components/Formik/CustomSelect';

import styles from './Nuzlocke.module.css';

const QUERY_ADD_POKEMON_DATA = loader('./queryAddPokemonData.graphql');


interface AddNewPokemonProps
{
  isOpen: boolean;
  onClose: () => void;
  regionId: string;
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
  }

}

const AddNewPokemon = ({ isOpen, onClose, regionId }: AddNewPokemonProps) =>
{
  const { data, loading } = useQuery<PokemonDataProps, any>(QUERY_ADD_POKEMON_DATA, {
    variables: {
      regionId
    }
  });

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
            nickname: '',
            isLocationCustom: false
          } }
          onSubmit={ () => { } }
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
              <div>
                { values.isLocationCustom ? (
                  <Field
                    id="customLocation"
                    name="customLocation"
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
                  ) }

                <Field
                  id="isLocationCustom"
                  name="isLocationCustom"
                  label="Enter static or custom location"
                  type="checkbox"
                  component={ CustomInput }
                />
              </div>


              <Field
                id="isCaptured"
                name="isCaptured"
                label="Check box if pokemon was captured"
                type="checkbox"
                component={ CustomInput }
              />
            </Form>
          ) }
        </Formik>
      </div>
    </Dialog>
  )
}

export default AddNewPokemon;
;