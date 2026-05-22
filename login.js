// جلب عناصر النموذج والأزرار من الـ HTML
const signinForm = document.getElementById('signin-form');
const registerForm = document.getElementById('register-form');
const btnSignin = document.getElementById('btn-signin');
const btnRegister = document.getElementById('btn-register');

// دالة لإظهار صفحة إنشاء الحساب وإخفاء تسجيل الدخول
function showRegister() {
    signinForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    btnSignin.classList.remove('active');
    btnRegister.classList.add('active');
}

// دالة لإظهار صفحة تسجيل الدخول وإخفاء إنشاء الحساب
function showSignIn() {
    registerForm.classList.add('hidden');
    signinForm.classList.remove('hidden');
    btnRegister.classList.remove('active');
    btnSignin.classList.add('active');
}
function checkLogin() {
    // 1. جلب البيانات من خانات الإدخال
    var email = document.querySelector('input[type="email"]').value;
    var password = document.querySelector('input[type="password"]').value;
    
    // كود التحقق من صيغة الإيميل (Regex)
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // 2. التأكد من أن الخانات ليست فارغة
    if (email.trim() === "" || password.trim() === "") {
        alert("يا صديقي، لازم تكتب الإيميل والباسورد الأول! 🧐");
    } 
    // 3. التأكد من صحة صيغة الإيميل (وجود @ ونقطة)
    else if (!emailPattern.test(email)) {
        alert("خطأ: يرجى كتابة بريد إلكتروني صحيح! 📧");
    }
    // 4. التأكد من طول كلمة المرور (بين 8 و 16 حرف)
    else if (password.length < 8 || password.length > 16) {
        alert("خطأ: كلمة المرور يجب أن تكون بين 8 و 16 حرفاً أو رقماً! ❌");
    } 
    // 5. الانتقال للصفحة الأخرى في حال نجاح الشروط
    else {
        // بنحفظ هنا إن المستخدم سجل دخول بنجاح
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = "wasatah.html";
    }
}

function checkRegister() {
    // 1. جلب البيانات بدقة من جوة فورم التسجيل باستخدام الـ ID الصح ونظفنا المسافات بـ trim
    var name = document.querySelector('#register-form input[type="text"]').value.trim();
    var email = document.querySelector('#register-form input[type="email"]').value.trim();
    var password = document.querySelector('#register-form input[type="password"]').value; // الباسورد بدون trim عشان لو فيه مسافة مقصودة
    
    // كود التحقق من صيغة الإيميل (Regex)
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // 2. التأكد من أن خانة الاسم مش فاضية
    if (name === "") {
        alert("خطأ: يرجى كتابة الاسم الكامل أولاً! 👤");
    }
    // 3. التأكد من صحة صيغة الإيميل (وجود @ ونقطة وضمان إنه مش بأرقام وبس)
    else if (!emailPattern.test(email)) {
        alert("خطأ: يرجى كتابة بريد إلكتروني صحيح! 📧");
    }
    // 4. التأكد من طول كلمة المرور (بين 8 و 16 حرف)
    else if (password.length < 8 || password.length > 16) {
        alert("خطأ: كلمة المرور يجب أن تكون بين 8 و 16 حرفاً أو رقماً! ❌");
    }
    // 5. الانتقال للصفحة الأخرى في حال نجاح الشروط
    else {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = "wasatah.html";
    }
}

