/* ============================================================
   TCG Card Collector — app.js
   Lógica en JavaScript vanilla, sin dependencias externas.
   Secciones: datos -> estado -> persistencia -> sorteo ->
              animación -> render -> eventos -> init.
   ============================================================ */

'use strict';

/* ---------------- 1. Configuración central ---------------- */

// Probabilidades por rareza (fáciles de modificar, suman 100).
// El sorteo primero elige rareza y luego una carta de esa rareza.
const RARITY_PROBABILITIES = {
  comun: 55,
  poco_comun: 25,
  rara: 12,
  epica: 6,
  legendaria: 2,
};

const RARITY_LABELS = {
  comun: 'Común',
  poco_comun: 'Poco común',
  rara: 'Rara',
  epica: 'Épica',
  legendaria: 'Legendaria',
};

// Orden para clasificar (mayor número = más valiosa).
const RARITY_ORDER = {
  comun: 0,
  poco_comun: 1,
  rara: 2,
  epica: 3,
  legendaria: 4,
};

const TOTAL_CARDS_PER_PACK = 5;
const INITIAL_PACKS = 10;
const DEMO_PACKS_TO_ADD = 3;

const STORAGE_KEYS = {
  packs: 'tcg_packs_v1',
  collection: 'tcg_collection_v1',
};

/* ---------------- 2. Generar la colección inicial ---------------- */

/**
 * Genera la base de datos inicial de tarjetas ficticias.
 * Cada tarjeta: id, nombre, tipo, rareza, poder, descripcion,
 * colores [c1, c2] para el gradiente y icono (emoji provisional).
 * @returns {Array<Object>} 30 tarjetas (12C / 8PC / 5R / 3E / 2L).
 */
