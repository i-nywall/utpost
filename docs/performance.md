# Prestanda

*Skrivs i M10. Siffrorna kommer ur `npm run perf`: Lighthouse mot den körande appen, som en mobil på långsamt 4G. En mätning per rad, avrundad. Ni ska kunna säga vad ni ändrade, vilken siffra det flyttade och hur mycket – inte mäta samma sak fem gånger.*

## Före

*Klistra in tabellen från `npm run perf -- --fore`, körd innan ni ändrade något. Filen `perf-fore.json` committas.*

| Sida | LCP | CLS | JavaScript | Bilder | Totalt |
|---|---|---|---|---|---|
| Startsidan | 2,8 s | 0,43 | 163 kB | 0 kB | 202 kB |
| En guide | 0,8 s | 0 | 158 kB | 0 kB | 167 kB |
| En tur | 0,8 s | 0 | 132 kB | 0 kB | 152 kB |

**Vad som är LCP-elementet på startsidan:** `h1`

## Optimeringarna

*Minst tre. En rad per ändring, mätt direkt efter den. "Siffran" är den ni ville flytta, inte alla.*

| # | Vad vi ändrade | Siffran vi ville flytta | Före | Efter | PR |
|---|---|---|---|---|---|
| 1 | Visade platshållarkort medan guiderna laddas | CLS på startsidan | 0,43 | 0,10 | |
| 2 | Visade platshållarrader medan senaste turerna laddas | CLS på startsidan | 0,47 | 0,14 | |
| 3 | Tog bort oanvända fält från startsidans GraphQL-fråga | Total data på startsidan | 203 kB | 198 kB | |

*Startsidan och guiden mättes i en körning. En tur mättes i medianen av tre körningar efter att adressen rättades. En senare körning med samma kod gav 0,47 CLS på startsidan, så resultatet 0,10 behöver verifieras.*

## Efter

| Sida | LCP | CLS | JavaScript | Bilder | Totalt |
|---|---|---|---|---|---|
| Startsidan | 2,8 s | 0,08 | 163 kB | 0 kB | 198 kB (−2 %) |
| En guide | 0,8 s | 0,11 | 158 kB | 0 kB | 167 kB |
| En tur | 0,8 s | 0,08 | 132 kB | 0 kB | 152 kB |

## Budgeten

Lighthouse varnar om Performance-poängen understiger 0,70. CI-jobbet misslyckas om LCP överstiger 4 000 ms eller CLS överstiger 0,25. Varningen visar en försämring utan att stoppa jobbet, medan error-gränserna stoppar jobbet vid allvarligt långsam rendering eller stora layoutskiften. Gränserna ger lite utrymme för variation mellan labbkörningar.*

Pipeline där budgeten stoppade jobbet: [länk till körningen]

## Det vi lät vara

*En eller två saker ni såg men inte lagade, och varför. En flaskhals man känner till och har valt att leva med är också ett beslut.*