// assets/js/craftsman-profile.js

// زر "تحميل المزيد" للتعليقات
document.getElementById('loadMoreReviews').addEventListener('click', function() {
    const hiddenReviews = document.querySelectorAll('.review-item.hidden');
    hiddenReviews.forEach(review => {
        review.classList.remove('hidden');
    });
    this.style.display = 'none';
});

// فرز التعليقات
document.getElementById('sort-reviews').addEventListener('change', function() {
    const sortOption = this.value;
    const reviewsList = document.getElementById('reviewsList');
    let reviews = Array.from(reviewsList.querySelectorAll('.review-item'));

    if (sortOption === 'newest') {
        reviews.sort((a, b) => new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date')));
    } else if (sortOption === 'highest') {
        reviews.sort((a, b) => parseInt(b.getAttribute('data-rating')) - parseInt(a.getAttribute('data-rating')));
    }

    reviewsList.innerHTML = '';
    reviews.forEach(review => reviewsList.appendChild(review));
});

// زر "إضافة إلى المفضلة"
document.getElementById('favoriteBtn').addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.toggle('favorited');
    const icon = this.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
    alert(this.classList.contains('favorited') ? 'تمت الإضافة إلى المفضلة' : 'تمت الإزالة من المفضلة');
});

// زر "مشاركة"
document.getElementById('shareBtn').addEventListener('click', function(e) {
    e.preventDefault();
    if (navigator.share) {
        navigator.share({
            title: 'ملف الحرفي - أحمد محمد | الأسطى',
            text: 'تعرف على أحمد محمد، نجار محترف في الرياض عبر منصة الأسطى!',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert('مشاركة الملف الشخصي غير مدعومة في متصفحك. يمكنك نسخ الرابط يدويًا.');
    }
});

// تهيئة الخريطة
function initMap() {
    const location = { lat: 24.7136, lng: 46.6753 }; // إحداثيات الرياض
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: location
    });
    new google.maps.Marker({
        position: location,
        map: map,
        title: 'منطقة عمل أحمد محمد'
    });
}