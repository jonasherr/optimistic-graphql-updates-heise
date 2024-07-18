import { gql, useMutation, useQuery } from '@apollo/client';

export const starInput = {
  variables: {
    input: {
      starrableId: "MDEwOlJlcG9zaXRvcnk1MjYzMDYxNg=="
    }
  }
}

export const GET_STARS = gql`
  query stars($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      stargazerCount
      __typename
      id
    }
  }
`;

export const ADD_STAR = gql`
  mutation addStar($input: AddStarInput!) {
    addStar(input: $input) {
      starrable {
        stargazerCount
        __typename
        id
      }
    }
  }
`

export const REMOVE_STAR = gql`
  mutation removeStar($input: RemoveStarInput!) {
    removeStar(input: $input) {
      starrable {
        stargazerCount
        __typename
        id
      }
    }
  }
`

export default function Mutation() {
  const { loading, data } = useQuery(GET_STARS, {
    variables: {
      owner: "apollographql",
      name: "apollo-client"
    }
  });
  const stars = data?.repository?.stargazerCount

  const [addStar] = useMutation(ADD_STAR);
  const [removeStar] = useMutation(REMOVE_STAR);

  if (loading) return <p>Loading...</p>

  return (
    <>
      <h1>Mutation</h1>
      <p>Apollo Stars: {stars}</p>
      <div className="card">
        <button onClick={() => addStar(starInput)}>Add Star</button>
        <button onClick={() => removeStar(starInput)}>Remove Star</button>
      </div >
    </>
  )
}
