import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useHistory, Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Button, Intent, Toaster, Toast } from '@blueprintjs/core'
import { loader } from 'graphql.macro';
import * as yup from 'yup'

import CustomInput from '../../components/Formik/CustomInput'

import styles from './Login.module.css'

const MUTATION_LOGIN = loader('./mutationLogin.graphql')

interface LoginVars
{
  email: string;
  password: string;
}

const Login = () =>
{
  const [alert, setAlert] = useState(false);

  const [login, { loading }] = useMutation(MUTATION_LOGIN, {
    errorPolicy: 'all'
  })
  const history = useHistory();

  const emailIcon = (
    <Button
      icon="envelope"
      intent={ Intent.WARNING }
      minimal={ true }
    />
  );

  return (
    <div className={ styles.LoginPage }>
      <Formik
        initialValues={ {
          email: '',
          password: ''
        } }
        validationSchema={ yup.object().shape({
          email: yup.string().required().label('this'),
          password: yup.string().required().label('this')
        }) }
        onSubmit={ async values =>
        {
          const response = await login({
            variables: {
              input: values
            }
          }).catch(err => setAlert(true));

          if (response)
          {
            history.push(`/profile/${response.data.login.id}`)
          }
        } }
      >
        { () => (
          <Form
            className={ styles.LoginForm }
          >
            <h1>Login</h1>
            <Field
              name='email'
              placeholder='email'
              rightElement={ emailIcon }
              component={ CustomInput }
            />
            <Field
              name='password'
              type='password'
              placeholder='password'
              component={ CustomInput }
            />
            <Button loading={ loading } type="submit">Submit</Button>
          </Form>
        ) }
      </Formik>
      { alert && (
        <Toaster position='top'>
          <Toast intent="danger" message="An error has occurred" onDismiss={ () => setAlert(false) } />
        </Toaster>
      ) }
      <Link to="/register">Don't have an account?</Link>
    </div>
  )
}

export default Login
