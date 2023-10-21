let favoriteItems = JSON.parse(localStorage.getItem("productsFavorite"));
let favoriteItemsContainer = document.querySelector(".favorite-items");

function initializeFavoriteItems() {
  if (favoriteItems && favoriteItems.length > 0) {
    drawFavoriteItemsUI(favoriteItems);
  } else {
    favoriteItemsContainer.innerHTML = "<p>No favorite items</p>";
  }
}

initializeFavoriteItems();

function drawFavoriteItemsUI(items) {
  favoriteItemsContainer.innerHTML = ""; // Clear the container

  items.forEach((item) => {
    const favoriteItem = document.createElement("div");
    favoriteItem.classList.add("favorite-item");

    // Create HTML structure for the favorite item
    favoriteItem.innerHTML = `
      <div class="favorite-item-details product-item">
        <img src="${item.imageUrl}" alt="${item.title}" class="favorite-item-image product-item-img">
        <div class="favorite-item-info">
          <h3>${item.title}</h3>
          <p>Size: ${item.size}</p>
        </div>
      </div>
      <button class="remove-favorite" data-id="${item.id}">Remove</button>
    `;

    favoriteItemsContainer.appendChild(favoriteItem);
  });

  // Add click event listeners to remove favorite items
  const removeButtons = document.querySelectorAll(".remove-favorite");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = this.getAttribute("data-id");
      // Remove the item with the given ID from favorite items
      favoriteItems = favoriteItems.filter((item) => item.id !== itemId);
      localStorage.setItem("productsFavorite", JSON.stringify(favoriteItems));
      // Update the favorite items display
      favoriteItemsContainer.removeChild(this.parentElement);

      if (favoriteItems.length === 0) {
        favoriteItemsContainer.innerHTML = "<p>No favorite items</p>";
      }
    });
  });
}
