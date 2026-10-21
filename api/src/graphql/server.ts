import { createSchema, createYoga } from 'graphql-yoga'
import { typeDefs } from './schema.ts'

export const yoga = createYoga({
  schema: createSchema({ typeDefs }),
})
