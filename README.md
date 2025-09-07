# Usha-Logistics-Dashboard
The problem statement a Usha logistic dashboard in Odoo became extremely slow 30/40 seconds of refreshing when the connected to the live database millions of the records will be triggering so it becomes slow this is the issues streamed in single largest RCP call fetching and processing the data from the The related tables it causes n + 1 query.

How I Solved It:  
1. Split RPC Calls: Replaced one large call with multiple focused ones (vehicles, KPIs, delivery status)
2. Optimized Queries: Added indexes, used domain filters, and improved ORM usage
3. Async Frontend: Used JavaScript for asynchronous loading with skeleton placeholders
4. Lazy Loading: Loaded only visible vehicle rows initially
5. Client-Side Caching: Cached static KPI data to reduce server hits
6. WebSocket Integration: Replaced polling with push-based real-time updates for vehicle locations

Result:  
* Dashboard loads in under 2 seconds
* Real-time updates with smooth UX
* Scalable and production-ready architecture

Architectures
Usha-logistics-dashboard/
├── public/             # Frontend files (HTML, CSS, JS)
├── server.js           # Main backend file
├── db.js               # MySQL connection
└── routes/
    └── api.js          # API endpoints

    Commands 
     npm install socket.io // Installing the web socket
      npm install express mysql2 cors // Installing the express js and cros,Mysql
      node server.js // to run the node js server.
