# Personal Book Manager

A full-stack Personal Book Manager built with the **MERN Stack** and **Next.js App Router**.

The application allows users to securely manage their personal reading collection by adding, editing, deleting, searching, filtering, and organizing books.

---

## Live Demo

Frontend: [https://live-frontend-url.vercel.app]( https://personal-book-manager-1b0z9e3z0-shivaswami841gmailcoms-projects.vercel.app/register )

Backend API: [https://live-backend-url.com](https://personal-book-manager-tig3.onrender.com)

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Logout

---

### Book Management

- Add Books
- Edit Books
- Delete Books
- Reading Status Management
- Tags Support

---

### Search & Filter

- Search by Title
- Search by Author
- Filter by Reading Status
- Filter by Tags
- Sort by
  - Newest
  - Title
  - Author

---

- Total Books
- Reading Books
- Completed Books
- Want to Read Books
- Beautiful Responsive UI

---

### User Experience

- Responsive Design
- Confirmation Dialog before Delete
- Toast Notifications
- Loading States
- Empty State UI
- Modern Dashboard Layout

---

# Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Sonner

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Zod Validation

---

# Project Structure

```
personal-book-manager
│
├── client/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── utils/
│
├── server/
│   ├── controller/
│   ├── dto/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── config/
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/personal-book-manager.git
```

```bash
cd personal-book-manager
```

---

## Backend Setup

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create

```
.env
```

Run

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
```

Install dependencies

```bash
npm install
```

Create

```
.env.local
```

Run

```bash
npm run dev
```

---

# Environment Variables

## Backend

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

CLIENT_URL=
```

---

## Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| POST | /api/auth/logout | Logout User |
| GET | /api/auth/me | Current User |

---

## Books

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/books | Get Books |
| POST | /api/books | Create Book |
| GET | /api/books/:id | Get Book |
| PATCH | /api/books/:id | Update Book |
| DELETE | /api/books/:id | Delete Book |

---

# Future Improvements

- Debounced Search
- Separate Dashboard Statistics API
- Pagination UI
- Book Cover Upload
- Dark Mode

---

# Author

**Shiva Silmawala**

GitHub:
https://github.com/groot-2001

LinkedIn:
https://www.linkedin.com/in/shiva-silmawala-0876261a3/

---

## 📄 License

This project was built as part of the **Thumbstack Personal Book Manager Assignment**.
