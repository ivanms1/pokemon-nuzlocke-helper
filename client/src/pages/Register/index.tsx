import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { Link, useHistory } from 'react-router-dom';
import { Button, Intent, Toaster, Toast } from '@blueprintjs/core';
import { loader } from 'graphql.macro';
import * as yup from 'yup';

import CustomInput from '../../components/Formik/CustomInput';

import styles from './Register.module.css';

const MUTATION_SIGNUP = loader('./mutationSignUp.graphql');

const Register = () => {
  const [alert, setAlert] = useState(false);
  const [signUp, { loading }] = useMutation(MUTATION_SIGNUP);

  const history = useHistory();

  const emailIcon = (
    <Button icon='envelope' intent={Intent.WARNING} minimal={true} />
  );

  const personIcon = (
    <Button icon='user' intent={Intent.WARNING} minimal={true} />
  );
  return (
    <div className={styles.Register}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          repeatPassword: ''
        }}
        validationSchema={yup.object().shape({
          name: yup
            .string()
            .required()
            .label('This'),
          email: yup
            .string()
            .email()
            .required()
            .label('This'),
          password: yup
            .string()
            .required()
            .label('This'),
          repeatPassword: yup
            .string()
            .required()
            .test('passwords-match', 'Passwords should match', function(value) {
              return this.parent.password === value;
            })
            .label('This')
        })}
        onSubmit={async ({ repeatPassword, ...values }) => {
          const response = await signUp({
            variables: {
              input: values
            }
          }).catch(err => setAlert(true));

          if (response) {
            history.push(`/profile/${response.data.signUp.userId}`);
          }
        }}
      >
        {() => (
          <Form className={styles.RegisterForm}>
            <h1>Register</h1>
            <Field
              name='name'
              component={CustomInput}
              rightElement={personIcon}
              placeholder='pokemon trainer name'
            />
            <Field
              name='email'
              component={CustomInput}
              rightElement={emailIcon}
              rigth
              placeholder='email'
            />
            <Field
              name='password'
              type='password'
              placeholder='password'
              component={CustomInput}
            />
            <Field
              name='repeatPassword'
              type='password'
              placeholder='confirm password'
              component={CustomInput}
            />
            <Button
              type='submit'
              rightIcon='arrow-right'
              fill
              loading={loading}
            >
              Sign Up
            </Button>
            {alert && (
              <Toaster position='top'>
                <Toast
                  intent='danger'
                  message='An error has occurred'
                  onDismiss={() => setAlert(false)}
                />
              </Toaster>
            )}
          </Form>
        )}
      </Formik>
      <Link to='/login'>Already have an account?</Link>
    </div>
  );
};

export default Register;
