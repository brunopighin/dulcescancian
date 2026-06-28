/* ================================================================
   CANCIÁN – Dulces Artesanales
   script.js — Main JavaScript
   ================================================================ */

'use strict';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
window.addEventListener('pageshow', () => window.scrollTo(0, 0));

/* ================================================================
   PRODUCT DATA (defaults stored in localStorage)
   ================================================================ */
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Dulce de Leche Clásico',
    category: 'dulce-de-leche',
    description: 'Elaborado a fuego lento con leche fresca de campo y azúcar natural. Textura cremosa y sabor auténtico que enamora.',
    weight: '450g',
    price: 1800,
    featured: true,
    stock: true,
    image: '',
    emoji: '🍯',
    createdAt: Date.now()
  },
  {
    id: 2,
    name: 'Dulce de Leche Repostero',
    category: 'dulce-de-leche',
    description: 'Más espeso y firme, ideal para relleno de tortas, alfajores y medialunas. Elaborado con técnica tradicional.',
    weight: '450g',
    price: 2000,
    featured: true,
    stock: true,
    image: '',
    emoji: '🍯',
    createdAt: Date.now()
  },
  {
    id: 3,
    name: 'Dulce de Frambuesa',
    category: 'dulces',
    description: 'Frambuesas seleccionadas en su punto de madurez con bajo contenido de azúcar, preservando el sabor natural y ácido de la fruta.',
    weight: '340g',
    price: 1500,
    featured: false,
    stock: true,
    image: '',
    emoji: '🍓',
    createdAt: Date.now()
  },
  {
    id: 4,
    name: 'Dulce de Durazno',
    category: 'dulces',
    description: 'Duraznos de temporada en su punto exacto de madurez. Receta familiar de tres generaciones que resalta el dulzor natural de la fruta.',
    weight: '340g',
    price: 1400,
    featured: true,
    stock: true,
    image: '',
    emoji: '🍑',
    createdAt: Date.now()
  },
  {
    id: 5,
    name: 'Dulce de Frutilla',
    category: 'dulces',
    description: 'Frutillas procesadas el mismo día de la cosecha. Fragancia y sabor incomparables que recuerdan al jardín de la abuela.',
    weight: '340g',
    price: 1400,
    featured: false,
    stock: true,
    image: '',
    emoji: '🍓',
    createdAt: Date.now()
  },
  {
    id: 6,
    name: 'Dulce de Batata con Vainilla',
    category: 'conservas',
    description: 'Dulce de batata artesanal con vainilla natural. Acompañante ideal para quesos, pan casero y postres regionales.',
    weight: '500g',
    price: 1600,
    featured: false,
    stock: true,
    image: '',
    emoji: '🫙',
    createdAt: Date.now()
  },
  {
    id: 7,
    name: 'Dulce de Membrillo',
    category: 'conservas',
    description: 'Membrillo de huerta propia, sin conservantes artificiales. Textura perfecta y color intenso. Maridaje perfecto con quesos.',
    weight: '500g',
    price: 1600,
    featured: false,
    stock: true,
    image: '',
    emoji: '🍋',
    createdAt: Date.now()
  },
  {
    id: 8,
    name: 'Kit Degustación Premium',
    category: 'ediciones-especiales',
    description: 'Set de 4 frascos seleccionados: dulce de leche clásico, dulce de frutilla, durazno y membrillo. Ideal para regalar.',
    weight: '4 × 200g',
    price: 4500,
    featured: true,
    stock: true,
    image: '',
    emoji: '🎁',
    createdAt: Date.now()
  },
  {
    id: 9,
    name: 'Edición Navidad',
    category: 'ediciones-especiales',
    description: 'Set navideño con packaging artesanal especial. Incluye dulce de leche premium, dulce y conserva. Edición limitada.',
    weight: '3 × 250g',
    price: 5500,
    featured: true,
    stock: false,
    image: '',
    emoji: '✨',
    createdAt: Date.now()
  },
  {
    id: 10,
    name: 'Dulce de Ciruela',
    category: 'dulces',
    description: 'Ciruelas negras de temporada con un toque de especias. Sabor intenso y profundo, perfecto para tostadas y tartas.',
    weight: '340g',
    price: 1500,
    featured: false,
    stock: true,
    image: '',
    emoji: '🍇',
    createdAt: Date.now()
  },
  {
    id: 11,
    name: 'Dulce de Leche Light',
    category: 'dulce-de-leche',
    description: 'La misma receta artesanal tradicional con menos azúcar. Sin sacrificar el sabor auténtico de siempre.',
    weight: '450g',
    price: 1900,
    featured: false,
    stock: true,
    image: '',
    emoji: '🍯',
    createdAt: Date.now()
  },
  {
    id: 12,
    name: 'Kit Inauguración',
    category: 'ediciones-especiales',
    description: 'Caja de presentación con 6 frascos surtidos. Perfecta para locales, eventos corporativos o como regalo empresarial premium.',
    weight: '6 × 150g',
    price: 6800,
    featured: false,
    stock: true,
    image: '',
    emoji: '📦',
    createdAt: Date.now()
  }
];

