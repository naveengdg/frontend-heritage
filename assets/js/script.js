console.log('script.js loaded!');

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.site-card, .feature-card').forEach(el => {
    observer.observe(el);
});

// Language selector functionality
const languageSelector = document.querySelector('.language-selector select');
if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
        // Here you would typically implement language switching logic
        console.log('Language changed to:', e.target.value);
    });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Get form fields
        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        try {
            const res = await fetch('https://heritage-backend-yf3u.onrender.com/contact-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
                credentials: 'include'
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message || 'Thank you for your message! 🌟 We will get back to you soon.');
                contactForm.reset();
            } else {
                alert(data.error || 'Failed to send your message. Please try again.');
            }
        } catch (err) {
            alert('Network error. Please try again.');
        }
    });
}

// Add hover effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Page transition and loading optimization

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading overlay after page is fully loaded
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 300);
    }
});

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Add transition class to all links
    const links = document.querySelectorAll('a:not([target="_blank"])');
    links.forEach(link => {
        // Only apply to internal links
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function(e) {
                // Skip if modifier keys are pressed
                if (e.metaKey || e.ctrlKey) return;
                
                const href = this.getAttribute('href');
                // Skip for anchors on the same page
                if (href.startsWith('#')) return;
                
                e.preventDefault();
                
                // Show loading overlay
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                    setTimeout(() => {
                        loadingOverlay.style.opacity = '1';
                    }, 10);
                }
                
                // Navigate after a short delay
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        }
    });
});

// Mobile menu toggle (for responsive design)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileMenuBtn) return;
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navbar.classList.toggle('nav-open');
    });
    // Optional: Close menu when a link is clicked (for better UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('nav-open');
        });
    });
};

// Initialize mobile menu after DOM is loaded
window.addEventListener('DOMContentLoaded', createMobileMenu);

