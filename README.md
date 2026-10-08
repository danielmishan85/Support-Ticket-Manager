# Support Ticket Manager

https://github.com/user-attachments/assets/059cef54-af79-49a7-aefb-ce46d0edcdff

Requires Node.js and npm.

## Start the server

```bash
cd server
npm install
npm run dev
```

The API starts at `http://localhost:5001`.

## API endpoints

- `GET /api/tickets`
- `POST /api/tickets`
- `PATCH /api/tickets/:id/resolve`

## Start the client

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

The client lets you:

- View all support tickets
- Filter tickets by status
- Create new tickets
- Mark open tickets as resolved
