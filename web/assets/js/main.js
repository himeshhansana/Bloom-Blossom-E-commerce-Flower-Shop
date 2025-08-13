///* Additional JavaScript functionality for the flower e-commerce site */
//
//// Smooth scroll and form animations
//document.addEventListener('DOMContentLoaded', function () {
//    // Add loading animation for forms
//    const forms = document.querySelectorAll('form');
//    forms.forEach(form => {
//        form.addEventListener('submit', function (e) {
//            const submitBtn = form.querySelector('.btn-form');
//            if (submitBtn) {
//                submitBtn.style.transform = 'scale(0.95)';
//                setTimeout(() => {
//                    submitBtn.style.transform = 'scale(1)';
//                }, 150);
//            }
//        });
//    });
//
//    // Add focus effects to form inputs
//    const inputs = document.querySelectorAll('.form-control');
//    inputs.forEach(input => {
//        input.addEventListener('focus', function () {
//            this.parentElement.style.transform = 'translateY(-2px)';
//            this.parentElement.style.transition = 'transform 0.3s ease';
//        });
//
//        input.addEventListener('blur', function () {
//            this.parentElement.style.transform = 'translateY(0)';
//        });
//    });
//
//    // Add typing effect to subtitles
//    const subtitles = document.querySelectorAll('.subtitle');
//    subtitles.forEach(subtitle => {
//        const text = subtitle.textContent;
//        subtitle.textContent = '';
//        let i = 0;
//
//        const typeWriter = () => {
//            if (i < text.length) {
//                subtitle.textContent += text.charAt(i);
//                i++;
//                setTimeout(typeWriter, 30);
//            }
//        };
//
//        setTimeout(typeWriter, 500);
//    });
//});
//
//// Email validation
//function validateEmail(email) {
//    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//    return re.test(email);
//}
//
//// Password strength checker
//function checkPasswordStrength(password) {
//    let strength = 0;
//    if (password.length >= 8)
//        strength++;
//    if (password.match(/[a-z]/))
//        strength++;
//    if (password.match(/[A-Z]/))
//        strength++;
//    if (password.match(/[0-9]/))
//        strength++;
//    if (password.match(/[^a-zA-Z0-9]/))
//        strength++;
//
//    return strength;
//}
//
//// Flower animation effects
//function createFloatingFlowers() {
//    const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌵', '🌿'];
//
//    for (let i = 0; i < 5; i++) {
//        setTimeout(() => {
//            const flower = document.createElement('div');
//            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
//            flower.style.position = 'fixed';
//            flower.style.fontSize = '20px';
//            flower.style.pointerEvents = 'none';
//            flower.style.zIndex = '1000';
//            flower.style.left = Math.random() * window.innerWidth + 'px';
//            flower.style.top = '-50px';
//            flower.style.animation = 'fall 10s linear infinite';
//
//            document.body.appendChild(flower);
//
//            setTimeout(() => {
//                flower.remove();
//            }, 10000);
//        }, i * 2000);
//    }
//}
//
//// Add CSS for falling flowers animation
//const style = document.createElement('style');
//style.textContent = `
//    @keyframes fall {
//        to {
//            transform: translateY(calc(100vh + 50px)) rotate(360deg);
//        }
//    }
//`;
//document.head.appendChild(style);
//
//// Initialize floating flowers on special occasions
//if (Math.random() > 0.7) {
//    createFloatingFlowers();
//}
