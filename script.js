document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const storyEvents = document.querySelectorAll('.story-event');
    const parallaxBg = document.querySelector('.parallax-bg');
    const chapterHeaders = document.querySelectorAll('.chapter-header');
    const storyMilestones = document.querySelectorAll('.story-milestone');
    const storyChapters = document.querySelectorAll('.story-chapter');
    const storyQuotes = document.querySelectorAll('.story-quote');
    const storyImages = document.querySelectorAll('.story-image');
    const introContent = document.querySelector('.intro-content');
    
    // Book elements
    const book = document.querySelector('.book');
    const bookCover = document.querySelector('.book-cover');
    const pages = Array.from(document.querySelectorAll('.page'));
    const prevPageBtn = document.querySelector('.prev-page');
    const nextPageBtn = document.querySelector('.next-page');
    
    // Current page tracking
    let currentPage = 0;
    const totalPages = pages.length;
    
    // Preload images for smooth experience
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }
    preloadImages();
    
    // Add particle background to intro
    function createParticles() {
        const intro = document.querySelector('.story-intro');
        if (!intro) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles-container');
        intro.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random positioning and size
            const size = Math.random() * 5 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation delay and duration
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 10;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.6 + 0.2;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add styles for particles
        const style = document.createElement('style');
        style.textContent = `
            .particles-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: 0;
            }
            
            .particle {
                position: absolute;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                animation: float linear infinite;
            }
            
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                }
                33% {
                    transform: translateY(-30vh) translateX(20vw) rotate(120deg);
                }
                66% {
                    transform: translateY(-10vh) translateX(-15vw) rotate(240deg);
                }
                100% {
                    transform: translateY(0) translateX(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    createParticles();
    
    // Enhanced Check if element is in viewport
    function isInViewport(element, offset = 0) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= offset &&
            rect.left >= 0 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Add animation class when element is in viewport with progressive reveal
    function animateOnScroll() {
        // Story events animation with progressive delay
        storyEvents.forEach((event, index) => {
            if (isInViewport(event, 150)) {
                setTimeout(() => {
                    event.classList.add('visible');
                }, index * 100); // Progressive delay for sequence effect
            }
        });
        
        // Chapter headers parallax effect
        chapterHeaders.forEach(header => {
            if (isInViewport(header)) {
                const scrollPosition = window.scrollY;
                const headerPosition = header.offsetTop;
                const distance = scrollPosition - headerPosition;
                const translateY = distance * 0.15;
                header.style.transform = `translateY(${translateY}px)`;
            }
        });
        
        // Story milestones animation
        storyMilestones.forEach(milestone => {
            if (isInViewport(milestone, 100)) {
                milestone.classList.add('visible');
                milestone.style.opacity = 1;
                milestone.style.transform = 'translateY(0)';
            }
        });
        
        // Story quotes animation
        storyQuotes.forEach(quote => {
            if (isInViewport(quote, 100)) {
                quote.classList.add('visible');
                quote.style.opacity = 1;
                quote.style.transform = 'scale(1)';
            }
        });
        
        // Story images animation with tilt effect
        storyImages.forEach(image => {
            if (isInViewport(image, 100)) {
                image.classList.add('visible');
                image.style.opacity = 1;
                image.style.transform = 'translateY(0)';
                
                // Add tilt effect on mouse move for visible images
                if (image.classList.contains('visible') && !image.dataset.tiltInitialized) {
                    image.dataset.tiltInitialized = true;
                    
                    image.addEventListener('mousemove', function(e) {
                        const boundingRect = image.getBoundingClientRect();
                        const centerX = boundingRect.left + boundingRect.width / 2;
                        const centerY = boundingRect.top + boundingRect.height / 2;
                        
                        const mouseX = e.clientX;
                        const mouseY = e.clientY;
                        
                        // Calculate distance from center (percentage)
                        const distanceX = (mouseX - centerX) / (boundingRect.width / 2);
                        const distanceY = (mouseY - centerY) / (boundingRect.height / 2);
                        
                        // Apply tilt
                        const tiltAmount = 5; // Max degrees of tilt
                        const tiltY = -distanceX * tiltAmount; // Invert for natural feel
                        const tiltX = distanceY * tiltAmount;
                        
                        image.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                    });
                    
                    image.addEventListener('mouseleave', function() {
                        image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                    });
                }
            }
        });
    }
    
    // Initial animation with staggered delay for intro elements
    setTimeout(function() {
        if (introContent) {
            const introElements = introContent.children;
            Array.from(introElements).forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
                }, 300 * index);
            });
        }
        
        animateOnScroll();
    }, 200);
    
    // Scroll event for animations with performance optimization using requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Enhanced parallax effect for intro background
    window.addEventListener('scroll', function() {
        if (parallaxBg) {
            const scrollPosition = window.scrollY;
            const translateY = scrollPosition * 0.5;
            const opacity = 1 - (scrollPosition / 800);
            
            parallaxBg.style.transform = `translateY(${translateY}px)`;
            if (opacity > 0) parallaxBg.style.opacity = opacity;
        }
    });
    
    // Immersive 3D mouse movement parallax for intro
    document.addEventListener('mousemove', function(e) {
        if (!parallaxBg) return;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate distance from center (percentage)
        const moveX = (mouseX - (windowWidth / 2)) * 0.02;
        const moveY = (mouseY - (windowHeight / 2)) * 0.02;
        
        // Apply parallax effect with depth layers
        parallaxBg.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
        
        if (introContent) {
            introContent.style.transform = `translate3d(${moveX * 0.5}px, ${moveY * 0.5}px, 0)`;
        }
    });
    
    // Enhanced chapter navigation with smooth transitions
    const chapterNavLinks = document.querySelectorAll('.chapter-nav a, .restart-story');
    
    chapterNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Add visual feedback on click
            this.classList.add('nav-clicked');
            setTimeout(() => this.classList.remove('nav-clicked'), 300);
            
            if (targetElement) {
                // Add exit class to current chapter
                const currentChapter = document.querySelector('.story-chapter.active');
                if (currentChapter) {
                    currentChapter.classList.add('exit');
                    
                    // Play sound effect if enabled
                    playNavigationSound();
                    
                    // After exit animation, scroll to target
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Remove classes
                        setTimeout(() => {
                            currentChapter.classList.remove('exit');
                            currentChapter.classList.remove('active');
                            targetElement.classList.add('active');
                            targetElement.classList.add('entrance');
                            
                            // Remove entrance class after animation
                            setTimeout(() => {
                                targetElement.classList.remove('entrance');
                            }, 1000);
                        }, 500);
                    }, 400);
                } else {
                    // No current active chapter, just scroll
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                    targetElement.classList.add('active');
                }
            }
        });
    });
    
    // Optional sound effect for navigation (uncomment to enable)
    function playNavigationSound() {
        // Uncomment to enable sound
        /*
        const sound = new Audio('data:audio/wav;base64,UklGRiQEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAEAAD+/wEA/v8BAP7/AQD9/wIA/f8CAP3/AgD9/wIA/P8DAP3/AgD8/wQA+/8FAPr/BwD5/wgA+P8JAPP/DwDu/xIA7f8UAOj/GQDk/x0A4v8gAN3/JgDV/zAA0f81AM3/OgDJ/z4Axf9DAMP/RADB/0YAwP9HAMH/RgDD/0QAxP9CAMP/RAD//0gA+f9OAPb/UQDz/1QA8P9YAO3/WwDq/18A6P9hAOb/YgDl/2QA5P9lAOT/ZQDk/2QA5P9lAOT/ZQDl/2MA5/9iAOn/YADq/14A7P9cAO7/WgDv/1gA8f9WAPP/UwD2/1AA9/9OAPr/SwD7/0kA/v9GAAAARQDL/z0A0v80ANj/LADf/yQA5P8eAOr/GQDt/xQA8f8PAC//wf81/7j/N/+0/3//dv+z/zj/7/4g/zr+FP+R/X3/8vyc/1X8tf/c++D/fvsA0Pr9AGP6GwAG+h8ATPk5AOH4TgB++R8AGPpBAPr6QQDg+y0Awfx0AKT9uwBm/lwAJ/8WANf/mADJ/zgAwP9XAKX/MwCU/y0Ad/81AGv/OwBd/z8ATP9DFC//wQD9/wIA/P8DAP3/AgD8/wMA/P8DAP3/AgD+/wEA/v8BAP7/AQD//wAA//8AAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/v8BAP7/AgD9/wIA/f8CAP3/AgD9/wIA/f8CAP3/AgD9/wMA/P8DAP3/AwD8/wMA/P8EAPv/BQD7/wUA+v8GAPr/BgD6/wcA+f8IANcAHADj/yYA2/8oANj/KwDW/ywA1P8uANP/LwDS/zAA0f8xANH/MQDR/zEA0f8xANH/MQDS/zAA0v8wANP/LwDU/y4A1f8tANb/LADX/ysA2P8qANn/KQDY/ykA2f8oANr/JwDZ/yYA2v8lAN3/RQDk/zkA7P8pAPD/IQDy/xkA9/8WAPL/EQD3/wgA+/8EAP3/AwD+/wEAAAAAAAEA/v8CAP7/AgD9/wMA/f8DAP3/AwD8/wQA+/8FAPv/BQD7/wUA+/8FAC=');
        sound.volume = 0.2;
        sound.play();
        */
    }
    
    // Observe chapters to set active state and update URL hash
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };
    
    const chapterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all chapters
                storyChapters.forEach(chapter => {
                    chapter.classList.remove('active');
                });
                
                // Add active class to current chapter
                entry.target.classList.add('active');
                
                // Change page title based on chapter
                const chapterTitle = entry.target.querySelector('h2')?.textContent || '';
                if (chapterTitle) {
                    document.title = `${chapterTitle} - Hành Trình SLK`;
                }
                
                // Update URL hash
                const chapterId = entry.target.getAttribute('id');
                if (chapterId && history.pushState) {
                    history.pushState(null, null, `#${chapterId}`);
                }
            }
        });
    }, observerOptions);
    
    // Start observing chapters
    storyChapters.forEach(chapter => {
        chapterObserver.observe(chapter);
        
        // Add initial animation class
        chapter.classList.add('chapter-initial');
    });
    
    // Initial styling for story elements with improved animations
    storyQuotes.forEach(quote => {
        quote.style.opacity = 0;
        quote.style.transform = 'scale(0.95)';
        quote.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    storyMilestones.forEach(milestone => {
        milestone.style.opacity = 0;
        milestone.style.transform = 'translateY(30px)';
        milestone.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    storyImages.forEach(image => {
        image.style.opacity = 0;
        image.style.transform = 'translateY(30px)';
        image.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    // Initial styling for intro content elements
    if (introContent) {
        Array.from(introContent.children).forEach(child => {
            child.style.opacity = 0;
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    }
    
    // Check URL hash on load and smooth scroll to it
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'auto'
                });
                targetElement.classList.add('active');
            }, 500);
        }
    } else {
        // No hash, show intro by default
        document.querySelector('.story-chapter').classList.add('active');
    }
    
    // Add CSS for navigation click animation
    const style = document.createElement('style');
    style.textContent = `
        .nav-clicked {
            animation: nav-pulse 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        
        @keyframes nav-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .story-chapter.entrance {
            animation: chapter-entrance 1s ease;
        }
        
        @keyframes chapter-entrance {
            0% { opacity: 0; transform: translateY(50px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        
        .chapter-initial {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .story-chapter.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Smooth reveal of chapters as user scrolls
    function revealChapters() {
        storyChapters.forEach(chapter => {
            if (isInViewport(chapter, -100)) {
                chapter.classList.add('active');
            }
        });
    }
    
    // Initial chapter reveal
    setTimeout(revealChapters, 500);
    
    // Reveal chapters on scroll
    window.addEventListener('scroll', revealChapters);
    
    // Open book when clicking on cover
    bookCover.addEventListener('click', function() {
        book.classList.add('open');
        setTimeout(() => {
            updateButtonState();
        }, 1000);
    });
    
    // Initialize pages
    function initializePages() {
        pages.forEach((page, index) => {
            page.style.zIndex = `${99 - index}`;
            if (index > 0) {
                page.style.transform = 'rotateY(0deg)';
            }
        });
    }
    
    // Turn to next page
    function nextPage() {
        if (currentPage < totalPages - 1) {
            pages[currentPage].classList.add('flipped');
            currentPage++;
            updateButtonState();
            
            // Add page turning sound effect
            playPageTurningSound();
        }
    }
    
    // Turn to previous page
    function prevPage() {
        if (currentPage > 0) {
            pages[currentPage - 1].classList.remove('flipped');
            currentPage--;
            updateButtonState();
            
            // Add page turning sound effect
            playPageTurningSound();
        }
    }
    
    // Update button states based on current page
    function updateButtonState() {
        prevPageBtn.disabled = currentPage === 0 && !book.classList.contains('open');
        nextPageBtn.disabled = currentPage === totalPages - 1;
        
        // If book is not open yet, disable both buttons
        if (!book.classList.contains('open')) {
            nextPageBtn.disabled = true;
        }
    }
    
    // Page turning sound effect
    function playPageTurningSound() {
        // Create an audio element
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3');
        audio.volume = 0.3; // Lower volume
        audio.play();
    }
    
    // Event listeners
    nextPageBtn.addEventListener('click', nextPage);
    prevPageBtn.addEventListener('click', prevPage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (book.classList.contains('open')) {
            if (e.key === 'ArrowRight') {
                nextPage();
            } else if (e.key === 'ArrowLeft') {
                prevPage();
            }
        }
    });
    
    // Add page flip animation on hover
    pages.forEach(page => {
        page.addEventListener('mouseover', function() {
            if (!page.classList.contains('flipped')) {
                const pageIndex = pages.indexOf(page);
                if (pageIndex === currentPage) {
                    page.style.transform = 'rotateY(-15deg)';
                }
            }
        });
        
        page.addEventListener('mouseout', function() {
            if (!page.classList.contains('flipped')) {
                const pageIndex = pages.indexOf(page);
                if (pageIndex === currentPage) {
                    page.style.transform = 'rotateY(0deg)';
                }
            }
        });
    });
    
    // Responsive adjustments
    function handleResize() {
        const bodyWidth = document.body.clientWidth;
        if (bodyWidth < 768) {
            // Adjust for mobile
            document.documentElement.style.fontSize = '50%';
        } else if (bodyWidth < 1100) {
            // Adjust for tablets
            document.documentElement.style.fontSize = '55%';
        } else {
            // Adjust for desktops
            document.documentElement.style.fontSize = '62.5%';
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Add bookmark functionality
    const bookmark = document.querySelector('.bookmark');
    if (bookmark) {
        bookmark.addEventListener('click', function() {
            // Save current page to localStorage
            localStorage.setItem('bookmarkedPage', currentPage);
            
            // Visual indication that page is bookmarked
            bookmark.style.backgroundColor = 'var(--secondary-color)';
            setTimeout(() => {
                bookmark.style.backgroundColor = 'var(--accent-color)';
            }, 300);
        });
    }
    
    // Check for bookmarked page on load
    function checkBookmark() {
        const bookmarkedPage = localStorage.getItem('bookmarkedPage');
        if (bookmarkedPage && book.classList.contains('open')) {
            // Turn to bookmarked page
            const targetPage = parseInt(bookmarkedPage);
            if (targetPage > 0 && targetPage < totalPages) {
                for (let i = 0; i < targetPage; i++) {
                    pages[i].classList.add('flipped');
                }
                currentPage = targetPage;
                updateButtonState();
            }
        }
    }
    
    // Initialize
    initializePages();
    updateButtonState();
    handleResize();
    
    // Add 3D effects on mouse move
    document.addEventListener('mousemove', function(e) {
        if (!book.classList.contains('open')) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            book.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });
    
    // Reset 3D effect when mouse leaves
    document.addEventListener('mouseleave', function() {
        book.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
    
    // Page loading animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 500);

    // Matrix rain effect
    const canvas = document.querySelector('.matrix-rain');
    if (canvas) {
        const context = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const hex = '0123456789ABCDEF';
        
        const alphabet = katakana + latin + nums + hex;
        
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        
        const rainDrops = [];
        
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }
        
        const draw = () => {
            context.fillStyle = 'rgba(0, 0, 0, 0.05)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            context.fillStyle = '#0f0';
            context.font = fontSize + 'px monospace';
            
            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                context.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };
        
        setInterval(draw, 30);
        
        // Resize canvas when window is resized
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Glitch effect for titles
    const glitchTitles = document.querySelectorAll('.glitch-title');
    glitchTitles.forEach(title => {
        if (title.dataset.text) {
            // Title already has data-text
            return;
        }
        const text = title.innerText;
        title.setAttribute('data-text', text);
    });

    // Typing effect
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, Math.random() * 100 + 50);
            }
        }
        
        typeWriter();
    });

    // Optimized JavaScript for vertical timeline
    document.addEventListener('DOMContentLoaded', () => {
        // Cache DOM elements
        const scenes = document.querySelectorAll('.scene');
        const timelineMarkers = document.querySelectorAll('.timeline-marker');
        const loadingIndicator = document.querySelector('.loading-indicator');
        
        // Function to show loading indicator
        function showLoading() {
            if (loadingIndicator) {
                loadingIndicator.style.opacity = '1';
            }
        }
        
        // Function to hide loading indicator
        function hideLoading() {
            if (loadingIndicator) {
                loadingIndicator.style.opacity = '0';
            }
            document.body.classList.add('loaded');
        }
        
        // Show loading initially
        showLoading();
        
        // Add all scenes as visible initially
        function initializeScenes() {
            scenes.forEach(scene => {
                scene.classList.add('visible');
            });
        }
        
        // Add scroll animation - only activate/deactivate markers
        function handleScroll() {
            const viewportHeight = window.innerHeight;
            
            // Animate scenes on scroll
            scenes.forEach(scene => {
                const scenePosition = scene.getBoundingClientRect();
                const sceneTop = scenePosition.top;
                const sceneMiddle = scenePosition.top + scenePosition.height / 2;
                
                // Check if scene is in middle of viewport
                if (sceneMiddle < viewportHeight * 0.9 && sceneMiddle > viewportHeight * 0.1) {
                    // Highlight corresponding marker
                    const sceneId = scene.id;
                    const sceneYear = sceneId.replace('scene-', '');
                    
                    timelineMarkers.forEach(marker => {
                        if (marker.dataset.year === sceneYear) {
                            marker.classList.add('active');
                        } else {
                            marker.classList.remove('active');
                        }
                    });
                }
            });
        }
        
        // Make timeline markers clickable
        timelineMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                const year = marker.dataset.year;
                const targetScene = document.getElementById(`scene-${year}`);
                
                if (targetScene) {
                    // Add visual feedback
                    timelineMarkers.forEach(m => {
                        m.classList.remove('active');
                    });
                    marker.classList.add('active');
                    
                    // Smooth scroll to scene
                    const offset = 100; // Offset from top
                    const targetPosition = targetScene.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Make sure scene becomes visible
                    scenes.forEach(scene => {
                        scene.classList.add('visible');
                    });
                }
            });
        });
        
        // Optimize scroll event handler with requestAnimationFrame
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        // Handle resize
        window.addEventListener('resize', () => {
            handleScroll();
        }, { passive: true });
        
        // Handle images loading
        const images = document.querySelectorAll('.scene-image img');
        let imagesLoaded = 0;
        
        // Function to check if all images are loaded
        function checkAllImagesLoaded() {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                // All images loaded, hide loading indicator
                setTimeout(() => {
                    hideLoading();
                    initializeScenes();
        }, 300);
    }
        }
        
        // Check image loading status
        images.forEach(img => {
            if (img.complete) {
                img.parentElement.classList.add('loaded');
                checkAllImagesLoaded();
            } else {
                img.addEventListener('load', () => {
                    img.parentElement.classList.add('loaded');
                    checkAllImagesLoaded();
                });
                
                img.addEventListener('error', () => {
                    checkAllImagesLoaded();
                });
            }
        });
        
        // If no images or images load too fast, hide loading indicator after a delay
        setTimeout(() => {
            hideLoading();
            initializeScenes();
            
            // Activate first marker by default
            if (timelineMarkers.length > 0) {
                timelineMarkers[0].classList.add('active');
            }
        }, 800);
    });
});

// Handle on load animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Fade in elements with nice delay
    const elements = document.querySelectorAll('.hero-section *, .thread-card, .chapter-section');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, 100 * index);
    });
}); 

// Clear any old global event handlers from previous script versions
window.onload = null; 