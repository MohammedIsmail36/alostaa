// assets/js/admin-add-blog.js

// تهيئة محرر النصوص TinyMCE
tinymce.init({
    selector: '#blogContent',
    height: 400,
    plugins: 'image link lists',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | image link',
    images_upload_url: 'upload.php',
    images_upload_handler: (blobInfo, success, failure) => {
        setTimeout(() => {
            success('assets/img/placeholder.jpg');
        }, 1000);
    }
});

// التحقق من تسجيل الدخول وإعداد زر العودة إلى الأعلى
window.onload = function() {
    // التحقق من تسجيل الدخول
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin-login.html';
        return;
    }

    // إعداد زر العودة إلى الأعلى
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
};

// عرض معاينة صورة الغلاف
document.getElementById('blogCoverImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const coverImagePreview = document.getElementById('coverImagePreview');
    coverImagePreview.innerHTML = '';

    if (file) {
        // التحقق من صيغة الصورة
        const validImageTypes = ['image/jpeg', 'image/png'];
        if (!validImageTypes.includes(file.type)) {
            Toastify({
                text: "يرجى رفع صورة بصيغة JPEG أو PNG فقط!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#EF4444",
            }).showToast();
            e.target.value = '';
            return;
        }

        // التحقق من حجم الصورة (الحد الأقصى 5 ميجابايت)
        if (file.size > 5 * 1024 * 1024) {
            Toastify({
                text: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#EF4444",
            }).showToast();
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.classList.add('preview-image');
            coverImagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// إضافة مدونة
function addBlog(action) {
    const blogTitle = document.getElementById('blogTitle').value.trim();
    const blogCategory = document.getElementById('blogCategory').value;
    const blogTags = document.getElementById('blogTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
    const blogCoverImage = document.getElementById('blogCoverImage').files[0];
    const blogContent = tinymce.get('blogContent').getContent();
    const blogStatus = action === 'publish' ? 'منشور' : 'مسودة';

    // التحقق من الحقول
    if (!blogTitle || !blogCategory || !blogCoverImage || !blogContent) {
        Toastify({
            text: "يرجى ملء جميع الحقول المطلوبة!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444",
        }).showToast();
        return;
    }

    // التحقق من صيغة الصورة
    const validImageTypes = ['image/jpeg', 'image/png'];
    if (!validImageTypes.includes(blogCoverImage.type)) {
        Toastify({
            text: "يرجى رفع صورة بصيغة JPEG أو PNG فقط!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444",
        }).showToast();
        return;
    }

    // التحقق من حجم الصورة (الحد الأقصى 5 ميجابايت)
    if (blogCoverImage.size > 5 * 1024 * 1024) {
        Toastify({
            text: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444",
        }).showToast();
        return;
    }

    // التحقق من طول العنوان
    if (blogTitle.length < 5 || blogTitle.length > 100) {
        Toastify({
            text: "عنوان المدونة يجب أن يكون بين 5 و100 حرف!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444",
        }).showToast();
        return;
    }

    // التحقق من عدد العلامات
    if (blogTags.length > 5) {
        Toastify({
            text: "الحد الأقصى للعلامات هو 5!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444",
        }).showToast();
        return;
    }

    // التحقق من العلامات (حروف وأرقام فقط)
    const invalidTags = blogTags.some(tag => !/^[a-zA-Z0-9\u0600-\u06FF\s]+$/.test(tag));
    if (invalidTags) {
        Toastify({
            text: "العلامات يجب أن تحتوي على حروف وأرقام فقط!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444",
        }).showToast();
        return;
    }

    // إظهار مؤشر التحميل
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }

    // محاكاة تأخير الحفظ
    setTimeout(() => {
        const blogData = {
            id: Date.now().toString(),
            title: blogTitle,
            category: blogCategory,
            tags: blogTags,
            coverImage: blogCoverImage.name, // في الواقع، يجب رفع الصورة إلى الخادم
            content: blogContent,
            status: blogStatus,
            date: new Date().toISOString().split('T')[0],
            visibility: 'مرئي',
            views: 0
        };

        // حفظ المدونة في localStorage (محاكاة)
        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.push(blogData);
        localStorage.setItem('blogs', JSON.stringify(blogs));

        // إخفاء مؤشر التحميل
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }

        Toastify({
            text: `تم ${action === 'publish' ? 'نشر' : 'حفظ'} المدونة بنجاح!`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#10B981",
        }).showToast();

        setTimeout(() => {
            window.location.href = 'admin-blog-list.html';
        }, 1000);
    }, 1000); // محاكاة تأخير الحفظ
}

// معاينة المدونة
function previewBlog() {
    const blogTitle = document.getElementById('blogTitle').value.trim();
    const blogCategory = document.getElementById('blogCategory').value;
    const blogTags = document.getElementById('blogTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
    const blogCoverImage = document.getElementById('blogCoverImage').files[0];
    const blogContent = tinymce.get('blogContent').getContent();

    // التحقق من الحقول المطلوبة للمعاينة
    if (!blogTitle || !blogCategory || !blogContent) {
        Toastify({
            text: "يرجى ملء جميع الحقول المطلوبة للمعاينة!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444",
        }).showToast();
        return;
    }

    // التحقق من طول العنوان
    if (blogTitle.length < 5 || blogTitle.length > 100) {
        Toastify({
            text: "عنوان المدونة يجب أن يكون بين 5 و100 حرف!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444",
        }).showToast();
        return;
    }

    // التحقق من عدد العلامات
    if (blogTags.length > 5) {
        Toastify({
            text: "الحد الأقصى للعلامات هو 5!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444",
        }).showToast();
        return;
    }

    // التحقق من العلامات
    const invalidTags = blogTags.some(tag => !/^[a-zA-Z0-9\u0600-\u06FF\s]+$/.test(tag));
    if (invalidTags) {
        Toastify({
            text: "العلامات يجب أن تحتوي على حروف وأرقام فقط!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444",
        }).showToast();
        return;
    }

    // إذا كانت هناك صورة، تحقق من صيغتها وحجمها
    if (blogCoverImage) {
        const validImageTypes = ['image/jpeg', 'image/png'];
        if (!validImageTypes.includes(blogCoverImage.type)) {
            Toastify({
                text: "يرجى رفع صورة بصيغة JPEG أو PNG فقط!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#EF4444",
            }).showToast();
            return;
        }

        if (blogCoverImage.size > 5 * 1024 * 1024) {
            Toastify({
                text: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#EF4444",
            }).showToast();
            return;
        }
    }

    // حفظ بيانات المعاينة في localStorage
    localStorage.setItem('previewBlog', JSON.stringify({
        title: blogTitle,
        category: blogCategory,
        tags: blogTags,
        content: blogContent,
        coverImage: blogCoverImage ? URL.createObjectURL(blogCoverImage) : 'assets/img/placeholder.jpg',
        date: new Date().toISOString().split('T')[0]
    }));

    window.open('blog-post.html?preview=true', '_blank');
}