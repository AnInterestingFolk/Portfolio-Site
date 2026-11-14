console.log('script.js loaded and DOM manipulation started');

// Data array with added image paths
const portfolioWorks = [
  { title: 'Безкрайній чистий океан', year: 2022, category: 'photography', image: 'assets/img/project1.jpg' },
  { title: 'Одинокий дуб у тумані', year: 2025, category: 'photography', image: 'assets/img/project2.jpg' },
  { title: 'Нічний зоряний сосновий ліс', year: 2026, category: 'photography', image: 'assets/img/project3.jpg' }
];

// Arrow function to check if the project is recent (not older than 2 years)
const isRecent = year => (2026 - year) <= 2;

// Select DOM containers
const galleryContainer = document.querySelector('#gallery');
const countElement = document.querySelector('#projects-count');

// Function to render projects dynamically
function renderProjects(worksArray) {
  // Clear the container before rendering
  galleryContainer.innerHTML = '';
  
  for (const work of worksArray) {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    const yearText = document.createElement('p');
    
    // Set attributes and content
    img.src = work.image;
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

renderProjects(portfolioWorks);