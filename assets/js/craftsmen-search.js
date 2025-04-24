// assets/js/craftsmen-search.js

// زر "تحميل المزيد"
document.getElementById('loadMoreCraftsmen').addEventListener('click', function() {
    const hiddenCards = document.querySelectorAll('.craftsman-card.hidden');
    hiddenCards.forEach(card => {
        card.classList.remove('hidden');
    });
    this.style.display = 'none';
});

// زر "إعادة تعيين الفلاتر"
document.getElementById('reset-filters').addEventListener('click', function() {
    document.getElementById('specialty-filter').value = '';
    document.getElementById('city-filter').value = '';
    document.getElementById('rating-filter').value = '';
    document.getElementById('price-filter').value = '';
    document.getElementById('experience-filter').value = '';
    document.getElementById('sort-by').value = 'rating-desc';
    filterAndSortCraftsmen();
});

// تصفية وفرز الحرفيين
const specialtyFilter = document.getElementById('specialty-filter');
const cityFilter = document.getElementById('city-filter');
const ratingFilter = document.getElementById('rating-filter');
const priceFilter = document.getElementById('price-filter');
const experienceFilter = document.getElementById('experience-filter');
const sortBy = document.getElementById('sort-by');
const craftsmenGrid = document.getElementById('craftsmenGrid');
const noResults = document.getElementById('no-results');

function filterAndSortCraftsmen() {
    const selectedSpecialty = specialtyFilter.value;
    const selectedCity = cityFilter.value;
    const selectedRating = ratingFilter.value;
    const selectedPrice = priceFilter.value;
    const selectedExperience = experienceFilter.value;
    const sortOption = sortBy.value;

    let cards = Array.from(craftsmenGrid.querySelectorAll('.craftsman-card'));

    // التصفية
    cards = cards.filter(card => {
        const specialty = card.getAttribute('data-specialty');
        const city = card.getAttribute('data-city');
        const rating = parseFloat(card.getAttribute('data-rating'));
        const price = parseFloat(card.getAttribute('data-price'));
        const experience = parseFloat(card.getAttribute('data-experience'));

        let matchesSpecialty = selectedSpecialty === '' || specialty === selectedSpecialty;
        let matchesCity = selectedCity === '' || city === selectedCity;
        let matchesRating = true;
        let matchesPrice = true;
        let matchesExperience = true;

        if (selectedRating === '4+') {
            matchesRating = rating >= 4;
        } else if (selectedRating === '3+') {
            matchesRating = rating >= 3;
        }

        if (selectedPrice === '30-50') {
            matchesPrice = price >= 30 && price <= 50;
        } else if (selectedPrice === '50-100') {
            matchesPrice = price > 50 && price <= 100;
        } else if (selectedPrice === '100+') {
            matchesPrice = price > 100;
        }

        if (selectedExperience === '0-2') {
            matchesExperience = experience >= 0 && experience <= 2;
        } else if (selectedExperience === '3-5') {
            matchesExperience = experience >= 3 && experience <= 5;
        } else if (selectedExperience === '5+') {
            matchesExperience = experience > 5;
        }

        return matchesSpecialty && matchesCity && matchesRating && matchesPrice && matchesExperience;
    });

    // الفرز
    if (sortOption === 'rating-desc') {
        cards.sort((a, b) => parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating')));
    } else if (sortOption === 'price-asc') {
        cards.sort((a, b) => parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price')));
    } else if (sortOption === 'price-desc') {
        cards.sort((a, b) => parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price')));
    }

    // إعادة ترتيب البطاقات
    craftsmenGrid.innerHTML = '';
    if (cards.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        cards.forEach(card => craftsmenGrid.appendChild(card));
    }

    // إظهار/إخفاء زر "تحميل المزيد"
    const hiddenCards = cards.filter(card => card.classList.contains('hidden'));
    document.getElementById('loadMoreCraftsmen').style.display = hiddenCards.length > 0 ? 'block' : 'none';
}

// ربط الأحداث بمدخلات التصفية والفرز
specialtyFilter.addEventListener('change', filterAndSortCraftsmen);
cityFilter.addEventListener('change', filterAndSortCraftsmen);
ratingFilter.addEventListener('change', filterAndSortCraftsmen);
priceFilter.addEventListener('change', filterAndSortCraftsmen);
experienceFilter.addEventListener('change', filterAndSortCraftsmen);
sortBy.addEventListener('change', filterAndSortCraftsmen);

// زر البحث
document.querySelector('.search-box .btn-primary').addEventListener('click', function(e) {
    e.preventDefault();
    filterAndSortCraftsmen();
});

// تشغيل التصفية عند تحميل الصفحة
filterAndSortCraftsmen();