// assets/js/login.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('تم تسجيل الدخول بنجاح! سيتم توجيهك إلى الصفحة الرئيسية.');
    window.location.href = 'index.html';
});