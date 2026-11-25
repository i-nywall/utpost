import { getOperationAST } from 'graphql'
import { createSchema, createYoga } from 'graphql-yoga'
import jwt from 'jsonwebtoken'
import { config } from '../config.js'
import { postgresPool } from '../db/postgres.js'
import { mongo, mongoDB } from '../db/mongo.js'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'
import { createLoaders } from './loaders.js'

const userFrom = (request) => {
  const header = request.headers.get('authorization')
  if (!header) return null
  try {
    return jwt.verify(header.replace('Bearer ', ''), config.jwtSecret)
  } catch {
    return null
  }
}

const countQueries = {
  onExecute: ({ args }) => ({
    onExecuteDone: ({ result, setResult }) => {
      if (Symbol.asyncIterator in result) return
      const name = getOperationAST(args.document, args.operationName)?.name?.value ?? 'anonym'
      const n = args.contextValue.stats.queries
      console.log(`graphql ${name}: ${n} databasfrågor`)
      setResult({ ...result, extensions: { ...result.extensions, databasfragor: n } })
    },
  }),
}

export const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: '/graphql',
  plugins: [countQueries],
  context: ({ request }) => {
    const stats = { queries: 0 }
    const query = (sql, params) => {
      stats.queries += 1
      return postgresPool.query(sql, params)
    }
    const mongoFind = async (collection, filter, projection) => {
      stats.queries += 1
      await mongo.connect()
      return mongoDB().collection(collection).find(filter, { projection }).toArray()
    }
    return {
      user: userFrom(request),
      stats,
      query,
      mongoFind,
      loaders: createLoaders({ query, mongoFind }),
    }
  },
})
