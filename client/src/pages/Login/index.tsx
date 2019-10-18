import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Button } from '@blueprintjs/core'
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

interface LoginResult
{
  login: {
    id: string;
  }
  name: string;
  nuzlockes: {
    game: {
      name: string
    }
  }

}

const Login = () =>
{
  const [login, { loading }] = useMutation<LoginResult, { input: LoginVars }>(MUTATION_LOGIN)
  const history = useHistory();
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
          });

          if (!loading && response.data)
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
            <Field name='email' placeholder='email' component={ CustomInput } />
            <Field name='password' type='password' placeholder='password' component={ CustomInput } />
            <Button loading={ loading } type="submit">Submit</Button>
          </Form>
        ) }
      </Formik>
    </div>
  )
}

export default Login
