// assets/js/specialties.js

// زر "تحميل المزيد"
document.getElementById('loadMoreSpecialties').addEventListener('click', function() {
    const hiddenCards = document.querySelectorAll('.specialty-card.hidden');
    hiddenCards.forEach(card => {
        card.classList.remove('hidden');
    });
    this.style.display = 'none';
});

// تصفية التخصصات
const specialtySearch = document.getElementById('specialty-search');
const cityFilter = document.getElementById('city-filter');
const ratingFilter = document.getElementById('rating-filter');
const priceFilter = document.getElementById('price-filter');
const specialtiesGrid = document.getElementById('specialtiesGrid');

function filterSpecialties() {
    const searchText = specialtySearch.value.trim().toLowerCase();
    const selectedCity = cityFilter.value;
    const selectedRating = ratingFilter.value;
    const selectedPrice = priceFilter.value;

    const cards = specialtiesGrid.querySelectorAll('.specialty-card');

    cards.forEach(card => {
        const specialty = card.getAttribute('data-specialty').toLowerCase();
        const city = card.getAttribute('data-city');
        const rating = parseFloat(card.getAttribute('data-rating'));
        const price = parseFloat(card.getAttribute('data-price'));

        let matchesSearch = searchText === '' || specialty.includes(searchText);
        let matchesCity = selectedCity === '' || city === selectedCity;
        let matchesRating = true;
        let matchesPrice = true;

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

        if (matchesSearch && matchesCity && matchesRating && matchesPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ربط الأحداث بمدخلات التصفية
specialtySearch.addEventListener('input', filterSpecialties);
cityFilter.addEventListener('change', filterSpecialties);
ratingFilter.addEventListener('change', filterSpecialties);
priceFilter.addEventListener('change', filterSpecialties);

// زر البحث
document.querySelector('.search-box .btn-primary').addEventListener('click', function(e) {
    e.preventDefault();
    filterSpecialties();
});