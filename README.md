# FluxBoard: System Kanban

Eksperymentalna, **minimalistyczna** aplikacja do zarządzania projektami typu **Kanban**, skupiająca się na unikalnym designie i **płynnej interakcji**.

## Opis Projektu

FluxBoard to odświeżone podejście do narzędzi Kanban. Odchodzi od typowej estetyki biurowej (SaaS) na rzecz surowego, cyfrowego **brutalizmu** i estetyki **Swiss Style**. Interfejs został zaprojektowany z myślą o **responsywności** i maksymalnej **płynności** działania ("Flux").

## Kluczowe Funkcje

* **Płynny Drag & Drop**: Łatwe przenoszenie zadań między kolumnami.
* **Dualizm Motywów**: Dwa unikalne motywy kolorystyczne:
    * **Void** (Ciemny): Głębokie grafity i wysoki kontrast.
    * **Paper** (Jasny): Estetyka technicznego papieru.
* **Kompleksowe Zarządzanie Zadaniami**:
    * Obsługa podzadań (**Checklisty**).
    * Tagowanie i **Priorytetyzacja**.
    * Śledzenie czasu pracy (**Time Tracking**).
    * Historia zmian (**Audit Log**).
* **Użyteczność (UX)**:
    * Tryb skupienia (**Focus Mode**) poprzez zwijanie kolumn.
    * Wsparcie dla klawiatury (**skróty klawiszowe**).
    * Filtrowanie zadań w czasie rzeczywistym.
* **Persistence**: Automatyczny zapis stanu tablicy i wybranego motywu w **LocalStorage** przeglądarki (aplikacja działa po stronie klienta).

## Technologie

Projekt został zbudowany przy użyciu nowoczesnego stosu frontendowego:

* **React 19**: Wykorzystanie najnowszych mechanizmów.
* **TypeScript**: Pełne typowanie dla poprawy stabilności i czytelności kodu.
* **Tailwind CSS**: Utility-first CSS do szybkiego i responsywnego stylizowania.
* **SVG Icons**: Ręcznie tworzone abstrakcyjne ikony.
* **Fonty**: Syne (nagłówki) i Space Grotesk (tekst główny).

## Uruchomienie

Aplikacja jest w pełni **Client-Side** i nie wymaga konfiguracji bazy danych ani backendu.

1.  **Instalacja zależności**:
    ```bash
    npm install
    ```
2.  **Uruchomienie serwera deweloperskiego**:
    ```bash
    npm start
    ```
3.  Otwórz aplikację w przeglądarce.

---
*Design & Code by [matikgal](https://github.com/matikgal)*
