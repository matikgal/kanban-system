# Instrukcje Wdrożenia na GitHub Pages

## Krok 1: Utwórz repozytorium na GitHub

1. Przejdź na https://github.com/new
2. Nazwa repozytorium: `kanban-system`
3. Ustaw jako publiczne (Public)
4. NIE dodawaj README, .gitignore ani licencji (już masz lokalnie)
5. Kliknij "Create repository"

## Krok 2: Połącz lokalne repozytorium z GitHub

Skopiuj i wykonaj te komendy (zastąp `TWOJA_NAZWA_UŻYTKOWNIKA` swoją nazwą użytkownika GitHub):

```bash
git remote add origin https://github.com/TWOJA_NAZWA_UŻYTKOWNIKA/kanban-system.git
git branch -M main
git push -u origin main
```

## Krok 3: Zaktualizuj package.json

Otwórz `package.json` i zaktualizuj linię `homepage`:

```json
"homepage": "https://TWOJA_NAZWA_UŻYTKOWNIKA.github.io/kanban-system",
```

Zastąp `TWOJA_NAZWA_UŻYTKOWNIKA` swoją nazwą użytkownika GitHub.

## Krok 4: Zbuduj i wdróż

Wykonaj:

```bash
npm run deploy
```

Ta komenda:

- Zbuduje projekt (tworzy folder `dist`)
- Wypchnięcie zawartości do gałęzi `gh-pages`

## Krok 5: Włącz GitHub Pages

1. Przejdź do swojego repozytorium na GitHub
2. Kliknij "Settings" (Ustawienia)
3. W menu bocznym kliknij "Pages"
4. W sekcji "Source" wybierz gałąź `gh-pages` i folder `/ (root)`
5. Kliknij "Save"

## Gotowe! 🎉

Twoja aplikacja będzie dostępna pod adresem:
`https://TWOJA_NAZWA_UŻYTKOWNIKA.github.io/kanban-system`

Może to potrwać kilka minut, zanim strona będzie aktywna.

## Aktualizacje

Aby zaktualizować aplikację w przyszłości:

```bash
git add .
git commit -m "Opis zmian"
git push
npm run deploy
```
