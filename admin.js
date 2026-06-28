/* ================================================================
   CANCIÁN – Panel Administrador
   admin.js — Complete Admin Functionality
   ================================================================ */

'use strict';

/* ================================================================
   CONFIG
   ================================================================ */
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'cancian2025';
const STORAGE_KEY = 'cancian_products';
const SESSION_KEY = 'cancian_admin_session';

const CATEGORY_LABELS = {
  'dulce-de-leche': 'Dulce de Leche',
  'dulces': 'Dulces',
  'conservas': 'Conservas',
  'ediciones-especiales': 'Ediciones Especiales'
};

const CATEGORY_EMOJIS = {
  'dulce-de-leche': '🍯',
  'dulces': '🍓',
  'conservas': '🫙',
  'ediciones-especiales': '✨'
};

const CAT_GRADIENTS = {
  'dulce-de-leche': 'linear-gradient(135deg,#D4A574,#8B5E3C)',
  'dulces': 'linear-gradient(135deg,#D44040,#7B1D1D)',
  'conservas': 'linear-gradient(135deg,#D4930A,#7D5A0A)',
  'ediciones-especiales': 'linear-gradient(135deg,#C9953A,#7B1D1D)'
};

/* ================================================================
   STATE
   ================================================================ */
let products = [];
let editingId = null;
let deleteTargetId = null;
let currentSection = 'dashboard';
let adminFilter = 'all';
let adminSearch = '';
let currentImage = '';

/* ================================================================
   INIT
   ================================================================ */
function init() {
  loadProducts();
  checkSession();
  bindLogin();
  bindSidebar();
  bindModals();
  bindProductControls();
  bindDashboardActions();
}

/* ================================================================
   PRODUCTS
   ================================================================ */
function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    products = raw ? JSON.parse(raw) : getDefaultProducts();
    if (!raw) saveProducts();
  } catch {
    products = getDefaultProducts();
  }
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function getDefaultProducts() {
  return [
    { id: 1, name: 'Dulce de Leche Clásico', category: 'dulce-de-leche', description: 'Elaborado a fuego lento con leche fresca de campo y azúcar natural.', weight: '450g', price: 1800, featured: true, stock: true, image: '', emoji: '🍯', createdAt: Date.now() },
    { id: 2, name: 'Dulce de Leche Repostero', category: 'dulce-de-leche', description: 'Más espeso, ideal para relleno de tortas y alfajores.', weight: '450g', price: 2000, featured: true, stock: true, image: '', emoji: '🍯', createdAt: Date.now() },
    { id: 3, name: 'Dulce de Frambuesa', category: 'dulces', description: 'Frambuesas seleccionadas con bajo contenido de azúcar.', weight: '340g', price: 1500, featured: false, stock: true, image: '', emoji: '🍓', createdAt: Date.now() },
    { id: 4, name: 'Dulce de Durazno', category: 'dulces', description: 'Duraznos de temporada en su punto exacto de madurez.', weight: '340g', price: 1400, featured: true, stock: true, image: '', emoji: '🍑', createdAt: Date.now() },
    { id: 5, name: 'Dulce de Frutilla', category: 'dulces', description: 'Frutillas procesadas el mismo día de la cosecha.', weight: '340g', price: 1400, featured: false, stock: true, image: '', emoji: '🍓', createdAt: Date.now() },
    { id: 6, name: 'Dulce de Batata', category: 'conservas', description: 'Dulce de batata artesanal con vainilla natural.', weight: '500g', price: 1600, featured: false, stock: true, image: '', emoji: '🫙', createdAt: Date.now() },
    { id: 7, name: 'Dulce de Membrillo', category: 'conservas', description: 'Membrillo de huerta propia, sin conservantes artificiales.', weight: '500g', price: 1600, featured: false, stock: true, image: '', emoji: '🍋', createdAt: Date.now() },
    { id: 8, name: 'Kit Degustación Premium', category: 'ediciones-especiales', description: 'Set de 4 frascos seleccionados. Ideal para regalar.', weight: '4 × 200g', price: 4500, featured: true, stock: true, image: '', emoji: '🎁', createdAt: Date.now() },
    { id: 9, name: 'Edición Navidad', category: 'ediciones-especiales', description: 'Set navideño con packaging artesanal especial.', weight: '3 × 250g', price: 5500, featured: true, stock: false, image: '', emoji: '✨', createdAt: Date.now() }
  ];
}

/* ================================================================
   SESSION
   ================================================================ */
