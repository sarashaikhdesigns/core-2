// Sample clothing items with colors
const clothingItems = {
  tops: [
    { id: 1, name: "White T-Shirt", color: "#ffffff", textColor: "#000000" },
    { id: 2, name: "Black Sweater", color: "#1f2937", textColor: "#ffffff" },
    { id: 3, name: "Blue Button-Up", color: "#3b82f6", textColor: "#ffffff" },
    { id: 4, name: "Red Polo", color: "#ef4444", textColor: "#ffffff" },
    { id: 5, name: "Green Hoodie", color: "#10b981", textColor: "#ffffff" },
  ],
  bottoms: [
    { id: 1, name: "Blue Jeans", color: "#1d4ed8", textColor: "#ffffff" },
    { id: 2, name: "Black Pants", color: "#111827", textColor: "#ffffff" },
    { id: 3, name: "Khaki Chinos", color: "#92400e", textColor: "#ffffff" },
    { id: 4, name: "Gray Shorts", color: "#9ca3af", textColor: "#000000" },
    { id: 5, name: "Navy Skirt", color: "#1e3a8a", textColor: "#ffffff" },
  ],
  shoes: [
    { id: 1, name: "White Sneakers", color: "#f9fafb", textColor: "#000000" },
    { id: 2, name: "Black Boots", color: "#1f2937", textColor: "#ffffff" },
    { id: 3, name: "Brown Loafers", color: "#92400e", textColor: "#ffffff" },
    { id: 4, name: "Red Heels", color: "#dc2626", textColor: "#ffffff" },
    { id: 5, name: "Blue Sandals", color: "#60a5fa", textColor: "#000000" },
  ],
  accessories: [
    { id: 1, name: "Silver Watch", color: "#d1d5db", textColor: "#000000" },
    { id: 2, name: "Gold Necklace", color: "#f59e0b", textColor: "#000000" },
    { id: 3, name: "Black Belt", color: "#111827", textColor: "#ffffff" },
    { id: 4, name: "Red Scarf", color: "#ef4444", textColor: "#ffffff" },
    { id: 5, name: "Blue Hat", color: "#3b82f6", textColor: "#ffffff" },
  ],
}

// Custom clothing items with uploaded images
const emptyCustomItems = {
  tops: [],
  bottoms: [],
  shoes: [],
  accessories: [],
}

// Current outfit
let currentOutfit = {
  top: clothingItems.tops[0],
  bottom: clothingItems.bottoms[0],
  shoes: clothingItems.shoes[0],
  accessory: clothingItems.accessories[0],
}

// Saved outfits
let savedOutfits = []

// Custom items
let customItems = { ...emptyCustomItems }

// User preferences
let userPreferences = {
  theme: "default",
  lastVisitedTab: "items",
  likedPosts: [],
}

// Get a random item from a category
function getRandomItem(category) {
  // Combine default and custom items
  const allItems = [...clothingItems[category], ...customItems[category]]
  return allItems[Math.floor(Math.random() * allItems.length)]
}

// Initialize saved outfits from localStorage
function loadSavedOutfits() {
  const saved = localStorage.getItem("savedOutfits")
  if (saved) {
    try {
      savedOutfits = JSON.parse(saved)
      console.log("Loaded saved outfits:", savedOutfits)
    } catch (e) {
      console.error("Error loading saved outfits:", e)
      savedOutfits = []
    }
  }
}

// Save outfits to localStorage
function saveSavedOutfits() {
  try {
    localStorage.setItem("savedOutfits", JSON.stringify(savedOutfits))
    console.log("Saved outfits to localStorage")
  } catch (e) {
    console.error("Error saving outfits:", e)
  }
}

// Initialize custom items from localStorage
function loadCustomItems() {
  const saved = localStorage.getItem("customItems")
  if (saved) {
    try {
      customItems = JSON.parse(saved)
      console.log("Loaded custom items:", customItems)
    } catch (e) {
      console.error("Error loading custom items:", e)
      customItems = { ...emptyCustomItems }
    }
  }
}

