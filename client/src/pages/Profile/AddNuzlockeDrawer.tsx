import React from 'react';
import { Drawer, Button } from '@blueprintjs/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Form, Formik, Field } from 'formik';

import Select from '../../components/Formik/Select';
import CustomInput from '../../components/Formik/CustomInput';

import { PLUS } from '@blueprintjs/icons/lib/esm/generated/iconNames';

import styles from './Profile.module.css';

const QUERY_GET_GAMES = loader('./queryGetGames.graphql');
const QUERY_GET_USER = loader('./queryGetUser.graphql');
const MUTATION_CREATE_NUZLOCKE = loader('./mutationCreateNuzlocke.graphql');

interface AddNuzlockeDrawerProps {
  onClose: () => void;
  isOpen: boolean;
}

const TYPE_OPTIONS = [
  { value: 'NORMAL', label: 'Normal' },
  { value: 'CAGELOCKE', label: 'Cagelocke' },
  { value: 'SOUL_LINK', label: 'Soul Link' }
];

const AddNuzlockeDrawer = ({ onClose, isOpen }: AddNuzlockeDrawerProps) => {
  const { userId } = useParams();

  const { data, loading } = useQuery(QUERY_GET_GAMES);
  const [createNuzlocke, { loading: createLoading }] = useMutation(
    MUTATION_CREATE_NUZLOCKE,
    {
      update(cache, { data: { createNuzlocke } }) {
        const data: any = cache.readQuery({
          query: QUERY_GET_USER,
          variables: {
            userId
          }
        });
        cache.writeQuery({
          query: QUERY_GET_USER,
          data: {
            user: {
              ...data.user,
              nuzlockes: [...data.user.nuzlockes, createNuzlocke]
            }
          }
        });
      }
    }
  );

  if (loading || !data) {
    return null;
  }

  const gameOptions = data.games
    .map((game: any) => ({
      value: game.id,
      label: game.name
    }))
    .sort((a: any, b: any) => a.value - b.value);
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title='Add New Nuzlocke'>
      <Formik
        initialValues={{
          game: '',
          name: '',
          type: ''
        }}
        validationSchema={yup.object().shape({
          game: yup
            .number()
            .nullable()
            .required('You need to choose a game'),
          name: yup.string(),
          type: yup
            .string()
            .nullable()
            .required('You need to choose a type')
        })}
        onSubmit={async ({ game, ...values }) => {
          await createNuzlocke({
            variables: {
              input: {
                ...values,
                game: Number(game),
                user: userId
              }
            }
          });

          onClose();
        }}
      >
        {() => (
          <Form className={styles.AddNuzlockeForm}>
            <Field
              id='game'
              name='game'
              options={gameOptions}
              label='Game'
              placeholder='Select...'
              helperText='Choose what game you will play'
              labelInfo='(required)'
              component={Select}
            />
            <Field
              id='name'
              name='name'
              label='Nuzlocke Title'
              helperText='Custom title for your nuzlocke'
              placeholder='Pokemon Red Randomizer Nuzlocke'
              labelInfo='(optional)'
              component={CustomInput}
            />
            <Field
              id='type'
              name='type'
              label='Nuzlocke Type'
              placeholder='Select...'
              helperText='What type of nuzlocke you will play'
              labelInfo='(required)'
              options={TYPE_OPTIONS}
              component={Select}
            />
            <Button
              icon={PLUS}
              type='submit'
              intent='primary'
              loading={createLoading}
            >
              Create Nuzlocke
            </Button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default AddNuzlockeDrawer;
