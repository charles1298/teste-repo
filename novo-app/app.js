/* ============================================================
   MercadoMap — O Waze dos Mercados
   App Logic & Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- DOM REFERENCES ----
  const menuBtn = document.getElementById('menu-hamburger');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarClose = document.getElementById('sidebar-close');
  const notifBtn = document.getElementById('btn-notifications');
  const notifPanel = document.getElementById('notif-panel');
  const notifCloseBtn = document.getElementById('notif-close');
  const searchInput = document.getElementById('search-input');
  const searchSuggestions = document.getElementById('search-suggestions');
  const bottomNavItems = document.querySelectorAll('.nav-item');
  const scanCta = document.getElementById('scan-cta');
  const scanBtn = document.getElementById('btn-scan');

  // ============================================================
  // SIDEBAR
  // ============================================================
  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openSidebar);
  sidebarClose.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Close sidebar with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidebar();
      closeNotifications();
    }
  });

  // ============================================================
  // NOTIFICATIONS
  // ============================================================
  function toggleNotifications() {
    notifPanel.classList.toggle('hidden');
  }

  function closeNotifications() {
    notifPanel.classList.add('hidden');
  }

  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNotifications();
  });

  notifCloseBtn.addEventListener('click', closeNotifications);

  // Close notifications when clicking outside
  document.addEventListener('click', (e) => {
    if (!notifPanel.contains(e.target) && !notifBtn.contains(e.target)) {
      closeNotifications();
    }
  });

  // ============================================================
  // SEARCH
  // ============================================================
  searchInput.addEventListener('focus', () => {
    searchSuggestions.classList.remove('hidden');
  });

  searchInput.addEventListener('blur', () => {
    // Delay to allow clicking on suggestions
    setTimeout(() => {
      searchSuggestions.classList.add('hidden');
    }, 200);
  });

  // Chip click fills search
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      searchInput.value = chip.textContent.trim();
      searchSuggestions.classList.add('hidden');
      searchInput.blur();
    });
  });

  // ============================================================
  // BOTTOM NAVIGATION
  // ============================================================
  bottomNavItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      bottomNavItems.forEach(i => i.classList.remove('active'));
      // Add active to clicked
      item.classList.add('active');

      // Create a subtle haptic-like feedback animation
      const tab = item.getAttribute('data-tab');
      handleTabChange(tab);
    });
  });

  function handleTabChange(tab) {
    // For now, we show a toast indicating tab switch
    // In a real app, this would show/hide different views
    const tabNames = {
      map: 'Mapa',
      list: 'Lista de Compras',
      scan: 'Escanear Nota Fiscal',
      recipes: 'Receitas',
      home: 'Início'
    };

    if (tab !== 'home') {
      showToast(`${tabNames[tab]} — em breve!`, 'info');
    }
  }

  // ============================================================
  // SCAN CTA INTERACTION
  // ============================================================
  if (scanCta) {
    scanCta.addEventListener('click', () => {
      showToast('📸 Abrir câmera para escanear nota fiscal...', 'success');
      // Add scan animation
      scanCta.style.transform = 'scale(0.96)';
      setTimeout(() => {
        scanCta.style.transform = '';
      }, 150);
    });
  }

  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      showToast('📸 Abrir câmera para escanear nota fiscal...', 'success');
    });
  }

  // ============================================================
  // COOK BUTTON INTERACTION
  // ============================================================
  document.querySelectorAll('.btn-cook').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const recipeName = btn.closest('.recipe-card').querySelector('.recipe-name').textContent;
      showToast(`🍳 Iniciando receita: ${recipeName}`, 'success');
      
      // Animate button
      btn.textContent = '✓ Iniciado!';
      btn.style.background = '#1e8c4d';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-utensils"></i> Cozinhar';
        btn.style.background = '';
      }, 2000);
    });
  });

  // ============================================================
  // VIEW PANTRY BUTTON
  // ============================================================
  const viewPantryBtn = document.getElementById('btn-view-pantry');
  if (viewPantryBtn) {
    viewPantryBtn.addEventListener('click', () => {
      showToast('📦 Abrindo sua despensa virtual...', 'info');
    });
  }

  // ============================================================
  // RANKING LINK
  // ============================================================
  const rankingLink = document.getElementById('ranking-link');
  if (rankingLink) {
    rankingLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('🏆 Carregando ranking da região...', 'info');
    });
  }

  // ============================================================
  // PRODUCT CARD INTERACTION
  // ============================================================
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.product-name').textContent;
      const price = card.querySelector('.product-price').textContent;
      showToast(`${name} — ${price}`, 'info');
    });
  });

  // ============================================================
  // MAP PIN INTERACTIONS
  // ============================================================
  document.querySelectorAll('.price-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const price = pin.getAttribute('data-price');
      showToast(`💰 Ver detalhes do mercado — ${price}`, 'success');
    });
    pin.style.cursor = 'pointer';
  });

  // ============================================================
  // ANIMATED PROGRESS BAR ON SCROLL
  // ============================================================
  const progressFill = document.querySelector('.progress-bar-fill');
  const progressGlow = document.querySelector('.progress-bar-glow');
  
  if (progressFill) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressFill.style.width = '62.5%';
          if (progressGlow) progressGlow.style.width = '62.5%';
        }
      });
    }, { threshold: 0.5 });

    observer.observe(progressFill.parentElement);
  }

  // ============================================================
  // TOAST NOTIFICATION SYSTEM
  // ============================================================
  function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
      <span class="toast-message">${message}</span>
    `;

    // Style the toast
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      padding: '12px 24px',
      borderRadius: '12px',
      fontSize: '0.85rem',
      fontWeight: '600',
      fontFamily: "'Inter', sans-serif",
      zIndex: '500',
      opacity: '0',
      transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      maxWidth: '90vw',
      textAlign: 'center',
      pointerEvents: 'none',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    });

    if (type === 'success') {
      toast.style.background = 'rgba(46, 204, 113, 0.92)';
      toast.style.color = '#fff';
      toast.style.boxShadow = '0 4px 20px rgba(46,204,113,0.35)';
    } else {
      toast.style.background = 'rgba(52, 58, 64, 0.92)';
      toast.style.color = '#fff';
      toast.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    }

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove toast after 2.5s
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 350);
    }, 2500);
  }

  // ============================================================
  // PARALLAX SCROLL EFFECT ON CARDS
  // ============================================================
  const cards = document.querySelectorAll('.card');
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => cardObserver.observe(card));

  // ============================================================
  // ANIMATE MAP PINS ON LOAD
  // ============================================================
  const mapPins = document.querySelectorAll('.price-pin');
  mapPins.forEach((pin, index) => {
    pin.style.opacity = '0';
    pin.style.transform = 'translateY(-10px) scale(0.5)';
    pin.style.transition = `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.3 + index * 0.15}s`;
    
    setTimeout(() => {
      pin.style.opacity = '1';
      pin.style.transform = 'translateY(0) scale(1)';
    }, 100);
  });

  // ============================================================
  // SERVICE WORKER REGISTRATION (for PWA)
  // ============================================================
  if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
});
