import React from 'react'
import { HTMLSelect, FormGroup } from '@blueprintjs/core'
import classNames from 'classnames'
import { FieldProps } from 'formik'

import styles from './CustomSelect.module.css'

interface CustomSelectProps
{
  id: string;
  options: {
    value: string | number;
    label: string;
  }[]
  isMulti: boolean;
  className: string;
  placeholder: string;
  helperText: string;
  label: string;
  labelInfo: string;
}


const CustomSelect = ({
  id,
  field,
  form,
  options,
  className,
  isMulti,
  placeholder,
  helperText,
  label,
  labelInfo,
  ...props
}:
  CustomSelectProps & { form: FieldProps['form'], field: FieldProps['field'] }) =>
{
  const { touched, errors, setFieldValue } = form

  return (
    <FormGroup
      label={ label }
      labelInfo={ labelInfo }
      labelFor={ id || field.name }
      helperText={ touched[field.name] && errors[field.name] ? errors[field.name] : helperText }
      intent={ touched[field.name] && errors[field.name] ? 'danger' : 'none' }
    >
      <HTMLSelect
        id={ id || field.name }
        className={ classNames(styles.Select, className) }
        name={ field.name }
        value={ field.value }
        onChange={ e => setFieldValue(field.name, e.target.value) }
        { ...props }
      >
        { placeholder && (
          < option value=''>
            { placeholder }
          </option>
        )
        }
        {
          options.map(option => (
            <option key={ option.value } value={ option.value }>
              { option.label }
            </option>
          ))
        }
      </HTMLSelect >
    </FormGroup>

  )
}

export default CustomSelect
