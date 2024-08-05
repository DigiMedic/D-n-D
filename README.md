# DoktorNaDohled - AI Konverzační Platforma pro Zdravotnictví

![DoktorNaDohled Cover Image](https://i.ibb.co/DtmRXKh/DALL-E-2024-08-04-21-57-58-Pixel-art-style-cover-image-for-Doktor-Na-Dohled-an-AI-healthcare-platfor.webp)

DoktorNaDohled je sofistikovaná AI konverzační platforma zaměřená na poskytování relevantních informací a doporučení v oblasti zdravotnictví pro české uživatele. Cílem je usnadnit nalezení vhodných poskytovatelů zdravotních služeb a poskytnout uživatelům přesné kontaktní informace.

## Klíčové funkce

1. **Česká konverzace**: AI vede konverzaci výhradně v češtině, zaměřenou na zdravotní potřeby českých uživatelů.
2. **Analýza kontextu a doptávání**: Systém analyzuje kontext, klade doplňující otázky v češtině a zpřesňuje požadavky uživatele.
3. **Vyhledávání v databázi**: AI vyhledává informace v aktuální databázi poskytovatelů zdravotních služeb v České republice.
4. **Personalizovaná doporučení**: Poskytuje uživateli seznam vhodných poskytovatelů zdravotní péče na základě jejich specifických potřeb a lokality v ČR.
5. **Přesné kontaktní informace**: Zajišťuje aktuální a správné kontaktní údaje doporučených poskytovatelů.
6. **Kontrola a oprava češtiny**: Systém automaticky kontroluje a opravuje případné chyby v českém textu pro zajištění plynulé komunikace.

## Jak to funguje

1. Uživatel zahájí konverzaci v češtině pomocí komponenty `UserInput`.
2. AI automaticky zahájí konverzaci v češtině pomocí funkce `startConversation` v `lib/ai/conversation.ts`.
3. Systém analyzuje vstup pomocí funkce `analyzeUserInput` v `lib/ai/conversation.ts` a klade doplňující otázky v češtině pro upřesnění potřeb uživatele.
4. AI vyhledává v databázi českých poskytovatelů zdravotních služeb na základě analyzovaných potřeb pomocí funkce `getRecommendations` v `lib/ai/recommendation.ts`.
5. Systém generuje personalizovaná doporučení s ohledem na lokalitu uživatele v ČR pomocí funkce `generateResponse` v `lib/ai/conversation.ts`.
6. Před zobrazením doporučení systém ověří aktuálnost kontaktních informací pomocí funkce `verifyContactInfo` v `lib/ai/recommendation.ts`.
7. Uživateli je poskytnut seznam doporučených poskytovatelů zdravotních služeb s přesnými a ověřenými kontaktními informacemi pomocí komponenty `MessageList`.
8. Veškerá komunikace prochází kontrolou a opravou češtiny pomocí funkce `checkAndCorrectCzech` v `lib/ai/conversation.ts`.

## Architektura projektu

Projekt je strukturován následovně:

- `app/`: Obsahuje hlavní komponenty aplikace, včetně `layout.tsx` a `page.tsx`.
- `components/`: Obsahuje opakovaně použitelné komponenty UI, včetně `ChatBox`, `MessageList`, a `UserInput`.
- `lib/`: Obsahuje hlavní logiku aplikace:
  - `ai/`: Funkce pro analýzu uživatelského vstupu, generování odpovědí a práci s češtinou.
  - `db/`: Schémata databáze a migrace pro ukládání dat o poskytovatelích zdravotních služeb.
  - `actions/`: Serverové akce pro manipulaci s daty.
- `pages/`: Obsahuje API endpointy pro AI, doporučení a ověření kontaktních informací.
- `public/`: Statické assets.
- `scripts/`: Utility skripty, včetně importu dat o poskytovatelích zdravotních služeb.

## Použité technologie

- [Next.js](https://nextjs.org) 14 (App Router) pro frontend a backend
- [Vercel AI SDK](https://sdk.vercel.ai/docs) pro integraci AI funkcí s podporou češtiny
- [OpenAI](https://openai.com) pro generování odpovědí v češtině a analýzu uživatelského vstupu
- [Drizzle ORM](https://orm.drizzle.team) pro práci s databází poskytovatelů zdravotních služeb
- [Postgres](https://www.postgresql.org/) s [pgvector](https://github.com/pgvector/pgvector) pro ukládání a vyhledávání dat o poskytovatelích
- [shadcn-ui](https://ui.shadcn.com) a [TailwindCSS](https://tailwindcss.com) pro styling

## Zdroje dat

Projekt využívá následující databázové zdroje pro získávání aktuálních informací o poskytovatelích zdravotních služeb v České republice:

1. [Národní registr poskytovatelů zdravotních služeb (NRPZS)](https://nrpzs.uzis.cz/index.php?pg=vyhledavani-poskytovatele--pro-verejnost)
2. [Otevřená data - Národní registr poskytovatelů zdravotních služeb](https://data.gov.cz/datov%C3%A1-sada?iri=https://data.gov.cz/zdroj/datov%C3%A9-sady/00024341/aa4c99d9f1480cca59807389cf88d4dc)

Data jsou importována a zpracována pomocí skriptu `scripts/importNRPZS.ts`.

## Nastavení projektu

1. Naklonujte repozitář:
   ```
   git clone https://github.com/your-username/doktor-na-dohled.git
   cd doktor-na-dohled
   ```

2. Nainstalujte závislosti:
   ```
   npm install
   ```

3. Vytvořte soubor `.env` a nastavte potřebné proměnné prostředí podle `.env.example`.

4. Nastavte a migrujte databázi:
   ```
   npm run db:push
   ```

5. Importujte data poskytovatelů zdravotních služeb:
   ```
   npm run import:nrpzs
   ```

6. Spusťte vývojový server:
   ```
   npm run dev
   ```

7. Otevřete [http://localhost:3001](http://localhost:3001) ve vašem prohlížeči.

## Vývoj a testování

Při vývoji a testování se zaměřte na následující klíčové oblasti:

1. Správnost české konverzace a analýzy kontextu v `lib/ai/conversation.ts`:
   - Ověřte, zda AI začne konverzaci automaticky a v češtině.
   - Testujte schopnost AI reagovat na uživatelský vstup v češtině a poskytovat smysluplné otázky.

2. Přesnost vyhledávání v databázi poskytovatelů v `lib/ai/recommendation.ts`:
   - Ověřte, zda AI úspěšně vyhledává a poskytuje přesné informace z databáze českých poskytovatelů.
   - Testujte, zda AI dokáže identifikovat nejvhodnější poskytovatele na základě vyhledávání.

3. Relevance personalizovaných doporučení:
   - Ověřte, zda AI přizpůsobuje doporučení podle vstupních dat uživatele.
   - Testujte, zda AI zohledňuje lokalitu uživatele v ČR při generování seznamu poskytovatelů.

4. Aktuálnost a správnost kontaktních informací:
   - Ověřte funkčnost `verifyContactInfo` pro kontrolu aktuálnosti kontaktních údajů.
   - Testujte, zda jsou uživatelé informováni o potenciálně neaktuálních kontaktních informacích.

5. Kvalita kontroly a opravy češtiny:
   - Testujte funkci `checkAndCorrectCzech` s různými typy vstupů, včetně správných i nesprávných českých textů.
   - Ověřte, zda opravy nezměnily původní význam textu.

6. Uživatelské rozhraní a UX v komponentách `ChatBox`, `MessageList`, a `UserInput`:
   - Testujte plynulost konverzace a srozumitelnost odpovědí AI v češtině.
   - Ověřte, zda je uživatelské rozhraní intuitivní a snadno použitelné pro české uživatele.

## Přispívání

Vítáme příspěvky do projektu! Prosím, postupujte podle těchto kroků:

1. Forkněte repozitář
2. Vytvořte novou větev (`git checkout -b feature/AmazingFeature`)
3. Proveďte změny a commitněte je (`git commit -m 'Přidána nová funkce'`)
4. Pushněte do větve (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

Při přispívání se prosím zaměřte na zlepšení české konverzace, přesnost vyhledávání poskytovatelů zdravotních služeb a relevanci doporučení pro české uživatele.

## Licence

Tento projekt je licencován pod [MIT licencí](LICENSE).

## Kontakt

Pokud máte jakékoliv dotazy nebo návrhy, neváhejte otevřít issue v tomto repozitáři nebo nás kontaktovat na [email@doktornadohled.cz](mailto:email@doktornadohled.cz).

## Aktuální stav vývoje

K datu [DATUM]:

1. **Instalace závislostí**: Všechny závislosti byly úspěšně nainstalovány.
2. **Nastavení prostředí**: Soubor .env byl vytvořen s potřebnými proměnnými prostředí.
3. **Migrace databáze**: Databázové migrace byly úspěšně provedeny.
4. **Import dat**: Proces importu dat o poskytovatelích zdravotních služeb byl zahájen, ale jeho dokončení nebylo ověřeno.
5. **Spuštění vývojového serveru**: Vývojový server byl úspěšně spuštěn.

### Známé problémy

1. **Chyba při zpracování API požadavků**: Při volání `/api/chat` endpoint dochází k chybě 500. Možné příčiny:
   - Nesprávná konfigurace OpenAI API
   - Problémy s připojením k databázi
   - Chybějící nebo nesprávně importovaná data poskytovatelů

### Další kroky

1. Dokončit a ověřit import dat poskytovatelů zdravotních služeb.
2. Prozkoumat a opravit chybu 500 při volání `/api/chat` endpointu.
3. Implementovat a otestovat funkce pro analýzu uživatelského vstupu a generování odpovědí v češtině.
4. Vytvořit a otestovat funkce pro vyhledávání a doporučování poskytovatelů zdravotních služeb.
5. Implementovat kontrolu a opravu českého textu.
6. Vylepšit uživatelské rozhraní pro plynulou konverzaci v češtině.

Pokud budete pokračovat ve vývoji, zaměřte se nejprve na vyřešení problému s API endpointem a dokončení importu dat. Poté můžete pokračovat s implementací hlavních funkcí aplikace.

---

Vytvořeno s ❤️ pro lepší dostupnost zdravotní péče v České republice.
