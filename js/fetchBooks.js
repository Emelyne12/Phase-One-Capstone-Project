const API = "https://openlibrary.org/search.json?q=";

export async function fetchBooks() {
  const res = await fetch(API + "javascript");
  const data = await res.json();
  return normalizeBooks(data.docs.slice(0, 12));
}

export async function searchBooks(query) {
  const res = await fetch(API + encodeURIComponent(query));
  const data = await res.json();
  return normalizeBooks(data.docs.slice(0, 20));
}

function normalizeBooks(books) {
  return books.map(book => ({
    key: book.key,
    title: book.title,
    author: book.author_name ? book.author_name[0] : "Unknown",
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : null,
    readUrl: book.ia && book.ia.length
      ? `https://archive.org/details/${book.ia[0]}`
      : `https://openlibrary.org${book.key}`
  }));
}