// Add CSS class for mobile menu
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #333;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: white;
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add loading animation styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Translation data
const translations = {
    en: {
        hero_title: "Discover Tamil Nadu's Rich Heritage",
        hero_subtitle: "Experience the magic of ancient temples, palaces, and cultural landmarks",
        start_exploring: "Start Exploring",
        featured_sites: "Featured Heritage Sites",
        site1_title: "Meenakshi Temple",
        site1_desc: "Ancient temple complex in Madurai",
        site2_title: "Thanjavur Palace",
        site2_desc: "Royal residence of the Maratha rulers",
        site3_title: "Vellore Fort",
        site3_desc: "16th-century fort with rich history",
        explore: "Explore",
        features_title: "Experience Heritage Like Never Before",
        feature1_title: "Multilingual Support",
        feature1_desc: "Explore in your preferred language",
        feature2_title: "Interactive Maps",
        feature2_desc: "Navigate through heritage sites easily",
        feature3_title: "AR/VR Experience",
        feature3_desc: "Immerse yourself in history",
        feature4_title: "Voice Guide",
        feature4_desc: "Listen to detailed explanations",
        feature_btn_experience: "Experience this Feature",
        voice_coming_soon: "Voice Guide feature will be available soon!",
        about_title: "About Our Heritage Initiative",
        about_desc: "We are dedicated to preserving and promoting Tamil Nadu's rich cultural heritage through innovative technology and immersive experiences.",
        learn_more: "Learn More",
        contact_title: "Get in Touch",
        your_name: "Your Name",
        your_email: "Your Email",
        your_message: "Your Message",
        send_message: "Send Message",
        footer_title: "Heritage Explorer",
        footer_desc: "Discover the rich cultural heritage of Tamil Nadu",
        quick_links: "Quick Links",
        footer_home: "Home",
        footer_sites: "Sites",
        footer_about: "About",
        footer_contact: "Contact",
        connect_with_us: "Connect With Us",
        copyright: "© 2025 Heritage Explorer. All rights reserved.",
        // Register page
        register_title: "Create Your Account",
        register_btn: "Register",
        already_account: "Already have an account? ",
        login_here: "Login here",
        password: "Password",
        confirm_password: "Confirm Password",
        // Login page
        login_title: "Login to Your Account",
        login_btn: "Login",
        no_account: "Don't have an account? ",
        register_here: "Register here",
        // Thanjavur page
        thanjavur_desc: "Thanjavur Palace, located in the heart of Thanjavur, Tamil Nadu, is a magnificent structure built by the Nayak rulers and later expanded by the Marathas. The palace complex includes grand halls, art galleries, a library, and the famous Saraswathi Mahal Library. It stands as a testament to the region's rich history, art, and architecture.",
        thanjavur_video_label: "YouTube: Thanjavur Palace Documentary",
        back_to_sites: "Back to Sites",
        vellore_desc: "Vellore Fort, built in the 16th century by the Vijayanagara kings, is a massive fortification in Vellore, Tamil Nadu. Known for its grand ramparts, wide moat, and robust granite walls, the fort has witnessed many historical events and houses a temple, mosque, and church within its walls. It is a symbol of the region's military and cultural history.",
        vellore_video_label: "YouTube: Vellore Fort Documentary",
        // Meenakshi page
        meenakshi_desc: "Meenakshi Temple, located in Madurai, Tamil Nadu, is a historic Hindu temple dedicated to Meenakshi, a form of Parvati, and her consort Sundareswarar, a form of Shiva. The temple is renowned for its stunning architecture, towering gopurams, and vibrant festivals.",
        meenakshi_video_label: "YouTube: Meenakshi Temple Documentary",
    },
    ta: {
        hero_title: "தமிழ்நாட்டின் பாரம்பரியத்தை கண்டறியுங்கள்",
        hero_subtitle: "பழமையான கோயில்கள், அரண்மனைகள் மற்றும் கலாச்சார நினைவிடங்களின் மகிமையை அனுபவிக்கவும்",
        start_exploring: "ஆரம்பிக்கவும்",
        featured_sites: "சிறப்பு பாரம்பரிய இடங்கள்",
        site1_title: "மீனாட்சி அம்மன் கோவில்",
        site1_desc: "மதுரையில் உள்ள பழமையான கோயில் தொகுதி",
        site2_title: "தஞ்சாவூர் அரண்மனை",
        site2_desc: "மராத்தா அரசர்களின் அரண்மனை",
        site3_title: "வேலூர் கோட்டை",
        site3_desc: "சிறப்பான வரலாற்று கொண்ட 16ஆம் நூற்றாண்டு கோட்டை",
        explore: "விரிவாக",
        features_title: "பாரம்பரியத்தை புதிய அனுபவத்தில்",
        feature1_title: "பல மொழி ஆதரவு",
        feature1_desc: "உங்கள் விருப்ப மொழியில் அனுபவிக்கவும்",
        feature2_title: "இணையவழி வரைபடங்கள்",
        feature2_desc: "பாரம்பரிய இடங்களை எளிதாக வழிநடத்தவும்",
        feature3_title: "AR/VR அனுபவம்",
        feature3_desc: "வரலாற்றில் முழுமையாக கலந்துகொள்ளவும்",
        feature4_title: "குரல் வழிகாட்டி",
        feature4_desc: "விரிவான விளக்கங்களை கேளுங்கள்",
        feature_btn_experience: "இந்த அம்சத்தை அனுபவிக்கவும்",
        voice_coming_soon: "குரல் வழிகாட்டி அம்சம் விரைவில் கிடைக்கும்!",
        about_title: "எங்கள் பாரம்பரிய முயற்சி பற்றி",
        about_desc: "புதிய தொழில்நுட்பம் மற்றும் முழுமையான அனுபவங்கள் மூலம் தமிழ்நாட்டின் பாரம்பரியத்தை பாதுகாக்கவும், மேம்படுத்தவும் நாங்கள் அர்ப்பணிக்கப்பட்டுள்ளோம்.",
        learn_more: "மேலும் அறிக",
        contact_title: "தொடர்பு கொள்ளவும்",
        your_name: "உங்கள் பெயர்",
        your_email: "உங்கள் மின்னஞ்சல்",
        your_message: "உங்கள் செய்தி",
        send_message: "அனுப்பவும்",
        footer_title: "பாரம்பரிய எக்ஸ்ப்ளோரர்",
        footer_desc: "தமிழ்நாட்டின் பாரம்பரியத்தை கண்டறியுங்கள்",
        quick_links: "விரைவு இணைப்புகள்",
        footer_home: "முகப்பு",
        footer_sites: "இடங்கள்",
        footer_about: "பற்றி",
        footer_contact: "தொடர்பு",
        connect_with_us: "எங்களை தொடர்புகொள்ளவும்",
        copyright: "© 2025 பாரம்பரிய எக்ஸ்ப்ளோரர். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
        // Register page
        register_title: "உங்கள் கணக்கை உருவாக்குங்கள்",
        register_btn: "பதிவு செய்யவும்",
        already_account: "ஏற்கனவே கணக்கு உள்ளதா? ",
        login_here: "இங்கே உள்நுழையவும்",
        password: "கடவுச்சொல்",
        confirm_password: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
        // Login page
        login_title: "உங்கள் கணக்கில் உள்நுழையவும்",
        login_btn: "உள்நுழையவும்",
        no_account: "கணக்கு இல்லையா? ",
        register_here: "இங்கே பதிவு செய்யவும்",
        // Thanjavur page
        thanjavur_desc: "தஞ்சாவூர் அரண்மனை, தமிழ்நாட்டின் தஞ்சாவூரில் அமைந்துள்ள ஒரு பிரம்மாண்டமான கட்டிடம். நாயக்கர் அரசர்களால் கட்டப்பட்டு பின்னர் மராத்தியர்களால் விரிவாக்கப்பட்டது. அரண்மனை வளாகத்தில் பெரிய மண்டபங்கள், கலை அரங்குகள், நூலகம் மற்றும் புகழ்பெற்ற சரஸ்வதி மகால் நூலகம் உள்ளன. இது அந்த பகுதியின் வரலாறு, கலை மற்றும் கட்டிடக்கலையின் சிறப்பை வெளிப்படுத்துகிறது.",
        thanjavur_video_label: "யூடியூப்: தஞ்சாவூர் அரண்மனை ஆவணப்படம்",
        back_to_sites: "இடங்களுக்கு திரும்பவும்",
        vellore_desc: "வேலூர் கோட்டை, 16ஆம் நூற்றாண்டில் விஜயநகர அரசர்களால் கட்டப்பட்ட ஒரு பிரம்மாண்டமான கோட்டை. அதன் பெரிய மதில்கள், அகலமான அகழி மற்றும் வலுவான கிரானைட் சுவர்களுக்காக பிரபலமானது. இந்த கோட்டையில் ஒரு கோவில், மசூதி மற்றும் தேவாலயம் உள்ளன. இது அந்த பகுதியின் இராணுவ மற்றும் கலாச்சார வரலாற்றின் அடையாளமாகும்.",
        vellore_video_label: "யூடியூப்: வேலூர் கோட்டை ஆவணப்படம்",
        // Meenakshi page
        meenakshi_desc: "மதுரையில் அமைந்துள்ள மீனாட்சி அம்மன் கோவில், பார்வதி தேவியின் வடிவமான மீனாட்சிக்கும், சிவபெருமானின் வடிவமான சுந்தரேசுவரருக்கும் அர்ப்பணிக்கப்பட்ட ஒரு வரலாற்று சிறப்புமிக்க இந்து கோவில். அதன் சிறப்பான கட்டிடக்கலை, உயரமான கோபுரங்கள் மற்றும் வண்ணமயமான திருவிழாக்களுக்கு பெயர் பெற்றது.",
        meenakshi_video_label: "யூடியூப்: மீனாட்சி அம்மன் கோவில் ஆவணப்படம்",
    }
};