const WA_NUMBER = '5491112345678';

const CATEGORY_MAP = {
  'dulce-de-leche': 'Dulce de Leche',
  'dulces': 'Dulces',
  'conservas': 'Conservas',
  'ediciones-especiales': 'Ediciones Especiales'
};

/* ================================================================
   INIT
   ================================================================ */
function init() {
  initProducts();
  initLoadingScreen();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCatalog();
  initTestimonials();
  initSmoothScroll();
  initCart();
  initLightbox();
}

/* ================================================================
   PRODUCTS (localStorage)
   ================================================================ */
function getProducts() {
  try {
    const saved = localStorage.getItem('cancian_products');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return null;
}

function initProducts() {
  if (!getProducts()) {
    localStorage.setItem('cancian_products', JSON.stringify(DEFAULT_PRODUCTS));
  }
}

/* ================================================================
   LOADING SCREEN
   ================================================================ */
function initLoadingScreen() {
  const screen = document.getElementById('loadingScreen');
  const bar    = document.getElementById('loadingBar');
  if (!screen || !bar) return;

  setTimeout(() => { bar.style.width = '100%'; }, 80);
  setTimeout(() => {
    screen.classList.add('hidden');
    document.body.classList.remove('is-loading');
  }, 1600);
}

/* ================================================================
   NAVBAR
   ================================================================ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ================================================================
   MOBILE MENU
   ================================================================ */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
}

const nav = document.getElementById('navbar');

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ================================================================
   CATALOG
   ================================================================ */
let currentFilter = 'all';
let currentSearch = '';

function initCatalog() {
  renderProducts();

  // Filters
  document.getElementById('catFilters')?.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentSearch = searchInput.value.trim().toLowerCase();
      searchClear.style.display = currentSearch ? 'block' : 'none';
      renderProducts();
    });
  }
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      currentSearch = '';
      searchClear.style.display = 'none';
      renderProducts();
    });
  }
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  if (!grid) return;

  const products = getProducts() || DEFAULT_PRODUCTS;

  const filtered = products.filter(p => {
    const matchFilter = currentFilter === 'all' || p.category === currentFilter;
    const matchSearch = !currentSearch ||
      p.name.toLowerCase().includes(currentSearch) ||
      p.description.toLowerCase().includes(currentSearch) ||
      (CATEGORY_MAP[p.category] || '').toLowerCase().includes(currentSearch);
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    grid.style.display = 'none';
    noResults.style.display = 'block';
    return;
  }

  grid.style.display = 'grid';
  noResults.style.display = 'none';

  grid.innerHTML = filtered.map(p => createProductCard(p)).join('');

  // Animate cards in
  grid.querySelectorAll('.pcard').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity .4s ease, transform .4s ease, box-shadow .38s ease, transform .38s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 60);
  });
}

