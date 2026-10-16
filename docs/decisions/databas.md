# Beslutsdokument: Databas

## Datum

2026-10-16

## Beslut

## Bakgrund
Uppmätta siffror (mätmetod och datum anges):

<!-- a table could be good -->
| Mätning | Värde | Metod/källa |
|---|---|---|
| Storlek på `/api/tours`-svaret | 284592 byte |`curl localhost:4000/api/tours | wc -c`|
| Antal rader i `tour_logs` | 5922 | i containern `psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT * FROM tour_logs;"` |
| Största turen | id:65 med 39 loggar | i containern `psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT tour_id, COUNT(*) AS antal_loggar FROM tour_logs GROUP BY tour_id ORDER BY antal_loggar DESC
LIMIT 1;"`|

<!-- how did this influence our decision -->

## Dokumentmodellen

<!-- json sketch from #66  -->
```json
  {
    tour_id: 1, // kept until migration is done
    user_id: 1,
    guide_id: 1,
    title: "Hello tour",
    started_at: 1792155313,
    distance_m: 1000,
    notes: "A note",
    logs: [
      {
        timestamp: 1792155313,
        lat: 58.17367817386448,
        lon: 15.33418779535307,
        elevation_m: 50,
        heart_rate 100,
        note: "note for this log"
      }
      //...
    ]
    stats: { logPoints: 300 },
  }
```

## Vad som stannar i Postgres och varför
<!-- a table might be good here too -->
| Tabell | Stannar i Postgres? | Motivering |
|---|---|---|
| Users | Ja | Användare har ofta relationer till annat i databasen, då passar en relationsdatabas som Postgres bra. |
| Guides | Ja | Vi ser ingen fördel att flytta till mongo, fördel med att ha kvar i Postgres är att det är enkelt att ha relationer till användare. |
| Tours | Nej | Vi flyttar Tour logs till mongo och eftersom ingen hämtar tour logs utan tours så slår vi ihop dem. |
| Tour logs | Nej | De tar upp väldigt mycket rader i databasen, vi hämtar dem alltid som grupp, och ihop med Tours. Detta gör att det passar bättre som ett dokument i mongo. |
| Photos | Ja | Det finns nackdelar med att embedda i Tours i mongo, om vi har det separat i Postgres blir det enklare att bygga viss funktionalitet.  |

## Migrering i M5

<!-- it seems like in M5 is when we actually do the migration -->
<!-- this is just preparation and can probably be refined later  -->

**Steg**
<!-- what steps need to be taken for the data to be migrated -->
<!-- makes it easier to write a migration script later -->
1. Hämta en Tour med Tourlogs från postgres.
2. Skapa ett javascript object som matchar vår dokumentmodell för Tours
3. Skriv in databasen
4. Gör det för alla Tours.
5. Efter verifiering, ta bort de tabeller ur postgres databsen som inte behövs längre.

**Verifiering**
<!-- how we verify the migration was successful -->

1. Hämta en Tour med Tourlogs ifrån postgres
2. Hämta en Tour ifrån Mongo med samma TourId
3. Jämför datan med ett test av något slag.
4. Om vi har samma data i båda är migreringen lyckad.

**Vad händer med `tour_logs`**

<!-- not sure what this means, maybe because it would become embedded -->
Tour logs och Tours behövs inte i Postgres längre, så de tabellerna raderas.

## Alternativ vi jämförde

**Allt i Postgres:** Ha kvar allt i postgres, fortsätta utveckla appen med en databas.

**Allt i MongoDB:** Migrera allt till MongoDB, ta bort postgres helt ifrån appen.
<!-- i assume this is referring to going all in on mongo / staying on postgres -->

**Postgres och MongoDB:** Två databaser, migrera det som vi anser passar bättre i en dokumentdatabas till MongoDB.

## Konsekvenser
<!-- what are the consequences of our specific decision compared to the alternatives -->
<!-- presumably we've covered the positives earlier so only negative consequences here i think.-->

Vi har valt att använda både Postgres MongoDB.
Vi måste då ha hand om två databaser, det blir en extra container och mer arbete att få igång och underhålla miljön.
Vi förlorar direkt relation från användare till Tour och måste se till att det hålls trots detta.
Vi kan optimera resurshantering genom att placera datta i den databas som som datan passar bäst i.

## Skrivet och signerat
<!-- just our names -->
Isak, Adrian, Daniel
