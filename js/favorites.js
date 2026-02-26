export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function addToFavorites(book) {
  let favs = getFavorites();

  // Debug: check if book has key
  if (!book.key) {
    alert("Error: Book has no key property");
    console.error("Book object:", book);
    return;
  }

  if (!favs.find(f => f.key === book.key)) {
    favs.push(book);
    localStorage.setItem("favorites", JSON.stringify(favs));
    alert(`"${book.title}" added to favorites ❤️`);
  } else {
    alert(`"${book.title}" is already in favorites!`);
  }
}

export function removeFromFavorites(key) {
  let favs = getFavorites().filter(f => f.key !== key);
  localStorage.setItem("favorites", JSON.stringify(favs));
  displayFavorites();
}

export function openFavorite(key) {
  const url = `https://openlibrary.org${key}`;
  window.open(url, "_blank");
}

// Display favorites when page loads
function displayFavorites() {
  const favoritesGrid = document.getElementById("favoritesGrid");
  const emptyFavorites = document.getElementById("emptyFavorites");
  
  // Only run if these elements exist (on favorites.html page)
  if (!favoritesGrid || !emptyFavorites) {
    return;
  }

  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesGrid.classList.add("hidden");
    emptyFavorites.classList.remove("hidden");
    return;
  }

  favoritesGrid.classList.remove("hidden");
  emptyFavorites.classList.add("hidden");

  favoritesGrid.innerHTML = favorites.map(book => `
    <div class="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden group">
      <div class="h-64 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
        ${book.coverUrl ? `<img src="${book.coverUrl}" alt="${book.title}" class="w-48 h-64 object-cover rounded-t-2xl shadow-lg">` : `<div class="text-gray-400 text-4xl">📖</div>`}
      </div>
      <div class="p-6">
        <h3 class="font-bold text-xl mb-2 line-clamp-2">${book.title}</h3>
        <p class="text-gray-600 mb-3 line-clamp-2">${book.author || 'Unknown Author'}</p>
        <button onclick="removeFromFavorites('${book.key}')" 
                class="w-full bg-red-500 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-red-600 transition-all">
          Remove ❌
        </button>
      </div>
    </div>
  `).join("");
}

// Make removeFromFavorites global
window.removeFromFavorites = removeFromFavorites;

// Display on page load ONLY if elements exist
document.addEventListener("DOMContentLoaded", displayFavorites);
