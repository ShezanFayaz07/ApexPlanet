document.addEventListener('DOMContentLoaded', function() {

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {

            navMenu.classList.toggle('active');
            
            hamburger.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
    }


    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                }
                
                body.style.overflow = 'auto';
            });
        });
    }


    document.addEventListener('click', function(e) {
        if (navMenu && hamburger) {
            const isClickInsideNav = navMenu.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = 'auto';
            }
        }
    });

    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                
                alert('Thank you for your message! I will get back to you soon.');
                
                
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }


    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.padding = '1rem 8%';
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
            } else {
                header.style.padding = '1.5rem 8%';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }


    const sections = document.querySelectorAll('section');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.style.color = '';
                
                if (link.getAttribute('href') === `#${current}`) {
                    link.style.color = 'var(--primary)';
                }
            });
        });
    }

});