function generarColeccionInicial() {
  return [
    // ---- COMUNES (12) ----
    { id: '001', nombre: 'Chispa Novata', tipo: 'Fuego', rareza: 'comun', poder: 12, descripcion: 'Una pequeña brasa que sueña con ser incendio. Leal y juguetona.', colores: ['#ff9a3c', '#c2410c'], icono: '🔥' },
    { id: '002', nombre: 'Gota Tímida', tipo: 'Agua', rareza: 'comun', poder: 10, descripcion: 'Se esconde en los charcos y solo sale para ayudar a sus amigos.', colores: ['#7dd3fc', '#0369a1'], icono: '💧' },
    { id: '003', nombre: 'Brote Curioso', tipo: 'Planta', rareza: 'comun', poder: 11, descripcion: 'Investiga cada rayo de sol como si fuera un tesoro nuevo.', colores: ['#86efac', '#166534'], icono: '🌱' },
    { id: '004', nombre: 'Voltijo', tipo: 'Eléctrico', rareza: 'comun', poder: 13, descripcion: 'Muerde cables viejos y escupe chispas cuando se emociona.', colores: ['#fde047', '#a16207'], icono: '⚡' },
    { id: '005', nombre: 'Sombra Menor', tipo: 'Sombra', rareza: 'comun', poder: 9, descripcion: 'Vive bajo las camas de los valientes. Inofensiva, casi tierna.', colores: ['#a5b4fc', '#312e81'], icono: '🌑' },
    { id: '006', nombre: 'Destello Inicial', tipo: 'Luz', rareza: 'comun', poder: 10, descripcion: 'El primer fotón de cada amanecer. Anuncia buenas tiradas.', colores: ['#fef9c3', '#ca8a04'], icono: '✨' },
    { id: '007', nombre: 'Brasita Terca', tipo: 'Fuego', rareza: 'comun', poder: 14, descripcion: 'No se apaga ni con tormenta. Obstinada hasta la victoria.', colores: ['#fb7185', '#7f1d1d'], icono: '🧨' },
    { id: '008', nombre: 'Burbuja Errante', tipo: 'Agua', rareza: 'comun', poder: 11, descripcion: 'Viaja en ríos subterráneos coleccionando ecos lejanos.', colores: ['#a5f3fc', '#0e7490'], icono: '🫧' },
    { id: '009', nombre: 'Musgo Antiguo', tipo: 'Planta', rareza: 'comun', poder: 8, descripcion: 'Ha visto caer cien torres. Su paciencia es su armadura.', colores: ['#4ade80', '#14532d'], icono: '🍃' },
    { id: '010', nombre: 'Cablecillo', tipo: 'Eléctrico', rareza: 'comun', poder: 12, descripcion: 'Un enchufe con patas. Se enreda en todo, incluso en rivales.', colores: ['#93c5fd', '#1e3a8a'], icono: '🔌' },
    { id: '011', nombre: 'Eco Umbrío', tipo: 'Sombra', rareza: 'comun', poder: 10, descripcion: 'Repite tus palabras con un segundo de retraso siniestro.', colores: ['#c4b5fd', '#4c1d95'], icono: '👤' },
    { id: '012', nombre: 'Polilla Luminosa', tipo: 'Luz', rareza: 'comun', poder: 9, descripcion: 'Guía a los perdidos con polvo de estrellas barato pero efectivo.', colores: ['#fbcfe8', '#9d174d'], icono: '🦋' },

    // ---- POCO COMUNES (8) ----
    { id: '013', nombre: 'Llama Astuta', tipo: 'Fuego', rareza: 'poco_comun', poder: 32, descripcion: 'Zorro de fuego que cambia de forma para confundir al rival.', colores: ['#fb923c', '#7c2d12'], icono: '🦊' },
    { id: '014', nombre: 'Marea Cantante', tipo: 'Agua', rareza: 'poco_comun', poder: 35, descripcion: 'Su canto calma tormentas y duerme a guardianes costeros.', colores: ['#38bdf8', '#0c4a6e'], icono: '🌊' },
    { id: '015', nombre: 'Enredadera Férrea', tipo: 'Planta', rareza: 'poco_comun', poder: 33, descripcion: 'Abraza golems y los convierte en jardines andantes.', colores: ['#34d399', '#064e3b'], icono: '🌿' },
    { id: '016', nombre: 'Tormenta Contenida', tipo: 'Eléctrico', rareza: 'poco_comun', poder: 38, descripcion: 'Un rayo atrapado en una botella. Agítalo con cuidado.', colores: ['#e879f9', '#581c87'], icono: '🌩️' },
    { id: '017', nombre: 'Acechador Nocturno', tipo: 'Sombra', rareza: 'poco_comun', poder: 34, descripcion: 'Murciélago de neón que roba brillo para su cueva.', colores: ['#818cf8', '#1e1b4b'], icono: '🦇' },
    { id: '018', nombre: 'Guardián del Alba', tipo: 'Luz', rareza: 'poco_comun', poder: 36, descripcion: 'Caballero del amanecer. Su escudo refleja el primer sol.', colores: ['#facc15', '#713f12'], icono: '🛡️' },
    { id: '019', nombre: 'Forja Ígnea', tipo: 'Fuego', rareza: 'poco_comun', poder: 31, descripcion: 'Enana herrera que funde circuitos y espadas por igual.', colores: ['#f87171', '#450a0a'], icono: '⚒️' },
    { id: '020', nombre: 'Arrecife Sabio', tipo: 'Agua', rareza: 'poco_comun', poder: 30, descripcion: 'Coral milenario que recuerda todos los naufragios.', colores: ['#2dd4bf', '#134e4a'], icono: '🪸' },

    // ---- RARAS (5) ----
    { id: '021', nombre: 'Fénix de Neón', tipo: 'Fuego', rareza: 'rara', poder: 62, descripcion: 'Renace entre anuncios holográficos. Su llanto cura quemaduras.', colores: ['#ff2bd6', '#f97316'], icono: '🐦‍🔥' },
    { id: '022', nombre: 'Leviatán Abisal', tipo: 'Agua', rareza: 'rara', poder: 65, descripcion: 'Duerme bajo la red eléctrica submarina. Despertarlo es mala idea.', colores: ['#0ea5e9', '#020617'], icono: '🐋' },
    { id: '023', nombre: 'Titán Espora', tipo: 'Planta', rareza: 'rara', poder: 60, descripcion: 'Hongo colosal que convierte ciudades en bosques en una noche.', colores: ['#a3e635', '#3f6212'], icono: '🍄' },
    { id: '024', nombre: 'Señor Voltaje', tipo: 'Eléctrico', rareza: 'rara', poder: 64, descripcion: 'Autómata noble que gobierna la tormenta con etiqueta.', colores: ['#22d3ee', '#312e81'], icono: '🤖' },
    { id: '025', nombre: 'Oráculo Ciego', tipo: 'Luz', rareza: 'rara', poder: 61, descripcion: 'Ve futuros en esferas de plasma. Cobra en secretos.', colores: ['#e9d5ff', '#6b21a8'], icono: '🔮' },

    // ---- ÉPICAS (3) ----
    { id: '026', nombre: 'Dragón Circuito', tipo: 'Fuego', rareza: 'epica', poder: 85, descripcion: 'Mitad dragón, mitad placa base. Escupe fuego y firmware.', colores: ['#ff2bd6', '#00f0ff'], icono: '🐉' },
    { id: '027', nombre: 'Reina Marea Negra', tipo: 'Sombra', rareza: 'epica', poder: 88, descripcion: 'Gobierna el océano de medianoche desde un trono de tinta.', colores: ['#0f172a', '#7c3aed'], icono: '🧜‍♀️' },
    { id: '028', nombre: 'Centinela Solar', tipo: 'Luz', rareza: 'epica', poder: 86, descripcion: 'Gólem forjado en el corazón de una estrella enana.', colores: ['#fde047', '#ea580c'], icono: '☀️' },

    // ---- LEGENDARIAS (2) ----
    { id: '029', nombre: 'Aion, el Infinito', tipo: 'Luz', rareza: 'legendaria', poder: 100, descripcion: 'El tiempo mismo hecho carta. Quien la posee nunca pierde del todo.', colores: ['#fef08a', '#00f0ff'], icono: '🌌' },
    { id: '030', nombre: 'Umbra Primigenia', tipo: 'Sombra', rareza: 'legendaria', poder: 99, descripcion: 'La primera oscuridad antes de la luz. Su susurro apaga soles.', colores: ['#1e1b4b', '#ff2bd6'], icono: '🕳️' },
  ];
}

