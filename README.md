# Utpost

Plattform för friluftsdestinationer. Redaktionella guider, användarnas egna turer och bilder.

## Kom igång

Det finns två sätt att köra Utpost. Båda använder `compose.yaml`.

### Sätt 1 – Allt i Docker

Kräver bara [Docker](#docker). Ingen Node behövs på datorn – Node-versionen är låst i imagerna.

```bash
docker compose up --build -d
docker compose exec api npm run seed
```

| Tjänst | URL                                |
| ------ | ---------------------------------- |
| Vue    | `http://localhost:8080`            |
| API    | `http://localhost:4000/api/health` |

Stäng ner med `docker compose down`. `docker compose down -v` raderar även databaserna.

> [!NOTE]
> Ändringar i koden syns inte förrän du bygger om: `docker compose up --build -d`.

### Sätt 2 – Databaserna i Docker, appen på din dator

För utveckling med hot reload. Kräver [Docker](#docker) och Node 22.18 eller nyare.

```bash
docker compose up -d postgres mongo
npm ci
npm run seed
npm run dev
```

`npm run dev` startar API:et, Vue-appen och React-appen:

| Tjänst | URL                     | Status           |
| ------ | ----------------------- | ---------------- |
| Vue    | `http://localhost:3001` | Aktiv (portas)   |
| React  | `http://localhost:3000` | Legacy, fasas ut |
| API    | `http://localhost:4000` | Aktiv            |

Postgres nås på `localhost:5433` och MongoDB på `localhost:27017`.

> [!NOTE]
> Seeding är inte deterministisk och det finns inget designerat testkonto just nu.

> [!IMPORTANT]
> React-versionen är read-only och accepterar inte ändringar. All ny utveckling sker i Vue-appen.

### Verifikation

Vi har ett workflow som körs på alla pull requests till main, se [pipeline](./docs/pipeline.md).

Verifiera att allt fungerar lokalt innan du pushar:

```bash
npm run lint && \
npm run typecheck && \
npm run format:check && \
npm run test && \
npm run build
```

Du kan formattera koden med:

```bash
npm run format
```

> [!NOTE]
> Pipelinen kontrollerar bara Vue-porten just nu. Ändringar i React-appen kommer nekas oavsett. Undvik att ändra API:et innan pipelinen kontrollerar det också.

## Struktur

| Katalog   | Stack                           | Status           |
| --------- | ------------------------------- | ---------------- |
| `api/`    | Express + Postgres (Drizzle)    | Aktiv            |
| `web/`    | React + Vite                    | Legacy, fasas ut |
| `client/` | Vue + Vite                      | Aktiv (portas)   |
| `shared/` | Typ kontrakt för API och klient | Aktiv            |

## Deploy

Vi har just nu inget deployat och inget flöde för att distribuera appen.

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

## Docker

Appen behöver Docker för att köra databaserna, och i sätt 1 hela appen.

Du behöver antingen:

- **Docker Desktop** — grafiskt program för Windows/Mac, installera från [docker.com](https://www.docker.com/products/docker-desktop/).
- **Docker Engine + docker compose** — CLI för Linux, om du hellre kör allt i terminalen.
