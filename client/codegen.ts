import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // Schemat läses direkt ur API:ets källkod (strängen märkt /* Graphql */),
  // så codegen fungerar i CI utan att API:et kör.
  schema: '../api/src/graphql/schema.js',
  documents: ['src/**/*.{ts,vue}'],
  ignoreNoDocuments: true, // inga frågor skrivna än – vyerna kommer i #121
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true, // projektet har verbatimModuleSyntax – typer måste importeras med import type
      },
    },
  },
}

export default config