// Save custom items to localStorage
function saveCustomItems() {
  try {
    localStorage.setItem("customItems", JSON.stringify(customItems))
    console.log("Saved custom items to localStorage")
  } catch (e) {
    console.error("Error saving custom items:", e)
  }
}

// Load current outfit from localStorage
function loadCurrentOutfit() {
  const saved = localStorage.getItem("currentOutfit")
  if (saved) {
    try {
      currentOutfit = JSON.parse(saved)
      console.log("Loaded current outfit:", currentOutfit)
    } catch (e) {
      console.error("Error loading current outfit:", e)
      // Use default outfit if there's an error
      currentOutfit = {
        top: clothingItems.tops[0],
        bottom: clothingItems.bottoms[0],
        shoes: clothingItems.shoes[0],
        accessory: clothingItems.accessories[0],
      }
    }
  }
}

// Save current outfit to localStorage
function saveCurrentOutfit() {
  try {
    localStorage.setItem("currentOutfit", JSON.stringify(currentOutfit))
    console.log("Saved current outfit to localStorage")
  } catch (e) {
    console.error("Error saving current outfit:", e)
  }
}

// Load user preferences from localStorage
function loadUserPreferences() {
  const saved = localStorage.getItem("userPreferences")
  if (saved) {
    try {
      userPreferences = JSON.parse(saved)
      console.log("Loaded user preferences:", userPreferences)
    } catch (e) {
      console.error("Error loading user preferences:", e)
      userPreferences = {
        theme: "default",
        lastVisitedTab: "items",
        likedPosts: [],
      }
    }
  }
}

// Save user preferences to localStorage
function saveUserPreferences() {
  try {
    localStorage.setItem("userPreferences", JSON.stringify(userPreferences))
    console.log("Saved user preferences to localStorage")
  } catch (e) {
    console.error("Error saving user preferences:", e)
  }
}

// Add a new custom item
function addCustomItem(category, item) {
  customItems[category].push(item)
  saveCustomItems()
}

// Save a new outfit
function saveOutfit(outfit) {
  const outfitWithId = {
    ...outfit,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  }
  savedOutfits.push(outfitWithId)
  saveSavedOutfits()
  return outfitWithId
}

// Delete a saved outfit
function deleteOutfit(outfitId) {
  savedOutfits = savedOutfits.filter((outfit) => outfit.id !== outfitId)
  saveSavedOutfits()
}

// Toggle like on a post
function toggleLikePost(postId) {
  const index = userPreferences.likedPosts.indexOf(postId)
  if (index === -1) {
    userPreferences.likedPosts.push(postId)
  } else {
    userPreferences.likedPosts.splice(index, 1)
  }
  saveUserPreferences()
}

// Check if a post is liked
function isPostLiked(postId) {
  return userPreferences.likedPosts.includes(postId)
}

// Set the active tab and save it in preferences
function setActiveTab(tabName) {
  userPreferences.lastVisitedTab = tabName
  saveUserPreferences()
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load saved data
  loadSavedOutfits()
  loadCustomItems()
  loadCurrentOutfit()
  loadUserPreferences()

  // Apply user preferences
  if (userPreferences.theme !== "default") {
    document.body.classList.add(`theme-${userPreferences.theme}`)
  }

  // If we're on the closet page, try to restore the last active tab
  const tabButtons = document.querySelectorAll(".y2k-tab[data-tab]")
  if (tabButtons.length > 0) {
    const lastTab = document.querySelector(`.y2k-tab[data-tab="${userPreferences.lastVisitedTab}"]`)
    if (lastTab) {
      lastTab.click()
    }
  }

  // Mark liked posts
  document.querySelectorAll(".post").forEach((post) => {
    const postId = post.getAttribute("data-post-id")
    if (postId && isPostLiked(postId)) {
      const likeButton = post.querySelector(".like-action")
      if (likeButton) {
        likeButton.classList.add("liked")
      }
    }
  })

  console.log("StyleShare app initialized with localStorage support")
})
