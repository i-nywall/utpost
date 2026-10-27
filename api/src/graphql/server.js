import { getOperationAST } from 'graphql'
import { createSchema, createYoga } from 'graphql-yoga'
import jwt from 'jsonwebtoken'
import { config } from '../config.js'
import { postgresPool } from '../db/postgres.js'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'

const userFrom = (request) => {
  const header = request.headers.get('authorization')
  if (!header) return null
  try {
    return jwt.verify(header.replace('Bearer ', ''), config.jwtSecret)
  } catch {
    return null
  }
}

const logQueryCount = {
  onExecute: ({ args }) => ({
    onExecuteDone: () => {
      const name = getOperationAST(args.document, args.operationName)?.name?.value ?? 'anonym'
      console.log(`graphql ${name}: ${args.contextValue.stats.queries} databasfrågor`)
    },
  }),
}

export const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: '/graphql',
  plugins: [logQueryCount],
  context: ({ request }) => {
    const stats = { queries: 0 }
    return {
      user: userFrom(request),
      stats,
      query: (sql, params) => {
        stats.queries += 1
        return postgresPool.query(sql, params)
      },
    }
  },
})
