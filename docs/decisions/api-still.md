# Beslutsdokument: API-stil

**Datum:** 2026-10-30
**Beslut:** GraphQL kompletterar REST och ersätter det inte helt. GraphQL används för läsningar där klienten behöver kunna välja exakt vilka fält som hämtas. REST behålls för befintliga endpoints och funktioner som inloggning, bilduppladdning och hälsokontroll.

## Bakgrund

Vi jämförde REST och GraphQL i den aktiva Vue-klienten på `http://localhost:3001`, med API:et på port 4000. React-klienten på port 3000 är en äldre version och används inte för den här mätningen.

På startsidan görs följande anrop:

- REST: `guides`, `regions` och `latest`.
- GraphQL: `PopularGuides`.

På turlistan görs ett REST-anrop: `tours`. Inget GraphQL-anrop görs från den vyn i den nuvarande implementationen.

Mätningen gjordes i webbläsarens Network-flik med cache avstängd. Storlekarna är värdena som visades i kolumnen Size.

| Vy         | REST: anrop | REST: byte | GraphQL: anrop | GraphQL: byte | Databasfrågor (API-loggen)                   |
| ---------- | ----------- | ---------- | -------------- | ------------- | -------------------------------------------- |
| Startsidan | 3           | 27,6kB     | 1              | 4,2kB         | GraphQL: 1 databasfråga för `PopularGuides`. |
| Turlistan  | 1           | 285 kB     | 0              | 0 kB          | ej uppmätt                                   |

## Schemat i korthet

GraphQL-schemat innehåller följande typer:

- `Guide` – information om guider.
- `Tour` – information om användarnas turer.
- `User` – användarinformation.
- `Photo` – information om bilder kopplade till en tur.
- `LogPoint` – information om mätpunkter under en tur.

Schemat innehåller även input-typen `CreateTourInput`, som används för att skicka data när en ny tur skapas.

**Query-ingångar:**

- `guides` – hämtar guider.
- `popularGuides(limit)` – hämtar publicerade populära guider med en angiven gräns.
- `guide(slug)` – hämtar en guide via dess slug.
- `regions` – hämtar tillgängliga regioner.
- `tours(limit)` – hämtar turer med en angiven gräns.
- `tour(id)` – hämtar en specifik tur via dess ID.

**Mutation-ingångar:**

- `createTour(input)` – skapar en ny tur för en inloggad användare.

GraphQL använder camelCase i schemat, medan databasen använder snake_case. När fältnamnen skiljer sig åt översätter resolver-funktionerna mellan dessa namn.

Exempel:

| GraphQL-fält  | Databaskolumn  |
| ------------- | -------------- |
| `lengthKm`    | `length_km`    |
| `bodyHtml`    | `body_html`    |
| `heroImage`   | `hero_image`   |
| `updatedAt`   | `updated_at`   |
| `displayName` | `display_name` |
| `startedAt`   | `started_at`   |
| `distanceM`   | `distance_m`   |
| `recordedAt`  | `recorded_at`  |
| `elevationM`  | `elevation_m`  |
| `heartRate`   | `heart_rate`   |

Vi använder camelCase i GraphQL eftersom det är en vanlig namnstandard i JavaScript och TypeScript. Databasens befintliga kolumnnamn behöver därför inte ändras.

Känsliga uppgifter, exempelvis `password_hash`, finns inte som fält i GraphQL-schemat och kan därför inte begäras direkt av klienten. GraphQL-typerna begränsar vilka fält som kan returneras. Vissa resolvers använder dock `SELECT *` internt, vilket innebär att databasen kan hämta fler kolumner än vad GraphQL-svaret behöver.

## Vad som går via GraphQL och vad som stannar i REST

**GraphQL:**

- `popularGuides` används för att hämta populära guider på startsidan.
- `guides`, `popularGuides`, `guide`, `regions`, `tours` och `tour` finns som läsingångar i GraphQL-schemat.
- `createTour` finns som mutation för att skapa en tur för en inloggad användare.
- GraphQL används när klienten behöver välja vilka fält som ska returneras.

**REST:**

