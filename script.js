 /* ── Play button keyboard support ── */
    (function () {
      var playBtn = document.querySelector('.s1-play-btn');
      if (!playBtn) return;
      playBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playBtn.click();
        }
      });
    })();

    /* ── Header scroll ── */
    (function () {
      var header = document.getElementById('site-header');
      window.addEventListener('scroll', function () {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    })();

    /* ── Section 7 accordion ── */
    (function () {
      var triggers = document.querySelectorAll('.s7-trigger');

      triggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          var item   = trigger.closest('.s7-item');
          var panel  = item.querySelector('.s7-panel');
          var isOpen = trigger.classList.contains('is-open');

          triggers.forEach(function (t) {
            t.classList.remove('is-open');
            t.setAttribute('aria-expanded', 'false');
            t.closest('.s7-item').querySelector('.s7-panel').classList.remove('is-open');
          });

          if (!isOpen) {
            trigger.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
            panel.classList.add('is-open');
          }
        });
      });

      triggers[0].click();
    })();

    /* ── Section 2 ticker ── */
    (function () {
      var counter = document.getElementById('s2-counter');
      if (!counter) return;

      var target   = 50000;
      var duration = 2200;
      var started  = false;

      function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

      function fmt(n) {
        var s = '' + Math.floor(n);
        var r = '';
        for (var i = 0; i < s.length; i++) {
          if (i > 0 && (s.length - i) % 3 === 0) r += ',';
          r += s[i];
        }
        return '$' + r;
      }

      function run(startTs) {
        function tick(ts) {
          var progress = Math.min((ts - startTs) / duration, 1);
          counter.textContent = fmt(target * easeOutCubic(progress));
          if (progress < 1) requestAnimationFrame(tick);
        }
        tick(startTs); // render $0 immediately, then RAF drives the rest
      }

      var obs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !started) {
          started = true;
          requestAnimationFrame(run);
        }
      }, { threshold: 0.2 });

      obs.observe(document.querySelector('.s2'));
    })();

    /* ── Section 9 expandable ── */
    (function () {
      var trigger = document.querySelector('.s9-expand-trigger');
      var panel   = document.querySelector('.s9-panel');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', function () {
        var isOpen = trigger.classList.contains('is-open');
        if (isOpen) {
          trigger.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          panel.classList.remove('is-open');
        } else {
          trigger.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.classList.add('is-open');
        }
      });
    })();

    /* ── Section 2 logo carousel ── */
    (function () {
      var track = document.getElementById('logoCarouselTrack');
      var dotsContainer = document.getElementById('logoCarouselDots');
      if (!track || !dotsContainer) return;
      
      var slides = Array.from(track.querySelectorAll('.carousel-slide'));
      var currentIndex = 0;
      var totalSlides = slides.length;
      var autoRotateInterval;
      
      // Create dots
      for (var i = 0; i < totalSlides; i++) {
        var dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        (function (index) {
          dot.addEventListener('click', function () {
            goToSlide(index);
            resetAutoRotate();
          });
        })(i);
        dotsContainer.appendChild(dot);
      }
      
      function goToSlide(index) {
        currentIndex = index;
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        updateDots();
      }
      
      function updateDots() {
        var dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
      
      function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
      }
      
      function startAutoRotate() {
        autoRotateInterval = setInterval(nextSlide, 2500); // 2.5 seconds
      }
      
      function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
      }
      
      // Start auto-rotation
      startAutoRotate();
      
      // Pause on hover, resume on leave
      track.addEventListener('mouseenter', function () {
        clearInterval(autoRotateInterval);
      });
      track.addEventListener('mouseleave', function () {
        startAutoRotate();
      });
    })();

    /* ── Section 5 mini-card carousel (mobile/tablet) ── */
    (function () {
      var track = document.getElementById('s5-trio-track');
      var dotsContainer = document.getElementById('s5-trio-dots');
      if (!track || !dotsContainer) return;
      
      var slides = Array.from(track.querySelectorAll('.s5-mini'));
      var currentIndex = 0;
      var totalSlides = slides.length;
      var autoRotateInterval;
      var dotsCreated = false;
      
      function goToSlide(index) {
        currentIndex = index;
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        updateDots();
      }
      
      function updateDots() {
        var dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
      
      function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
      }
      
      function startAutoRotate() {
        if (autoRotateInterval) return;
        autoRotateInterval = setInterval(nextSlide, 2500); // Match logo carousel speed
      }
      
      function stopAutoRotate() {
        if (autoRotateInterval) {
          clearInterval(autoRotateInterval);
          autoRotateInterval = null;
        }
      }
      
      function resetAutoRotate() {
        stopAutoRotate();
        startAutoRotate();
      }
      
      function handleResize() {
        var isMobile = window.innerWidth <= 1079;
        
        if (isMobile) {
          // Mobile/tablet: Initialize carousel
          if (!dotsCreated) {
            // Create dots
            for (var i = 0; i < totalSlides; i++) {
              var dot = document.createElement('div');
              dot.classList.add('carousel-dot');
              if (i === 0) dot.classList.add('active');
              (function (index) {
                dot.addEventListener('click', function () {
                  goToSlide(index);
                  resetAutoRotate();
                });
              })(i);
              dotsContainer.appendChild(dot);
            }
            dotsCreated = true;
          }
          
          // Add hover listeners
          track.addEventListener('mouseenter', stopAutoRotate);
          track.addEventListener('mouseleave', startAutoRotate);
          
          // Start auto-rotate
          startAutoRotate();
        } else {
          // Desktop: Reset to normal
          stopAutoRotate();
          
          // Remove hover listeners
          track.removeEventListener('mouseenter', stopAutoRotate);
          track.removeEventListener('mouseleave', startAutoRotate);
          
          // Reset transform
          track.style.transform = '';
          currentIndex = 0;
        }
      }
      
      // Initial check
      handleResize();
      
      // Listen for window resize
      window.addEventListener('resize', handleResize);
    })();