function updateLanguage(lang) {
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });
    // Add or remove tamil class on body for special Tamil styling
    if (lang === 'ta') {
        document.body.classList.add('tamil');
    } else {
        document.body.classList.remove('tamil');
    }
    // Special: update Back to Sites button if present (for safety)
    var backBtn = document.getElementById('back-to-sites-btn');
    if (backBtn && translations[lang] && translations[lang]['back_to_sites']) {
        backBtn.querySelector('span[data-i18n="back_to_sites"]').textContent = translations[lang]['back_to_sites'];
    }
}

function getCurrentLanguage() {
    return localStorage.getItem('heritage_lang') || 'en';
}

function setLanguageSwitcherValue(lang) {
    // Update all language switchers on the page
    document.querySelectorAll('.language-selector select').forEach(sel => {
        if (sel.value !== lang) sel.value = lang;
    });
}

// On DOMContentLoaded, set language and update all translatable elements
window.addEventListener('DOMContentLoaded', () => {
    const lang = getCurrentLanguage();
    setLanguageSwitcherValue(lang);
    updateLanguage(lang);
});

// Listen for changes on all language switchers
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.language-selector select').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const lang = e.target.value;
            localStorage.setItem('heritage_lang', lang);
            setLanguageSwitcherValue(lang);
            updateLanguage(lang);
        });
    });
});