// Base de datos inmutable durante la sesión.
const CARD_POOL = generarColeccionInicial();
const CARD_BY_ID = Object.fromEntries(CARD_POOL.map((c) => [c.id, c]));

/* ---------------- 3. Estado + persistencia ---------------- */

let packs = INITIAL_PACKS;
let collectionCounts = {}; // { '001': 2, ... }
let isOpening = false;
let lastFocusedElement = null;

const $ = (sel) => document.querySelector(sel);

function guardarProgreso() {
  try {
    localStorage.setItem(STORAGE_KEYS.packs, String(packs));
    localStorage.setItem(STORAGE_KEYS.collection, JSON.stringify(collectionCounts));
  } catch (err) {
    console.warn('No se pudo guardar en localStorage:', err);
  }
}

function recuperarProgreso() {
  try {
    const p = localStorage.getItem(STORAGE_KEYS.packs);
    const c = localStorage.getItem(STORAGE_KEYS.collection);
    if (p !== null) {
      const n = Number.parseInt(p, 10);
      if (Number.isInteger(n) && n >= 0) packs = n;
    }
    if (c !== null) {
      const parsed = JSON.parse(c);
      if (parsed && typeof parsed === 'object') {
        // Solo conserva IDs válidos con conteos positivos.
        collectionCounts = {};
        for (const [id, count] of Object.entries(parsed)) {
          if (CARD_BY_ID[id] && Number.isInteger(count) && count > 0) {
            collectionCounts[id] = count;
          }
        }
      }
    }
  } catch (err) {
    console.warn('No se pudo leer localStorage, se usan valores iniciales:', err);
  }
}

