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
  top: null,
  bottom: null,
  shoes: null,
  accessory: null,
}

// Saved outfits
let savedOutfits = []

// Custom items
let customItems = { ...emptyCustomItems }

// DOM elements
const tabBtns = document.querySelectorAll(".tab-btn")
const tabContents = document.querySelectorAll(".tab-content")
const shuffleBtns = document.querySelectorAll(".shuffle-btn")
const fileInputs = document.querySelectorAll(".file-input")
const randomizeAllBtn = document.getElementById("randomize-all")
const saveOutfitBtn = document.getElementById("save-outfit")
const savedOutfitsContainer = document.getElementById("saved-outfits")
const savedCountElement = document.getElementById("saved-count")

// Initialize the app
function init() {
  // Load saved outfits from localStorage
  loadSavedOutfits()
  
  // Load custom items from localStorage
  loadCustomItems()

  // Generate initial outfit
  randomizeOutfit()

  // Set up event listeners
  setupEventListeners()
}

// Get a random item from a category
function getRandomItem(category) {
  // Combine default and custom items
  const allItems = [...clothingItems[category], ...customItems[category]]
  return allItems[Math.floor(Math.random() * allItems.length)]
}

// Update the UI with the current outfit
function updateOutfitUI() {
  // Update top
  updateItemUI("top", currentOutfit.top)
  
  // Update bottom
  updateItemUI("bottom", currentOutfit.bottom)
  
  // Update shoes
  updateItemUI("shoes", currentOutfit.shoes)
  
  // Update accessory
  updateItemUI("accessory", currentOutfit.accessory)
}

// Update a specific item in the UI
function updateItemUI(itemType, item) {
  const imageElement = document.getElementById(`${itemType}-image`)
  const nameElement = document.getElementById(`${itemType}-name`)
  
  if (item) {
    if (item.imageUrl) {
      // Custom item with image
      imageElement.style.backgroundImage = `url(${item.imageUrl})`
      imageElement.style.backgroundColor = "transparent"
      imageElement.textContent = ""
    } else {
      // Default item with color
      imageElement.style.backgroundImage = "none"
      imageElement.style.backgroundColor = item.color
      imageElement.style.color = item.textColor
      imageElement.textContent = item.name
    }
    nameElement.textContent = item.name
  } else {
    // No item selected
    imageElement.style.backgroundImage = "none"
    imageElement.style.backgroundColor = "#cccccc"
    imageElement.textContent = "Select an item"
    nameElement.textContent = "None selected"
  }
}

// Randomize the entire outfit
function randomizeOutfit() {
  currentOutfit = {
    top: getRandomItem("tops"),
    bottom: getRandomItem("bottoms"),
    shoes: getRandomItem("shoes"),
    accessory: getRandomItem("accessories"),
  }

  updateOutfitUI()
}

// Randomize a specific item
function randomizeItem(category) {
  const categoryMap = {
    tops: "top",
    bottoms: "bottom",
    shoes: "shoes",
    accessories: "accessory",
  }

  const key = categoryMap[category]
  currentOutfit[key] = getRandomItem(category)

  updateOutfitUI()
}

// Handle file upload
function handleFileUpload(category, event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const newItem = {
      id: Date.now(),
      name: file.name.split(".")[0],
      imageUrl: e.target.result,
      isCustom: true,
    }

    // Add to custom items
    customItems[category].push(newItem)
    saveCustomItems()

    // Update current outfit with the new item
    const categoryMap = {
      tops: "top",
      bottoms: "bottom",
      shoes: "shoes",
      accessories: "accessory",
    }

    const key = categoryMap[category]
    currentOutfit[key] = newItem

    updateOutfitUI()
  }
  reader.readAsDataURL(file)
}

// Save the current outfit
function saveOutfit() {
  savedOutfits.push({ ...currentOutfit })
  saveSavedOutfits()
  updateSavedOutfitsUI()
}

// Delete a saved outfit
function deleteOutfit(index) {
  savedOutfits.splice(index, 1)
  saveSavedOutfits()
  updateSavedOutfitsUI()
}

