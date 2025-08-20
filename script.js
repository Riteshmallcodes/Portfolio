document.addEventListener('DOMContentLoaded', () => {
  // Toggle Menu for Mobile
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('show');          // <-- 'show' (matches CSS)
      // Accessibility state
      const expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
      toggle.setAttribute('aria-expanded', !expanded);
    });

    // Close when a link is clicked (mobile UX)
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.remove('show'));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('show');
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') menu.classList.remove('show');
    });
  }

  // Contact Form Validation
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  if (form && formMsg) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Simple email check
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if(name && emailOk && message){
        formMsg.style.color = "limegreen";
        formMsg.textContent = "Message Sent Successfully!";
        form.reset();
      } else {
        formMsg.style.color = "tomato";
        formMsg.textContent = !emailOk ? "Please enter a valid email!" : "Please fill all fields!";
      }

      // Auto-hide after 3s
      setTimeout(() => (formMsg.textContent = ""), 3000);
    });
  }
});
