console.log('script.js loaded and DOM manipulation started');

// Data array
const portfolioWorks = [
  { title: 'Безкрайній чистий океан', year: 2022, category: 'photography', image: 'assets/img/project1.jpg' },
  { title: 'Одинокий дуб у тумані', year: 2025, category: 'photography', image: 'assets/img/project2.jpg' },
  { title: 'Нічний зоряний сосновий ліс', year: 2026, category: 'photography', image: 'assets/img/project3.jpg' }
];

const isRecent = year => (2026 - year) <= 2;

// DOM Containers
const galleryContainer = document.querySelector('#gallery');
const countElement = document.querySelector('#projects-count');

// Render function
function renderProjects(worksArray) {
  galleryContainer.innerHTML = '';
  
  for (const work of worksArray) {
    const article = document.createElement('article');
    // Save category to data attribute for easier filtering later
    article.dataset.category = work.category;
    
    const img = document.createElement('img');
    const title = document.createElement('h3');
    const yearText = document.createElement('p');
    
    // If a new project doesn't have a local image, show a placeholder block
    img.src = work.image || 'https://via.placeholder.com/400x300?text=New+Project';
    img.alt = work.title;
    title.textContent = work.title;
    yearText.textContent = `Рік створення: ${work.year}`;
    
    yearText.style.margin = '0';
    yearText.style.padding = '0 15px 15px 15px';
    yearText.style.fontSize = '0.85rem';
    yearText.style.color = '#777777';
    
    if (isRecent(work.year)) {
      article.classList.add('recent');
    }
    
    article.append(img, title, yearText);
    galleryContainer.append(article);
  }
  
  countElement.textContent = `Кількість робіт: ${worksArray.length}`;
}

// Initial render
renderProjects(portfolioWorks);

// --- LAB 8 LOGIC: Events & Forms ---

// Select form and interactive DOM elements
const addProjectForm = document.querySelector('#add-project-form');
const titleInput = document.querySelector('#title-input');
const yearInput = document.querySelector('#year-input');
const categoryInput = document.querySelector('#category-input');
const categoryFilter = document.querySelector('#category-filter');

// Custom Validation on input event
yearInput.addEventListener('input', () => {
  const yearValue = Number(yearInput.value);
  if (yearValue > 2026) {
    // Exception catch for when the year is above 2026
    yearInput.setCustomValidity('Year cannot be in the future');
  } else {
    // Resets to valid state
    yearInput.setCustomValidity(''); 
  }
});

// Submit event: Prevent reload, push data, re-render
addProjectForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  
  const newProject = {
    title: titleInput.value.trim(),
    year: Number(yearInput.value),
    category: categoryInput.value,
    image: '' 
  };
  
  portfolioWorks.push(newProject);
  renderProjects(portfolioWorks);
  addProjectForm.reset();
});

// Change event: Filter gallery items based on dropdown selection
categoryFilter.addEventListener('change', () => {
  const selectedCategory = categoryFilter.value;
  const allArticles = galleryContainer.querySelectorAll('article');
  
  for (const article of allArticles) {
    const doesNotMatch = selectedCategory !== 'all' && article.dataset.category !== selectedCategory;
    // Add 'hidden' class if it does not match, remove if it matches
    article.classList.toggle('hidden', doesNotMatch);
  }
});