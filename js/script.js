// Sayfa yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll olayı
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        // Normal navbar için scroll efekti
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });
    
    // Carousel manuel başlatma
    const myCarouselEl = document.getElementById('heroCarousel');
    if (myCarouselEl) {
        // Bootstrap 5 carousel'i manuel olarak başlatma
        const carousel = new bootstrap.Carousel(myCarouselEl, {
            interval: 5000,
            wrap: true,
            keyboard: true,
            pause: 'hover',
            touch: true
        });
        
        // Kontrol butonlarını manuel olarak bağlama
        const prevButton = document.querySelector('.carousel-control-prev');
        const nextButton = document.querySelector('.carousel-control-next');
        
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                carousel.prev();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                carousel.next();
            });
        }
        
        // Indicator butonlarını manuel olarak bağlama
        const indicators = document.querySelectorAll('.carousel-indicators button');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                carousel.to(index);
            });
        });
    }
    
    // Aktif nav link için sınıf ekleme
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Sayfa içi linkler için smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobil menü kapanması
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        document.addEventListener('click', function(event) {
            const isClickInside = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
            
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }
}); 