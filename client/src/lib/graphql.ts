type GraphQLResponse<T> = {
  data?: T
  errors?: { message: string }[]
}

export async function graphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL svarade ${response.status}`)
  }

  const result = (await response.json()) as GraphQLResponse<T>

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join(', '))
  }

  if (!result.data) {
    throw new Error('GraphQL returnerade ingen data')
  }

  return result.data
}
