document.addEventListener('DOMContentLoaded', () => {
    
    // الدالة الذكية لتهندل السحب والإفلات وتغيير النصوص جوة نفس الكلاسات
    function setupDropZone(zoneId, inputId) {
        const zone = document.getElementById(zoneId);
        const input = document.getElementById(inputId);

        const zoneText = zone.querySelector('.drop-zone-text');
        const zoneSubtext = zone.querySelector('.drop-zone-subtext');
        const zoneIcon = zone.querySelector('.upload-icon');

        zone.addEventListener('click', () => input.click());

        function updateZoneWithFile(file) {
            zone.classList.add('active');
            
            if (zoneIcon) zoneIcon.innerHTML = '✔️';
            if (zoneText) {
                zoneText.innerHTML = `تم تجهيز: ${file.name}`;
                zoneText.style.color = 'var(--success-color)';
            }
            if (zoneSubtext) {
                zoneSubtext.innerHTML = 'اضغط هنا لتغيير الملف المحدد';
                zoneSubtext.style.color = 'rgba(16, 185, 129, 0.7)';
            }
        }

        input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                updateZoneWithFile(e.target.files[0]);
            }
        });

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!zone.classList.contains('active')) {
                zone.style.borderColor = 'var(--accent-blue)';
                zone.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
            }
        });

        zone.addEventListener('dragleave', () => {
            if (!zone.classList.contains('active')) {
                zone.style.borderColor = 'var(--border-color)';
                zone.style.backgroundColor = 'var(--input-bg)';
            }
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length > 0) {
                input.files = e.dataTransfer.files;
                updateZoneWithFile(input.files[0]);
            }
        });
    }

    setupDropZone('previewZone', 'previewFile');
    setupDropZone('originalZone', 'originalFile');

    // ================= الخصائص الجديدة لربط وتوليد كود الصفقة =================

    const mainUploadCard = document.getElementById('mainUploadCard');
    const successContainer = document.getElementById('successContainer');
    const generatedCodeDisplay = document.getElementById('generatedCode');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const backToFormBtn = document.getElementById('backToFormBtn');
    const escrowForm = document.getElementById('escrowForm');

    // دالة توليد كود عشوائي 12 رقم وتنسيقه (XXXX/XXXX/XXXX)
    function generateSmartCode() {
        let codeDigits = '';
        // توليد 12 رقم عشوائي
        for (let i = 0; i < 12; i++) {
            codeDigits += Math.floor(Math.random() * 10).toString();
        }
        // تقسيمهم بالسلاش عشان التناسق مع المشتري
        return `${codeDigits.substr(0, 4)}/${codeDigits.substr(4, 4)}/${codeDigits.substr(8, 4)}`;
    }

    // هندلة ضغط زر الحفظ والإرسال
    escrowForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // توليد الكود الذكي وتثبيته في لوحة العرض
        const newDealCode = generateSmartCode();
        generatedCodeDisplay.textContent = newDealCode;

        // إخفاء كارد الفورم وإظهار كارد النجاح والكود بنعومة
        mainUploadCard.classList.add('hidden');
        successContainer.classList.remove('hidden');
    });

    // ميزة نسخ الكود التلقائي بضغطة زر
    copyCodeBtn.addEventListener('click', () => {
        const codeText = generatedCodeDisplay.textContent;
        navigator.clipboard.writeText(codeText).then(() => {
            copyCodeBtn.textContent = 'تم نسخ الكود! 📋';
            copyCodeBtn.style.backgroundColor = '#047857'; // تغيير اللون الأخضر لدرجة أغمق للتأكيد
            
            // إرجاع الزر لشكلة الطبيعي بعد ثانيتين
            setTimeout(() => {
                copyCodeBtn.textContent = 'نسخ كود الصفقة';
                copyCodeBtn.style.backgroundColor = 'var(--success-color)';
            }, 2000);
        }).catch(err => {
            alert('حدث خطأ أثناء النسخ، يمكنك نسخه يدوياً: ' + codeText);
        });
    });

    // العودة لإنشاء صفقة جديدة وتفريغ الحقول القديمة
    backToFormBtn.addEventListener('click', () => {
        escrowForm.reset();
        
        // إرجاع صناديق الرفع لشكلها الافتراضي
        document.querySelectorAll('.file-drop-zone').forEach(zone => {
            zone.classList.remove('active');
            zone.style.borderColor = 'var(--border-color)';
            zone.style.backgroundColor = 'var(--input-bg)';
            
            const icon = zone.querySelector('.upload-icon');
            const text = zone.querySelector('.drop-zone-text');
            const subtext = zone.querySelector('.drop-zone-subtext');

            if(zone.id === 'previewZone') {
                if(icon) icon.innerHTML = '👁️‍عون';
                if(text) text.innerHTML = 'اضغط هنا أو اسحب ملف المعاينة';
                if(subtext) subtext.innerHTML = 'فيديو منقوص، صورة عليها ووترمارك، إلخ.';
            } else {
                if(icon) icon.innerHTML = '🔒';
                if(text) text.innerHTML = 'اضغط هنا أو اسحب الملف الأصلي النظيف';
                if(subtext) subtext.innerHTML = 'الملف بصيغته النهائية الكاملة بدون أي تعديل';
            }
            if(text) text.style.color = 'var(--text-main)';
            if(subtext) subtext.style.color = 'var(--text-muted)';
        });

        // تبديل الكروت
        successContainer.classList.add('hidden');
        mainUploadCard.classList.remove('hidden');
    });
});