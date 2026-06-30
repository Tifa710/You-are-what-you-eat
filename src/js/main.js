//!==========================variables============================
const getMeals = document.querySelector("#mealsAndRecipes");
const productScanner = document.querySelector("#productScanner");
const foodLog = document.querySelector("#foodLog");
const areaBtn = document.querySelector("#area-btn");
const allRecipes = document.querySelector("#all-recipes-section");
const mealCategories = document.querySelector("#meal-categories-section");
const searchFiltersSection = document.querySelector("#search-filters-section");
const headerStart = document.querySelector("#header");
const categoriesGrid = document.querySelector("#categories-grid");
const recipesGrid = document.querySelector("#recipes-grid");
const mealDetails = document.querySelector("#meal-details");
const productSection = document.querySelector("#products-section");
const foodLogSection = document.querySelector("#foodlog-section");
const baseURL = "https://nutriplan-api.vercel.app/api/meals/";
let allMeals = [];
let allAreas = [];
let allCategories = [];
let selectedMeal;
//?==========================Events===============================
// taskContainer.addEventListener("click", (e) => {
//   const li = e.target.closest("li.task-item");
//   if (!li) return;
//   const i = li.dataset.index;

//   const deleteBtn = e.target.closest('[data-role="delete"]');
//   const completeBtn = e.target.closest('[data-role="completeIt"]');
//   if (deleteBtn) {
//     deleteTodo(allTodos[i].id);
//   } else if (completeBtn) {
//     markAsCompleted(allTodos[i].id, allTodos[i].completed);
//   }

getMeals.addEventListener("click", getMealsScreen);
productScanner.addEventListener("click", getProductScreen);
foodLog.addEventListener("click", getFoodLogScreen);
recipesGrid.addEventListener("click", (e) => {
  const mealId = e.target.closest(".recipe-card");
  if (!mealId) return;
  const bringMealId = mealId.dataset.index;
  getMealsDetailsScreen();
  displayMealDetails(bringMealId);
});
mealDetails.addEventListener("click", (e) => {
  if (e.target.closest("#back-to-meals-btn")) {
    getMealsScreen();
  }
});
areaBtn.addEventListener("click", (e) => {
  const button = e.target.closest(".area-button");

  if (!button) return;

  const area = button.dataset.area;

  getMealsByArea(area);
});
categoriesGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".category-card");

  if (!card) return;

  const category = card.dataset.category;

  getMealsByCategory(category);
});
//*===========================Functions============================
function getMealsScreen() {
  getMeals.classList.add("bg-emerald-50", "text-emerald-700");
  getMeals.classList.remove("text-gray-600");

  productScanner.classList.remove("bg-emerald-50", "text-emerald-700");
  productScanner.classList.add("text-gray-600");

  foodLog.classList.remove("bg-emerald-50", "text-emerald-700");
  foodLog.classList.add("text-gray-600");
  mealDetails.classList.add("hidden");
  mealCategories.classList.remove("hidden");
  searchFiltersSection.classList.remove("hidden");
  allRecipes.classList.remove("hidden");
  headerStart.classList.remove("hidden");
  productSection.classList.add("hidden");
  foodLogSection.classList.add("hidden");
}
function getMealsDetailsScreen() {
  getMeals.classList.add("bg-emerald-50", "text-emerald-700");
  getMeals.classList.remove("text-gray-600");

  productScanner.classList.remove("bg-emerald-50", "text-emerald-700");
  productScanner.classList.add("text-gray-600");

  foodLog.classList.remove("bg-emerald-50", "text-emerald-700");
  foodLog.classList.add("text-gray-600");
  mealDetails.classList.remove("hidden");
  mealCategories.classList.add("hidden");
  searchFiltersSection.classList.add("hidden");
  allRecipes.classList.add("hidden");
  headerStart.classList.add("hidden");
  productSection.classList.add("hidden");
  foodLogSection.classList.add("hidden");
}
function getProductScreen() {
  getMeals.classList.remove("bg-emerald-50", "text-emerald-700");
  getMeals.classList.add("text-gray-600");

  productScanner.classList.add("bg-emerald-50", "text-emerald-700");
  productScanner.classList.remove("text-gray-600");

  foodLog.classList.remove("bg-emerald-50", "text-emerald-700");
  foodLog.classList.add("text-gray-600");
  mealDetails.classList.add("hidden");
  mealCategories.classList.add("hidden");
  searchFiltersSection.classList.add("hidden");
  allRecipes.classList.add("hidden");
  headerStart.classList.add("hidden");
  productSection.classList.remove("hidden");
  foodLogSection.classList.add("hidden");
}
function getFoodLogScreen() {
  getMeals.classList.remove("bg-emerald-50", "text-emerald-700");
  getMeals.classList.add("text-gray-600");

  productScanner.classList.remove("bg-emerald-50", "text-emerald-700");
  productScanner.classList.add("text-gray-600");

  foodLog.classList.add("bg-emerald-50", "text-emerald-700");
  foodLog.classList.remove("text-gray-600");

  mealDetails.classList.add("hidden");
  mealCategories.classList.add("hidden");
  allRecipes.classList.add("hidden");
  searchFiltersSection.classList.add("hidden");
  headerStart.classList.add("hidden");
  productSection.classList.add("hidden");
  foodLogSection.classList.remove("hidden");
}
async function getMealsToDisplay() {
  const response = await fetch(`${baseURL}random?count=16`, {
    method: "GET",
  });
  const data = await response.json();
  allMeals = data.results;
  displayMeals();
}
async function getMealsByArea(area) {
  const response = await fetch(`${baseURL}filter?area=${area}`);

  const data = await response.json();

  allMeals = data.results;

  displayMeals();
}
async function getAreasToDisplay() {
  const response = await fetch(`${baseURL}areas`);
  const data = await response.json();

  allAreas = data.results;

  displayArea();
}

