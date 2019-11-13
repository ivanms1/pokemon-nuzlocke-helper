import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';

import CustomInput from '../../components/Formik/CustomInput';

import styles from './Register.module.css';

const Register = () => {
  const emailIcon = (
    <Button
      icon="envelope"
      intent={ Intent.WARNING }
      minimal={ true }
    />
  );

  const personIcon = (
    <Button
      icon="user"
      intent={ Intent.WARNING }
      minimal={ true }
    />
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
        onSubmit={() => {}}
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
              placeholder='name'
            />
            <Field
              name='password'
              type='password'
              placeholder='password'
              component={ CustomInput }
            />
            <Field
              name='repeatPassword'
              type='password'
              placeholder='confirm password'
              component={ CustomInput }
            />
          </Form>
        )}
      </Formik>
      <Link to="/login">Already have an account?</Link>
    </div>
  )
}

export default Register;
