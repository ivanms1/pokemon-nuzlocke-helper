import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro';
import { Button, ProgressBar } from '@blueprintjs/core'

const QUERY_GET_USER = loader('./queryGetUser.graphql')


const Profile = () =>
{
  const { userId } = useParams()
  const { data, loading } = useQuery(QUERY_GET_USER, {
    variables: {
      userId
    }
  })
  return (
    <div>
      { loading ? <ProgressBar /> : (
        <React.Fragment>
          <h1>Welcome { data.user.name }</h1>
          <div>
            <h3>My Nuzlockes</h3>

          </div>
          <Button>
            Add new Nuzlocke
      </Button>
        </React.Fragment>

      ) }

    </div>
  )
}

export default Profile
