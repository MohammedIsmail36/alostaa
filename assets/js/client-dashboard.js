// assets/js/client-dashboard.js

// اختيار العرض
document.querySelectorAll('.select-offer-btn').forEach(button => {
    button.addEventListener('click', function() {
        const offerItem = this.closest('.offer-item');
        const craftsman = offerItem.querySelector('.offer-author a').textContent;
        const price = offerItem.querySelector('.offer-price').textContent;
        const description = offerItem.querySelector('p').textContent;

        document.getElementById('selectedOfferCraftsman').textContent = craftsman;
        document.getElementById('selectedOfferPrice').textContent = price;
        document.getElementById('selectedOfferDescription').textContent = description;

        const modal = new bootstrap.Modal(document.getElementById('selectOfferModal'));
        modal.show();
    });
});

// تأكيد اختيار العرض
document.querySelector('.confirm-select-offer-btn').addEventListener('click', function() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('selectOfferModal'));
    modal.hide();
    alert('تم اختيار العرض بنجاح! يرجى إتمام الدفع لتأكيد الطلب.');
    // هنا يمكن إضافة منطق لتحديث حالة الطلب إلى "قيد التنفيذ"
});

// تأكيد إتمام الخدمة
document.querySelectorAll('.confirm-completion-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modal = new bootstrap.Modal(document.getElementById('confirmCompletionModal'));
        modal.show();
    });
});

document.querySelector('.final-confirm-completion-btn').addEventListener('click', function() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmCompletionModal'));
    modal.hide();
    alert('تم تأكيد إتمام الخدمة! سيتم تحويل المبلغ إلى الحرفي.');
    // هنا يمكن إضافة منطق لتحديث حالة الطلب إلى "مكتمل"
});

// فتح نزاع
document.querySelectorAll('.open-dispute-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modal = new bootstrap.Modal(document.getElementById('openDisputeModal'));
        modal.show();
    });
});

document.querySelector('.submit-dispute-btn').addEventListener('click', function() {
    const description = document.getElementById('disputeDescription').value;
    if (!description) {
        alert('يرجى وصف المشكلة قبل إرسال النزاع.');
        return;
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('openDisputeModal'));
    modal.hide();
    alert('تم إرسال النزاع بنجاح! سيتم مراجعته من قبل فريق الدعم.');
    // هنا يمكن إضافة منطق لإرسال النزاع إلى الخادوم
});