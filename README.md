# FluxBoard // KANBAN_SYSTEM

Eksperymentalna, minimalistyczna aplikacja do zarządzania projektami typu Kanban, kładąca nacisk na unikalny design, typografię i interakcję ("Flux").

## 🎯 O Projekcie

FluxBoard odchodzi od tradycyjnego wyglądu narzędzi biurowych (SaaS). Zamiast standardowych kart i cieni, wykorzystuje surową estetykę inspirowaną brutalizmem cyfrowym oraz stylem "Swiss Style". Interfejs jest responsywny i zaprojektowany z myślą o płynności działania.

### ✨ Kluczowe Funkcje

*   **System Przeciągnij i Upuść (Drag & Drop)**: Płynne przenoszenie zadań między kolumnami.
*   **Dualizm Motywów**: 
    *   *Void* (Ciemny): Głębokie grafity, surowy kontrast.
    *   *Paper* (Jasny): Estetyka technicznego papieru i betonu.
*   **Zarządzanie Zadaniami**:
    *   Podzadania (Checklisty).
    *   Tagowanie i Priorytetyzacja.
    *   Śledzenie czasu pracy (Time Tracking).
    *   Historia zmian (Audit Log).
*   **UX**:
    *   Zwijanie kolumn (Focus Mode).
    *   Obsługa skrótów klawiszowych (ESC, Enter).
    *   Filtrowanie w czasie rzeczywistym.
*   **Persistence**: Automatyczny zapis stanu tablicy i motywu w pamięci lokalnej przeglądarki (LocalStorage).

## 🛠️ Technologie

Projekt został zbudowany w oparciu o nowoczesny stack frontendowy:

*   **React 19**: Wykorzystanie najnowszych hooków i mechanizmów renderowania.
*   **TypeScript**: Pełne typowanie danych (Interfejsy dla Task, Column, History).
*   **Tailwind CSS**: Utility-first CSS do stylizacji i responsywności.
*   **SVG Icons**: Ręcznie rysowane, abstrakcyjne ikony (bez zewnętrznych bibliotek ikon).
*   **Fonty**: 
    *   *Syne*: Nagłówki i elementy displayowe.
    *   *Space Grotesk*: Tekst główny i interfejs.

## 🚀 Uruchomienie

Aplikacja działa całkowicie po stronie klienta (Client-Side). Nie wymaga konfiguracji bazy danych.

1. Zainstaluj zależności: `npm install`
2. Uruchom serwer deweloperski: `npm start`
3. Otwórz w przeglądarce.

---
*Design & Code by System_v.1.0*