// Fancy alert for contact form if redirected from about page
window.addEventListener('DOMContentLoaded', function() {
    // Check if redirected from about page
    const url = new URL(window.location.href);
    if (url.hash.startsWith('#contact') && url.search.includes('from=about')) {
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        // Add alert on send message
        const sendBtn = document.getElementById('contact-send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Thank you for your interest! 🌟\nOur team will get back to you soon. Have a wonderful day exploring heritage!');
                // Remove ?from=about from URL so alert only shows once
                history.replaceState(null, '', window.location.pathname + '#contact');
            }, { once: true });
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.auth-btn.login-btn');
    const registerBtn = document.querySelector('.auth-btn.register-btn');
    const separator = document.querySelector('.auth-separator');

    // Login/Register Modal Logic
    function injectLoginRegisterModal() {
        console.log('Injecting login/register modal');
        if (document.getElementById('login-register-modal')) {
            console.log('Modal already exists, not injecting again');
            return;
        }
        
        const modalHTML = `
        <div id="login-register-modal" class="modal">
            <div class="modal-content">
                <div class="modal-tabs">
                    <button class="tab-btn active" data-tab="login">Login</button>
                    <button class="tab-btn" data-tab="register">Register</button>
                </div>
                <div class="tab-content">
                    <div id="login-tab" class="tab-pane active">
                        <h2>Login</h2>
                        <form id="login-form">
                            <div class="form-group">
                                <label for="login-email">Email</label>
                                <input type="email" id="login-email" required>
                            </div>
                            <div class="form-group">
                                <label for="login-password">Password</label>
                                <input type="password" id="login-password" required>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn primary-btn">Login</button>
                            </div>
                            <div id="login-message" class="message"></div>
                        </form>
                    </div>
                    <div id="register-tab" class="tab-pane">
                        <h2>Register</h2>
                        <form id="register-form">
                            <div class="form-group">
                                <label for="register-name">Full Name</label>
                                <input type="text" id="register-name" required>
                            </div>
                            <div class="form-group">
                                <label for="register-email">Email</label>
                                <input type="email" id="register-email" required>
                            </div>
                            <div class="form-group">
                                <label for="register-password">Password</label>
                                <input type="password" id="register-password" required>
                                <small>At least 8 characters with letters and numbers</small>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn primary-btn">Register</button>
                            </div>
                            <div id="register-message" class="message"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        console.log('Modal HTML injected');
        
        // Tab switching logic
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                document.getElementById(`${this.dataset.tab}-tab`).classList.add('active');
            });
        });
        
        // Form submission logic
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const messageEl = document.getElementById('login-message');
            
            try {
                const res = await fetch('https://heritage-backend-yf3u.onrender.com/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await res.json();
                console.log('Login response:', data);
                
                if (res.ok) {
                    messageEl.textContent = data.message;
                    messageEl.className = 'message success';
                    
                    // Store user data in localStorage
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('logged_in', 'true');
                    console.log('User data saved to localStorage');
                    
                    // Update UI
                    setTimeout(() => {
                        document.getElementById('login-register-modal').classList.remove('active');
                        document.body.classList.remove('modal-blocked');
                        // Reload the page to update the navbar
                        window.location.reload();
                    }, 1000);
                } else {
                    messageEl.textContent = data.message || 'Login failed';
                    messageEl.className = 'message error';
                }
            } catch (err) {
                messageEl.textContent = 'Error connecting to server';
                messageEl.className = 'message error';
                console.error('Login error:', err);
            }
        });
        
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const messageEl = document.getElementById('register-message');
            
            // Validate password
            if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
                messageEl.textContent = 'Password must be at least 8 characters with letters and numbers';
                messageEl.className = 'message error';
                return;
            }
            
            try {
                const res = await fetch('https://heritage-backend-yf3u.onrender.com/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                
                const data = await res.json();
                console.log('Register response:', data);
                
                if (res.ok) {
                    messageEl.textContent = data.message;
                    messageEl.className = 'message success';
                    
                    // Switch to login tab after successful registration
                    setTimeout(() => {
                        document.querySelector('.tab-btn[data-tab="login"]').click();
                        document.getElementById('login-email').value = email;
                        document.getElementById('login-message').textContent = 'Registration successful! Please login.';
                        document.getElementById('login-message').className = 'message success';
                    }, 1000);
                } else {
                    messageEl.textContent = data.message || 'Registration failed';
                    messageEl.className = 'message error';
                }
            } catch (err) {
                messageEl.textContent = 'Error connecting to server';
                messageEl.className = 'message error';
                console.error('Registration error:', err);
            }
        });
    }

    function showLoginRegisterModal() {
        console.log('Showing login/register modal');
        const modal = document.getElementById('login-register-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('modal-blocked');
        } else {
            console.log('Modal element not found');
        }
    }

    // Initialize login modal on page load if needed
    // Function to create and show the login wall modal that matches the screenshot
function createLoginWall() {
    console.log('Creating login wall');
    if (document.getElementById('welcome-modal')) {
        console.log('Welcome modal already exists');
        return;
    }
    
    // Hide the entire page content
    document.body.style.overflow = 'hidden';
    
    // Create the welcome modal exactly as shown in the screenshot
    const welcomeModalHTML = `
    <div id="welcome-modal" class="modal">
        <div class="modal-content">
            <div class="user-icon">
                <i class="fas fa-user-circle"></i>
            </div>
            <h2>Welcome to Heritage Explorer!</h2>
            <p>To get the best experience, please <span>Login</span> or <span>Register</span>.</p>
            <p>Unlock personalized features and more!</p>
            <div class="modal-buttons">
                <a href="#" id="welcome-login-btn" class="btn primary-btn">Login</a>
                <a href="#" id="welcome-register-btn" class="btn primary-btn">Register</a>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', welcomeModalHTML);
    
    // Add styles for the welcome modal to match the screenshot exactly
    const style = document.createElement('style');
    style.textContent = `
        #welcome-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        #welcome-modal .modal-content {
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        #welcome-modal .user-icon {
            font-size: 40px;
            color: #B8860B;
            margin-bottom: 15px;
        }
        #welcome-modal h2 {
            color: #7c4a03;
            margin-bottom: 15px;
            font-size: 22px;
        }
        #welcome-modal p {
            color: #6d4c1a;
            margin-bottom: 10px;
            font-size: 16px;
        }
        #welcome-modal p span {
            font-weight: bold;
        }
        #welcome-modal .modal-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }
        #welcome-modal .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            font-size: 16px;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
        }
        #welcome-modal .primary-btn {
            background-color: #B8860B;
            color: white;
        }
        #welcome-modal .primary-btn:hover {
            background-color: #7c4a03;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners for the buttons
    document.getElementById('welcome-login-btn').addEventListener('click', function(e) {
        e.preventDefault();
        injectLoginRegisterModal();
        showLoginRegisterModal();
        // Show login tab
        document.querySelector('.tab-btn[data-tab="login"]').click();
    });
    
    document.getElementById('welcome-register-btn').addEventListener('click', function(e) {
        e.preventDefault();
        injectLoginRegisterModal();
        showLoginRegisterModal();
        // Show register tab
        document.querySelector('.tab-btn[data-tab="register"]').click();
    });
}

// Function to show welcome back message for returning users
function showWelcomeBackMessage() {
    // Get user data
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = userData.name || 'User';
    
    // Create welcome back toast
    const welcomeToast = document.createElement('div');
    welcomeToast.id = 'welcome-back-toast';
    welcomeToast.innerHTML = `
        <div class="toast-icon"><i class="fas fa-user-check"></i></div>
        <div class="toast-content">
            <h3>Welcome back, ${userName}!</h3>
            <p>Enjoy exploring Tamil Nadu's heritage</p>
        </div>
    `;
    
    document.body.appendChild(welcomeToast);
    
    // Add styles for the welcome toast
    const style = document.createElement('style');
    style.textContent = `
        #welcome-back-toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #B8860B, #7c4a03);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.5s ease, fadeOut 0.5s ease 4.5s forwards;
            max-width: 350px;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; visibility: hidden; }
        }
        #welcome-back-toast .toast-icon {
            font-size: 24px;
        }
        #welcome-back-toast .toast-content h3 {
            margin: 0 0 5px 0;
            font-size: 18px;
        }
        #welcome-back-toast .toast-content p {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);
    
    // Remove the toast after 5 seconds
    setTimeout(() => {
        if (welcomeToast && welcomeToast.parentNode) {
            welcomeToast.parentNode.removeChild(welcomeToast);
        }
    }, 5000);
}

