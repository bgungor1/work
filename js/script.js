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
    
    // E-ticaret butonlarına titreme animasyonu ekleme
    // Sadece "Daha Fazlası" başlıklı karttaki butonları seç
    let ecommerceButtons = [];
    
    // querySelector içinde :contains seçicisi çalışmadığı için alternatif yöntem kullanıyoruz
    document.querySelectorAll('.category-box h3').forEach(heading => {
        if (heading.textContent.trim() === 'Daha Fazlası') {
            // Bu başlığın bulunduğu karttaki e-ticaret butonlarını seç
            ecommerceButtons = Array.from(heading.closest('.category-box').querySelectorAll('.ecommerce-buttons .btn'));
        }
    });
    
    // Butonları sırayla titret
    function animateButtons() {
        if (ecommerceButtons.length === 0) return;
        
        let currentIndex = 0;
        
        function animateNextButton() {
            if (currentIndex >= ecommerceButtons.length) {
                // Tüm butonlar titredikten sonra 3 saniye bekle ve tekrar başlat
                setTimeout(animateButtons, 3000);
                return;
            }
            
            const button = ecommerceButtons[currentIndex];
            
            // Vurgu efekti ekle
            button.classList.add('btn-highlight');
            
            // Titreme animasyonu ekle
            button.classList.add('shake-animation');
            
            // Animasyon bittiğinde sınıfları kaldır
            button.addEventListener('animationend', function handleAnimationEnd() {
                this.classList.remove('shake-animation');
                
                // Vurgu efektini 300ms sonra kaldır
                setTimeout(() => {
                    this.classList.remove('btn-highlight');
                }, 300);
                
                // Bir sonraki butonu titret
                currentIndex++;
                setTimeout(animateNextButton, 200);
                
                // Event listener'ı kaldır
                this.removeEventListener('animationend', handleAnimationEnd);
            });
        }
        
        // İlk butonu titret
        animateNextButton();
    }
    
    // Sayfa yüklendikten 1 saniye sonra animasyonu başlat
    setTimeout(animateButtons, 1000);
    
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