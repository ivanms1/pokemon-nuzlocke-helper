import React from 'react'
import { FormGroup, InputGroup, Checkbox } from '@blueprintjs/core'
import { FieldProps } from 'formik'

const CustomInput = ({
  form,
  field,
  type = 'text',
  helperText,
  labelInfo,
  label,
  ...props
}
  : {
    form: FieldProps['form'],
    field: FieldProps['field'],
    type: string,
    label: string,
    helperText: string,
    labelInfo: string
  }) =>
{

  const { touched, errors, setFieldValue } = form

  return (
    <FormGroup
      label={ label }
      labelInfo={ labelInfo }
      helperText={ touched[field.name] && errors[field.name] ? errors[field.name] : helperText }
      labelFor={ field.name }
      intent={ touched[field.name] && errors[field.name] ? 'danger' : 'none' }
    >
      {type === "checkbox" && (
        <Checkbox
          checked={field.value}
          onChange={(e: any) => setFieldValue(field.name, e.target.checked)}
        />
      )}
      {(type === 'text' || type === 'search') && (
        <InputGroup
        type={ type }
        value={ field.value }
        id={ field.name }
        onChange={ (e: any) => setFieldValue(field.name, e.target.value) }
        { ...props }
      />
      )}
    </FormGroup>
  )
}

export default CustomInput