// Check if user is logged in from localStorage and show appropriate modal
document.addEventListener('DOMContentLoaded', function() {
    console.log('script.js: DOM loaded');
    // Check if user is logged in from localStorage
    const isLoggedIn = localStorage.getItem('logged_in') === 'true';
    console.log('script.js: User logged in?', isLoggedIn);
    
    // Only show welcome/login modal if not logged in
    if (!isLoggedIn) {
        console.log('script.js: Not logged in, showing welcome modal');
        createWelcomeModal();
    }

    // Add logout button event listener
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            console.log('Logout button clicked');
            
            // Clear localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('logged_in');
            
            // Notify the server
            fetch('https://heritage-backend-yf3u.onrender.com/logout', { method: 'POST' })
                .then(res => res.json())
                .catch(err => console.log('Logout notification error:', err));
                
            // Update navbar
            if (typeof updateNavbar === 'function') {
                updateNavbar(false);
            }
            
            // Show the welcome modal from index.html by reloading the page
            // This ensures the welcome modal appears correctly
            window.location.href = 'index.html';
        });
    }
});

})();

// Show login welcome popup if just logged in
window.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('showLoginWelcome') === '1') {
        localStorage.removeItem('showLoginWelcome');
        // Detect language
        const lang = localStorage.getItem('heritage_lang') || 'en';
        // Popup content by language
        const popupContent = {
            en: {
                title: 'Welcome back!',
                message: "You have successfully logged in. Enjoy exploring Tamil Nadu's heritage!"
            },
            ta: {
                title: 'மீண்டும் வரவேற்கிறோம்!',
                message: 'நீங்கள் வெற்றிகரமாக உள்நுழைந்துள்ளீர்கள். தமிழ்நாட்டின் பாரம்பரியத்தை ஆராயுங்கள்!'
            }
        };
        // Create popup
        const popup = document.createElement('div');
        popup.id = 'login-welcome-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <span class="close-popup" title="Close">&times;</span>
                <h3>${popupContent[lang].title}</h3>
                <p>${popupContent[lang].message}</p>
            </div>
        `;
        document.body.appendChild(popup);
        // Style popup
        const style = document.createElement('style');
        style.textContent = `
            #login-welcome-popup {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0,0,0,0.35);
                display: flex; align-items: center; justify-content: center;
                z-index: 9999;
            }
            #login-welcome-popup .popup-content {
                background: #fff8e7;
                border-radius: 18px;
                box-shadow: 0 8px 32px rgba(139,69,19,0.13);
                padding: 2.2rem 2.2rem 1.5rem 2.2rem;
                text-align: center;
                max-width: 350px;
                width: 90vw;
                font-family: 'Poppins', sans-serif;
                position: relative;
                animation: fadeInPopup 0.4s;
            }
            #login-welcome-popup .popup-content h3 {
                color: #7c4a03;
                margin-bottom: 0.7rem;
                font-size: 1.4rem;
            }
            #login-welcome-popup .popup-content p {
                color: #6d4c1a;
                font-size: 1.08rem;
                margin-bottom: 1.2rem;
            }
            #login-welcome-popup .close-popup {
                position: absolute;
                top: 0.7rem;
                right: 1.1rem;
                font-size: 1.5rem;
                color: #b8860b;
                cursor: pointer;
                transition: color 0.2s;
            }
            #login-welcome-popup .close-popup:hover {
                color: #7c4a03;
            }
            @keyframes fadeInPopup { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        `;
        document.head.appendChild(style);
        // Close logic
        popup.querySelector('.close-popup').onclick = function() {
            popup.remove();
        };
        // Optional: auto-close after 4 seconds
        setTimeout(() => { if (document.body.contains(popup)) popup.remove(); }, 4000);
    }
}); 