// assets/js/add-portfolio-item.js

// عرض معاينة الصور عند رفعها
document.getElementById('portfolioImages').addEventListener('change', function(e) {
    const files = e.target.files;
    const imagePreview = document.getElementById('imagePreview');
    const loadingIndicator = document.getElementById('loadingIndicator');
    imagePreview.innerHTML = ''; // مسح المعاينة السابقة

    if (files.length > 5) {
        alert('يمكنك رفع 5 صور كحد أقصى!');
        e.target.value = ''; // إعادة تعيين حقل الإدخال
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

    setTimeout(() => { // محاكاة تأخير التحميل
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

        // إخفاء مؤشر التحميل بعد اكتمال التحميل
        loadingIndicator.style.display = 'none';
    }, 1000); // محاكاة تأخير 1 ثانية
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

// إضافة عمل جديد
function addPortfolioItem() {
    const portfolioTitle = document.getElementById('portfolioTitle').value;
    const completionDate = document.getElementById('completionDate').value;
    const portfolioCategory = document.getElementById('portfolioCategory').value;
    const portfolioDescription = document.getElementById('portfolioDescription').value;
    const portfolioDetails = document.getElementById('portfolioDetails').value;
    const portfolioImages = document.getElementById('portfolioImages').files;

    // التحقق من ملء الحقول المطلوبة
    if (!portfolioTitle || !completionDate || !portfolioCategory || !portfolioDescription || portfolioImages.length === 0) {
        alert('يرجى ملء جميع الحقول المطلوبة ورفع صورة واحدة على الأقل!');
        return;
    }

    // محاكاة إضافة العمل (في الواقع سيتم رفع الصور والبيانات إلى الخادم)
    console.log('إضافة عمل جديد:', {
        portfolioTitle,
        completionDate,
        portfolioCategory,
        portfolioDescription,
        portfolioDetails,
        portfolioImages: Array.from(portfolioImages).map(file => file.name)
    });

    // حذف المسودة إذا كانت موجودة
    localStorage.removeItem('portfolioDraft');

    alert('تمت إضافة العمل بنجاح!');
    window.location.href = 'craftsman-profile.html';
}

// حفظ كمسودة
function saveDraft() {
    const portfolioTitle = document.getElementById('portfolioTitle').value;
    const completionDate = document.getElementById('completionDate').value;
    const portfolioCategory = document.getElementById('portfolioCategory').value;
    const portfolioDescription = document.getElementById('portfolioDescription').value;
    const portfolioDetails = document.getElementById('portfolioDetails').value;
    const portfolioImages = document.getElementById('portfolioImages').files;

    if (!portfolioTitle && !completionDate && !portfolioCategory && !portfolioDescription && !portfolioDetails && portfolioImages.length === 0) {
        alert('لا توجد بيانات لحفظها كمسودة!');
        return;
    }

    const draft = {
        portfolioTitle,
        completionDate,
        portfolioCategory,
        portfolioDescription,
        portfolioDetails,
        portfolioImages: Array.from(portfolioImages).map(file => file.name)
    };

    localStorage.setItem('portfolioDraft', JSON.stringify(draft));
    alert('تم حفظ العمل كمسودة بنجاح!');
}

// استرجاع المسودة عند تحميل الصفحة
window.onload = function() {
    const draft = JSON.parse(localStorage.getItem('portfolioDraft'));
    if (draft) {
        document.getElementById('portfolioTitle').value = draft.portfolioTitle || '';
        document.getElementById('completionDate').value = draft.completionDate || '';
        document.getElementById('portfolioCategory').value = draft.portfolioCategory || '';
        document.getElementById('portfolioDescription').value = draft.portfolioDescription || '';
        document.getElementById('portfolioDetails').value = draft.portfolioDetails || '';
        if (draft.portfolioImages && draft.portfolioImages.length > 0) {
            alert('تم استرجاع المسودة. يرجى إعادة رفع الصور إذا كنت ترغب في تعديلها.');
        }
    }
};