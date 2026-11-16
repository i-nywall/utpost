import { Client, cacheExchange, fetchExchange } from '@urql/vue'

// Relativ adress, som i graphql.ts: nginx (i Docker) eller Vites proxy (i dev)
// skickar /graphql vidare till API:et.
export const client = new Client({
  url: '/graphql',
  exchanges: [cacheExchange, fetchExchange],
})
