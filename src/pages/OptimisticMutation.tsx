import { useMutation, useQuery } from '@apollo/client';
import { ADD_STAR, GET_STARS, REMOVE_STAR, starInput } from './Mutation';

export default function OptimisticMutation() {
  const { loading, data } = useQuery(GET_STARS, {
    variables: {
      owner: "apollographql",
      name: "apollo-client"
    }
  });
  const stars = data?.repository?.stargazerCount

  const [addStar] = useMutation(ADD_STAR, {
    optimisticResponse: {
      addStar: {
        starrable: {
          stargazerCount: stars + 1,
          __typename: "Repository",
          id: starInput.variables.input.starrableId
        }
      }
    },
  });

  const [removeStar] = useMutation(REMOVE_STAR, {
    optimisticResponse: {
      removeStar: {
        starrable: {
          stargazerCount: stars - 1,
          __typename: "Repository",
          id: starInput.variables.input.starrableId
        }
      }
    },
  });

  if (loading) return <p>Loading...</p>

  return (
    <>
      <h1>Optimistic Mutation</h1>
      <p>Apollo Stars: {stars}</p>
      <div className="card">
        <button onClick={() => addStar(starInput)}>Add Star</button>
        <button onClick={() => removeStar(starInput)}>Remove Star</button>
      </div >
    </>
  )
}
