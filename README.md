# Utpost

Plattform för friluftsdestinationer. Redaktionella guider, användarnas egna turer och bilder.

## Kom igång

```bash
npm install
docker compose -f docker-compose.dev.yml up -d
npm run seed
npm start
```

Appen ligger sen på http://localhost:3000 och API:et pa http://localhost:4000.

## Struktur

- `api/` – Express + Postgres (Drizzle)
- `web/` – React + Vite

## Deploy

Fråga Marcus.

## Branchstrategi
GitHub Flow, den är enkel att förstå, ser till att vi utgår från samma kod och minimerar branch-relaterat arbete. Det här är bra för ett litet team som levererar konstant. GitHub Flow är flexibel och vi kan öka antalet deploy-miljöer vid behov utan mer komplexitet i arbetsflödet.

## Working agreement
- Om du behöver hjälp, hamnar efter eller missar ett möte, kontakta gruppmedlemmarna.
- Koddiskussion i GitHub, övrig kontakt och planering i Discord.
- Träffas på skolan måndag och tisdag för att bli klara med veckans uppgifter.
- Om vi är klara på plats på tisdag, lämna in tillsammans, annars välj ut en som kan lämna in på kvällen.
- PR: ska klara CI, följ template och länka till issues.
- PR: vid review, lägg en kommentar på PR:et och be om ändringar eller förtydligande om nödvändigt.
- PR: den som approvar mergar. Ingen merge medan någon håller på att reviewa eller har bett om ändringar.
- Börja och avsluta dagen med att reviewa öppna pull requests.
- Skapa issues och milestone för checkpoints, dela upp i subissues om det behövs.
- Det du arbetar på måste ha en issue och du måste vara assigned till den. Skapa en issue om det behövs.
- scoped commits eller conventional commits