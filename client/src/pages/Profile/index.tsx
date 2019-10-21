import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { Button, ProgressBar } from '@blueprintjs/core'

import NuzlockePreview from './NuzlockePreview';
import AddNuzlockeDrawer from './AddNuzlockeDrawer';

import { ADD } from '@blueprintjs/icons/lib/esm/generated/iconNames';

import styles from './Profile.module.css'

const QUERY_GET_USER = loader('./queryGetUser.graphql')

interface GetUserData
{
  user: {
    id: string;
    name: string;
    nuzlockes: {
      _id: string;
      type: string;
      name: string;
      game: {
        name: string;
      }
      team: {
        pokemon: {
          _id: number;
          name: string;
          sprite: string;
        };
        status: string;
        nickname: string;
      }[];
      score: number;
      deaths: number;
    }[];
  }

}

interface GetUserVars
{
  userId: string | undefined;
}

const Profile = () =>
{
  const [isNewNuzlockeOpen, setIsNewNuzlockeOpen] = useState(false)
  const { userId } = useParams()
  const { loading, data } = useQuery<GetUserData, GetUserVars>(QUERY_GET_USER, {
    variables: {
      userId
    }
  })

  if (loading || !data)
  {
    return <ProgressBar />
  }
  const { user } = data
  return (
    <div className={ styles.Profile }>
      <h1>Welcome { user.name }</h1>
      <h3>My Nuzlockes</h3>
      <div className={ styles.MyNuzlockes }>
        { user.nuzlockes.length > 0 ?
          user.nuzlockes.map(nuzlocke => (
            <NuzlockePreview key={ nuzlocke._id } nuzlocke={ nuzlocke } />
          )) : <span>You don't have any nuzlockes yet</span> }
      </div>
      <Button
        onClick={ () => setIsNewNuzlockeOpen(true) }
        className={ styles.AddButton }
        large
        icon={ ADD }
      >
        Add New Nuzlocke
      </Button>
      <AddNuzlockeDrawer
        isOpen={ isNewNuzlockeOpen }
        onClose={ () => setIsNewNuzlockeOpen(false) }
      />
    </div>
  )
}

export default Profile
