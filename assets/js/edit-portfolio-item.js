// assets/js/edit-portfolio-item.js

// عرض معاينة الصور عند رفعها
document.getElementById('portfolioImages').addEventListener('change', function(e) {
    const files = e.target.files;
    const imagePreview = document.getElementById('imagePreview');
    const loadingIndicator = document.getElementById('loadingIndicator');

    if (files.length > 5) {
        alert('يمكنك رفع 5 صور كحد أقصى!');
        e.target.value = '';
        return;
    }

    // التحقق من حجم الصور
    for (let file of files) {
        if (file.size > 5 * 1024 * 1024) { // 5 ميجابايت
            alert(`الصورة "${file.name}" تتجاوز الحد الأقصى (5 ميجابايت)!`);
            e.target.value = '';
            return;
        }
    }

    // إظهار مؤشر التحميل
    loadingIndicator.style.display = 'flex';

    setTimeout(() => {
        imagePreview.innerHTML = ''; // مسح المعاينة السابقة
        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const container = document.createElement('div');
                container.classList.add('preview-image-container');

                const img = document.createElement('img');
                img.src = event.target.result;
                img.classList.add('preview-image');

                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.classList.add('remove-image');
                removeBtn.onclick = function() {
                    container.remove();
                    updateFileInput();
                };

                container.appendChild(img);
                container.appendChild(removeBtn);
                imagePreview.appendChild(container);
            };
            reader.readAsDataURL(file);
        });

        loadingIndicator.style.display = 'none';
    }, 1000);
});

// تحديث حقل الإدخال بعد إزالة صورة
function updateFileInput() {
    const imagePreview = document.getElementById('imagePreview');
    const files = Array.from(imagePreview.querySelectorAll('.preview-image')).map((img, index) => {
        return new File([img.src], `image-${index}.jpg`, { type: 'image/jpeg' });
    });

    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    document.getElementById('portfolioImages').files = dataTransfer.files;
}

// تحديث العمل
function updatePortfolioItem() {
    const portfolioId = document.getElementById('portfolioId').value;
    const portfolioTitle = document.getElementById('portfolioTitle').value;
    const completionDate = document.getElementById('completionDate').value;
    const portfolioCategory = document.getElementById('portfolioCategory').value;
    const portfolioDescription = document.getElementById('portfolioDescription').value;
    const portfolioDetails = document.getElementById('portfolioDetails').value;
    const portfolioImages = document.getElementById('portfolioImages').files;

    if (!portfolioTitle || !completionDate || !portfolioCategory || !portfolioDescription) {
        alert('يرجى ملء جميع الحقول المطلوبة!');
        return;
    }

    if (portfolioImages.length === 0 && imagePreview.children.length === 0) {
        alert('يرجى رفع صورة واحدة على الأقل!');
        return;
    }

    console.log('تحديث العمل:', {
        portfolioId,
        portfolioTitle,
        completionDate,
        portfolioCategory,
        portfolioDescription,
        portfolioDetails,
        portfolioImages: Array.from(portfolioImages).map(file => file.name)
    });

    alert('تم تحديث العمل بنجاح!');
    window.location.href = 'craftsman-profile.html';
}

// حذف العمل
function deletePortfolioItem() {
    if (confirm('هل أنت متأكد من حذف هذا العمل؟')) {
        const portfolioId = document.getElementById('portfolioId').value;
        console.log('حذف العمل:', portfolioId);
        alert('تم حذف العمل بنجاح!');
        window.location.href = 'craftsman-profile.html';
    }
}