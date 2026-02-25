# 📚 BookX

BookX is a responsive book discovery web app built with **HTML**, **Tailwind CSS**, and **JavaScript (ES Modules)**. It uses the **Open Library API** to fetch real book data, supports search, and lets users save favorite books using `localStorage`.

## ✨ Features

- Browse a default set of books on the home page
- Search books by title
- View book covers, titles, and authors
- Open a book/read link in a new tab
- Add books to Favorites
- Remove books from Favorites
- Favorites persist in browser storage (`localStorage`)
- Dedicated About page

## 🛠️ Tech Stack

- HTML5
- Tailwind CSS (CDN)
- JavaScript (ES6 modules)
- Open Library API
- Browser `localStorage`

## 📁 Project Structure

```text
.
├── index.html
└── js/
    ├── about.html
    ├── favorites.html
    ├── favorites.js
    ├── fetchBooks.js
    └── index.js
```

## 🚀 Getting Started

Because this project uses JavaScript modules (`type="module"`), run it with a local server.

### Option 1: VS Code Live Server

1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html`.
3. Click **Open with Live Server**.

### Option 2: Python Local Server

From the project root, run:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## 🔌 API Used

- Search endpoint: `https://openlibrary.org/search.json?q=`
- Cover images: `https://covers.openlibrary.org/b/id/{cover_id}-L.jpg`
- Read links via Archive.org/Open Library when available

## 📌 Notes

- Favorites are saved per browser/device (not a cloud account).
- Internet connection is required for fetching books.

## 👩‍💻 Author

Created by **[Your Name]**.

> Tip: Replace `[Your Name]` with your actual name before publishing.
