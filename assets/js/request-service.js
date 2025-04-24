// assets/js/request-service.js

// بيانات المدن والأحياء (محاكاة قاعدة بيانات)
const districtsByCity = {
    riyadh: ["حي الملز", "حي العليا", "حي النسيم", "حي الروضة"],
    jeddah: ["حي الرويس", "حي البغدادية", "حي الصفا", "حي الحمراء"],
    dammam: ["حي الشاطئ", "حي العدامة", "حي الفرسان", "حي النور"],
    mecca: ["حي العزيزية", "حي الشوقية", "حي الزاهر", "حي الكعكية"],
    medina: ["حي العنابس", "حي الخالدية", "حي الربوة", "حي الجمعة"]
};

// تحديث قائمة الأحياء بناءً على المدينة المختارة
document.getElementById('city').addEventListener('change', function() {
    const city = this.value;
    const districtSelect = document.getElementById('district');
    districtSelect.innerHTML = '<option value="" disabled selected>اختر الحي</option>';
    
    if (city && districtsByCity[city]) {
        districtsByCity[city].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
});

// معاينة الصور المرفوعة مع زر إزالة
document.getElementById('images').addEventListener('change', function(e) {
    const imagePreview = document.getElementById('imagePreview');
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
        alert('يمكنك رفع 5 صور كحد أقصى.');
        e.target.value = '';
        return;
    }

    imagePreview.innerHTML = '';
    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');
            
            const img = document.createElement('img');
            img.src = event.target.result;
            imgContainer.appendChild(img);
            
            const removeBtn = document.createElement('span');
            removeBtn.classList.add('remove-image');
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', function() {
                imgContainer.remove();
                const currentFiles = Array.from(e.target.files);
                const newFiles = currentFiles.filter((_, i) => i !== index);
                const dataTransfer = new DataTransfer();
                newFiles.forEach(file => dataTransfer.items.add(file));
                e.target.files = dataTransfer.files;
            });
            imgContainer.appendChild(removeBtn);
            
            imagePreview.appendChild(imgContainer);
        };
        reader.readAsDataURL(file);
    });
});

// معالجة إرسال النموذج
document.getElementById('serviceRequestForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // جمع بيانات النموذج
    const specialty = document.getElementById('specialty').value;
    const description = document.getElementById('description').value;
    const duration = document.getElementById('duration').value;
    const expectedPrice = document.getElementById('expectedPrice').value || 'غير محدد';
    const city = document.getElementById('city').options[document.getElementById('city').selectedIndex].text;
    const district = document.getElementById('district').value;

    // إنشاء رقم طلب عشوائي (لأغراض العرض)
    const requestId = 'REQ-' + Math.floor(Math.random() * 1000000);

    // ملء ملخص الطلب في الـ Modal
    document.getElementById('requestId').textContent = requestId;
    document.getElementById('summarySpecialty').textContent = specialty;
    document.getElementById('summaryDescription').textContent = description;
    document.getElementById('summaryDuration').textContent = duration === 'custom' ? 'مدة مخصصة' : duration;
    document.getElementById('summaryExpectedPrice').textContent = expectedPrice === 'غير محدد' ? 'غير محدد' : `${expectedPrice} ريال`;
    document.getElementById('summaryLocation').textContent = `${city} - ${district}`;

    // عرض الـ Modal
    const modal = new bootstrap.Modal(document.getElementById('requestConfirmationModal'));
    modal.show();

    // إعادة تعيين النموذج بعد الإرسال
    this.reset();
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('district').innerHTML = '<option value="" disabled selected>اختر الحي</option>';
});