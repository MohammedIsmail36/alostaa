// assets/js/blog.js

// البحث والتصفية
document.getElementById('searchBlogs').addEventListener('input', filterBlogs);
document.getElementById('filterCategory').addEventListener('change', filterBlogs);

function filterBlogs() {
    const searchTerm = document.getElementById('searchBlogs').value.toLowerCase();
    const filterCategory = document.getElementById('filterCategory').value;
    const blogItems = document.querySelectorAll('.blog-item');

    blogItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const category = item.getAttribute('data-category');

        const matchesSearch = title.includes(searchTerm);
        const matchesCategory = filterCategory === '' || category === filterCategory;

        item.style.display = matchesSearch && matchesCategory ? '' : 'none';
    });
}