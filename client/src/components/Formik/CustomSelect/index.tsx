import React from 'react';
import { Button, MenuItem, FormGroup } from "@blueprintjs/core";
import { Select, ItemRenderer, ItemPredicate } from "@blueprintjs/select";
import { FieldProps } from 'formik';

import styles from './CustomSelect.module.css';

const BlueprintSelect = Select.ofType<any>();

interface CustomSelectProps
{
  id: string | number;
  options: {
    value: string,
    label: string
  }[];
  className?: string;
  label?: string;
  labelInfo?: string;
  helperText: string;
  placeholder: string;
}
const CustomSelect = ({
  id,
  field,
  form,
  options,
  className,
  label,
  helperText,
  labelInfo,
  placeholder,
  ...props
}: CustomSelectProps & { form: FieldProps['form'], field: FieldProps['field'] }) =>
{
  const filterItems: ItemPredicate<any> = (query, item) =>
  {
    return item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  };

  const { touched, errors, setFieldValue } = form;

  const renderItems: ItemRenderer<any> = (item: any, { handleClick, modifiers }) => (
    <MenuItem
      key={ item.value }
      icon={ item.icon && <img className={ styles.ItemIcon } src={ item.icon } alt={ item.name } /> }
      active={ modifiers.active }
      label={ item.label }
      onClick={ handleClick }
      text={ item.query }
    />
  )


  const currentItem = options.find(opt => opt.value === field.value);

  return (
    <FormGroup
      label={ label }
      labelInfo={ labelInfo }
      labelFor={ field.name }
      helperText={ touched[field.name] && errors[field.name] ? errors[field.name] : helperText }
      intent={ touched[field.name] && errors[field.name] ? 'danger' : 'none' }
    >
      <BlueprintSelect
        items={ options }
        itemPredicate={ filterItems }
        itemRenderer={ renderItems }
        noResults={ <MenuItem disabled={ true } text="No results." /> }
        activeItem={ currentItem }
        onItemSelect={ item => setFieldValue(field.name, item.value) }
        { ...props }
      >
        <Button text={ currentItem ? currentItem.label : placeholder } rightIcon="double-caret-vertical" />
      </BlueprintSelect>
    </FormGroup>

  )
}

export default CustomSelect;
