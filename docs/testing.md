# Teststrategi – Utpost

**Datum:** 2026-10-12
**Beslut:** Två nivåer med vitest, grön CI är krav för PR

## Bakgrund
Vi har ärvt en hel del otestad kod både i appen vi portar men även API:et som vi delvis skriver om, detta tvingar oss att göra vissa antaganden om hur koden ska fungera i bland.
Vi har ont om tid och ligger redan efter vilket betyder att vi inte kan tvinga att testa där det inte krävs.

## Nivåer
Enhet (Vitest): krav, enkel logik test, utils funktioner etc, det som kan testas utan vue och DOM, snabbt och enkelt.
Komponent (Vitest + Vue Testing Library): valfritt, tas när det är värt det.
API (kommer i M5): inget planerat just nu, återkommer vid M5.
E2E: inget planerat just nu.

## Karta: vad testas var

| Del av Utpost | Nivå | Varför just där? | Finns test i dag? |
|---|---|---|---|
| `client/src/utils/format.ts` | enhet | en utils funktion som används i flera delar av appen, ser till att vi formatterar korrekt | ja |
| `client/src/views/GuidesView.vue` | komponent | en vy som hämtar och visar rå html, sökning också. testas för att det är en av de första vyerna vi portade och har unika functioner (sökning) | ja |
| `client/src/components/GuideCard.vue` | komponent | komponent som visar rå html, ser till att hindra XSS | ja |

## Regler
- Ett PR mergas bara när CI är grön.
- Ett PR får inte bryta befintliga tester.
- En buggfix ska ha ett regressionstest också. Undantag vid buggar i kod utan testinfrastruktur, motivera detta i PR.
- Vi mockar API:et i alla enhets och component test som behöver det med vi.mock.
- Täckning: nej, inget procentkrav.
- Testfiler ligger bredvid den fil som testas och heter `<name>.test.<extension>`

## Vad vi medvetet inte testar
Vi testar inte bibliotek, testas av de som skapar dem.
Vi testar inte API just nu, återkommer vid M5.


## Alternativ vi jämförde
vitest har valts för att det gör det enkelt att testa vite appar.
jest känns inte så lockande här men kan väljas om vi ska börja testa `api/`.

E2E, vi har inte gått igenom end to end tester ännu så det blir för mycket arbete för oss.

Täckning och krav på komponent test valdes inte för att det blir fler regler att följa som vi inte tror vi klarar att följa.

## Konsekvenser
Implentering av tester gör koden mer hållbar och säkrare.
CI kommer ta längre tid desto fler tester det finns.
Testing blir sporadiskt på komponenter och bara implementerade av de som vill.

## Kommandon
npm test · npm run test:watch --workspace=client
