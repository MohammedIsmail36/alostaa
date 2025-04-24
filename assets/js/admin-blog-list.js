// assets/js/admin-blog-list.js

// بيانات المدونات (محاكاة)
let blogs = JSON.parse(localStorage.getItem('blogs')) || [
    {
        id: "1",
        title: "نصائح لاختيار الأثاث الخشبي",
        category: "نصائح للحرفيين",
        tags: ["أثاث", "تصميم داخلي", "نصائح"],
        coverImage: "assets/img/placeholder.jpg",
        content: "<p>محتوى المدونة...</p>",
        status: "منشور",
        date: "2025-03-20",
        visibility: "مرئي",
        views: 150
    },
    {
        id: "2",
        title: "أفكار تصميم غرف نوم مودرن",
        category: "أفكار تصميم",
        tags: ["تصميم داخلي", "غرف نوم"],
        coverImage: "assets/img/placeholder.jpg",
        content: "<p>محتوى المدونة...</p>",
        status: "مسودة",
        date: "2025-03-15",
        visibility: "مرئي",
        views: 200
    },
    {
        id: "3",
        title: "كيفية العناية بالأثاث الخشبي",
        category: "نصائح للحرفيين",
        tags: ["أثاث", "نصائح"],
        coverImage: "assets/img/placeholder.jpg",
        content: "<p>محتوى المدونة...</p>",
        status: "منشور",
        date: "2025-03-10",
        visibility: "مرئي",
        views: 300
    }
    // يمكن إضافة المزيد من المدونات هنا
];

// إعدادات Infinite Scroll
const itemsPerLoad = 3; // عدد المدونات التي يتم تحميلها في كل مرة
let currentIndex = 0;
let filteredBlogs = [...blogs];
let isLoading = false;

// تحميل المدونات عند تحميل الصفحة
window.onload = function() {
    // التحقق من تسجيل الدخول
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin-login.html';
        return;
    }

    loadMoreBlogs();
    setupInfiniteScroll();
    setupBackToTop();
};

// تحميل المزيد من المدونات
function loadMoreBlogs() {
    if (isLoading) return;
    isLoading = true;
    document.getElementById('loadingSpinner').style.display = 'block';

    setTimeout(() => {
        const blogGrid = document.getElementById('blogGrid');
        const endIndex = Math.min(currentIndex + itemsPerLoad, filteredBlogs.length);

        for (let i = currentIndex; i < endIndex; i++) {
            const blog = filteredBlogs[i];
            const blogItem = document.createElement('div');
            blogItem.classList.add('col-md-4', 'mb-4', 'blog-item');
            blogItem.setAttribute('data-status', blog.status);
            blogItem.setAttribute('data-tags', blog.tags.join(','));
            blogItem.setAttribute('data-id', blog.id);
            blogItem.innerHTML = `
                <div class="blog-card">
                    <img src="${blog.coverImage}" data-src="${blog.coverImage}" alt="${blog.title}" class="blog-image lazyload" loading="lazy">
                    <div class="blog-content">
                        <span class="blog-status">${blog.status}</span>
                        <h3>${blog.title}</h3>
                        <p class="blog-category">${blog.category}</p>
                        <p class="blog-tags"><i class="fas fa-tags"></i> ${blog.tags.join(', ')}</p>
                        <p class="blog-date"><i class="fas fa-calendar-alt"></i> ${blog.date}</p>
                        <div class="blog-actions">
                            <a href="admin-edit-blog.html?id=${blog.id}" class="btn btn-primary btn-sm" aria-label="تعديل المدونة ${blog.title}"><i class="fas fa-edit"></i> تعديل</a>
                            <button class="btn btn-danger btn-sm" onclick="deleteBlog('${blog.id}')" aria-label="حذف المدونة ${blog.title}"><i class="fas fa-trash"></i> حذف</button>
                            <button class="btn btn-warning btn-sm" onclick="toggleVisibility('${blog.id}', '${blog.status === 'مخفي' ? 'show' : 'hide'}')" aria-label="${blog.status === 'مخفي' ? 'إظهار' : 'إخفاء'} المدونة ${blog.title}">
                                <i class="fas ${blog.status === 'مخفي' ? 'fa-eye' : 'fa-eye-slash'}"></i> ${blog.status === 'مخفي' ? 'إظهار' : 'إخفاء'}
                            </button>
                            <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#suspendModal" onclick="setSuspendBlogId('${blog.id}')" aria-label="تعليق المدونة ${blog.title}"><i class="fas fa-pause"></i> تعليق</button>
                        </div>
                    </div>
                </div>
            `;
            blogGrid.appendChild(blogItem);
        }

        currentIndex = endIndex;
        isLoading = false;
        document.getElementById('loadingSpinner').style.display = 'none';

        // إذا لم يعد هناك مدونات للتحميل
        if (currentIndex >= filteredBlogs.length) {
            window.removeEventListener('scroll', handleScroll);
        }
    }, 1000); // محاكاة تأخير التحميل
}

