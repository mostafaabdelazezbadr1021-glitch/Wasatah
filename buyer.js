document.addEventListener('DOMContentLoaded', () => {

    // --- 1. جلب العناصر الأساسية (DOM Elements) ---
    const codeSection = document.getElementById('codeSection');
    const detailsSection = document.getElementById('detailsSection');
    const checkCodeBtn = document.getElementById('checkCodeBtn');
    const dealCodeInput = document.getElementById('dealCode');

    // عناصر نافذة الدفع (Modal)
    const paymentModal = document.getElementById('paymentModal');
    const acceptBtn = document.getElementById('acceptBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // حقول البطاقة البنكية للتنسيق
    const cardNumberInput = document.getElementById('cardNumberInput');
    const cardExpiryInput = document.getElementById('cardExpiryInput');


    // --- 2. نظام التنسيق التلقائي لكود الـ 12 رقم (XXXX/XXXX/XXXX) ---
    dealCodeInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // تنظيف المدخلات من أي حروف
        if (value.length > 12) value = value.slice(0, 12);

        let formatted = '';
        if (value.length > 0) {
            formatted += value.substr(0, 4);
            if (value.length > 4) formatted += '/' + value.substr(4, 4);
            if (value.length > 8) formatted += '/' + value.substr(8, 4);
        }
        e.target.value = formatted;
    });


    // --- 3. نظام التحقق من الكود والانتقال الذكي ---
    checkCodeBtn.addEventListener('click', () => {
        const enteredCode = dealCodeInput.value.trim();

        if (enteredCode === '') {
            alert('Please enter the deal code to proceed');
            return;
        }
        if (enteredCode.length < 14) { // 12 رقم + 2 سلاش
            alert('The code is incomplete! Please make sure you have entered all 12 digits');
            return;
        }

        // الكود التجريبي الافتراضي المطابق للمزامنة
        const testCode = '1234/5678/9012';

        if (enteredCode === testCode) {
            codeSection.classList.add('hidden');
            detailsSection.classList.remove('hidden');
        } else {
            alert('Sorry, the code you entered is incorrect. Please check and try again');
        }
    });


    // --- 4. برمجة نافذة الدفع والتبديل (Modal System) ---

    // فتح نافذة الدفع
    acceptBtn.addEventListener('click', () => {
        paymentModal.classList.remove('hidden');
    });

    // إغلاق نافذة الدفع
    closeModalBtn.addEventListener('click', () => {
        paymentModal.classList.add('hidden');
    });

    // آلية التبديل بين الـ Tabs بنعومة
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.add('hidden'));

            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(targetTab).classList.remove('hidden');
        });
    });


    // --- 5. تنسيقات تلقائية داخل حقول بطاقة الدفع البنكية ---

    // مسافات تلقائية كل 4 أرقام في الكارت
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let matches = value.match(/\d{4,16}/g);
        let match = matches && matches[0] || '';
        let parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        e.target.value = parts.length > 0 ? parts.join(' ') : value;
    });

    // تنسيق سلاش تاريخ الانتهاء تلقائياً (MM/YY)
    cardExpiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length >= 2) {
            e.target.value = value.substr(0, 2) + '/' + value.substr(2, 2);
        } else {
            e.target.value = value;
        }
    });


    // --- 6. معالجة الإرسال النهائي (الربط المستقبلي مع الـ Back-End) ---
    document.getElementById('cardForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Front-End Success: جاري إرسال بيانات الكارت مشفرة بالكامل إلى الـ Back-End للتحقق وتجميد الـ 50$');
        paymentModal.classList.add('hidden');
    });

    document.getElementById('walletForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Front-End Success: تم إرسال رقم المحفظة للـ Back-End لطلب الـ OTP وتأكيد الخصم');
        paymentModal.classList.add('hidden');
    });


    // --- 7. أزرار تكميلية للتحكم بالصفقة ---
    document.getElementById('viewFileBtn').addEventListener('click', () => {
        alert('فتح واجهة معاينة ملف الـ Watermarked المحمي...');
    });

    document.getElementById('rejectBtn').addEventListener('click', () => {
        if (confirm('هل أنت متأكد من رفض هذه الصفقة وإلغائها نهائياً؟')) {
            alert('تم إلغاء الصفقة وإشعار البائع.');
            dealCodeInput.value = '';
            detailsSection.classList.add('hidden');
            codeSection.classList.remove('hidden');
        }
    });
});
