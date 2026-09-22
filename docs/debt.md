# Teknisk skuld

## 1. API-klienten saknar kontroll av HTTP-fel

- **Vad:** API-klienten kontrollerar inte om HTTP-anropet lyckades innan `res.json()` körs.
- **Var:** `web/src/api.js`, rad 3–5
- **Varför:** Ett HTTP-fel kan behandlas som ett lyckat svar och ge otydliga fel längre fram i applikationen.
- **Allvarlighetsgrad:** Medel

## 2. Home saknar felhantering vid API-anrop

- **Vad:** API-anropen i Home saknar felhantering.
- **Var:** `web/src/pages/Home.jsx`, rad 13–19
- **Varför:** Om API:t inte är tillgängligt eller returnerar ett fel får användaren inget tydligt felmeddelande.
- **Allvarlighetsgrad:** Medel

## 3. GuideDetail saknar felhantering vid hämtning

- **Vad:** Hämtningen av guiden hanterar inte fel från API:t.
- **Var:** `web/src/pages/GuideDetail.jsx`, rad 9–12
- **Varför:** Om anropet misslyckas finns ingen tydlig hantering för användaren.
- **Allvarlighetsgrad:** Medel

## 4. GuideDetail använder dangerouslySetInnerHTML

- **Vad:** HTML från API:t renderas med `dangerouslySetInnerHTML`.
- **Var:** `web/src/pages/GuideDetail.jsx`, rad 20
- **Varför:** Om innehållet inte är tillräckligt sanerat kan det innebära en säkerhetsrisk, till exempel XSS.
- **Allvarlighetsgrad:** Hög

## 5. Tours saknar felhantering

- **Vad:** API-anropet i Tours hanterar endast lyckade svar.
- **Var:** `web/src/pages/Tours.jsx`, rad 9–14
- **Varför:** Om API-anropet misslyckas får användaren ingen information om vad som gick fel.
- **Allvarlighetsgrad:** Medel

## 6. Login saknar hantering av nätverksfel

- **Vad:** Login hanterar API-fel i svaret men inte fel som uppstår när själva nätverksanropet misslyckas.
- **Var:** `web/src/pages/Login.jsx`, rad 13
- **Varför:** Om API:t inte kan nås kan funktionen kasta ett fel utan att användaren får ett tydligt felmeddelande.
- **Allvarlighetsgrad:** Medel

## 7. Profile använder en hårdkodad API-adress

- **Vad:** Profile använder `fetch` med en hårdkodad URL till API:t.
- **Var:** `web/src/pages/Profile.jsx`, rad 9
- **Varför:** API-adressen dupliceras i komponenten trots att projektet redan har en gemensam API-klient i `api.js`. Det gör ändringar av API-adressen mer omständliga.
- **Allvarlighetsgrad:** Medel

## 8. Profile hämtar alla turer och filtrerar i frontend

- **Vad:** Alla turer hämtas från API:t och filtreras sedan i klienten baserat på användarens ID.
- **Var:** `web/src/pages/Profile.jsx`, rad 9–11
- **Varför:** Onödigt mycket data kan skickas till klienten. Filtreringen skulle kunna göras i backend så att endast relevanta turer hämtas.
- **Allvarlighetsgrad:** Medel

## 9. TourDetail använder en hårdkodad API-adress

- **Vad:** TourDetail använder `fetch` direkt med en hårdkodad API-adress.
- **Var:** `web/src/pages/TourDetail.jsx`, rad 9
- **Varför:** API-logiken dupliceras och komponenten blir beroende av en specifik lokal API-adress istället för den gemensamma API-klienten.
- **Allvarlighetsgrad:** Medel

## 10. TourDetail saknar felhantering

- **Vad:** API-anropet för att hämta en tur saknar felhantering.
- **Var:** `web/src/pages/TourDetail.jsx`, rad 9–12
- **Varför:** Om hämtningen misslyckas visas inget tydligt felmeddelande för användaren.
- **Allvarlighetsgrad:** Medel
