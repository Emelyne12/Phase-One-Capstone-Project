import { fetchBooks, searchBooks } from './fetchBooks.js';
import { addToFavorites } from './favorites.js';

window.addToFavorites = addToFavorites;

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const booksGrid = document.getElementById('booksGrid');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const noResults = document.getElementById('noResults');

async function loadBooks(query = '') {
  loading.classList.remove('hidden');
  error.classList.add('hidden');
  noResults.classList.add('hidden');
  booksGrid.innerHTML = '';

  try {
    let books = query.trim() === '' ? await fetchBooks() : await searchBooks(query);
    if (!books || books.length === 0) {
      noResults.classList.remove('hidden');
      return;
    }
    renderBooks(books);
  } catch (err) {
    error.textContent = 'Failed to load books. Please try again.';
    error.classList.remove('hidden');
    console.error(err);
  } finally {
    loading.classList.add('hidden');
  }
}

function renderBooks(books) {
  booksGrid.innerHTML = books.map(book => `
    <div class="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden group cursor-pointer">
      <div class="h-64 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
        ${book.coverUrl ? `<img src="${book.coverUrl}" alt="${book.title}" class="w-48 h-64 object-cover rounded-t-2xl shadow-lg">` : `<div class="text-gray-400 text-4xl">📖</div>`}
      </div>
      <div class="p-6">
        <h3 class="font-bold text-xl mb-2 line-clamp-2 group-hover:text-indigo-600">${book.title}</h3>
        <p class="text-gray-600 mb-3 line-clamp-2">${book.author || 'Unknown Author'}</p>
        <div class="grid grid-cols-2 gap-2">
          <button onclick="addToFavorites(${JSON.stringify(book).replace(/"/g, '&quot;')})" class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all">
            Favorite ❤️
          </button>
          <button onclick="window.open('${book.readUrl || `https://openlibrary.org${book.key}`}', '_blank')" class="bg-emerald-600 text-white py-3 px-4 rounded-2xl font-semibold hover:bg-emerald-700 transition-all">
            Read 📖
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  searchBtn.addEventListener('click', () => loadBooks(searchInput.value.trim()));
  searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') loadBooks(searchInput.value.trim()); });
  loadBooks();
});