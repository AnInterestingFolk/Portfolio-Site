console.log('script.js підключено');

const portfolioWorks = [
  { title: 'Безкрайній чистий океан', year: 2022, category: 'photography' },
  { title: 'Одинокий дуб у тумані', year: 2025, category: 'photography' },
  { title: 'Нічний зоряний сосновий ліс', year: 2026, category: 'photography' }
];

// Arrow function to check if the project is recent (not older than 2 years relative to 2026)
const isRecent = year => (2026 - year) <= 2;

// Filter and log portfolio works based on the requested category
function logCategoryWorks(categoryName) {
  console.log(`--- Роботи в категорії: ${categoryName} ---`);
  
  for (const work of portfolioWorks) {
    if (work.category === categoryName) {
      const age = 2026 - work.year;
      let note = isRecent(work.year) ? '[Нова робота]' : '';
      
      if (age > 3) {
        note = '[Старше 3 років]';
      }
      
      console.log(`Проєкт: ${work.title} | Рік: ${work.year} ${note}`);
    }
  }
}

logCategoryWorks('photography');