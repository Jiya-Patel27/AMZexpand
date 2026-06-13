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