function reiniciarProgreso() {
  packs = INITIAL_PACKS;
  collectionCounts = {};
  guardarProgreso();
}

/* ---------------- 4. Sorteo: rareza + tarjeta + sobre ---------------- */

/**
 * Selecciona una rareza según RARITY_PROBABILITIES.
 * Si alguna rareza no tiene cartas, se re-normaliza entre las disponibles
 * para garantizar siempre un resultado válido.
 * @returns {string} clave de rareza.
 */
function seleccionarRareza() {
  const disponibles = Object.keys(RARITY_PROBABILITIES).filter((r) =>
    CARD_POOL.some((c) => c.rareza === r)
  );
  const pool = disponibles.length > 0 ? disponibles : Object.keys(RARITY_PROBABILITIES);
  const total = pool.reduce((acc, r) => acc + RARITY_PROBABILITIES[r], 0);
  let roll = Math.random() * total;
  for (const rareza of pool) {
    roll -= RARITY_PROBABILITIES[rareza];
    if (roll < 0) return rareza;
  }
  return pool[pool.length - 1];
}

/**
 * Elige una tarjeta aleatoria, opcionalmente filtrada por rareza.
 * Si la rareza no tiene cartas, usa la colección completa (sin errores).
 * @param {string} [rareza] - clave de rareza opcional.
 * @returns {Object} tarjeta.
 */
function elegirTarjetaAleatoria(rareza) {
  let candidatas = rareza ? CARD_POOL.filter((c) => c.rareza === rareza) : CARD_POOL;
  if (candidatas.length === 0) candidatas = CARD_POOL;
  const i = Math.floor(Math.random() * candidatas.length);
  return candidatas[i];
}

/**
 * Genera un sobre con exactamente 5 tarjetas independientes.
 * Puede haber repetidas, incluso dentro del mismo sobre.
 * @returns {Array<Object>} 5 tarjetas.
 */
function generarSobre() {
  const sobre = [];
  for (let i = 0; i < TOTAL_CARDS_PER_PACK; i += 1) {
    const rareza = seleccionarRareza();
    sobre.push(elegirTarjetaAleatoria(rareza));
  }
  return sobre;
}

/* ---------------- 5. Utilidades UI ---------------- */

function prefiereMovimientoReducido() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function esperar(ms) {
  if (prefiereMovimientoReducido()) return Promise.resolve();
  return new Promise((res) => setTimeout(res, ms));
}

function mostrarMensaje(texto, esError = false) {
  const el = $('#packMessage');
  el.textContent = texto;
  el.classList.toggle('error', esError);
}

/* ---------------- 6. Animación de apertura ---------------- */

/**
 * Reproduce la animación de ruptura del sobre.
 * Bloquea la interacción mediante la clase .opening y el destello .burst.
 */
async function animarApertura() {
  const pack = $('#pack');
  const burst = $('#burst');
  pack.classList.remove('opening');
  burst.classList.remove('go');
  // Fuerza reflow para reiniciar la animación si se abre seguido.
  void pack.offsetWidth;
  pack.classList.add('opening');
  burst.classList.add('go');
  mostrarMensaje('Abriendo el sobre… ✦');
  await esperar(900);
  pack.classList.remove('opening');
  burst.classList.remove('go');
}

/* ---------------- 7. Construcción y revelado de tarjetas ---------------- */

/**
 * Crea el elemento visual de una tarjeta (botón accesible con <article>).
 * El arte es 100% CSS: gradiente propio + emoji representativo.
 */
