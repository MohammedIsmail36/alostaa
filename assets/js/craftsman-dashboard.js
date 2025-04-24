// assets/js/craftsman-dashboard.js

// تقديم عرض
document.querySelectorAll('.submit-offer-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modal = new bootstrap.Modal(document.getElementById('submitOfferModal'));
        modal.show();
    });
});

document.querySelector('.confirm-submit-offer-btn').addEventListener('click', function() {
    const price = document.getElementById('offerPrice').value;
    const description = document.getElementById('offerDescription').value;
    const duration = document.getElementById('offerDuration').value;

    if (!price || !description || !duration) {
        alert('يرجى ملء جميع الحقول قبل إرسال العرض.');
        return;
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('submitOfferModal'));
    modal.hide();
    alert('تم إرسال عرضك بنجاح! سيتم إشعار العميل بعرضك.');
    document.getElementById('submitOfferForm').reset();
    // هنا يمكن إضافة منطق لإرسال العرض إلى الخادوم
});

// تأكيد إنجاز العمل
document.querySelectorAll('.mark-completed-btn').forEach(button => {
    button.addEventListener('click', function() {
        alert('تم إشعار العميل بإنجاز العمل. يرجى انتظار تأكيده.');
        // هنا يمكن إضافة منطق لتحديث حالة الطلب إلى "في انتظار تأكيد العميل"
    });
});