- `GET /api/guides` – hämtar guider.
- `GET /api/guides/regions` – hämtar regioner.
- `GET /api/tours/latest` – hämtar de senaste turerna.
- `GET /api/tours` – hämtar turerna till turlistan.
- Inloggning och autentisering – behålls i REST eftersom det redan fungerar och inte behöver migreras till GraphQL.
- Bilduppladdning – behålls i REST eftersom filuppladdning passar bra med vanliga HTTP-anrop och multipart-formulär.
- Health check – behålls i REST eftersom det är en enkel endpoint som används för att kontrollera om API:et fungerar.

Mätningen på startsidan är inte en direkt jämförelse av exakt samma datamängd. REST-anropet `guides` hämtar guider, medan GraphQL-anropet `popularGuides` endast hämtar publicerade guider med en begränsad resultatmängd.

På turlistan visar klienten turens titel, användarens visningsnamn, guidens titel, distansen och antalet bilder. Själva bilderna och turens loggar visas inte i listan. Mätningen visar att vyn använder ett REST-anrop och inte GraphQL.

Vi använder alltså båda API-stilarna parallellt. Befintliga REST-endpoints behöver inte skrivas om bara för att GraphQL har införts.

## Alternativ vi jämförde

**1. Fortsätta med enbart REST**

Fördelar:

- Enklare arkitektur med ett enda sätt att kommunicera med API:et.
- Befintliga endpoints kan återanvändas.
- HTTP-cachning är enkel att hantera med GET-anrop.
- Mindre behov av att underhålla flera API-kontrakt.

Nackdelar:

- Klienten kan behöva flera anrop för att bygga en vy.
- REST-endpoints kan returnera fler fält än klienten behöver.
- Nya specialanpassade endpoints kan behövas för olika vyer.

**2. Använda GraphQL för hela API:et**

Fördelar:

- Klienten kan välja exakt vilka fält som behövs.
- Flera relaterade resurser kan hämtas genom en GraphQL-fråga.
- Ett flexibelt API för olika klienter och vyer.

Nackdelar:

- Kräver mer arbete med schema, resolvers och felhantering.
- Kräver särskild uppmärksamhet på N+1-problem och databasfrågor.
- HTTP-cachning är inte lika enkel som för vanliga GET-anrop.
- Befintlig inloggning och filuppladdning skulle behöva migreras eller anpassas till den nya API-strukturen.

**3. Låta GraphQL komplettera REST – valt alternativ**

Fördelar:

- GraphQL kan införas stegvis.
- Befintliga REST-endpoints kan fortsätta fungera.
- GraphQL används där klienten har nytta av att välja fält.
- Mindre risk än att migrera hela API:et på en gång.

Nackdelar:

- REST och GraphQL behöver underhållas parallellt.
- Utvecklare måste veta vilket API som används för varje funktion.
- Typer och kontrakt behöver hållas synkroniserade.

## Konsekvenser

- **Cachning:** REST GET-anrop kan använda vanlig HTTP-cachning. GraphQL använder POST för frågor i den nuvarande klienten, vilket gör vanlig HTTP-cachning mindre enkel.
- **Felhantering:** GraphQL kan returnera HTTP 200 även när svaret innehåller `errors`. Klienten måste därför kontrollera både HTTP-status och GraphQL-svaret.
- **N+1-problem:** Resolver-funktionerna för `Tour` hämtar relaterade uppgifter separat, exempelvis användare, guider, bilder och loggar. Om en fråga hämtar flera turer och begär dessa relationer kan det leda till många separata databasfrågor. Detta ska ses över och åtgärdas i M5.
- **Underhåll:** REST och GraphQL behöver underhållas parallellt under migreringen.
- **Typer:** GraphQL-typer och klientens typer hanteras manuellt tills code generation införs.
- **Säkerhet:** Känsliga databasfält, exempelvis `password_hash`, ska inte exponeras genom GraphQL. Mutationer som kräver autentisering måste kontrollera att användaren är inloggad.
- **Migrering:** Enskilda REST-endpoints kan migreras till GraphQL vid behov. Det finns inget krav på att skriva om hela API:et.
- **Prestanda:** GraphQL ger möjlighet att minska onödig dataöverföring genom att bara begära de fält som behövs. Resultatet måste följas upp med mätningar av samma data och vyer.

**Skrivet av:**
@adusss
