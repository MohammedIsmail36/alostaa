// assets/js/signup-client.js

document.getElementById('signupClientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('كلمة المرور وتأكيد كلمة المرور غير متطابقتين!');
        return;
    }

    alert('تم إنشاء الحساب بنجاح! سيتم توجيهك إلى صفحة تسجيل الدخول.');
    window.location.href = 'login.html';
});