// Use a saved outfit
function useOutfit(index) {
  currentOutfit = { ...savedOutfits[index] }
  updateOutfitUI()

  // Switch to generator tab
  switchTab("generator")
}

// Update the saved outfits UI
function updateSavedOutfitsUI() {
  // Update saved count
  savedCountElement.textContent = savedOutfits.length

  // Clear the container
  savedOutfitsContainer.innerHTML = ""

  // If no saved outfits, show empty message
  if (savedOutfits.length === 0) {
    savedOutfitsContainer.innerHTML =
      '<p class="empty-message">No saved outfits yet. Generate and save some outfits first!</p>'
    return
  }

  // Add each saved outfit
  savedOutfits.forEach((outfit, index) => {
    const outfitElement = document.createElement("div")
    outfitElement.className = "saved-outfit"

    outfitElement.innerHTML = `
      <div class="saved-outfit-title">Outfit #${index + 1}</div>
      <div class="saved-outfit-grid">
        ${createSavedOutfitItem(outfit.top, "Top")}
        ${createSavedOutfitItem(outfit.bottom, "Bottom")}
        ${createSavedOutfitItem(outfit.shoes, "Shoes")}
        ${createSavedOutfitItem(outfit.accessory, "Accessory")}
      </div>
      <div class="saved-outfit-actions">
        <button class="delete-btn" data-index="${index}">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          Delete
        </button>
        <button class="use-btn" data-index="${index}">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          Use This
        </button>
      </div>
    `

    savedOutfitsContainer.appendChild(outfitElement)
  })

  // Add event listeners to the new buttons
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = Number.parseInt(e.currentTarget.dataset.index)
      deleteOutfit(index)
    })
  })

  document.querySelectorAll(".use-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = Number.parseInt(e.currentTarget.dataset.index)
      useOutfit(index)
    })
  })
}

// Create HTML for a saved outfit item
function createSavedOutfitItem(item, label) {
  if (!item) return `
    <div class="saved-outfit-item" style="background-color: #cccccc;">
      ${label}: None
    </div>
  `

  if (item.imageUrl) {
    return `
      <div class="saved-outfit-item" style="background-image: url(${item.imageUrl});">
      </div>
    `
  } else {
    return `
      <div class="saved-outfit-item" style="background-color: ${item.color}; color: ${item.textColor};">
        ${label}: ${item.name}
      </div>
    `
  }
}

// Switch between tabs
function switchTab(tabId) {
  // Update tab buttons
  tabBtns.forEach((btn) => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add("active")
    } else {
      btn.classList.remove("active")
    }
  })

  // Update tab contents
  tabContents.forEach((content) => {
    if (content.id === tabId) {
      content.classList.add("active")
    } else {
      content.classList.remove("active")
    }
  })
}

// Save outfits to localStorage
function saveSavedOutfits() {
  localStorage.setItem("savedOutfits", JSON.stringify(savedOutfits))
}

// Load outfits from localStorage
function loadSavedOutfits() {
  const saved = localStorage.getItem("savedOutfits")
  if (saved) {
    savedOutfits = JSON.parse(saved)
    updateSavedOutfitsUI()
  }
}

// Save custom items to localStorage
function saveCustomItems() {
  localStorage.setItem("customItems", JSON.stringify(customItems))
}

// Load custom items from localStorage
function loadCustomItems() {
  const saved = localStorage.getItem("customItems")
  if (saved) {
    customItems = JSON.parse(saved)
  }
}

// Set up event listeners
function setupEventListeners() {
  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab)
    })
  })

  // Shuffle buttons
  shuffleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      randomizeItem(btn.dataset.category)
    })
  })

  // File inputs for uploads
  fileInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      handleFileUpload(e.target.dataset.category, e)
    })
  })

  // Randomize all button
  randomizeAllBtn.addEventListener("click", randomizeOutfit)

  // Save outfit button
  saveOutfitBtn.addEventListener("click", saveOutfit)
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", init)