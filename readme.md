
### ARBORESCENCE ###


pathe-project/
│
├── database/                   # Pour stocker tes scripts SQL
│   └── init/
│       ├── 001_pathe_initial_schema.sql
│       └── 002_pathe_seed_data.sql
│
├── server/                     # TON BACKEND (Node.js / Express)
│   ├── package.json
│   └── src/
│       ├── app.js              # Configuration de Express
│       ├── server.js           # Point d'entrée pour lancer le serveur
│       ├── db.js               # Connexion à Supabase (pg)
│       │
│       ├── routes/             # Les URL de ton API (ex: router.get('/movies'))
│       │   ├── movies.routes.js
│       │   ├── theaters.routes.js
│       │   ├── showtimes.routes.js
│       │   ├── sales.routes.js
│       │   └── setup.routes.js # Pour tes "Simple Forms" (Branch, Language, etc.)
│       │
│       ├── controllers/        # La logique de réception des requêtes
│       │   ├── movies.controller.js
│       │   ├── theaters.controller.js
│       │   ├── showtimes.controller.js
│       │   ├── sales.controller.js
│       │   └── setup.controller.js
│       │
│       └── services/           # C'est ici qu'on mettra TOUT ton code SQL !
│           ├── movies.service.js
│           ├── theaters.service.js
│           ├── showtimes.service.js
│           ├── sales.service.js
│           └── setup.service.js
│
└── client/                     # TON FRONTEND (React / Vite)
    ├── package.json
    ├── index.html
    └── src/
        ├── main.jsx            # Point d'entrée React (avec ton Menu)
        ├── App.jsx             # Configuration des routes (React Router)
        ├── index.css           # Ton design (tu pourras reprendre le CSS du prof)
        │
        ├── api/                # Les fichiers pour appeler ton backend (fetch)
        │   ├── http.js         # Le wrapper de base (souvent donné par le prof)
        │   ├── movies.api.js
        │   ├── theaters.api.js
        │   ├── showtimes.api.js
        │   ├── sales.api.js
        │   └── reports.api.js
        │
        ├── components/         # Les petits bouts de code réutilisables
        │   ├── DataList.jsx    # Ton tableau pour afficher les listes
        │   └── Modal.jsx       # Pour les fenêtres Pop-up (ex: choisir un film)
        │
        └── pages/              # TES ÉCRANS VISUELS
            ├── movies/
            │   ├── MovieList.jsx
            │   └── MoviePage.jsx      # Ton fameux "Movie Setup Form"
            │
            ├── theaters/
            │   ├── TheaterList.jsx
            │   └── TheaterPage.jsx    # Le "Theater Setup Form"
            │
            ├── showtimes/
            │   ├── ShowtimeList.jsx
            │   ├── DailySetupPage.jsx # Le "Theater Showtime Daily Setup"
            │   └── SeatPricingPage.jsx# Le "Set Movie Seat Price"
            │
            ├── sales/
            │   ├── TicketSalesList.jsx
            │   └── TicketSalesPage.jsx# Le "Movie Tickets Sales Form"
            │
            ├── reports/
            │   └── PatheReports.jsx   # La page avec les onglets pour tes 12 rapports
            │
            └── setup/                 # Un dossier pour tous tes 9 formulaires simples
                ├── BranchPage.jsx
                ├── MemberPage.jsx
                ├── EmployeePage.jsx
                └── ... (autres simple forms)



### ARBORESCENCE ###