function crearElementoTarjeta(carta, copias = null, conEntrada = false, retraso = 0) {
  const el = document.createElement('article');
  el.className = `card rarity-${carta.rareza}${conEntrada ? ' enter' : ''}`;
  el.tabIndex = 0;
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', `${carta.nombre}, ${RARITY_LABELS[carta.rareza]}, poder ${carta.poder}. Pulsa para ampliar.`);
  el.dataset.cardId = carta.id;
  if (conEntrada && !prefiereMovimientoReducido() && retraso > 0) {
    el.style.animationDelay = `${retraso}ms`;
  }

  const copiasHtml = copias !== null
    ? `<p class="card-count">En colección: <strong>×${copias}</strong></p>`
    : '';

  el.innerHTML = `
    <div class="card-top">
      <span class="card-id">#${carta.id}</span>
      <span class="card-power" title="Nivel de poder">⚔ ${carta.poder}</span>
    </div>
    <h3 class="card-name">${carta.nombre}</h3>
    <div class="card-art" style="--c1:${carta.colores[0]};--c2:${carta.colores[1]}" aria-hidden="true">${carta.icono}</div>
    <div class="card-meta">
      <span class="badge badge-rarity">${RARITY_LABELS[carta.rareza]}</span>
      <span class="badge">${carta.tipo}</span>
    </div>
    <p class="card-desc">${carta.descripcion}</p>
    ${copiasHtml}
  `;

  el.addEventListener('click', () => mostrarVistaAmpliada(carta.id));
  el.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      mostrarVistaAmpliada(carta.id);
    }
  });
  return el;
}

/**
 * Revela las 5 tarjetas una por una con un pequeño retraso.
 * Limpia el área de revelado y muestra la cuadrícula adaptable.
 */
async function revelarTarjetas(tarjetas) {
  const grid = $('#revealGrid');
  grid.innerHTML = '';

  const reducida = prefiereMovimientoReducido();
  const paso = reducida ? 0 : 420;

  for (let i = 0; i < tarjetas.length; i += 1) {
    const carta = tarjetas[i];
    // Las copias mostradas incluyen la recién conseguida (ya registrada antes de revelar).
    const el = crearElementoTarjeta(carta, collectionCounts[carta.id] || 1, true, i * paso);
    grid.appendChild(el);
    if (!reducida) {
      // eslint-disable-next-line no-await-in-loop
      await esperar(paso);
    }
  }
  mostrarMensaje(`¡Sobre revelado! ${resumenRarezas(tarjetas)}`);
}

/** Pequeño resumen textual de las rarezas obtenidas (ej. "2 Raras, 1 Épica…"). */
function resumenRarezas(tarjetas) {
  const conteo = {};
  for (const t of tarjetas) conteo[t.rareza] = (conteo[t.rareza] || 0) + 1;
  return Object.entries(conteo)
    .sort((a, b) => RARITY_ORDER[b[0]] - RARITY_ORDER[a[0]])
    .map(([r, n]) => `${n} ${RARITY_LABELS[r]}${n > 1 ? 's' : ''}`)
    .join(' · ');
}

/* ---------------- 8. Actualizar colección y contadores ---------------- */

/**
 * Registra las tarjetas en la colección (suma copias, crea entradas nuevas).
 * @param {Array<Object>} tarjetas - las 5 del sobre.
 */
function actualizarColeccion(tarjetas) {
  for (const carta of tarjetas) {
    collectionCounts[carta.id] = (collectionCounts[carta.id] || 0) + 1;
  }
  guardarProgreso();
}

function contarUnicas() {
  return Object.keys(collectionCounts).length;
}

function contarTotales() {
  return Object.values(collectionCounts).reduce((a, b) => a + b, 0);
}

function actualizarContadores() {
  const unicas = contarUnicas();
  const totales = contarTotales();
  const pct = Math.round((unicas / CARD_POOL.length) * 100);

  $('#packCount').textContent = String(packs);
  $('#headerPacks').textContent = String(packs);
  $('#headerUnique').textContent = String(unicas);
  $('#uniqueCount').textContent = String(unicas);
  $('#totalCount').textContent = String(CARD_POOL.length);
  $('#totalCopies').textContent = String(totales);
  $('#percent').textContent = `${pct}%`;
  $('#progressFill').style.width = `${pct}%`;
  $('#progressBar').setAttribute('aria-valuenow', String(pct));

  const btn = $('#openPackBtn');
  if (packs <= 0) {
    btn.disabled = true;
    // No pisar el resumen del último sobre: solo avisa si no hay mensaje.
    if (!$('#packMessage').textContent) {
      mostrarMensaje('No hay sobres disponibles. Usa el botón demo para añadir +3. 🃏', true);
    }
  } else {
    btn.disabled = isOpening;
  }
}

