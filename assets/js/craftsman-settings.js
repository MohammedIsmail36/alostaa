// assets/js/craftsman-settings.js

// عرض معاينة صورة الملف الشخصي
document.getElementById('profileImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('profileImagePreview');
            preview.innerHTML = '';
            const img = document.createElement('img');
            img.src = event.target.result;
            img.classList.add('preview-image');
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// تحديث الملف الشخصي
function updateProfile() {
    const profileName = document.getElementById('profileName').value;
    const profileSpecialty = document.getElementById('profileSpecialty').value;
    const profileBio = document.getElementById('profileBio').value;
    const profileImage = document.getElementById('profileImage').files[0];
    const profileLocation = document.getElementById('profileLocation').value;
    const profileRate = document.getElementById('profileRate').value;
    const profileExperience = document.getElementById('profileExperience').value;

    if (!profileName || !profileSpecialty || !profileLocation || !profileRate || !profileExperience) {
        alert('يرجى ملء جميع الحقول المطلوبة!');
        return;
    }

    // محاكاة تحديث الملف (في الواقع سيتم إرسال البيانات إلى الخادم)
    console.log('تحديث الملف الشخصي:', {
        profileName,
        profileSpecialty,
        profileBio,
        profileImage: profileImage ? profileImage.name : 'لم يتم تحديث الصورة',
        profileLocation,
        profileRate,
        profileExperience
    });

    alert('تم تحديث الملف الشخصي بنجاح!');
}

// تحديث البيانات الشخصية
function updatePersonalInfo() {
    const personalPhone = document.getElementById('personalPhone').value;
    const personalEmail = document.getElementById('personalEmail').value;
    const personalAddress = document.getElementById('personalAddress').value;
    const personalBankAccount = document.getElementById('personalBankAccount').value;

    if (!personalPhone || !personalEmail || !personalAddress) {
        alert('يرجى ملء جميع الحقول المطلوبة!');
        return;
    }

    // التحقق من تنسيق رقم الحساب البنكي
    if (personalBankAccount && !personalBankAccount.startsWith('SA') || personalBankAccount.length !== 20) {
        alert('رقم الحساب البنكي يجب أن يبدأ بـ SA ويتكون من 20 خانة!');
        document.getElementById('personalBankAccount').classList.add('is-invalid');
        return;
    }

    // محاكاة تحديث البيانات (في الواقع سيتم إرسال البيانات إلى الخادم)
    console.log('تحديث البيانات الشخصية:', {
        personalPhone,
        personalEmail,
        personalAddress,
        personalBankAccount
    });

    alert('تم تحديث البيانات الشخصية بنجاح!');
}

// تغيير كلمة المرور
function updatePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        alert('يرجى ملء جميع الحقول!');
        return;
    }

    if (newPassword !== confirmNewPassword) {
        alert('كلمة المرور الجديدة وتأكيدها غير متطابقتين!');
        document.getElementById('confirmNewPassword').classList.add('is-invalid');
        return;
    }

    // محاكاة تغيير كلمة المرور (في الواقع سيتم إرسال البيانات إلى الخادم)
    console.log('تغيير كلمة المرور:', {
        currentPassword,
        newPassword
    });

    alert('تم تغيير كلمة المرور بنجاح!');
    document.getElementById('passwordForm').reset();
}

// معاينة الملف الشخصي
document.querySelector('[data-bs-target="#previewProfileModal"]').addEventListener('click', function() {
    const profileName = document.getElementById('profileName').value;
    const profileSpecialty = document.getElementById('profileSpecialty').value;
    const profileBio = document.getElementById('profileBio').value;
    const profileImage = document.getElementById('profileImage').files[0];
    const profileLocation = document.getElementById('profileLocation').value;
    const profileRate = document.getElementById('profileRate').value;
    const profileExperience = document.getElementById('profileExperience').value;

    // تحديث محتوى المعاينة
    document.getElementById('previewProfileName').textContent = profileName;
    document.getElementById('previewProfileSpecialty').textContent = profileSpecialty;
    document.getElementById('previewProfileBio').textContent = profileBio;
    document.getElementById('previewProfileLocation').textContent = profileLocation;
    document.getElementById('previewProfileRate').textContent = profileRate;
    document.getElementById('previewProfileExperience').textContent = profileExperience;

    if (profileImage) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('previewProfileImage').src = event.target.result;
        };
        reader.readAsDataURL(profileImage);
    } else {
        document.getElementById('previewProfileImage').src = 'assets/img/001.jpg';
    }
});