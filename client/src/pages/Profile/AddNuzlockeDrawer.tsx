import React from 'react'
import { Drawer } from '@blueprintjs/core'
import { Form, Formik } from 'formik'

interface AddNuzlockeDrawerProps
{
  onClose: () => void;
  isOpen: boolean;
}

const AddNuzlockeDrawer = ({ onClose, isOpen }: AddNuzlockeDrawerProps) =>
{
  return (
    <Drawer
      isOpen={ isOpen }
      onClose={ onClose }
      title="Add New Nuzlocke"
    >
      <Formik
        initialValues={ {
          game: 1,
          name: '',
          type: 'NORMAL'
        } }
        onSubmit={ () => { } }
      >
        { () => (
          <Form>

          </Form>
        ) }
      </Formik>
    </Drawer>
  )
}

export default AddNuzlockeDrawer