// إعداد Infinite Scroll
function setupInfiniteScroll() {
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMoreBlogs();
    }
}

// البحث والتصفية
document.getElementById('searchBlogs').addEventListener('input', filterBlogs);
document.getElementById('filterStatus').addEventListener('change', filterBlogs);
document.getElementById('filterTags').addEventListener('change', filterBlogs);

function filterBlogs() {
    const searchTerm = document.getElementById('searchBlogs').value.toLowerCase();
    const filterStatus = document.getElementById('filterStatus').value;
    const filterTag = document.getElementById('filterTags').value;

    filteredBlogs = blogs.filter(blog => {
        const title = blog.title.toLowerCase();
        const status = blog.status;
        const tags = blog.tags;

        const matchesSearch = title.includes(searchTerm);
        const matchesStatus = filterStatus === '' || status === filterStatus;
        const matchesTag = filterTag === '' || tags.includes(filterTag);

        return matchesSearch && matchesStatus && matchesTag;
    });

    currentIndex = 0;
    document.getElementById('blogGrid').innerHTML = '';
    setupInfiniteScroll();
    loadMoreBlogs();
}

// حذف مدونة
function deleteBlog(id) {
    if (confirm('هل أنت متأكد من حذف هذه المدونة؟')) {
        document.getElementById('loadingSpinner').style.display = 'block';
        setTimeout(() => {
            blogs = blogs.filter(blog => blog.id !== id);
            localStorage.setItem('blogs', JSON.stringify(blogs));
            filterBlogs();
            document.getElementById('loadingSpinner').style.display = 'none';
            Toastify({
                text: "تم حذف المدونة بنجاح!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#EF4444"
            }).showToast();
        }, 1000);
    }
}

// إخفاء/إظهار المدونة
function toggleVisibility(id, action) {
    document.getElementById('loadingSpinner').style.display = 'block';
    setTimeout(() => {
        const blog = blogs.find(b => b.id === id);
        if (action === 'hide') {
            blog.status = 'مخفي';
        } else {
            blog.status = 'منشور';
        }
        localStorage.setItem('blogs', JSON.stringify(blogs));
        filterBlogs();
        document.getElementById('loadingSpinner').style.display = 'none';
        Toastify({
            text: `تم ${action === 'hide' ? 'إخفاء' : 'إظهار'} المدونة بنجاح!`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#10B981"
        }).showToast();
    }, 1000);
}

// تعليق المدونة
let currentBlogId = null;

function setSuspendBlogId(id) {
    currentBlogId = id;
    document.getElementById('suspendBlogId').value = id;
}

function suspendBlog() {
    const duration = document.getElementById('suspendDuration').value;
    document.getElementById('loadingSpinner').style.display = 'block';

    setTimeout(() => {
        const blog = blogs.find(b => b.id === currentBlogId);
        blog.status = 'مخفي';
        localStorage.setItem('blogs', JSON.stringify(blogs));
        filterBlogs();

        setTimeout(() => {
            blog.status = 'منشور';
            localStorage.setItem('blogs', JSON.stringify(blogs));
            filterBlogs();
            Toastify({
                text: "انتهت مدة التعليق للمدونة!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#10B981"
            }).showToast();
        }, duration * 24 * 60 * 60 * 1000);

        document.getElementById('loadingSpinner').style.display = 'none';
        Toastify({
            text: `تم تعليق المدونة لمدة ${duration} يومًا!`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#3B82F6"
        }).showToast();

        const modal = bootstrap.Modal.getInstance(document.getElementById('suspendModal'));
        modal.hide();
    }, 1000);
}

// زر العودة إلى الأعلى
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}