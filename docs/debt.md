| # | Vad | Var | Varför det är ett problem | Allvar |
| --- | --- | --- | ---- | ---- |
| 1 | `npm` paket har säkerhetsbrister, 2 på high | `npm run audit` | Det kan leda till att data exponeras eller att applikationen går ned | Hög |
| 2 | `package.json` har inget script för att starta docker-compose-filen. Den har även inte default namn och `-f` behövs användas för att starta den. | `package.json` | Friktion vid start av databasen | Låg |
| 3 | Det finns inga formaterings-regler för projektet | Ingen formaterare installerad, inget formaterings script i `package.json` | Kod kan bli oorganiserad och svår att läsa. De som formaterar själv kommer formatera kod de inte ändrar. Gör varje ändring jobbig. | Medel |
| 4 | finns ingen designerad testanvändare | `/api/src/db/seedjs` | Det är svårt att testa applikationen som inloggad användare, speciellt när det inte går att skapa en användare i webapplikationen. När det går att skapa egen använder kan den här reducars till "låg" | Medel |
| 5 | Inget förberet sätt att inspektera databasen | `docker-compose.dev.yml` och `package.json` | Det är värdefullt att kunna inspektera databasen när man gör ändringar gällande API:et. pgWeb eller drizzle-studio. | Låg |
| 6 | `README.md` använder kommandot `npm start` vilket inte finns, `npm run dev` är korrekt | `README.md` Kom igång kodblock | friktion när nya ska komma igång med projektet, vi vet hur man startar nu så kommer trolligtvis inte ha några problem själva, måste fixas ändå | Låg |
| 7 | Deploy sektionen i `README.md` är värdelöss | `README.md` Deploy sektion | Det finns ingen information om hur en deploy görs, borde tas bort tills vi har en klar process för att deploya. Marcus är inte en medlem av vårt team | Låg |
| 8 | Javascript används istället för Typescript. | alla `.js` filer i appen. | Det blir svårare att fånga fel under utveckling vilket kan leda till fel i deployade appen. | Medel |
| 9 | Auth state är inte reaktivt, borde läggas i en store så att hela appen kommer åt den. | `App.jsx` rad 11 | Varje kompoment som behöver veta vem som är inloggad måste få det via props eller hämta den data själv, ger risk för att fel inloggningsläge visas | Medel |
| 10 | Det finns ingen catch-all route, e.g. 404 sida | `App.jsx` antagligen | Dåligt UX utan en 404 sida för routes som inte finns | Låg |
| 11 | Ingen felhantering på fetching av turdata | `TourDetail.jsx` rad 9-11 | Navigation till en tur som inte finns visar en blank sida  | Låg |
| 12 | Hårdkodad versionsnummer i klienten | `App.jsx` rad 36 | Behövs ej, måste uppdateras manuellt vid varje ny release | Låg |
| 13 | `API_URL` är hårdkodad i klienten till `http://localhost:4000/api` | `api.js` rad 1 | Detta gör deployment svårare då den måste ändras, finns också möjligheten att `api` ändrar port och då måste `API_URL` uppdateras också | Medel |
| 14 | Ingen felhantering vid fetching av data | `api.js` | Ledder till buggar vid dålig input eller annat fel på API:et, | Medel |
| 15 | kodrad för att konvertera meter till kilometer är förvirrande och inte en funktion, `Math.round(t.distance_m / 100) / 10` | `Home.jsx` rad 38, `Tours.jsx` rad 31 | Det är inte tydligt vad denna kodrad gör, den återanvänds och borde vara en funktion då. | Låg |
| 16 | email och password är state | `Login.jsx` rad 67 | Det finns ingen anledning till att det ska vara state | Låg |
| 17 | Profil data hämtas ifrån localstorage, endast från serveren vid login | `Profile.jsx` rad 6 | Kan leda till mismatch i data mellan klient och server, tillexempel om användaren använder två enheter | Låg |
| 18 | Logout invaliderar inte token på servern | `Profile.jsx` | En stulen token kan ligga kvar i 30 dagar utan att kunna invalideras på något sätt, en säkerhetsrisk | Hög |
| 19 | Search triggas inte vid Enter |`Guides.jsx` rad 24-25 | Dåligt UX för användaren | Låg |
| 20 | Navigering till en guide som inte finns har problem på grund av inget error hantering | `Guides.jsx` | dåligt UX | Låg |
| 21 | `dangerouslySetInnerHTML` används | `GuideCard.jsx` rad 9, `GuideDetails.jsx` rad 20 | Kan leda till XSS attacker | Hög |
| 22 | En komponent är skapad genom att extenda `React.Component` klassen | `PrimaryButton.jsx` | Den enda komponenten som använder klass-API, den importeras ej någon annan stans, den har ingen funktion för projektet. Kan raderas. | Låg |
| 23 | Vissa komponenter använder inline styles | `Button.jsx` rad 2 `GuideCard.jsx` rad 4 | Det blir svårare att uppdatera styles när det inte är konsekvent vart det ska ligga | Låg |
| 24 | Färger och storlekar använder inte css variabler | `style.css` | Detta gör det svårare att uppdatera färger och storlekar, utan en design system så är allt magic numbers. | Medel |
| 25 | Knappar har `cursor:pointer` på sig| `style.css` rad 39-40 | `cursor:pointer` ska användas för att visa att något är en länk, knappar är inte länkar | Låg |

| 26 | Lösenord sparas i klartext | auth.js | Lösenord sparas som plaintext:<lösenord>. Om någon kommer åt databasen kan de läsa alla lösenord. De borde hashats med bcrypt eller Argon2. | Hög |
| 27 | Risk för SQL-injection | guides.js | Användarens sökning läggs direkt in i SQL-frågan. Det kan göra att någon manipulerar frågan. Parametriserade queries borde användas. | Hög |
| 28 | Registrering saknar validering | utpost/api/src/routes/auth.js | Det saknas kontroll av input, lösenordets styrka och om e-postadressen redan används. Det kan skapa felaktiga konton och problem med dubbletter. | Medel |
| 29 | För många databasfrågor | tours.js | Extra frågor körs för varje tur för att hämta användare, guide, bilder och loggar. Det kan bli långsamt när det finns många turer. | Medel |
| 30 | Turer kan raderas utan behörighetskontroll | tours.js | DELETE /api/tours/:id kontrollerar inte om användaren är inloggad eller äger turen. Det gör att någon kan radera andras turer. | Hög |
| 31 | Bristande kontroll av token-format | auth.js, requireUser | header.replace('Bearer ', '') kräver en viss formatering. Headern och token borde kontrolleras tydligare så att felaktiga anrop hanteras korrekt. | Låg |
| 32 | Hårdkodad konfiguration och JWT-hemlighet | config.js | Databasens URL, JWT-hemligheten, porten och upload-dir ligger direkt i koden. Framför allt kan hemligheter exponeras om koden delas. Dessa borde läsas från miljövariabler. | Hög |
| 33 | Oh hanterade fel loggas bara | index.js | unhandledRejection loggar felet men låter servern fortsätta. Vid kritiska fel kan servern fortsätta i ett felaktigt tillstånd. | Medel |
| 34 | Bildfunktionen är inte färdig | photos.js | Koden använder dummy-pixels istället för riktig bilddata. Funktionen behöver byggas klart för att kunna hantera riktiga bilder. | Låg |



