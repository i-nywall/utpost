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
- kontakt via discord primärt, diskussion om kod främst i github
- Träffas på skolan måndag tisdag för att bli klar med veckans uppgifter.
- PR: ska klara CI, följ template och länka till issues.
- PR: Vid Review lägg en kommentar på PR:et och be om ändringar eller förtydligande om nödvändigt.
- Börja och avsluta dagen med att reviewa öppna pull requests
- Skapa issues och milestone för checkpoints, dela upp i subissues om behövs.
- Det du arbetar på måste ha en issue och du måste vara assigned till den. Skapa en issue om det behövs.
- scoped commits eller conventional commits
- Kod kommentar ska förklara varför koden skrevs på ett visst sätt, inte vad den gör, om det inte behövs en kommentar så skriv inte.
