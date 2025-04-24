// assets/js/specialty-craftsmen.js

// زر "تحميل المزيد"
document.getElementById('loadMoreCraftsmen').addEventListener('click', function() {
    const hiddenCards = document.querySelectorAll('.craftsman-card.hidden');
    hiddenCards.forEach(card => {
        card.classList.remove('hidden');
    });
    this.style.display = 'none';
});

// استرجاع التخصص من الرابط
const urlParams = new URLSearchParams(window.location.search);
const selectedSpecialty = urlParams.get('specialty') || 'نجارة';
document.getElementById('specialty-title').textContent = selectedSpecialty;

// تصفية وفرز الحرفيين
const sortBy = document.getElementById('sort-by');
const craftsmenGrid = document.getElementById('craftsmenGrid');
const noResults = document.getElementById('no-results');

function filterAndSortCraftsmen() {
    let cards = Array.from(craftsmenGrid.querySelectorAll('.craftsman-card'));

    // تصفية الحرفيين بناءً على التخصص المختار
    cards = cards.filter(card => {
        const specialty = card.getAttribute('data-specialty');
        return specialty === selectedSpecialty;
    });

    // الفرز
    const sortOption = sortBy.value;
    if (sortOption === 'default') {
        cards.sort((a, b) => {
            const aFeatured = a.getAttribute('data-featured') === 'true' ? 1 : 0;
            const bFeatured = b.getAttribute('data-featured') === 'true' ? 1 : 0;
            const aVerified = a.getAttribute('data-verified') === 'true' ? 1 : 0;
            const bVerified = b.getAttribute('data-verified') === 'true' ? 1 : 0;
            const aRating = parseFloat(a.getAttribute('data-rating'));
            const bRating = parseFloat(b.getAttribute('data-rating'));

            if (aFeatured !== bFeatured) return bFeatured - aFeatured;
            if (aVerified !== bVerified) return bVerified - aVerified;
            return bRating - aRating;
        });
    } else if (sortOption === 'rating-desc') {
        cards.sort((a, b) => parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating')));
    } else if (sortOption === 'reviews-desc') {
        cards.sort((a, b) => parseInt(b.getAttribute('data-reviews')) - parseInt(a.getAttribute('data-reviews')));
    } else if (sortOption === 'featured') {
        cards = cards.filter(card => card.getAttribute('data-featured') === 'true');
    } else if (sortOption === 'verified') {
        cards = cards.filter(card => card.getAttribute('data-verified') === 'true');
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

// ربط الأحداث بمدخل الفرز
sortBy.addEventListener('change', filterAndSortCraftsmen);

// تشغيل التصفية عند تحميل الصفحة
filterAndSortCraftsmen();