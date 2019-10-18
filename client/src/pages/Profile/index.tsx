import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro';
import { Button, ProgressBar } from '@blueprintjs/core'

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
          id: number;
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
    <div>
      <h1>Welcome { user.name }</h1>
      <div>
        <h3>My Nuzlockes</h3>
        <div>
          { user.nuzlockes.length > 0 ?
            user.nuzlockes.map(nuzlocke => (
              <div key={ nuzlocke._id }>
                <span>{ nuzlocke.game.name }</span>
                <div>
                  { nuzlocke.team.map(pokemon => (
                    <div key={ pokemon.pokemon.id }>
                      <span>{ pokemon.pokemon.name }</span>
                      <img src={ pokemon.pokemon.sprite } alt={ `${pokemon.pokemon.name}` } />
                    </div>
                  )) }
                </div>
              </div>
            )) : <span>You don't have any nuzlockes yet</span> }
        </div>
      </div>
      <Button>
        Add new Nuzlocke
      </Button>
    </div>
  )
}

export default Profile