function checkSession() {
  const session = sessionStorage.getItem(SESSION_KEY);
  if (session === 'true') {
    showAdmin();
  }
}

function showAdmin() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminWrap').style.display = 'flex';
  renderDashboard();
  renderProductsTable();
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  document.getElementById('adminWrap').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

/* ================================================================
   LOGIN
   ================================================================ */
function bindLogin() {
  const form  = document.getElementById('loginForm');
  const errEl = document.getElementById('loginError');
  const togglePw = document.getElementById('togglePw');
  const passInput = document.getElementById('loginPass');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = passInput.value;

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      errEl.classList.remove('show');
      showAdmin();
    } else {
      errEl.textContent = 'Usuario o contraseña incorrectos.';
      errEl.classList.add('show');
      passInput.value = '';
      passInput.focus();
      // Shake animation
      const card = document.querySelector('.login-card');
      card.style.animation = 'shake .4s ease';
      setTimeout(() => card.style.animation = '', 400);
    }
  });

  togglePw?.addEventListener('click', () => {
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
  });
}

// Add shake keyframe
const styleEl = document.createElement('style');
styleEl.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`;
document.head.appendChild(styleEl);

/* ================================================================
   SIDEBAR & NAVIGATION
   ================================================================ */
function bindSidebar() {
  const sidebar    = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const closeBtn   = document.getElementById('sidebarClose');
  const logoutBtn  = document.getElementById('logoutBtn');

  // Mobile sidebar
  menuToggle?.addEventListener('click', () => sidebar.classList.toggle('open'));
  closeBtn?.addEventListener('click',   () => sidebar.classList.remove('open'));

  // Nav links
  document.querySelectorAll('.snav-link[data-section]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      switchSection(link.dataset.section);
      sidebar.classList.remove('open');
    });
  });

  logoutBtn?.addEventListener('click', logout);
}

function switchSection(name) {
  currentSection = name;

  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.snav-link').forEach(l => l.classList.remove('active'));

  const sec  = document.getElementById(`sec-${name}`);
  const link = document.querySelector(`.snav-link[data-section="${name}"]`);
  if (sec)  sec.classList.add('active');
  if (link) link.classList.add('active');

  const titles = { dashboard: 'Dashboard', products: 'Gestión de Productos' };
  document.getElementById('topbarTitle').textContent = titles[name] || name;

  if (name === 'dashboard') renderDashboard();
  if (name === 'products')  renderProductsTable();
}

/* ================================================================
   DASHBOARD
   ================================================================ */
function renderDashboard() {
  renderStats();
  renderFeatured();
}

function renderStats() {
  const statsGrid = document.getElementById('statsGrid');
  if (!statsGrid) return;

  const total    = products.length;
  const inStock  = products.filter(p => p.stock).length;
  const featured = products.filter(p => p.featured).length;
  const cats     = new Set(products.map(p => p.category)).size;

  statsGrid.innerHTML = `
    <div class="stat-card">
      <div class="stat-card-icon">📦</div>
      <span class="stat-card-val">${total}</span>
      <div class="stat-card-label">Total de Productos</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon">✅</div>
      <span class="stat-card-val">${inStock}</span>
      <div class="stat-card-label">Con Stock</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon">⭐</div>
      <span class="stat-card-val">${featured}</span>
      <div class="stat-card-label">Destacados</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon">🏷️</div>
      <span class="stat-card-val">${cats}</span>
      <div class="stat-card-label">Categorías</div>
    </div>
  `;
}

function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const featured = products.filter(p => p.featured).slice(0, 6);
  if (!featured.length) {
    grid.innerHTML = '<p style="color:var(--txt-muted);font-size:.85rem">No hay productos destacados.</p>';
    return;
  }

  grid.innerHTML = featured.map(p => `
    <div class="feat-card">
      <div class="feat-card-img" style="background:${CAT_GRADIENTS[p.category] || '#333'}">
        ${p.image
          ? `<img src="${p.image}" alt="${p.name}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;display:block">`
          : `<span style="font-size:2.2rem">${p.emoji || '🫙'}</span>`}
      </div>
      <div class="feat-card-body">
        <div class="feat-card-name">${p.name}</div>
        <div class="feat-card-price">$${fmtPrice(p.price)}</div>
      </div>
    </div>
  `).join('');
}

function bindDashboardActions() {
  document.getElementById('qaAddProduct')?.addEventListener('click', () => {
    switchSection('products');
    setTimeout(() => openAddModal(), 100);
  });
  document.getElementById('qaViewProducts')?.addEventListener('click', () => switchSection('products'));
}

/* ================================================================
   PRODUCT TABLE
   ================================================================ */
function renderProductsTable() {
  const tbody = document.getElementById('prodTableBody');
  if (!tbody) return;

  const filtered = products.filter(p => {
    const matchCat  = adminFilter === 'all' || p.category === adminFilter;
    const matchSearch = !adminSearch ||
      p.name.toLowerCase().includes(adminSearch) ||
      p.description.toLowerCase().includes(adminSearch);
    return matchCat && matchSearch;
  });

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:3rem;color:var(--txt-muted)">No se encontraron productos.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const imgHtml = p.image
      ? `<div class="table-thumb" style="position:relative;overflow:hidden;width:44px;height:44px;border-radius:8px;flex-shrink:0;background:#2D1C0C"><img src="${p.image}" alt="${p.name}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;display:block"></div>`
      : `<div class="table-thumb" style="background:${CAT_GRADIENTS[p.category] || '#333'}">${p.emoji || '🫙'}</div>`;

    return `
      <tr>
        <td>${imgHtml}</td>
        <td><div class="table-name">${p.name}</div></td>
        <td><span class="cat-pill ${p.category}">${CATEGORY_LABELS[p.category] || p.category}</span></td>
        <td style="font-weight:700;color:var(--gold)">$${fmtPrice(p.price)}</td>
        <td>${p.weight}</td>
        <td>${p.stock ? '<span class="badge-stock-yes">✓ Disponible</span>' : '<span class="badge-stock-no">✗ Sin stock</span>'}</td>
        <td>${p.featured ? '<span class="badge-feat-yes">★ Sí</span>' : '<span class="badge-feat-no">– No</span>'}</td>
        <td>
          <div class="table-actions">
            <button class="tbl-btn tbl-btn-edit" onclick="openEditModal(${p.id})" title="Editar">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="tbl-btn tbl-btn-del" onclick="openDeleteModal(${p.id})" title="Eliminar">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
            </button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function bindProductControls() {
  document.getElementById('adminSearch')?.addEventListener('input', e => {
    adminSearch = e.target.value.trim().toLowerCase();
    renderProductsTable();
  });

  document.getElementById('adminFilter')?.addEventListener('change', e => {
    adminFilter = e.target.value;
    renderProductsTable();
  });

  document.getElementById('addProductBtn')?.addEventListener('click', openAddModal);
}

