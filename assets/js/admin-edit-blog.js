// assets/js/admin-edit-blog.js

window.onload = function() {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin-login.html';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs.find(b => b.id === blogId);

    if (blog) {
        document.getElementById('blogId').value = blog.id;
        document.getElementById('blogTitle').value = blog.title;
        document.getElementById('blogCategory').value = blog.category;
        document.getElementById('blogTags').value = blog.tags.join(', ');
        document.getElementById('coverImagePreview').innerHTML = `<img src="${blog.coverImage}" class="preview-image" alt="صورة الغلاف">`;
        tinymce.get('blogContent').setContent(blog.content);
        document.getElementById('blogStatus').value = blog.status;
    }
};

function updateBlog() {
    const blogId = document.getElementById('blogId').value;
    const blogTitle = document.getElementById('blogTitle').value;
    const blogCategory = document.getElementById('blogCategory').value;
    const blogTags = document.getElementById('blogTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
    const blogCoverImage = document.getElementById('blogCoverImage').files[0];
    const blogContent = tinymce.get('blogContent').getContent();
    const blogStatus = document.getElementById('blogStatus').value;

    // التحقق من المدخلات
    if (!blogTitle || !blogCategory || !blogContent) {
        Toastify({
            text: "يرجى ملء جميع الحقول المطلوبة!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444"
        }).showToast();
        return;
    }

    if (blogCoverImage) {
        const validImageTypes = ['image/jpeg', 'image/png'];
        if (!validImageTypes.includes(blogCoverImage.type)) {
            Toastify({
                text: "يرجى رفع صورة بصيغة JPEG أو PNG فقط!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#EF4444"
            }).showToast();
            return;
        }
    }

    if (blogTitle.length > 100) {
        Toastify({
            text: "العنوان يجب ألا يتجاوز 100 حرف!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444"
        }).showToast();
        return;
    }

    const invalidTags = blogTags.some(tag => !/^[a-zA-Z0-9\u0600-\u06FF\s]+$/.test(tag));
    if (invalidTags) {
        Toastify({
            text: "العلامات يجب أن تحتوي على حروف وأرقام فقط!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444"
        }).showToast();
        return;
    }

    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogIndex = blogs.findIndex(b => b.id === blogId);
    blogs[blogIndex] = {
        ...blogs[blogIndex],
        title: blogTitle,
        category: blogCategory,
        tags: blogTags,
        coverImage: blogCoverImage ? blogCoverImage.name : blogs[blogIndex].coverImage,
        content: blogContent,
        status: blogStatus,
        date: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('blogs', JSON.stringify(blogs));

    Toastify({
        text: "تم تحديث المدونة بنجاح!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#10B981"
    }).showToast();

    setTimeout(() => {
        window.location.href = 'admin-blog-list.html';
    }, 1000);
}