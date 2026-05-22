if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Wasatah Dashboard Separated Files Loaded Successfully.");
});

// الدالة المسؤولة عن التوجيه الفوري عند الضغط على الكارت
function selectRole(role) {
    if (role === 'Seller') {
        // alert("جارٍ توجيهك مباشرة إلى صفحة البائع... 💰");
        // مستقبلاً حط رابط صفحة البائع هنا:
        window.location.href = "seller.html";
    } else if (role === 'Buyer') {
        // alert("جارٍ توجيهك مباشرة إلى صفحة المشتري... 🛒");
        // مستقبلاً حط رابط صفحة المشتري هنا:
        window.location.href = "buyer.html";
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // التحقق هل المستخدم مسجل دخول؟
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        // لو مش مسجل، اطرده فوراً لصفحة تسجيل الدخول
        window.location.href = "login.html";
        return; // أوقف تنفيذ باقي الكود
    }

    console.log("Wasatah Dashboard Separated Files Loaded Successfully.");
});

// الدالة المسؤولة عن التوجيه الفوري عند الضغط على الكارت
function selectRole(role) {
    if (role === 'Seller') {
        window.location.href = "Seller.html";
    } else if (role === 'Buyer') {
        window.location.href = "buyer.html";
    }
}
