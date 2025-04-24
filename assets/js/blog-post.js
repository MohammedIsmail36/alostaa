// assets/js/blog-post.js

// مشاركة المدونة
function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.querySelector('h1').textContent);
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.querySelector('h1').textContent);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

// إضافة تعليق
function addComment() {
    const commentText = document.getElementById('commentText').value;
    if (!commentText) {
        Toastify({
            text: "يرجى كتابة تعليق!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444"
        }).showToast();
        return;
    }

    const commentsList = document.getElementById('commentsList');
    const commentItem = document.createElement('div');
    commentItem.classList.add('comment-item');
    commentItem.innerHTML = `
        <p><strong>مستخدم جديد</strong> - ${new Date().toISOString().split('T')[0]}</p>
        <p>${commentText}</p>
    `;
    commentsList.appendChild(commentItem);
    document.getElementById('commentForm').reset();

    Toastify({
        text: "تم إضافة التعليق بنجاح!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#10B981"
    }).showToast();
}

// تحديث الإعجابات
function toggleLike() {
    const blogId = new URLSearchParams(window.location.search).get('id') || '1';
    let likes = JSON.parse(localStorage.getItem('blogLikes')) || {};
    likes[blogId] = (likes[blogId] || 0) + 1;
    localStorage.setItem('blogLikes', JSON.stringify(likes));
    document.getElementById('likeCount').textContent = likes[blogId];
    Toastify({
        text: "تم الإعجاب بالمدونة!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#10B981"
    }).showToast();
}

function updateLikes() {
    const blogId = new URLSearchParams(window.location.search).get('id') || '1';
    let likes = JSON.parse(localStorage.getItem('blogLikes')) || {};
    document.getElementById('likeCount').textContent = likes[blogId] || 0;
}

// تحديث عدد المشاهدات
function updateViews() {
    const blogId = new URLSearchParams(window.location.search).get('id') || '1';
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    let blog = blogs.find(b => b.id === blogId);
    if (blog) {
        blog.views = (blog.views || 0) + 1;
        localStorage.setItem('blogs', JSON.stringify(blogs));
        document.getElementById('viewCount').textContent = blog.views;
    }
    loadMostRead();
}

// تحميل المدونات الأكثر قراءة
function loadMostRead() {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.sort((a, b) => (b.views || 0) - (a.views || 0));
    const mostReadGrid = document.getElementById('mostReadGrid');
    mostReadGrid.innerHTML = '';

    blogs.slice(0, 3).forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.classList.add('col-md-4', 'mb-4');
        blogItem.innerHTML = `
            <div class="blog-card">
                <img src="${blog.coverImage}" data-src="${blog.coverImage}" alt="${blog.title}" class="blog-image lazyload" loading="lazy">
                <div class="blog-content">
                    <span class="blog-category">${blog.category}</span>
                    <h3>${blog.title}</h3>
                    <p><i class="fas fa-eye"></i> ${blog.views || 0} مشاهدة</p>
                    <a href="blog-post.html?id=${blog.id}" class="btn btn-primary" aria-label="قراءة المزيد عن ${blog.title}">اقرأ المزيد</a>
                </div>
            </div>
        `;
        mostReadGrid.appendChild(blogItem);
    });
}