/* ================================================================
   MODAL — ADD / EDIT
   ================================================================ */
function bindModals() {
  const overlay     = document.getElementById('modalOverlay');
  const modalClose  = document.getElementById('modalClose');
  const btnCancel   = document.getElementById('btnCancel');
  const productForm = document.getElementById('productForm');

  // Close
  const closeModal = () => {
    overlay.classList.remove('open');
    resetForm();
  };
  modalClose?.addEventListener('click', closeModal);
  btnCancel?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  // Submit
  productForm?.addEventListener('submit', handleSaveProduct);

  // Image upload
  bindImageUpload();

  // Delete modal
  const deleteOverlay = document.getElementById('deleteOverlay');
  const deleteClose   = document.getElementById('deleteClose');
  const deleteCancelBtn = document.getElementById('deleteCancelBtn');
  const deleteConfirmBtn = document.getElementById('deleteConfirmBtn');

  const closeDelete = () => { deleteOverlay.classList.remove('open'); deleteTargetId = null; };
  deleteClose?.addEventListener('click', closeDelete);
  deleteCancelBtn?.addEventListener('click', closeDelete);
  deleteOverlay?.addEventListener('click', e => { if (e.target === deleteOverlay) closeDelete(); });
  deleteConfirmBtn?.addEventListener('click', confirmDelete);
}

function openAddModal() {
  editingId = null;
  currentImage = '';
  resetForm();
  document.getElementById('modalTitle').textContent = 'Agregar Producto';
  document.getElementById('modalOverlay').classList.add('open');
}