function displayArea() {
  let areaBox = "";

  for (let index = 0; index < allAreas.length; index++) {
    areaBox += `
      <button
        class="area-button px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
        data-area="${allAreas[index].name}"
      >
        ${allAreas[index].name}
      </button>
    `;
  }

  areaBtn.innerHTML = areaBox;
}
async function getCategoriesToDisplay() {
  const response = await fetch(`${baseURL}categories`);
  const data = await response.json();

  allCategories = data.results;
  displayCategories();
}

function displayCategories() {
  let categoriesBox = "";

  for (let index = 0; index < allCategories.length; index++) {
    categoriesBox += `
      <div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${allCategories[index].name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${allCategories[index].name}</h3>
                </div>
              </div>
        </div>`;
  }
  categoriesGrid.innerHTML = categoriesBox;
}
async function getMealsByCategory(category) {
  const response = await fetch(`${baseURL}filter?category=${category}`);

  const data = await response.json();

  allMeals = data.results;

  displayMeals();
}
function displayMeals() {
  let box = "";
  for (let index = 0; index < allMeals.length; index++) {
    box += ` <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-index="${index}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${allMeals[index].thumbnail}"
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                ${allMeals[index].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${allMeals[index].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${allMeals[index].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${allMeals[index].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${allMeals[index].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${allMeals[index].area}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  }
  recipesGrid.innerHTML = box;
}
function displayMealDetails(element) {
  let instructionsBox = "";
  let ingredientsBox = "";
  allMeals[element].instructions.forEach((instruction, index) => {
    instructionsBox += `
    <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
      <div
        class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
      >
        ${index + 1}
      </div>
      <p class="text-gray-700 leading-relaxed pt-2">
        ${instruction}
      </p>
    </div>
  `;
  });
  allMeals[element].ingredients.forEach((item) => {
    ingredientsBox += `
    <div
      class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
    >
      <input
        type="checkbox"
        class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
      />

      <span class="text-gray-700">
        <span class="font-medium text-gray-900">
          ${item.measure}
        </span>
        ${item.ingredient}
      </span>
    </div>
  `;
  });
  const embedUrl = allMeals[element].youtube.replace("watch?v=", "embed/");
  let box = `    <div class="max-w-7xl mx-auto">
          <!-- Back Button -->
          <button 
            id="back-to-meals-btn"
            class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Recipes</span>
          </button>

          <!-- Hero Section -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${allMeals[element].thumbnail}"
                alt="Teriyaki Chicken Casserole"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${allMeals[element].category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${allMeals[element].area}</span
                  >
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${allMeals[element].name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">485 cal/serving</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              data-meal-id="52772"
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Log This Meal</span>
            </button>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Ingredients -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
  <h2
    class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
  >
    <i class="fa-solid fa-list-check text-emerald-600"></i>
    Ingredients
    <span class="text-sm font-normal text-gray-500 ml-auto">
      ${allMeals[element].ingredients.length} items
    </span>
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    ${ingredientsBox}
  </div>
</div>

              <!-- Instructions -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                     ${instructionsBox}

                </div>
              </div>

              <!-- Video Section -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  <iframe
                    src="${embedUrl}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="
                      accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture;
                    "
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </div>
            </div>

            <!-- Right Column - Nutrition -->
            <div class="space-y-6">
              <!-- Nutrition Facts -->
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">485</p>
                    <p class="text-xs text-gray-500 mt-1">Total: 1940 cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">42g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: 84%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">52g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: 17%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">8g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: 12%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">4g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: 14%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">12g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: 24%"
                      ></div>
                    </div>
                  </div>

                  <div class="mt-6 pt-6 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">
                      Vitamins & Minerals (% Daily Value)
                    </h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Vitamin A</span>
                        <span class="font-medium">15%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Vitamin C</span>
                        <span class="font-medium">25%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Calcium</span>
                        <span class="font-medium">4%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Iron</span>
                        <span class="font-medium">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  mealDetails.innerHTML = box;
}
getCategoriesToDisplay();
getAreasToDisplay();
getMealsToDisplay();
getMealsScreen();
