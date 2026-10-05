# Kunskapslogg Isak Nywall

## Vecka 38 – Ramverket och arbetssättet
**Kursmål:** Fullstack 4

### Vad jag förstått
**Fullstack 4:** Vue ser ut som att det kan enkelt skala till hur simpel eller komplex din app vill bli. En offical store och router gör det lätt att komma igång med det mest nödvändinga för en SPA.
Jag tycker syntaxen är obekväm jämfört med jsx.


### Var det syns i mitt arbete
**Fullstack 1:** PR #29

### Kvar att förstå
Scoped css och emits.

### Siktar på VG
Nej.

## Vecka 39 – Routing, state och CI
**Kursmål:** Fullstack 5 · Cloud 3

### Vad jag förstått
**Fullstack 5:** Vue Router är ganska enkel att arbeta med och kan ta en ganska långt.

**Cloud 3:** CI är nödvändigt för att garantera att all kod som åker in i `main` är av en viss kvalite.
Vi kollar efter formattering på kod, lint fel, att tester klaras, och att det faktist går att bygga appen.
Vi har bestämmt att koden ska följa dessa regler och CI ser till att koden kommer göra det.
Utan CI så kanske detta görs någon gång ibland och då blir det problem för den som märker problemet istället för den som skapade problemet.

### Var det syns i mitt arbete
Fullstack 5: PR #29,

Cloud 3: Review på PR #36.

### Kvar att förstå
Vue router data fetching och loading states.

### Siktar på VG
Nej.

## Vecka 40 – TypeScript och kvalitetssäkring
**Kursmål:** Fullstack 3 · Cloud 5,6

### Vad jag förstått
**Fullstack 3:** Typescript fångar fel innan de når "prod".
Typescript ser till att du har koll på vad för data det är du faktist jobbar med.
Utan typescript är du blind.

**Cloud 5:** 

**Cloud 6:** Tester ser till att koden fungerar som den ska.
De hindrar buggar från att dyka upp när kod ändras. om dessa buggar inte fångas i CI/CD pipelines så dyker dom up i "prod".
Då blir riktiga användare påverkade.

### Var det syns i mitt arbete
**Fullstack 3:** PR #51, #52

**Cloud 5:**

**Cloud 6:** PR #54, #55, #56, #58

### Kvar att förstå
Jag behöver bättre förstå component test.

### Siktar på VG
Nej.

## Vecka 41 – NoSQL och containrar
**Kursmål:** Fullstack 1 · Cloud 4

### Vad jag förstått
**Fullstack 1:** NoSQL som mongodb sparar data i dokument istället för rader i en tabell.
Detta har konsekvensen att datan inte behöver följa ett schema.
Det kan va en fördel om datan har många former och alla inte delar på samma fält.
Mongo har också något som heter embeddings, data som bara hämtas med annan data kan läggas in i ett och samma dokument.
Detta kan göra att något som tog flera tusen rader i SQL nu bara sparas i ett dokument.

**Cloud 4:** Docker gör det möjligt att ha en definerad miljö att köra mjukvara i.
För vårt projekt så innebär det att vi kan eliminera problem som uppstår på grund av skillnader i våra körmiljöer.
Att jag sitter på linux och de andra på windows, att vi kan ha olika versioner av de verktyg vi använder, dessa problem försvinner ju mer vi kör i docker containers med en miljö som blir samma för alla.

### Var det syns i mitt arbete
Fullstack 1:

Cloud 4:

### Kvar att förstå


### Siktar på VG
Nej.