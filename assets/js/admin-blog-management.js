// assets/js/admin-blog-management.js

// تهيئة محرر النصوص TinyMCE
tinymce.init({
    selector: '#blogContent',
    height: 400,
    plugins: 'image link lists',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | image link',
    images_upload_url: 'upload.php', // سيتم استبداله بواجهة برمجية فعلية لاحقًا
    images_upload_handler: (blobInfo, success, failure) => {
        setTimeout(() => {
            success('assets/img/placeholder.jpg'); // محاكاة رفع الصورة
        }, 1000);
    }
});

// عرض معاينة صورة الغلاف
document.getElementById('blogCoverImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const coverImagePreview = document.getElementById('coverImagePreview');
    coverImagePreview.innerHTML = '';

    if (file) {
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

// حفظ المدونة
function saveBlog() {
    const blogId = document.getElementById('blogId').value;
    const blogTitle = document.getElementById('blogTitle').value;
    const blogCategory = document.getElementById('blogCategory').value;
    const blogCoverImage = document.getElementById('blogCoverImage').files[0];
    const blogContent = tinymce.get('blogContent').getContent();
    const blogStatus = document.getElementById('blogStatus').value;

    if (!blogTitle || !blogCategory || !blogContent || (!blogCoverImage && !blogId)) {
        alert('يرجى ملء جميع الحقول المطلوبة!');
        return;
    }

    const blogData = {
        id: blogId || Date.now().toString(),
        title: blogTitle,
        category: blogCategory,
        coverImage: blogCoverImage ? blogCoverImage.name : 'existing-image.jpg',
        content: blogContent,
        status: blogStatus,
        date: new Date().toISOString().split('T')[0]
    };

    console.log('حفظ المدونة:', blogData);
    alert('تم حفظ المدونة بنجاح!');
    resetBlogForm();
    // تحديث الجدول (محاكاة)
    location.reload();
}

// تعديل مدونة
function editBlog(id) {
    const row = document.querySelector(`#blogTableBody tr[data-id="${id}"]`);
    const title = row.cells[0].textContent;
    const category = row.cells[1].textContent;
    const status = row.cells[3].textContent;

    document.getElementById('blogId').value = id;
    document.getElementById('blogTitle').value = title;
    document.getElementById('blogCategory').value = category;
    document.getElementById('blogStatus').value = status;
    tinymce.get('blogContent').setContent('<p>محتوى المدونة هنا...</p>'); // محاكاة
    const coverImagePreview = document.getElementById('coverImagePreview');
    coverImagePreview.innerHTML = '<img src="assets/img/placeholder.jpg" class="preview-image">';
}

// حذف مدونة
function deleteBlog(id) {
    if (confirm('هل أنت متأكد من حذف هذه المدونة؟')) {
        console.log('حذف المدونة:', id);
        alert('تم حذف المدونة بنجاح!');
        location.reload();
    }
}

// معاينة المدونة
function previewBlog() {
    const blogTitle = document.getElementById('blogTitle').value;
    const blogCategory = document.getElementById('blogCategory').value;
    const blogContent = tinymce.get('blogContent').getContent();
    const blogCoverImage = document.getElementById('blogCoverImage').files[0];

    if (!blogTitle || !blogCategory || !blogContent) {
        alert('يرجى ملء جميع الحقول المطلوبة للمعاينة!');
        return;
    }

    // تخزين البيانات مؤقتًا للمعاينة
    localStorage.setItem('previewBlog', JSON.stringify({
        title: blogTitle,
        category: blogCategory,
        content: blogContent,
        coverImage: blogCoverImage ? URL.createObjectURL(blogCoverImage) : 'assets/img/placeholder.jpg',
        date: new Date().toISOString().split('T')[0]
    }));

    window.open('blog-post.html?preview=true', '_blank');
}

// إعادة تعيين النموذج
function resetBlogForm() {
    document.getElementById('blogForm').reset();
    document.getElementById('blogId').value = '';
    document.getElementById('coverImagePreview').innerHTML = '';
    tinymce.get('blogContent').setContent('');
}

// البحث والتصفية
document.getElementById('searchBlogs').addEventListener('input', filterBlogs);
document.getElementById('filterBlogs').addEventListener('change', filterBlogs);

function filterBlogs() {
    const searchTerm = document.getElementById('searchBlogs').value.toLowerCase();
    const filterStatus = document.getElementById('filterBlogs').value;
    const rows = document.querySelectorAll('#blogTableBody tr');

    rows.forEach(row => {
        const title = row.cells[0].textContent.toLowerCase();
        const status = row.cells[3].textContent;

        const matchesSearch = title.includes(searchTerm);
        const matchesFilter = filterStatus === '' || status === filterStatus;

        row.style.display = matchesSearch && matchesFilter ? '' : 'none';
    });
}