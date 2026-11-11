/* ===== NAVBAR: scroll shrink + active link ===== */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Navbar shrink
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Back to top button
    document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);

    // Active nav link
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}, { passive: true });

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

/* ===== SMOOTH SCROLL ===== */
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ===== TYPING ANIMATION ===== */
const phrases = [
    'Student of Software Engineering',
    'Web Developer',
    'Problem Solver',
    'Tech Enthusiast',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
        typingEl.textContent = current.slice(0, charIndex--);
    } else {
        typingEl.textContent = current.slice(0, charIndex++);
    }

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex > current.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        charIndex = 0;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 300;
    }

    setTimeout(type, delay);
}

type();

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger children in the same parent
            const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ===== PROGRESS BAR ANIMATION ===== */
const progressBars = document.querySelectorAll('.progress-bar[data-width]');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.dataset.width + '%';
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.3 });

progressBars.forEach(bar => progressObserver.observe(bar));

/* ===== BACK TO TOP ===== */
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== FOOTER YEAR ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== CONTACT FORM (demo) ===== */
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formNote = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

    // Simulate send delay
    setTimeout(() => {
        formNote.textContent = '✓ Pesan berhasil dikirim! Terima kasih telah menghubungi saya.';
        formNote.style.color = '#34d399';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';

        setTimeout(() => { formNote.textContent = ''; }, 5000);
    }, 1500);
});
