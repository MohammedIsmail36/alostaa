// assets/js/admin-login.js

function adminLogin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    // محاكاة التحقق (يمكن استبدالها بطلب API لاحقًا)
    if (email === "admin" && password === "admin") {
        localStorage.setItem('adminLoggedIn', 'true');
        Toastify({
            text: "تم تسجيل الدخول بنجاح!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#10B981"
        }).showToast();
        setTimeout(() => {
            window.location.href = 'admin-blog-list.html';
        }, 1000);
    } else {
        Toastify({
            text: "البريد الإلكتروني أو كلمة المرور غير صحيحة!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#EF4444"
        }).showToast();
    }
}