/* ---------------- 9. Filtros, orden y render de colección ---------------- */

/** Rellena el filtro de tipos dinámicamente desde la colección inicial. */
function inicializarFiltroTipos() {
  const sel = $('#filterType');
  const tipos = [...new Set(CARD_POOL.map((c) => c.tipo))].sort((a, b) => a.localeCompare(b, 'es'));
  for (const tipo of tipos) {
    const opt = document.createElement('option');
    opt.value = tipo;
    opt.textContent = tipo;
    sel.appendChild(opt);
  }
}

/**
 * Aplica filtros (rareza, tipo) y orden (nombre, rareza, poder)
 * sobre las tarjetas poseídas y las pinta en la cuadrícula.
 */
function aplicarFiltrosYOrden() {
  const fRareza = $('#filterRarity').value;
  const fTipo = $('#filterType').value;
  const orden = $('#sortBy').value;

  let lista = CARD_POOL.filter((c) => collectionCounts[c.id] > 0);
  if (fRareza !== 'todas') lista = lista.filter((c) => c.rareza === fRareza);
  if (fTipo !== 'todos') lista = lista.filter((c) => c.tipo === fTipo);

  lista.sort((a, b) => {
    if (orden === 'nombre') return a.nombre.localeCompare(b.nombre, 'es');
    if (orden === 'poder') return b.poder - a.poder || a.nombre.localeCompare(b.nombre, 'es');
    // Por defecto: rareza (mayor primero), luego poder, luego nombre.
    return (
      RARITY_ORDER[b.rareza] - RARITY_ORDER[a.rareza] ||
      b.poder - a.poder ||
      a.nombre.localeCompare(b.nombre, 'es')
    );
  });

  const grid = $('#collectionGrid');
  grid.innerHTML = '';
  for (const carta of lista) {
    grid.appendChild(crearElementoTarjeta(carta, collectionCounts[carta.id], false));
  }

  const hayColeccion = contarUnicas() > 0;
  $('#emptyCollection').hidden = hayColeccion;
  if (hayColeccion) $('#emptyCollection').style.display = 'none';
  else $('#emptyCollection').style.display = '';
  $('#noResults').hidden = !(hayColeccion && lista.length === 0);
}

function renderTodo() {
  actualizarContadores();
  aplicarFiltrosYOrden();
}

/* ---------------- 10. Vista ampliada (modal) ---------------- */

function mostrarVistaAmpliada(cardId) {
  const carta = CARD_BY_ID[cardId];
  if (!carta) return;
  lastFocusedElement = document.activeElement;

  const copias = collectionCounts[cardId] || 0;
  const body = $('#modalBody');
  body.innerHTML = `
    <div class="modal-card rarity-${carta.rareza}">
      <div class="card-art" style="--c1:${carta.colores[0]};--c2:${carta.colores[1]}" aria-hidden="true">${carta.icono}</div>
      <h3 id="modalTitle">${carta.nombre} <span class="card-id">#${carta.id}</span></h3>
      <div class="card-meta">
        <span class="badge badge-rarity">${RARITY_LABELS[carta.rareza]}</span>
        <span class="badge">${carta.tipo}</span>
        <span class="badge">⚔ Poder ${carta.poder}</span>
        <span class="badge">×${copias} en colección</span>
      </div>
      <dl class="modal-attrs">
        <div><dt>ID</dt><dd>#${carta.id}</dd></div>
        <div><dt>Nombre</dt><dd>${carta.nombre}</dd></div>
        <div><dt>Tipo</dt><dd>${carta.tipo}</dd></div>
        <div><dt>Rareza</dt><dd>${RARITY_LABELS[carta.rareza]}</dd></div>
        <div><dt>Poder</dt><dd>${carta.poder}</dd></div>
        <div><dt>Identidad visual</dt><dd><span aria-hidden="true" style="display:inline-block;width:2.6rem;height:1rem;border-radius:999px;background:linear-gradient(90deg,${carta.colores[0]},${carta.colores[1]});border:1px solid #fff"></span> ${carta.colores[0]} → ${carta.colores[1]}</dd></div>
      </dl>
      <p class="modal-desc">${carta.descripcion}</p>
    </div>
  `;

  const modal = $('#cardModal');
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  $('#closeModal').focus();
}

