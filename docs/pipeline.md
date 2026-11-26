# Pipeline

```mermaid
flowchart LR
  B[branch + commit] --> PR[pull request]
  PR --> Q[Check: typecheck · lint · format · test - 1m 28s]
  PR --> BU[Build - 1m 15s]
  PR --> I[Integration<br/>postgres + mongo som services · seed · migrate:logs · test:api - 1m 21s]
  Q --> S{passes?}
  BU --> S
  I --> S
  S -->|Yes| M[merge]
  S -->|No| F[fix, push again]
```

## Vad som körs, och varför

| Jobb               | Vad                                                      | Fångar                                                                                                                                       | Tar (PR #135)                                                                       |
| ------------------ | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `checks`           | typecheck, lint, format:check, klientens tester          | typfel, stil, vyer som visar fel                                                                                                             | 1 min 28 s                                                                          |
| `build`            | `npm run build`                                          | klienten som inte går att bygga                                                                                                              | 1 min 15 s                                                                          |
| `integration` (M5) | `npm run test:api` mot Postgres och Mongo som _services_ | resolvers som inte stämmer med databasen, N+1 som kommit tillbaka, mutationer utan inloggningskrav – det klientens mockade tester aldrig ser | 1 min 21 s (start av databaserna 23 s, npm ci 41 s, själva testerna några sekunder) |
| `image`            | bygger api- och client-imagen, publicerar i GHCR på main | Dockerfiler som inte går att bygga                                                                                                           | 2 min 2 s (väntar på checks och build)                                              |

`checks`, `build` och `integration` körs parallellt, så integrationstesterna gör inte pipelinen märkbart längre. Det mesta av tiden i varje jobb är `npm ci` (ca 40–60 s).

## Branch protection

- Kräver status checks **checks**, **build** och **integration** gröna innan merge

## Vanliga fel

- **integration rött men testerna gröna lokalt:** databasen i jobbet är tom tills `npm run seed` körts, och `Tour.logs` läser Mongo – `npm run migrate:logs` måste också ha körts. Portarna är `5432`/`27017` på `localhost` i jobbet, inte `5433` som i compose. Variabeln heter `POSTGRES_URL` (som i `api/src/config.js`), inte `DATABASE_URL`.