window.openEditModal = function(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  editingId = id;
  currentImage = p.image || '';
  document.getElementById('modalTitle').textContent = 'Editar Producto';

  document.getElementById('pId').value       = p.id;
  document.getElementById('pName').value     = p.name;
  document.getElementById('pCategory').value = p.category;
  document.getElementById('pEmoji').value    = p.emoji || '';
  document.getElementById('pPrice').value    = p.price;
  document.getElementById('pWeight').value   = p.weight;
  document.getElementById('pDesc').value     = p.description;
  document.getElementById('pStock').checked   = p.stock;
  document.getElementById('pFeatured').checked = p.featured;

  // Image preview
  const preview = document.getElementById('imgPreview');
  const placeholder = document.getElementById('imgPlaceholder');
  const removeBtn = document.getElementById('btnImgRemove');
  if (p.image) {
    preview.src = p.image;
    preview.style.display = 'block';
    placeholder.style.display = 'none';
    removeBtn.style.display = 'inline-flex';
  } else {
    preview.style.display = 'none';
    placeholder.style.display = 'flex';
    removeBtn.style.display = 'none';
  }

  document.getElementById('modalOverlay').classList.add('open');
};

function handleSaveProduct(e) {
  e.preventDefault();

  const name     = document.getElementById('pName').value.trim();
  const category = document.getElementById('pCategory').value;
  const emoji    = document.getElementById('pEmoji').value.trim() || CATEGORY_EMOJIS[category] || '🫙';
  const price    = parseInt(document.getElementById('pPrice').value) || 0;
  const weight   = document.getElementById('pWeight').value.trim();
  const desc     = document.getElementById('pDesc').value.trim();
  const stock    = document.getElementById('pStock').checked;
  const featured = document.getElementById('pFeatured').checked;

  if (!name || !category || !weight || !desc) {
    showToast('Por favor completá todos los campos obligatorios.', 'error');
    return;
  }

  if (editingId !== null) {
    // Update
    const idx = products.findIndex(p => p.id === editingId);
    if (idx !== -1) {
      products[idx] = { ...products[idx], name, category, emoji, price, weight, description: desc, stock, featured, image: currentImage };
    }
    showToast('Producto actualizado correctamente.', 'success');
  } else {
    // Create
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push({ id: newId, name, category, emoji, price, weight, description: desc, stock, featured, image: currentImage, createdAt: Date.now() });
    showToast('Producto agregado correctamente.', 'success');
  }

  saveProducts();
  renderProductsTable();
  renderDashboard();
  document.getElementById('modalOverlay').classList.remove('open');
  resetForm();
}

function resetForm() {
  document.getElementById('productForm').reset();
  editingId = null;
  currentImage = '';
  document.getElementById('imgPreview').style.display = 'none';
  document.getElementById('imgPlaceholder').style.display = 'flex';
  document.getElementById('btnImgRemove').style.display = 'none';
}

/* ================================================================
   DELETE
   ================================================================ */
window.openDeleteModal = function(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  deleteTargetId = id;
  document.getElementById('deleteName').textContent = p.name;
  document.getElementById('deleteOverlay').classList.add('open');
};

function confirmDelete() {
  if (deleteTargetId === null) return;
  products = products.filter(p => p.id !== deleteTargetId);
  saveProducts();
  renderProductsTable();
  renderDashboard();
  document.getElementById('deleteOverlay').classList.remove('open');
  deleteTargetId = null;
  showToast('Producto eliminado.', 'success');
}

/* ================================================================
   IMAGE UPLOAD
   ================================================================ */
function bindImageUpload() {
  const inputFile   = document.getElementById('imgInput');
  const btnUpload   = document.getElementById('btnImgUpload');
  const btnRemove   = document.getElementById('btnImgRemove');
  const preview     = document.getElementById('imgPreview');
  const placeholder = document.getElementById('imgPlaceholder');
  const previewWrap = document.getElementById('imgPreviewWrap');

  btnUpload?.addEventListener('click', () => inputFile.click());
  previewWrap?.addEventListener('click', () => { if (!currentImage) inputFile.click(); });

  inputFile?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('La imagen no puede superar 2MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const MAX = 800;
        let w = img.width, h = img.height;
        if (w > h) { if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; } }
        else        { if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; } }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        currentImage = canvas.toDataURL('image/jpeg', 0.85);
        preview.src = currentImage;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
        btnRemove.style.display = 'inline-flex';
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });

  btnRemove?.addEventListener('click', () => {
    currentImage = '';
    preview.src = '';
    preview.style.display = 'none';
    placeholder.style.display = 'flex';
    btnRemove.style.display = 'none';
  });
}

/* ================================================================
   TOAST
   ================================================================ */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ================================================================
   UTILS
   ================================================================ */
function fmtPrice(n) {
  return new Intl.NumberFormat('es-AR').format(n);
}

/* ================================================================
   GLOBAL EXPORTS (for inline onclick)
   ================================================================ */
window.openEditModal   = window.openEditModal;
window.openDeleteModal = window.openDeleteModal;

/* ================================================================
   RUN
   ================================================================ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