function createProductCard(p) {
  const catLabel = CATEGORY_MAP[p.category] || p.category;
  const priceFormatted = new Intl.NumberFormat('es-AR').format(p.price);

  const imgContent = p.image
    ? `<img src="${p.image}" alt="${p.name}" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;display:block" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';

  return `
    <article class="pcard" data-category="${p.category}">
      <div class="pcard-img cat-${p.category}">
        ${imgContent}
        <span class="pcard-emoji" ${p.image ? 'style="display:none"' : ''}>${p.emoji || '🫙'}</span>
        <div class="pcard-img-overlay"></div>
        ${p.featured ? '<span class="pcard-badge-featured">Destacado</span>' : ''}
        ${!p.stock ? '<span class="pcard-no-stock">Sin stock</span>' : ''}
      </div>
      <div class="pcard-body">
        <div class="pcard-cat">${catLabel}</div>
        <h3 class="pcard-name">${p.name}</h3>
        <p class="pcard-desc">${p.description}</p>
        <div class="pcard-footer">
          <div>
            <div class="pcard-price">$${priceFormatted}</div>
            <div class="pcard-weight">${p.weight}</div>
          </div>
          ${p.stock
            ? `<button class="pcard-add-btn" onclick="cartAdd(${p.id})">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Agregar
              </button>`
            : `<span style="font-size:.78rem;color:var(--txt-muted);font-style:italic;">Sin stock</span>`
          }
        </div>
      </div>
    </article>`;
}

window.resetFilters = function() {
  currentFilter = 'all';
  currentSearch = '';
  document.querySelectorAll('.filter-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  const si = document.getElementById('searchInput');
  if (si) si.value = '';
  const sc = document.getElementById('searchClear');
  if (sc) sc.style.display = 'none';
  renderProducts();
};

/* ================================================================
   TESTIMONIALS SLIDER
   ================================================================ */
function initTestimonials() {
  const track = document.getElementById('testTrack');
  const dotsWrap = document.getElementById('testDots');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');
  if (!track) return;

  const cards = track.querySelectorAll('.tcard');
  let current = 0;
  let autoInterval;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'tdot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Testimonio ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(n) {
    current = (n + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('.tdot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    autoInterval = setInterval(() => goTo(current + 1), 5000);
  }
  function stopAuto() {
    clearInterval(autoInterval);
  }

  prevBtn?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  // Touch/swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    startAuto();
  });

  startAuto();

  // Pause on hover
  const slider = document.querySelector('.test-slider');
  slider?.addEventListener('mouseenter', stopAuto);
  slider?.addEventListener('mouseleave', startAuto);
}

/* ================================================================
   SMOOTH SCROLL
   ================================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ================================================================
   CARRITO
   ================================================================ */
let cart = JSON.parse(localStorage.getItem('cancian_cart') || '[]');

function cartSave() {
  localStorage.setItem('cancian_cart', JSON.stringify(cart));
}

function cartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function cartCount() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function cartUpdateBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const n = cartCount();
  badge.textContent = n;
  badge.style.display = n > 0 ? 'flex' : 'none';
}

window.cartAdd = function(id) {
  const products = JSON.parse(localStorage.getItem('cancian_products') || '[]');
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(x => x.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, weight: p.weight, emoji: p.emoji || '🫙', image: p.image || '', qty: 1 });
  }
  cartSave();
  cartUpdateBadge();
  cartRender();
  cartOpen();
};

window.cartRemove = function(id) {
  cart = cart.filter(x => x.id !== id);
  cartSave(); cartUpdateBadge(); cartRender();
};

window.cartQty = function(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  cartSave(); cartUpdateBadge(); cartRender();
};

function cartRender() {
  const empty  = document.getElementById('cartEmpty');
  const items  = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const total  = document.getElementById('cartTotalAmount');
  if (!empty) return;

  if (cart.length === 0) {
    empty.style.display  = 'flex';
    items.style.display  = 'none';
    footer.style.display = 'none';
    return;
  }
  empty.style.display  = 'none';
  items.style.display  = 'flex';
  footer.style.display = 'flex';

  items.innerHTML = cart.map(item => {
    const fmt = new Intl.NumberFormat('es-AR').format(item.price * item.qty);
    const thumb = item.image
      ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:contain">`
      : item.emoji;
    return `
      <div class="cart-item">
        <div class="cart-item-emoji">${thumb}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-weight">${item.weight}</div>
          <div class="cart-item-price">$${fmt}</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="cartQty(${item.id},-1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="cartQty(${item.id},1)">+</button>
          <button class="cart-item-remove" onclick="cartRemove(${item.id})" title="Quitar">✕</button>
        </div>
      </div>`;
  }).join('');

  total.textContent = '$' + new Intl.NumberFormat('es-AR').format(cartTotal());
}

function cartOpen() {
  document.getElementById('cartPanel')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cartClose() {
  document.getElementById('cartPanel')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function cartWhatsApp() {
  if (cart.length === 0) return;
  const lines = cart.map(i => {
    const sub = new Intl.NumberFormat('es-AR').format(i.price * i.qty);
    return `• ${i.qty}x ${i.name} (${i.weight}) — $${sub}`;
  }).join('\n');
  const total = '$' + new Intl.NumberFormat('es-AR').format(cartTotal());
  const msg = `Hola! Quiero hacer el siguiente pedido:\n\n🛒 *Mi Pedido:*\n${lines}\n\n💰 *Total: ${total}*\n\n¿Pueden coordinar la entrega? ¡Muchas gracias!`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

function initCart() {
  document.getElementById('cartNavBtn')?.addEventListener('click', cartOpen);
  document.getElementById('cartClose')?.addEventListener('click', cartClose);
  document.getElementById('cartOverlay')?.addEventListener('click', cartClose);
  document.getElementById('cartWaBtn')?.addEventListener('click', cartWhatsApp);
  document.getElementById('cartClearBtn')?.addEventListener('click', () => {
    cart = []; cartSave(); cartUpdateBadge(); cartRender();
  });
  cartUpdateBadge();
  cartRender();
}

/* ================================================================
   LIGHTBOX
   ================================================================ */
function initLightbox() {
  const lb     = document.getElementById('lightbox');
  const lbImg  = document.getElementById('lightboxImg');
  const lbClose = document.getElementById('lightboxClose');
  if (!lb) return;

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  lbClose.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  document.addEventListener('click', e => {
    const img = e.target.closest('.pcard-img img');
    if (img) open(img.src, img.alt);
  });
}

/* ================================================================
   RUN
   ================================================================ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
