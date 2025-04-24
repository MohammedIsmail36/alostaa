// assets/js/shared.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("Shared JS Loaded");
    // <!-- إضافة JavaScript لمحاكاة الفلترة -->

    function filterOffers() {
        const statusFilter = document.getElementById('status-filter').value;
        const specialtyFilter = document.getElementById('specialty-filter').value;
        const offers = document.querySelectorAll('.offer-card');

        offers.forEach(offer => {
            const status = offer.getAttribute('data-status');
            const specialty = offer.getAttribute('data-specialty');

            const statusMatch = (statusFilter === 'all' || status === statusFilter);
            const specialtyMatch = (specialtyFilter === 'all' || specialty === specialtyFilter);

            if (statusMatch && specialtyMatch) {
                offer.style.display = 'block';
            } else {
                offer.style.display = 'none';
            }
        });
    }

    function resetFilters() {
        document.getElementById('status-filter').value = 'all';
        document.getElementById('specialty-filter').value = 'all';
        filterOffers();
    }

    // إضافة مستمعي الأحداث للفلترة
    document.getElementById('status-filter').addEventListener('change', filterOffers);
    document.getElementById('specialty-filter').addEventListener('change', filterOffers);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);

});