function cerrarVistaAmpliada() {
  $('#cardModal').hidden = true;
  document.body.style.overflow = '';
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

/* ---------------- 11. Flujo principal: abrir sobre ---------------- */

async function abrirSobre() {
  if (isOpening) return; // evita aperturas duplicadas durante la animación
  if (packs <= 0) {
    mostrarMensaje('No hay sobres disponibles. Usa el botón demo para añadir +3. 🃏', true);
    actualizarContadores();
    return;
  }

  isOpening = true;
  actualizarContadores(); // deshabilita el botón durante la animación
  mostrarMensaje('');

  try {
    packs -= 1; // consumir sobre al inicio para evitar doble gasto
    guardarProgreso();
    actualizarContadores();

    await animarApertura();
    const sobre = generarSobre(); // exactamente 5 tarjetas
    const resumen = resumenRarezas(sobre);
    actualizarColeccion(sobre);
    await revelarTarjetas(sobre);
    renderTodo();
    // Reafirma el resumen tras renderTodo (que ya no pisa mensajes).
    mostrarMensaje(
      `¡Sobre revelado! ${resumen}` + (packs <= 0 ? ' — Te has quedado sin sobres. 🃏' : '')
    );
  } finally {
    isOpening = false;
    actualizarContadores();
  }
}

/* ---------------- 12. Eventos e init ---------------- */

function vincularEventos() {
  $('#openPackBtn').addEventListener('click', abrirSobre);
  // El sobre también es clicable (accesible por teclado).
  const pack = $('#pack');
  pack.tabIndex = 0;
  pack.setAttribute('role', 'button');
  pack.addEventListener('click', abrirSobre);
  pack.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      abrirSobre();
    }
  });

  $('#addPacksBtn').addEventListener('click', () => {
    packs += DEMO_PACKS_TO_ADD;
    guardarProgreso();
    actualizarContadores();
    mostrarMensaje(`Demo: se añadieron ${DEMO_PACKS_TO_ADD} sobres. ¡A coleccionar! 🧪`);
  });

  $('#filterRarity').addEventListener('change', aplicarFiltrosYOrden);
  $('#filterType').addEventListener('change', aplicarFiltrosYOrden);
  $('#sortBy').addEventListener('change', aplicarFiltrosYOrden);

  $('#resetBtn').addEventListener('click', () => {
    const ok = window.confirm('¿Seguro que quieres borrar toda tu colección y volver a 10 sobres?');
    if (!ok) return;
    reiniciarProgreso();
    $('#revealGrid').innerHTML = '<p class="placeholder">Aún no has abierto ningún sobre. ¡El brillo te espera! ✨</p>';
    renderTodo();
    mostrarMensaje('Colección reiniciada. ¡Nueva suerte! 🍀');
  });

  $('#closeModal').addEventListener('click', cerrarVistaAmpliada);
  $('#cardModal').addEventListener('click', (ev) => {
    if (ev.target.hasAttribute('data-close-modal')) cerrarVistaAmpliada();
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && !$('#cardModal').hidden) cerrarVistaAmpliada();
  });
}

function init() {
  recuperarProgreso();
  inicializarFiltroTipos();
  vincularEventos();
  renderTodo();
}

document.addEventListener('DOMContentLoaded', init);

// Exporta funciones puras para facilitar pruebas manuales en consola.
window.TCG = {
  generarColeccionInicial,
  seleccionarRareza,
  elegirTarjetaAleatoria,
  generarSobre,
  RARITY_PROBABILITIES,
  CARD_POOL,
};
