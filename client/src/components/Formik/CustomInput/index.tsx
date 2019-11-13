import React, { useState } from 'react'
import { FormGroup, InputGroup, Checkbox, Button, Intent } from '@blueprintjs/core'
import { FieldProps } from 'formik'

const CustomInput = ({
  form,
  field,
  type = 'text',
  helperText,
  labelInfo,
  label,
  className,
  checkboxLabel,
  ...props
}
  : {
    form: FieldProps['form'],
    field: FieldProps['field'],
    type: string,
    label: string,
    helperText: string,
    labelInfo: string,
    className: string,
    checkboxLabel: string;
  }) =>
{
  const [showPassword, setShowPassword] = useState(false);

  const { touched, errors, setFieldValue } = form;

  const lockIcon = (
    <Button
      icon={ showPassword ? "unlock" : "lock" }
      intent={ Intent.WARNING }
      minimal={ true }
      onClick={ () => setShowPassword(!showPassword) }
    />
  );

  return (
    <FormGroup
      label={ label }
      className={ className }
      labelInfo={ labelInfo }
      helperText={ touched[field.name] && errors[field.name] ? errors[field.name] : helperText }
      labelFor={ field.name }
      intent={ touched[field.name] && errors[field.name] ? 'danger' : 'none' }
    >
      { type === "checkbox" ? (
        <Checkbox
          checked={ field.value }
          className={ className }
          label={ checkboxLabel }
          onChange={ (e: any) => setFieldValue(field.name, e.target.checked) }
        />
      ) : type === 'password' ? (
        <InputGroup
          type={ showPassword ? 'text' : 'password' }
          value={ field.value }
          rightElement={lockIcon}
          id={ field.name }
          onChange={ (e: any) => setFieldValue(field.name, e.target.value) }
          { ...props }
        />
      ) : (
            <InputGroup
              type={ type }
              value={ field.value }
              id={ field.name }
              onChange={ (e: any) => setFieldValue(field.name, e.target.value) }
              { ...props }
            />
          ) }

    </FormGroup>
  )
}

export default CustomInput
