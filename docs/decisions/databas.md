# Beslutsdokument: Databas

## Datum

YYYY-MM-DD

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
  "id": "...",
  "field": "..."
}
```

## Vad som stannar i Postgres och varför
<!-- a table might be good here too -->
| Tabell | Stannar i Postgres? | Motivering |
|---|---|---|
| X | Y | Z |

## Migrering i M5

<!-- it seems like in M5 is when we actually do the migration -->
<!-- this is just preparation and can probably be refined later  -->

**Steg**
<!-- what steps need to be taken for the data to be migrated -->
<!-- makes it easier to write a migration script later -->
1. [Steg 1]
2. [Steg 2]
3. [Steg 3]

**Verifiering**
<!-- how we verify the migration was successful -->

- [Kontroll 1: ]
- [Kontroll 2: ]
- [Kontroll 3: ]

**Vad händer med `tour_logs`**

<!-- not sure what this means, maybe because it would become embedded -->

## Alternativ vi jämförde

<!-- i assume this is referring to going all in on mongo / staying on postgres -->

## Konsekvenser
<!-- what are the consequences of our specific decision compared to the alternatives -->
<!-- presumably we've covered the positives earlier so only negative consequences here i think.-->
## Skrivet och signerat
<!-- just our names -->
