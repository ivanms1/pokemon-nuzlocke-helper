import React from 'react'
import { FormGroup, InputGroup } from '@blueprintjs/core'
import { FieldProps } from 'formik'

const CustomInput = ({ form, field, type, ...props }
  : { form: FieldProps['form'], field: FieldProps['field'], type: string, label: string }) =>
{

  const { touched, errors, setFieldValue } = form

  return (
    <FormGroup
      helperText={ touched[field.name] && errors[field.name] }
      labelFor={ field.name }
      intent='danger'
      { ...props }
    >
      <InputGroup
        type={ type || 'text' }
        value={ field.value }
        id={ field.name }
        onChange={ (e: any) => setFieldValue(field.name, e.target.value) }
        { ...props }
      />
    </FormGroup>
  )
}

export default CustomInput
