pathe-project/
│
├── .env.exemple
├── docker-compose.yml
├── package.json
├── package-lock.json
├── readme.md
│
├── database/
│   └── init/
│       ├── 001_pathe_initial_schema.sql
│       └── 002_pathe_seed_data.sql
│
├── server/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   │
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── db.js
│       │
│       ├── routes/
│       │   ├── branches.routes.js      ✅ DONE
│       │   └── reports.routes.js       ✅ DONE (receipt, sales, performance, theaters, movies)
│       │   ├── movies.routes.js        ⬜ TODO
│       │   ├── theaters.routes.js      ⬜ TODO
│       │   ├── showtimes.routes.js     ⬜ TODO
│       │   ├── sales.routes.js         ⬜ TODO
│       │   └── setup.routes.js         ⬜ TODO
│       │
│       ├── controllers/
│       │   ├── branches.controller.js  ✅ DONE
│       │   └── reports.controller.js   ✅ DONE
│       │   ├── movies.controller.js    ⬜ TODO
│       │   ├── theaters.controller.js  ⬜ TODO
│       │   ├── showtimes.controller.js ⬜ TODO
│       │   ├── sales.controller.js     ⬜ TODO
│       │   └── setup.controller.js     ⬜ TODO
│       │
│       └── services/
│           ├── branches.service.js     ✅ DONE
│           └── reports.service.js      ✅ DONE
│           ├── movies.service.js       ⬜ TODO
│           ├── theaters.service.js     ⬜ TODO
│           ├── showtimes.service.js    ⬜ TODO
│           ├── sales.service.js        ⬜ TODO
│           └── setup.service.js        ⬜ TODO
│
└── client/
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    ├── .gitignore
    │
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    │
    └── src/
        ├── main.jsx                    ✅ DONE
        ├── App.jsx                     ✅ DONE (5 routes configurées)
        ├── App.css
        ├── index.css
        │
        ├── assets/
        │   ├── react.svg
        │   └── vite.svg
        │
        ├── api/
        │   ├── http.js                 ✅ DONE (axios wrapper)
        │   ├── movies.api.js           ⬜ TODO (fichier vide)
        │   ├── theaters.api.js         ⬜ TODO (fichier vide)
        │   ├── showtimes.api.js        ⬜ TODO (fichier vide)
        │   ├── sales.api.js            ⬜ TODO (fichier vide)
        │   └── reports.api.js          ⬜ TODO (fichier vide, logique dans PatheReports.jsx)
        │
        ├── components/
        │   ├── Navbar.jsx              ✅ DONE
        │   ├── DataList.jsx            ⬜ TODO (fichier vide)
        │   └── Modal.jsx               ⬜ TODO (fichier vide)
        │
        └── pages/
            ├── setup/
            │   └── BranchPage.jsx      ✅ DONE (liste + API call)
            │
            ├── movies/
            │   ├── MoviePage.jsx       ⬜ STUB (placeholder)
            │   └── MovieList.jsx       ⬜ TODO (fichier vide)
            │
            ├── theaters/
            │   ├── TheaterPage.jsx     ⬜ STUB (placeholder)
            │   └── TheaterList.jsx     ⬜ TODO (fichier vide)
            │
            ├── showtimes/
            │   ├── DailySetupPage.jsx  ⬜ TODO (fichier vide)
            │   ├── SeatPricingPage.jsx ⬜ TODO (fichier vide)
            │   └── ShowtimeList.jsx    ⬜ TODO (fichier vide)
            │
            ├── sales/
            │   ├── TicketSalesPage.jsx ⬜ STUB (placeholder)
            │   └── TicketSalesList.jsx ⬜ TODO (fichier vide)
            │
            └── reports/
                └── PatheReports.jsx    ✅ DONE (3 rapports Evan : receipt, sales, performance)