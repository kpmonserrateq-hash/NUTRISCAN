(async function () {
  'use strict';

  const views = document.querySelectorAll('[data-view]');
  const routeTriggers = document.querySelectorAll('[data-route]');
  const menuButton = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#mainNav');
  const loginForm = document.querySelector('#loginForm');
  const registerForm = document.querySelector('#registerForm');
  const loginSapInput = loginForm?.querySelector('[name="sap"]');
  const loginRoleSelect = loginForm?.querySelector('[name="role"]');
  const loginNote = document.querySelector('#loginNote');
  const contactForm = document.querySelector('#contactForm');
  const contactStatus = document.querySelector('#contactStatus');
  const contactWhatsapp = document.querySelector('#contactWhatsapp');
  const settingsForm = document.querySelector('#settingsForm');
  const settingsStatus = document.querySelector('#settingsStatus');
  const settingsLanguageLabel = document.querySelector('#settingsLanguageLabel');
  const settingsCalendarButton = document.querySelector('#settingsCalendarButton');
  const adminReportPanel = document.querySelector('#adminReportPanel');
  const adminReportFilter = document.querySelector('#adminReportFilter');
  const adminReportList = document.querySelector('#adminReportList');
  const adminReportStatus = document.querySelector('#adminReportStatus');
  const photoInput = document.querySelector('#foodPhoto');
  const scanForm = document.querySelector('#scanForm');
  const scanVideo = document.querySelector('#scanVideo');
  const scanResult = document.querySelector('#scanResult');
  const startScanButton = document.querySelector('#startScan');
  const stopScanButton = document.querySelector('#stopScan');
  const capturePhotoButton = document.querySelector('#capturePhoto');
  const processPhotoButton = document.querySelector('#processPhoto');
  const photoCanvas = document.querySelector('#photoCanvas');
  const photoPreview = document.querySelector('#photoPreview');
  const manualCodeInput = document.querySelector('#manualCode');
  const redirectNotice = document.querySelector('#redirectNotice');
  const loginStatus = document.querySelector('#loginStatus');
  const registerStatus = document.querySelector('#registerStatus');
  const languageStatus = document.querySelector('#languageStatus');
  const panelTitle = document.querySelector('#panelTitle');
  const profileName = document.querySelector('#profileName');
  const profileDetails = document.querySelector('#profileDetails');
  const panelButtons = document.querySelectorAll('[data-panel]');
  const userListContainer = document.querySelector('#userListContainer');
  const userRoleFilter = document.querySelector('#userRoleFilter');
  const roleStats = document.querySelector('#userRoleSummary');
  const userPanelNote = document.querySelector('#userPanelNote');
  const refreshUsersButton = document.querySelector('#refreshUsers');
  const clearUsersButton = document.querySelector('#clearUsers');
  const parentChildControls = document.querySelector('#parentChildControls');
  const parentChildSelect = document.querySelector('#parentChildSelect');
  const linkParentChildButton = document.querySelector('#linkParentChild');
  const userEditor = document.querySelector('#userEditor');
  const userEditorForm = document.querySelector('#userEditorForm');
  const userEditorStatus = document.querySelector('#userEditorStatus');
  const cancelEditUserButton = document.querySelector('#cancelEditUser');
  const snackForm = document.querySelector('#snackForm');
  const snackStudent = document.querySelector('#snackStudent');
  const snackPrice = document.querySelector('#snackPrice');
  const snackCalories = document.querySelector('#snackCalories');
  const snackProtein = document.querySelector('#snackProtein');
  const snackPhoto = document.querySelector('#snackPhoto');
  const snackStatus = document.querySelector('#snackStatus');
  const lunchMealForm = document.querySelector('#lunchMealForm');
  const lunchStudent = document.querySelector('#lunchStudent');
  const lunchPrice = document.querySelector('#lunchPrice');
  const lunchCalories = document.querySelector('#lunchCalories');
  const lunchProtein = document.querySelector('#lunchProtein');
  const lunchPhoto = document.querySelector('#lunchPhoto');
  const lunchStatus = document.querySelector('#lunchStatus');
  const variousSalesForm = document.querySelector('#variousSalesForm');
  const variousSalesStudent = document.querySelector('#variousSalesStudent');
  const variousSalesProduct = document.querySelector('#variousSalesProduct');
  const variousSalesQty = document.querySelector('#variousSalesQty');
  const variousSalesTotal = document.querySelector('#variousSalesTotal');
  const variousSalesStatus = document.querySelector('#variousSalesStatus');
  const productForm = document.querySelector('#productForm');
  const productIdInput = document.querySelector('#productId');
  const productNameInput = document.querySelector('#productName');
  const productPriceInput = document.querySelector('#productPrice');
  const saveProductButton = document.querySelector('#saveProductButton');
  const clearProductFormButton = document.querySelector('#clearProductForm');
  const productStatus = document.querySelector('#productStatus');
  const productsTableContainer = document.querySelector('#productsTableContainer');
  const saveNutritionSummaryButton = document.querySelector('#saveNutritionSummaryButton');
  const saveNutritionSummaryStatus = document.querySelector('#saveNutritionSummaryStatus');
  const nutritionCarePanel = document.querySelector('#nutritionCarePanel');
  const nutritionCareForm = document.querySelector('#nutritionCareForm');
  const nutritionCareStudent = document.querySelector('#nutritionCareStudent');
  const nutritionCareDate = document.querySelector('#nutritionCareDate');
  const nutritionCareState = document.querySelector('#nutritionCareState');
  const nutritionCareAssessment = document.querySelector('#nutritionCareAssessment');
  const nutritionCarePlan = document.querySelector('#nutritionCarePlan');
  const nutritionCareStatus = document.querySelector('#nutritionCareStatus');
  const nutritionCareLoadRecords = document.querySelector('#nutritionCareLoadRecords');
  const nutritionDateSummary = document.querySelector('#nutritionDateSummary');
  const nutritionCareRecords = document.querySelector('#nutritionCareRecords');
  const nutritionCareRecordsHead = document.querySelector('#nutritionCareRecordsHead');
  const nutritionCareWeight = document.querySelector('#nutritionCareWeight');
  const nutritionCareHeight = document.querySelector('#nutritionCareHeight');
  const nutritionCareBMI = document.querySelector('#nutritionCareBMI');
  const nutritionCareBloodPressure = document.querySelector('#nutritionCareBloodPressure');
  const nutritionCareNextDate = document.querySelector('#nutritionCareNextDate');
  let scanStream = null;
  let scanTimer = null;
  let editingUserSAP = null;

  const panelTitles = {
    consumo: 'Mi Consumo',
    wallet: 'NutriWallet',
    products: 'Productos',
    coins: 'EightCoins',
    ranking: 'Ranking',
    sap: 'Perfil SAP',
    users: 'Usuarios',
    snack: 'Comida Media Mañana',
    lunchMeal: 'Lunch',
    variousSales: 'Ventas Varias',
    settings: 'Configuracion',
    camera: 'Escanear',
    history: 'Historial completo',
    rewards: 'Recompensas',
    calendar: 'Calendario',
    language: 'Idioma'
  };

  const rolePanelPermissions = {
    student: ['consumo', 'wallet', 'coins', 'ranking', 'sap', 'camera', 'rewards', 'calendar', 'language', 'history'],
    parent: ['wallet', 'sap', 'calendar', 'language', 'users', 'history'],
    bar: ['wallet', 'products', 'snack', 'lunchMeal', 'variousSales', 'camera', 'history', 'language'],
    nutrition: ['ranking', 'sap', 'calendar', 'settings', 'users', 'language'],
    admin: ['users', 'settings', 'history']
  };

  const roleDefaultPanel = {
    student: 'consumo',
    parent: 'wallet',
    bar: 'wallet',
    nutrition: 'ranking',
    admin: 'users'
  };

  const rolePanelHints = {
    consumo: {
      student: 'Controla tu consumo diario, lunch y progreso nutricional.',
      parent: 'Revisa el consumo y el estado nutricional de tu hijo.',
      bar: 'Consulta las ventas y productos populares del día.',
      nutrition: 'Analiza tendencias de consumo y alertas nutricionales.'
    },
    wallet: {
      student: 'Consulta tu saldo y movimientos de NutriWallet.',
      parent: 'Revisa el saldo y recargas de tu hijo.',
      bar: 'Administra las recargas y ventas del bar escolar.',
      nutrition: 'Monitorea pagos y costos del programa nutricional.'
    },
    users: {
      student: 'Consulta otros usuarios registrados en la plataforma.',
      parent: 'Consulta perfiles de estudiantes y familias vinculadas.',
      bar: 'Gestiona usuarios del bar y personal autorizado.',
      nutrition: 'Consulta y selecciona estudiantes activos para registrar atenciones nutricionales con seguimiento por fecha.',
      admin: 'Administra usuarios del sistema, roles y estado activo.'
    }
  };

  const storageKeys = {
    session: 'nutriscanSession',
    userRole: 'userRole',
    studentName: 'studentName',
    studentSAP: 'studentSAP',
    studentCourse: 'studentCourse',
    studentAllergies: 'studentAllergies',
    dashboardPanel: 'dashboardPanel',
    settings: 'nutriScanSettings',
    lastScanCode: 'lastScanCode',
    lastScanSource: 'lastScanSource',
    lastScanAt: 'lastScanAt',
    lastLunchPhoto: 'lastLunchPhoto'
  };

  const appStateKeys = {
    session: 'session.current'
  };

  let currentLanguage = localStorage.getItem('language') || 'es';

  const i18n = {
    es: {
      htmlLang: 'es',
      navInicio: 'Inicio',
      navBeneficios: 'Beneficios',
      navEquipo: 'Equipo',
      navContacto: 'Contacto',
      navLogin: 'Iniciar sesion',
      navRegister: 'Registrarse',
      heroLogin: 'Iniciar sesion',
      heroRegister: 'Crear cuenta',
      loginTitle: 'Iniciar sesion',
      loginSap: 'Codigo SAP',
      loginRole: 'Rol',
      loginEnter: 'Entrar',
      loginCreate: 'Crear cuenta',
      registerTitle: 'Crear cuenta',
      registerName: 'Nombre',
      registerSap: 'Codigo SAP',
      registerRole: 'Rol',
      registerCourse: 'Curso',
      registerAllergies: 'Alergias',
      registerSubmit: 'Registrar y entrar',
      registerHave: 'Ya tengo cuenta',
      usersTitle: 'Usuarios registrados',
      usersFilterRole: 'Filtrar por rol',
      usersRefresh: 'Actualizar lista',
      usersClear: 'Borrar todos los usuarios',
      walletRechargeTitle: 'Recargar saldo del hijo',
      walletRechargeAmount: 'Monto (USD)',
      walletRechargeButton: 'Recargar saldo',
      languageTitle: 'Cambiar idioma',
      languageDesc: 'Selecciona el idioma de la interfaz.',
      languageEs: 'Espanol',
      languageEn: 'English',
      settingsNotify: 'Notificaciones',
      settingsLanguage: 'Idioma',
      settingsSave: 'Guardar configuracion',
      settingsCalendar: 'Ver calendario',
      sidebarConsumo: 'Mi Consumo',
      sidebarWallet: 'NutriWallet',
      sidebarVariousSales: 'Ventas Varias',
      sidebarCoins: 'EightCoins',
      sidebarRanking: 'Ranking',
      sidebarSap: 'Perfil SAP',
      sidebarUsers: 'Usuarios',
      sidebarSettings: 'Configuracion',
      sidebarLogout: 'Cerrar sesion',
      toolbarScan: 'Escanear',
      toolbarLanguage: 'Cambiar idioma',
      languageChanged: 'Idioma cambiado a espanol.'
    },
    en: {
      htmlLang: 'en',
      navInicio: 'Home',
      navBeneficios: 'Benefits',
      navEquipo: 'Team',
      navContacto: 'Contact',
      navLogin: 'Sign in',
      navRegister: 'Sign up',
      heroLogin: 'Sign in',
      heroRegister: 'Create account',
      loginTitle: 'Sign in',
      loginSap: 'SAP Code',
      loginRole: 'Role',
      loginEnter: 'Enter',
      loginCreate: 'Create account',
      registerTitle: 'Create account',
      registerName: 'Name',
      registerSap: 'SAP Code',
      registerRole: 'Role',
      registerCourse: 'Course',
      registerAllergies: 'Allergies',
      registerSubmit: 'Register and sign in',
      registerHave: 'I already have an account',
      usersTitle: 'Registered users',
      usersFilterRole: 'Filter by role',
      usersRefresh: 'Refresh list',
      usersClear: 'Delete all users',
      walletRechargeTitle: 'Recharge child balance',
      walletRechargeAmount: 'Amount (USD)',
      walletRechargeButton: 'Recharge balance',
      languageTitle: 'Change language',
      languageDesc: 'Select the interface language.',
      languageEs: 'Spanish',
      languageEn: 'English',
      settingsNotify: 'Notifications',
      settingsLanguage: 'Language',
      settingsSave: 'Save settings',
      settingsCalendar: 'View calendar',
      sidebarConsumo: 'My Intake',
      sidebarWallet: 'NutriWallet',
      sidebarVariousSales: 'Various Sales',
      sidebarCoins: 'EightCoins',
      sidebarRanking: 'Ranking',
      sidebarSap: 'SAP Profile',
      sidebarUsers: 'Users',
      sidebarSettings: 'Settings',
      sidebarLogout: 'Log out',
      toolbarScan: 'Scan',
      toolbarLanguage: 'Change language',
      languageChanged: 'Language changed to English.'
    }
  };

  function applyLanguage(lang) {
    const next = i18n[lang] ? lang : 'es';
    currentLanguage = next;
    localStorage.setItem('language', next);
    const tr = i18n[next];
    document.documentElement.lang = tr.htmlLang;

    const setText = (selector, value) => {
      const el = document.querySelector(selector);
      if (el && typeof value === 'string') el.textContent = value;
    };

    const setLabel = (selector, value) => {
      const el = document.querySelector(selector);
      if (!el || typeof value !== 'string') return;
      const textNode = Array.from(el.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
      if (textNode) {
        textNode.nodeValue = `${value} `;
      } else {
        el.insertBefore(document.createTextNode(`${value} `), el.firstChild);
      }
    };

    setText('.main-nav a[data-route="inicio"]', tr.navInicio);
    setText('.main-nav a[data-route="beneficios"]', tr.navBeneficios);
    setText('.main-nav a[data-route="equipo"]', tr.navEquipo);
    setText('.main-nav a[data-route="contacto"]', tr.navContacto);
    setText('.main-nav button[data-route="login"]', tr.navLogin);
    setText('.main-nav button[data-route="registro"]', tr.navRegister);
    setText('#heroLoginButton', tr.heroLogin);
    setText('#heroRegisterButton', tr.heroRegister);

    setText('#loginForm h2', tr.loginTitle);
    setLabel('#loginForm label:nth-of-type(1)', tr.loginSap);
    setLabel('#loginForm label:nth-of-type(2)', tr.loginRole);
    setText('#loginForm button[type="submit"]', tr.loginEnter);
    setText('#loginForm button[data-route="registro"]', tr.loginCreate);

    setText('#registerForm h2', tr.registerTitle);
    setLabel('#registerForm label:nth-of-type(1)', tr.registerName);
    setLabel('#registerForm label:nth-of-type(2)', tr.registerSap);
    setLabel('#registerForm label:nth-of-type(3)', tr.registerRole);
    setLabel('#registerForm label:nth-of-type(4)', tr.registerCourse);
    setLabel('#registerForm label:nth-of-type(5)', tr.registerAllergies);
    setText('#registerForm button[type="submit"]', tr.registerSubmit);
    setText('#registerForm button[data-route="login"]', tr.registerHave);

    setText('.sidebar button[data-panel="consumo"]', tr.sidebarConsumo);
    setText('.sidebar button[data-panel="wallet"]', tr.sidebarWallet);
    setText('.sidebar button[data-panel="variousSales"]', tr.sidebarVariousSales);
    setText('.sidebar button[data-panel="coins"]', tr.sidebarCoins);
    setText('.sidebar button[data-panel="ranking"]', tr.sidebarRanking);
    setText('.sidebar button[data-panel="sap"]', tr.sidebarSap);
    setText('.sidebar button[data-panel="users"]', tr.sidebarUsers);
    setText('.sidebar button[data-panel="settings"]', tr.sidebarSettings);
    const langRole = localStorage.getItem(storageKeys.userRole) || 'student';
    if (langRole === 'nutrition') {
      setText('.sidebar button[data-panel="users"]', 'Estudiantes');
      setText('[data-panel-view="users"] .panel-head h3', 'Estudiantes activos');
    }
    setText('.sidebar button[data-action="logout"]', tr.sidebarLogout);
    setText('.toolbar button[data-panel="camera"]', tr.toolbarScan);
    setText('.toolbar button[data-panel="language"]', tr.toolbarLanguage);

    setText('[data-panel-view="users"] .panel-head h3', tr.usersTitle);
    setLabel('[data-panel-view="users"] .user-actions label', tr.usersFilterRole);
    setText('#refreshUsers', tr.usersRefresh);
    setText('#clearUsers', tr.usersClear);

    setText('#parentRecharge h4', tr.walletRechargeTitle);
    setLabel('#parentRecharge label', tr.walletRechargeAmount);
    setText('#rechargeButton', tr.walletRechargeButton);

    setText('[data-panel-view="language"] h3', tr.languageTitle);
    setText('[data-panel-view="language"] p', tr.languageDesc);
    setText('[data-panel-view="language"] button[data-language="es"]', tr.languageEs);
    setText('[data-panel-view="language"] button[data-language="en"]', tr.languageEn);

    setLabel('#settingsForm label:nth-of-type(1)', tr.settingsNotify);
    setLabel('#settingsForm label:nth-of-type(2)', tr.settingsLanguage);
    setText('#settingsForm button[type="submit"]', tr.settingsSave);
    setText('#settingsForm button[data-panel="calendar"]', tr.settingsCalendar);

    if (languageStatus) languageStatus.textContent = tr.languageChanged;

    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    updateSettingsUiByRole(currentRole);
  }

  function updateSettingsUiByRole(role) {
    const settingsNavButton = document.querySelector('.sidebar button[data-panel="settings"]');
    const toolbarScanButton = document.querySelector('.toolbar button[data-panel="camera"]');
    const toolbarLanguageButton = document.querySelector('.toolbar button[data-panel="language"]');
    const isAdmin = role === 'admin';

    if (settingsNavButton) {
      settingsNavButton.textContent = isAdmin ? 'Reporte' : (i18n[currentLanguage]?.sidebarSettings || 'Configuracion');
    }

    if (settingsForm) {
      settingsForm.hidden = isAdmin;
      settingsForm.style.display = isAdmin ? 'none' : '';
    }
    if (adminReportPanel) adminReportPanel.hidden = !isAdmin;
    if (settingsLanguageLabel) settingsLanguageLabel.hidden = isAdmin;
    if (settingsCalendarButton) settingsCalendarButton.hidden = isAdmin;

    if (toolbarScanButton) {
      const allowScan = (rolePanelPermissions[role] || rolePanelPermissions.student).includes('camera');
      const hideScan = isAdmin || !allowScan;
      toolbarScanButton.hidden = hideScan;
      toolbarScanButton.disabled = hideScan;
      toolbarScanButton.style.display = hideScan ? 'none' : '';
    }

    if (toolbarLanguageButton) {
      const allowLanguage = (rolePanelPermissions[role] || rolePanelPermissions.student).includes('language');
      const hideLanguage = isAdmin || !allowLanguage;
      toolbarLanguageButton.hidden = hideLanguage;
      toolbarLanguageButton.disabled = hideLanguage;
      toolbarLanguageButton.style.display = hideLanguage ? 'none' : '';
    }
  }

  let userCache = [];
  let productCache = [];
  let weeklyRankingCache = { at: 0, rows: [] };
  const API_BASE = window.NUTRISCAN_API_BASE || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:3000' : '');
  const USE_LOCAL_FALLBACK = !window.NUTRISCAN_API_BASE && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  const LOCAL_DB_KEY = 'nutriscanLocalData';

  const localDb = loadLocalDb();

  function loadLocalDb() {
    let stored = {};
    try {
      stored = JSON.parse(localStorage.getItem(LOCAL_DB_KEY) || '{}');
    } catch (error) {
      stored = {};
    }
    stored.users = Array.isArray(stored.users) ? stored.users : [];
    stored.products = Array.isArray(stored.products) ? stored.products : [];
    stored.nutritionHistory = Array.isArray(stored.nutritionHistory) ? stored.nutritionHistory : [];
    stored.nutritionCare = Array.isArray(stored.nutritionCare) ? stored.nutritionCare : [];
    stored.state = stored.state && typeof stored.state === 'object' ? stored.state : {};

    if (!stored.users.length) {
      const now = new Date().toISOString();
      stored.users = [
        {
          id: 'user-1',
          sap: '1234',
          name: 'David Núñez',
          role: 'student',
          course: '1 BGU A',
          allergies: 'Ninguna registrada',
          childSap: [],
          walletBalance: 90,
          waterToday: 3,
          healthyToday: 2,
          transactions: [],
          active: true,
          createdAt: now,
          updatedAt: now
        },
        {
          id: 'user-2',
          sap: '4321',
          name: 'Mamá Núñez',
          role: 'parent',
          course: '',
          allergies: '',
          childSap: ['1234'],
          walletBalance: 0,
          waterToday: 0,
          healthyToday: 0,
          transactions: [],
          active: true,
          createdAt: now,
          updatedAt: now
        }
      ];
    }

    if (!stored.products.length) {
      const now = new Date().toISOString();
      stored.products = [
        { id: 'prod-1', name: 'Sándwich saludable', price: 2.5, active: true, createdAt: now, updatedAt: now },
        { id: 'prod-2', name: 'Ensalada de fruta', price: 1.8, active: true, createdAt: now, updatedAt: now },
        { id: 'prod-3', name: 'Yogur con granola', price: 1.2, active: true, createdAt: now, updatedAt: now }
      ];
    }

    saveLocalDb(stored);
    return stored;
  }

  function saveLocalDb(data = localDb) {
    localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(data));
  }

  function createLocalId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }

  async function apiRequest(endpoint, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    const url = `${API_BASE}${endpoint}`;
    const shouldUseLocal = USE_LOCAL_FALLBACK || !API_BASE;

    if (shouldUseLocal && endpoint.startsWith('/api')) {
      return await localApiRequest(endpoint, options);
    }

    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        if (response.status === 404) {
          return await localApiRequest(endpoint, options);
        }
        const message = result && result.error ? result.error : response.statusText || 'API error';
        throw new Error(message);
      }
      return result;
    } catch (error) {
      if (!API_BASE) {
        return await localApiRequest(endpoint, options);
      }
      if (endpoint.startsWith('/api')) {
        return await localApiRequest(endpoint, options);
      }
      throw error;
    }
  }

  function parseEndpoint(endpoint) {
    const [path, queryString] = endpoint.split('?');
    return { path: path.replace(/\/+$|^\/+/g, ''), params: new URLSearchParams(queryString || '') };
  }

  function serializeUser(user) {
    return {
      id: user.id,
      sap: String(user.sap || '').trim(),
      name: String(user.name || '').trim(),
      role: String(user.role || '').trim(),
      course: String(user.course || '').trim(),
      allergies: String(user.allergies || '').trim(),
      childSap: Array.isArray(user.childSap) ? user.childSap.map(String) : [],
      walletBalance: Number(user.walletBalance || 0),
      waterToday: Number(user.waterToday || 0),
      healthyToday: Number(user.healthyToday || 0),
      transactions: Array.isArray(user.transactions) ? user.transactions : [],
      active: typeof user.active === 'undefined' ? true : Boolean(user.active),
      createdAt: user.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  async function localApiRequest(endpoint, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    const { path, params } = parseEndpoint(endpoint);
    const body = options.body ? JSON.parse(options.body) : null;
    const now = new Date().toISOString();

    function findUser(sap) {
      return localDb.users.find((item) => String(item.sap || '').trim() === String(sap || '').trim());
    }

    function findProduct(id) {
      return localDb.products.find((item) => String(item.id || '') === String(id || ''));
    }

    switch (path) {
      case 'api/users': {
        if (method === 'GET') {
          let rows = localDb.users.slice();
          if (params.has('role')) {
            rows = rows.filter((item) => item.role === params.get('role'));
          }
          if (params.has('active')) {
            const activeValue = params.get('active');
            rows = rows.filter((item) => item.active === (activeValue === '1' || activeValue === 'true'));
          }
          return rows.map((item) => ({ ...item }));
        }
        if (method === 'POST') {
          if (!body || !body.sap) throw new Error('sap required');
          const existing = findUser(body.sap);
          const user = serializeUser({ ...existing, ...body, createdAt: existing?.createdAt || now });
          if (existing) {
            const index = localDb.users.findIndex((item) => String(item.sap) === String(body.sap));
            localDb.users[index] = user;
          } else {
            user.id = createLocalId('user');
            localDb.users.push(user);
          }
          saveLocalDb();
          return { ...user };
        }
        if (method === 'DELETE') {
          localDb.users = [];
          saveLocalDb();
          return { success: true };
        }
        break;
      }
      default:
        break;
    }

    if (/^api\/users\/.+$/i.test(path)) {
      const sap = path.replace(/^api\/users\//i, '');
      const existing = findUser(sap);
      if (method === 'GET') {
        if (!existing) throw new Error('Not found');
        return { ...existing };
      }
      if (method === 'PATCH') {
        if (!existing) throw new Error('Not found');
        const allowed = ['sap', 'name', 'role', 'course', 'allergies', 'childSap', 'walletBalance', 'waterToday', 'healthyToday', 'transactions', 'active'];
        const updated = { ...existing };
        allowed.forEach((field) => {
          if (typeof body?.[field] !== 'undefined') {
            if (field === 'childSap') updated.childSap = Array.isArray(body.childSap) ? body.childSap.map(String) : [];
            else if (field === 'walletBalance') updated.walletBalance = Number(body.walletBalance || 0);
            else if (field === 'waterToday') updated.waterToday = Number(body.waterToday || 0);
            else if (field === 'healthyToday') updated.healthyToday = Number(body.healthyToday || 0);
            else if (field === 'transactions') updated.transactions = Array.isArray(body.transactions) ? body.transactions : [];
            else if (field === 'active') updated.active = Boolean(body.active);
            else updated[field] = body[field];
          }
        });
        updated.updatedAt = now;
        const index = localDb.users.findIndex((item) => String(item.sap || '').trim() === String(sap || '').trim());
        localDb.users[index] = updated;
        saveLocalDb();
        return { ...updated };
      }
      if (method === 'DELETE') {
        if (!existing) throw new Error('Not found');
        localDb.users = localDb.users.filter((item) => String(item.sap || '').trim() !== String(sap || '').trim());
        saveLocalDb();
        return { success: true };
      }
    }

    if (path === 'api/products') {
      if (method === 'GET') {
        let rows = localDb.products.slice();
        if (params.has('active')) {
          const activeValue = params.get('active');
          rows = rows.filter((item) => item.active === (activeValue === '1' || activeValue === 'true'));
        }
        return rows.map((item) => ({ ...item }));
      }
      if (method === 'POST') {
        const product = {
          id: createLocalId('prod'),
          name: String(body?.name || '').trim(),
          price: Number(body?.price || 0),
          active: typeof body?.active === 'undefined' ? true : Boolean(body.active),
          createdAt: now,
          updatedAt: now
        };
        localDb.products.push(product);
        saveLocalDb();
        return { ...product };
      }
    }

    if (/^api\/products\/.+$/i.test(path)) {
      const id = path.replace(/^api\/products\//i, '');
      const product = findProduct(id);
      if (method === 'GET') {
        if (!product) throw new Error('Not found');
        return { ...product };
      }
      if (method === 'PATCH') {
        if (!product) throw new Error('Not found');
        const index = localDb.products.findIndex((item) => String(item.id) === id);
        const updated = { ...product, ...body, updatedAt: now };
        updated.price = Number(updated.price || 0);
        updated.active = typeof updated.active === 'undefined' ? product.active : Boolean(updated.active);
        localDb.products[index] = updated;
        saveLocalDb();
        return { ...updated };
      }
    }

    if (path === 'api/nutrition-history') {
      if (method === 'GET') {
        let rows = localDb.nutritionHistory.slice();
        if (params.has('sap')) {
          rows = rows.filter((item) => String(item.sap || '').trim() === String(params.get('sap') || '').trim());
        }
        return rows.map((item) => ({ ...item }));
      }
      if (method === 'POST') {
        const record = {
          id: createLocalId('nh'),
          sap: String(body?.sap || '').trim(),
          summaryDate: String(body?.summaryDate || getLocalSummaryDate()),
          calories: Number(body?.calories || 0),
          protein: Number(body?.protein || 0),
          healthy: Number(body?.healthy || 0),
          water: Number(body?.water || 0),
          createdAt: now
        };
        localDb.nutritionHistory.push(record);
        saveLocalDb();
        return { ...record };
      }
    }

    if (path === 'api/nutrition-care') {
      if (method === 'GET') {
        let rows = localDb.nutritionCare.slice();
        if (params.has('nutritionistSap')) {
          rows = rows.filter((item) => String(item.nutritionistSap || '').trim() === String(params.get('nutritionistSap') || '').trim());
        }
        if (params.has('studentSap')) {
          rows = rows.filter((item) => String(item.studentSap || '').trim() === String(params.get('studentSap') || '').trim());
        }
        return rows.map((item) => ({ ...item }));
      }
      if (method === 'POST') {
        const record = {
          id: createLocalId('nc'),
          nutritionistSap: String(body?.nutritionistSap || '').trim(),
          studentSap: String(body?.studentSap || '').trim(),
          attentionDate: String(body?.attentionDate || ''),
          assessment: String(body?.assessment || ''),
          plan: String(body?.plan || ''),
          status: String(body?.status || ''),
          weight: Number(body?.weight || 0),
          height: Number(body?.height || 0),
          bmi: Number(body?.bmi || 0),
          bloodPressure: String(body?.bloodPressure || ''),
          nextDate: String(body?.nextDate || ''),
          createdAt: now
        };
        localDb.nutritionCare.push(record);
        saveLocalDb();
        return { ...record };
      }
    }

    if (/^api\/state\/.+$/i.test(path)) {
      const key = path.replace(/^api\/state\//i, '');
      if (method === 'GET') {
        return { value: typeof localDb.state[key] === 'undefined' ? null : localDb.state[key] };
      }
      if (method === 'PUT') {
        localDb.state[key] = body?.value;
        saveLocalDb();
        return { value: localDb.state[key] };
      }
      if (method === 'DELETE') {
        delete localDb.state[key];
        saveLocalDb();
        return { success: true };
      }
    }

    throw new Error(`Unsupported local API endpoint: ${endpoint}`);
  }

  async function loadUsers(role = '') {
    const query = role ? `?role=${encodeURIComponent(role)}` : '';
    userCache = await apiRequest(`/api/users${query}`);
    return userCache;
  }

  async function loadUserBySAP(sap) {
    if (!sap) return null;
    try {
      const user = await apiRequest(`/api/users/${encodeURIComponent(sap)}`);
      const idx = userCache.findIndex((item) => item.sap === user.sap);
      if (idx >= 0) userCache[idx] = user;
      else userCache.push(user);
      return user;
    } catch (error) {
      return null;
    }
  }

  async function saveUser(user) {
    const saved = await apiRequest('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
    const idx = userCache.findIndex((item) => item.sap === saved.sap);
    if (idx >= 0) userCache[idx] = saved;
    else userCache.push(saved);
    return saved;
  }

  async function patchUser(sap, updates) {
    const updated = await apiRequest(`/api/users/${encodeURIComponent(sap)}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
    const idx = userCache.findIndex((item) => item.sap === sap);
    if (idx >= 0) userCache[idx] = { ...userCache[idx], ...updated };
    else userCache.push(updated);
    return updated;
  }

  async function deleteUser(sap) {
    await apiRequest(`/api/users/${encodeURIComponent(sap)}`, { method: 'DELETE' });
    userCache = userCache.filter((user) => user.sap !== String(sap).trim());
  }

  async function deleteAllUsers() {
    await apiRequest('/api/users', { method: 'DELETE' });
    userCache = [];
  }

  async function loadProducts(active = '') {
    const query = typeof active === 'string' && active !== '' ? `?active=${encodeURIComponent(active)}` : '';
    productCache = await apiRequest(`/api/products${query}`);
    return productCache;
  }

  async function getAppState(key) {
    if (!key) return null;
    try {
      const result = await apiRequest(`/api/state/${encodeURIComponent(key)}`);
      return typeof result?.value === 'undefined' ? null : result.value;
    } catch (error) {
      return null;
    }
  }

  async function setAppState(key, value) {
    if (!key) return;
    try {
      await apiRequest(`/api/state/${encodeURIComponent(key)}`, {
        method: 'PUT',
        body: JSON.stringify({ value })
      });
    } catch (error) {
      // Optional persistence: ignore if unavailable.
    }
  }

  async function clearAppState(key) {
    if (!key) return;
    try {
      await apiRequest(`/api/state/${encodeURIComponent(key)}`, { method: 'DELETE' });
    } catch (error) {
      // Optional persistence: ignore if unavailable.
    }
  }

  async function createProduct(payload) {
    const created = await apiRequest('/api/products', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    await loadProducts();
    return created;
  }

  async function updateProduct(id, updates) {
    const updated = await apiRequest(`/api/products/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
    await loadProducts();
    return updated;
  }

  async function loadNutritionHistory(sap) {
    const cleanSap = String(sap || '').trim();
    if (!cleanSap) return [];
    return apiRequest(`/api/nutrition-history?sap=${encodeURIComponent(cleanSap)}`);
  }

  async function createNutritionHistory(payload) {
    return apiRequest('/api/nutrition-history', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async function loadNutritionCareRecords(options = {}) {
    const params = new URLSearchParams();
    if (options.nutritionistSap) params.set('nutritionistSap', String(options.nutritionistSap).trim());
    if (options.studentSap) params.set('studentSap', String(options.studentSap).trim());
    const query = params.toString();
    return apiRequest(`/api/nutrition-care${query ? `?${query}` : ''}`);
  }

  async function createNutritionCareRecord(payload) {
    return apiRequest('/api/nutrition-care', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  function getProducts() {
    return Array.isArray(productCache) ? productCache : [];
  }

  function resetProductForm() {
    if (!productForm) return;
    productForm.reset();
    if (productIdInput) productIdInput.value = '';
    if (saveProductButton) saveProductButton.textContent = 'Guardar producto';
  }

  function renderProducts() {
    if (!productsTableContainer) return;
    const products = getProducts();
    if (!products.length) {
      productsTableContainer.innerHTML = '<p>No hay productos creados.</p>';
      return;
    }
    const rows = products.map((product) => {
      const status = product.active ? 'Activo' : 'Inactivo';
      return `<tr>
        <td>${product.name}</td>
        <td>$${formatCurrency(product.price)}</td>
        <td>${status}</td>
        <td>${product.updatedAt ? new Date(product.updatedAt).toLocaleString() : '-'}</td>
        <td>
          <button type="button" class="button secondary" data-action="edit-product" data-id="${product.id}">Editar</button>
          <button type="button" class="button ${product.active ? 'danger' : 'primary'}" data-action="toggle-product" data-id="${product.id}" data-active="${product.active ? '1' : '0'}">${product.active ? 'Desactivar' : 'Activar'}</button>
        </td>
      </tr>`;
    }).join('');
    productsTableContainer.innerHTML = `
      <table class="tx-table">
        <thead><tr><th>Producto</th><th>Precio</th><th>Estado</th><th>Actualizado</th><th>Acciones</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function getSavedSettings() {
    try {
      return JSON.parse(localStorage.getItem(storageKeys.settings) || '{}');
    } catch (error) {
      return {};
    }
  }

  function restoreSettings() {
    const saved = getSavedSettings();
    if (!settingsForm) return;
    if (saved.notify) settingsForm.querySelector('[name="notify"]').value = saved.notify;
    if (saved.language) settingsForm.querySelector('[name="language"]').value = saved.language;
  }

  function getUsers() {
    return Array.isArray(userCache) ? userCache : [];
  }

  function saveUsers(users) {
    userCache = Array.isArray(users) ? users : [];
  }

  async function clearAllUsers() {
    if (!confirm('¿Estás seguro? Esto eliminará todos los usuarios y cerrará la sesión actual.')) return;
    try {
      await deleteAllUsers();
      logout();
      const userPanelNote = document.querySelector('#userPanelNote');
      if (userPanelNote) userPanelNote.textContent = 'Todos los usuarios han sido eliminados. Crea nuevos registros para comenzar.';
      renderUserList();
    } catch (error) {
      alert('No se pudo eliminar todos los usuarios: ' + error.message);
    }
  }

  function findUserBySAP(sap) {
    return getUsers().find((user) => user.sap === String(sap).trim());
  }

  function getStudentNameBySap(sap) {
    const student = findUserBySAP(sap);
    return student ? student.name : '';
  }

  function normalizeChildSap(childSap) {
    if (!childSap) return [];
    if (Array.isArray(childSap)) {
      return childSap.map((sap) => String(sap).trim()).filter(Boolean);
    }
    return String(childSap)
      .split(',')
      .map((sap) => sap.trim())
      .filter(Boolean);
  }

  function getUserBalance(sap) {
    const user = findUserBySAP(sap);
    return user ? Number(user.walletBalance || 0) : 0;
  }

  function setUserBalance(sap, amount) {
    if (!sap) return false;
    const num = Number(amount || 0);
    const users = getUsers();
    const index = users.findIndex((user) => user.sap === String(sap).trim());
    if (index < 0) return false;
    const entry = users[index];
    entry.walletBalance = isNaN(num) ? 0 : num;
    entry.updatedAt = new Date().toISOString();
    saveUsers(users);
    patchUser(sap, { walletBalance: entry.walletBalance }).catch(() => {});
    return true;
  }

  function addTransaction(sap, tx) {
    if (!sap) return false;
    const users = getUsers();
    const idx = users.findIndex((u) => u.sap === String(sap).trim());
    if (idx < 0) return false;
    const entry = users[idx];
    if (!Array.isArray(entry.transactions)) entry.transactions = [];
    const prev = typeof tx.prevBalance !== 'undefined' ? Number(tx.prevBalance) : Number(entry.walletBalance || 0);
    const bal = typeof tx.balance !== 'undefined' ? Number(tx.balance) : Number(entry.walletBalance || 0);
    entry.transactions.unshift({
      type: tx.type || 'unknown',
      amount: Number(tx.amount || 0),
      at: new Date().toISOString(),
      prevBalance: prev,
      balance: bal,
      meta: tx.meta || {}
    });
    entry.updatedAt = new Date().toISOString();
    saveUsers(users);
    patchUser(sap, { transactions: entry.transactions, walletBalance: entry.walletBalance }).catch(() => {});
    return true;
  }

  function getRecentRecharges(sap, limit = 5) {
    const user = findUserBySAP(sap);
    if (!user) return [];
    const txs = Array.isArray(user.transactions) ? user.transactions : [];
    return txs.filter((t) => t.type === 'recharge').slice(0, limit);
  }

  function getRechargeTransactions(sap) {
    const user = findUserBySAP(sap);
    if (!user) return [];
    const txs = Array.isArray(user.transactions) ? user.transactions : [];
    return txs.filter((t) => t.type === 'recharge');
  }

  function getMealTransactions(sap) {
    const user = findUserBySAP(sap);
    if (!user) return [];
    const txs = Array.isArray(user.transactions) ? user.transactions : [];
    return txs
      .filter((t) => t.type === 'purchase')
      .map((t) => {
        const mealType = t.meta && t.meta.mealType ? t.meta.mealType : 'consumo';
        const label = mealType === 'media_manana'
          ? 'Comida Media Mañana'
          : mealType === 'lunch'
            ? 'Lunch'
            : mealType === 'venta_varia'
              ? `Venta varia - ${t.meta?.productName || 'Producto'}`
              : 'Consumo';
        return {
          label,
          at: t.at || '',
          amount: Number(t.amount || 0)
        };
      });
  }

  function renderMealHistory(items) {
    if (!items.length) return '<p>No hay comidas registradas aún.</p>';
    const rows = items
      .sort((a, b) => {
        const aTime = a.at ? new Date(a.at).getTime() : 0;
        const bTime = b.at ? new Date(b.at).getTime() : 0;
        return bTime - aTime;
      })
      .map((item) => {
        const date = item.at ? new Date(item.at).toLocaleString() : '-';
        return `<tr><td>${date}</td><td>${item.label}</td><td>$${formatCurrency(item.amount)}</td></tr>`;
      })
      .join('');
    return `
      <table class="tx-table">
        <thead><tr><th>Fecha</th><th>Comida</th><th>Precio</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function getStudentsForBar() {
    return getUsers().filter((user) => user.role === 'student' && user.active !== false);
  }

  function isSameLocalDay(isoDate, referenceDate = new Date()) {
    if (!isoDate) return false;
    const value = new Date(isoDate);
    if (Number.isNaN(value.getTime())) return false;
    return value.getFullYear() === referenceDate.getFullYear()
      && value.getMonth() === referenceDate.getMonth()
      && value.getDate() === referenceDate.getDate();
  }

  function estimateMealNutrition(options = {}) {
    const mealType = String(options.mealType || 'meal');
    const amount = Number(options.amount || 0);
    const photoName = String(options.photoName || '').toLowerCase();
    const base = mealType === 'lunch'
      ? { kcalPerUsd: 180, proteinPerUsd: 8, minKcal: 280, minProtein: 10 }
      : { kcalPerUsd: 140, proteinPerUsd: 5, minKcal: 180, minProtein: 6 };
    const seed = photoName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 35;
    const proteinBoost = /(pollo|huevo|atun|carne|queso|yogur|milk|protein)/.test(photoName) ? 4 : 0;
    const calories = Math.round(Math.max(base.minKcal, (amount * base.kcalPerUsd) + seed));
    const protein = Math.round(Math.max(base.minProtein, (amount * base.proteinPerUsd) + proteinBoost + (seed % 5)));
    return { calories, protein };
  }

  function getTodayMealSummary(sap, mealType) {
    const user = findUserBySAP(sap);
    if (!user) {
      return { count: 0, amount: 0, calories: 0, protein: 0, lastAt: '', lastPhotoName: '' };
    }
    const txs = Array.isArray(user.transactions) ? user.transactions : [];
    return txs.reduce((acc, tx) => {
      const isPurchase = tx.type === 'purchase';
      const sameMeal = (tx.meta && tx.meta.mealType) === mealType;
      if (!isPurchase || !sameMeal || !isSameLocalDay(tx.at)) return acc;
      acc.count += 1;
      acc.amount += Number(tx.amount || 0);
      acc.calories += Number(tx.meta?.calories || 0);
      acc.protein += Number(tx.meta?.protein || 0);
      acc.lastAt = tx.at || acc.lastAt;
      acc.lastPhotoName = tx.meta?.photoName || acc.lastPhotoName;
      return acc;
    }, { count: 0, amount: 0, calories: 0, protein: 0, lastAt: '', lastPhotoName: '' });
  }

  function renderStudentConsumptionWallets(studentSap) {
    const container = document.querySelector('#consumoWallets');
    if (!container) return;
    const lunchCard = container.querySelector('[data-consumo-wallet="lunch"]');
    const snackCard = container.querySelector('[data-consumo-wallet="media_manana"]');
    let healthyCard = container.querySelector('[data-consumo-wallet="healthy"]');
    if (!healthyCard) {
      healthyCard = document.createElement('article');
      healthyCard.className = 'card wallet-card';
      healthyCard.setAttribute('data-consumo-wallet', 'healthy');
      container.appendChild(healthyCard);
    }
    const lunchSummary = getTodayMealSummary(studentSap, 'lunch');
    const snackSummary = getTodayMealSummary(studentSap, 'media_manana');
    const student = findUserBySAP(studentSap) || {};
    const healthyToday = clampHealthyPortions(typeof student.healthyToday === 'number' ? student.healthyToday : 0);
    const toCardHtml = (title, summary, emptyText) => {
      const hasData = summary.count > 0;
      const metaText = hasData && summary.lastPhotoName
        ? `Último registro: ${new Date(summary.lastAt).toLocaleTimeString()} · Foto: ${summary.lastPhotoName}`
        : (hasData ? `Registros de hoy: ${summary.count}` : emptyText);
      return `
        <strong>${title}</strong>
        <b>$${formatCurrency(summary.amount)}</b>
        <p>${metaText}</p>
        <div class="wallet-list">
          <span>Calorías: ${Math.round(summary.calories)} kcal</span>
          <span>Proteínas: ${Math.round(summary.protein)} g</span>
        </div>
      `;
    };
    if (lunchCard) {
      lunchCard.innerHTML = toCardHtml('Lunch de hoy', lunchSummary, 'Sin consumos registrados hoy.');
    }
    if (snackCard) {
      snackCard.innerHTML = toCardHtml('Comida de media mañana hoy', snackSummary, 'Sin consumos registrados hoy.');
    }
    if (healthyCard) {
      healthyCard.innerHTML = `
        <strong>Alimentos saludables de hoy</strong>
        <b>${healthyToday} / 5</b>
        <p>Suma porciones saludables manualmente como en agua.</p>
        <div class="water-actions healthy-actions">
          <button type="button" id="healthyInc">+</button>
          <button type="button" id="healthyReset">Reset</button>
        </div>
      `;
    }
  }

  function getLocalSummaryDate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function buildDailyNutritionSummaryForSap(sap) {
    const cleanSap = String(sap || '').trim();
    const user = findUserBySAP(cleanSap) || {};
    const lunchTodaySummary = cleanSap ? getTodayMealSummary(cleanSap, 'lunch') : { calories: 0, protein: 0 };
    const snackTodaySummary = cleanSap ? getTodayMealSummary(cleanSap, 'media_manana') : { calories: 0, protein: 0 };
    return {
      sap: cleanSap,
      summaryDate: getLocalSummaryDate(),
      calories: Math.round(Number(lunchTodaySummary.calories || 0) + Number(snackTodaySummary.calories || 0)),
      protein: Math.round(Number(lunchTodaySummary.protein || 0) + Number(snackTodaySummary.protein || 0)),
      healthy: clampHealthyPortions(Number(user.healthyToday || 0)),
      water: clampWaterGlasses(Number(user.waterToday || 0))
    };
  }

  function getLocalWeekStart(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const diffToMonday = (day + 6) % 7;
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - diffToMonday);
    return d;
  }

  function parseSummaryDate(value) {
    const raw = String(value || '').trim();
    if (!raw) return null;
    const parts = raw.split('-').map((n) => Number(n));
    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
    const [y, m, d] = parts;
    return new Date(y, m - 1, d);
  }

  function getWeeklyEightCoinsMetrics(historyItems) {
    const weekStart = getLocalWeekStart(new Date());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    let weeklySaves = 0;
    (Array.isArray(historyItems) ? historyItems : []).forEach((item) => {
      const dateObj = parseSummaryDate(item.summaryDate) || new Date(item.createdAt || '');
      if (Number.isNaN(dateObj.getTime())) return;
      dateObj.setHours(0, 0, 0, 0);
      if (dateObj < weekStart || dateObj > weekEnd) return;
      weeklySaves += 1;
    });
    const healthyDays = Math.min(5, weeklySaves);
    const coins = Math.min(10, healthyDays * 2);
    return { coins, healthyDays };
  }

  function getEightCoinsEvaluationMessage(coins, healthyDays) {
    if (coins >= 10 && healthyDays >= 5) return 'Felicitaciones, completaste tu meta semanal saludable.';
    if (coins >= 8 && healthyDays >= 4) return 'Excelente avance: te falta 1 dia para la meta completa.';
    if (coins >= 6 && healthyDays >= 3) return 'Muy bien: ya superaste la mitad del objetivo semanal.';
    if (coins >= 4 && healthyDays >= 2) return 'Buen progreso: mantente constante para sumar mas monedas.';
    if (coins >= 2 && healthyDays >= 1) return 'Buen inicio: sigue registrando tus dias saludables.';
    return 'Comienza hoy guardando tu primer registro saludable.';
  }

  function getNutritionQualityScore(item) {
    if (!item) return 0;
    const caloriesPct = Math.max(0, Math.min(100, Math.round((Number(item.calories || 0) / 1800) * 100)));
    const proteinPct = Math.max(0, Math.min(100, Math.round((Number(item.protein || 0) / 90) * 100)));
    const healthyPct = Math.max(0, Math.min(100, Math.round((Number(item.healthy || 0) / 5) * 100)));
    const waterPct = Math.max(0, Math.min(100, Math.round((Number(item.water || 0) / 8) * 100)));
    return Math.round((caloriesPct + proteinPct + healthyPct + waterPct) / 4);
  }

  async function getStudentsForRanking() {
    if (!getUsers().length) {
      try {
        await loadUsers();
      } catch (error) {
        return [];
      }
    }
    return getUsers().filter((u) => u.role === 'student' && u.active !== false);
  }

  async function buildWeeklyRankingRows() {
    const now = Date.now();
    if (now - Number(weeklyRankingCache.at || 0) < 15000 && Array.isArray(weeklyRankingCache.rows)) {
      return weeklyRankingCache.rows;
    }
    const students = await getStudentsForRanking();
    const rows = await Promise.all(students.map(async (student) => {
      let historyItems = [];
      try {
        historyItems = await loadNutritionHistory(student.sap);
      } catch (error) {
        historyItems = [];
      }
      const metrics = getWeeklyEightCoinsMetrics(historyItems);
      const latest = Array.isArray(historyItems) && historyItems.length ? historyItems[0] : null;
      const quality = getNutritionQualityScore(latest);
      const score = Math.round((metrics.coins * 6) + (metrics.healthyDays * 4) + (quality * 0.2));
      return {
        sap: student.sap,
        name: student.name || student.sap,
        coins: metrics.coins,
        healthyDays: metrics.healthyDays,
        quality,
        score
      };
    }));
    const sorted = rows
      .sort((a, b) => b.score - a.score || b.coins - a.coins || b.healthyDays - a.healthyDays || a.name.localeCompare(b.name));
    weeklyRankingCache = { at: now, rows: sorted };
    return sorted;
  }

  async function refreshGlobalEightCoins(cards) {
    if (!cards || cards.length < 3) return;
    try {
      const rankingRows = await buildWeeklyRankingRows();
      const totalStudents = rankingRows.length;
      const avgCoins = totalStudents
        ? Math.round((rankingRows.reduce((acc, row) => acc + Number(row.coins || 0), 0) / totalStudents) * 10) / 10
        : 0;
      const top = totalStudents ? rankingRows[0] : null;
      cards[0].querySelector('strong').textContent = 'Incentivos escolares';
      cards[0].querySelector('p').textContent = `${totalStudents} estudiantes en seguimiento semanal.`;
      cards[1].querySelector('strong').textContent = 'Promedio EightCoins';
      cards[1].querySelector('p').textContent = `${avgCoins} monedas promedio por estudiante.`;
      cards[2].querySelector('strong').textContent = 'Lider semanal';
      cards[2].querySelector('p').textContent = top
        ? `${top.name}: ${top.coins} monedas, ${top.healthyDays} dias.`
        : 'Sin registros guardados esta semana.';
    } catch (error) {
      cards[0].querySelector('strong').textContent = 'Incentivos escolares';
      cards[0].querySelector('p').textContent = 'No se pudo cargar informacion del API.';
      cards[1].querySelector('strong').textContent = 'Promedio EightCoins';
      cards[1].querySelector('p').textContent = 'Sin datos.';
      cards[2].querySelector('strong').textContent = 'Lider semanal';
      cards[2].querySelector('p').textContent = 'Sin datos.';
    }
  }

  async function refreshRankingPanel(role, user, child, list) {
    if (!list) return;
    try {
      const rankingRows = await buildWeeklyRankingRows();
      if (!rankingRows.length) {
        list.innerHTML = '<li><span>Sin datos</span><strong>Guarda resumenes para generar ranking</strong></li>';
        return;
      }
      if (role === 'student') {
        const top = rankingRows.slice(0, 5);
        const ownIndex = rankingRows.findIndex((row) => row.sap === user.sap);
        const own = ownIndex >= 0 ? rankingRows[ownIndex] : null;
        const ownRow = own && ownIndex >= top.length
          ? `<li><span>Tu posicion: #${ownIndex + 1} ${own.name}</span><strong>${own.score} pts · ${own.coins} coins</strong></li>`
          : '';
        list.innerHTML = `${top.map((row, idx) => `<li><span>#${idx + 1} ${row.name}</span><strong>${row.score} pts · ${row.coins} coins</strong></li>`).join('')}${ownRow}`;
        return;
      }
      if (role === 'parent') {
        const childRow = child ? rankingRows.find((row) => row.sap === child.sap) : null;
        const top = rankingRows.slice(0, 3);
        const childBlock = childRow
          ? `<li><span>${childRow.name} (tu hijo)</span><strong>${childRow.score} pts · ${childRow.coins} coins</strong></li>`
          : '<li><span>Tu hijo</span><strong>Sin registros semanales</strong></li>';
        list.innerHTML = `${childBlock}${top.map((row, idx) => `<li><span>Top ${idx + 1}: ${row.name}</span><strong>${row.score} pts</strong></li>`).join('')}`;
        return;
      }
      list.innerHTML = rankingRows.slice(0, 5)
        .map((row, idx) => `<li><span>#${idx + 1} ${row.name}</span><strong>${row.score} pts · ${row.coins} coins · calidad ${row.quality}%</strong></li>`)
        .join('');
    } catch (error) {
      list.innerHTML = '<li><span>Error</span><strong>No se pudo cargar ranking desde API</strong></li>';
    }
  }

  async function refreshStudentEightCoins(studentSap, cards) {
    if (!cards || cards.length < 3) return;
    try {
      const historyItems = await loadNutritionHistory(studentSap);
      const metrics = getWeeklyEightCoinsMetrics(historyItems);
      const dayWord = metrics.healthyDays === 1 ? 'dia' : 'dias';
      cards[0].querySelector('strong').textContent = 'EightCoins';
      cards[0].querySelector('p').textContent = `${metrics.coins} monedas acumuladas (maximo 10 por semana).`;
      cards[1].querySelector('strong').textContent = 'Racha';
      cards[1].querySelector('p').textContent = `${metrics.healthyDays} ${dayWord} ${metrics.healthyDays === 1 ? 'saludable' : 'saludables'} (maximo 5).`;
      cards[2].querySelector('strong').textContent = 'Evaluacion';
      cards[2].querySelector('p').textContent = getEightCoinsEvaluationMessage(metrics.coins, metrics.healthyDays);
    } catch (error) {
      cards[0].querySelector('strong').textContent = 'EightCoins';
      cards[0].querySelector('p').textContent = 'No se pudo calcular monedas.';
      cards[1].querySelector('strong').textContent = 'Racha';
      cards[1].querySelector('p').textContent = 'No se pudo calcular racha.';
      cards[2].querySelector('strong').textContent = 'Evaluacion';
      cards[2].querySelector('p').textContent = 'No se pudo cargar la evaluacion.';
    }
  }

  function getTotalSpent(sap) {
    const user = findUserBySAP(sap);
    if (!user) return 0;
    const txs = Array.isArray(user.transactions) ? user.transactions : [];
    return txs
      .filter((t) => t.type === 'purchase')
      .reduce((acc, t) => acc + Number(t.amount || 0), 0);
  }

  function fillBarStudentSelects() {
    const students = getStudentsForBar();
    [snackStudent, lunchStudent, variousSalesStudent].forEach((select) => {
      if (!select) return;
      if (!students.length) {
        select.innerHTML = '<option value="">No hay estudiantes</option>';
        select.disabled = true;
        return;
      }
      select.disabled = false;
      select.innerHTML = students
        .map((student) => `<option value="${student.sap}">${student.name} (${student.sap})</option>`)
        .join('');
    });
  }

  function fillVariousSalesProducts() {
    if (!variousSalesProduct) return;
    const activeProducts = getProducts().filter((product) => product.active);
    if (!activeProducts.length) {
      variousSalesProduct.innerHTML = '<option value="">No hay productos activos</option>';
      variousSalesProduct.disabled = true;
      updateVariousSalesTotal();
      return;
    }
    variousSalesProduct.disabled = false;
    variousSalesProduct.innerHTML = activeProducts
      .map((product) => `<option value="${product.id}" data-price="${Number(product.price || 0)}">${product.name} - $${formatCurrency(product.price)}</option>`)
      .join('');
    updateVariousSalesTotal();
  }

  function getSelectedVariousProduct() {
    const selectedId = String(variousSalesProduct?.value || '').trim();
    if (!selectedId) return null;
    return getProducts().find((product) => String(product.id) === selectedId) || null;
  }

  function updateVariousSalesTotal() {
    if (!variousSalesTotal) return;
    const qty = Math.max(1, parseInt(variousSalesQty?.value, 10) || 1);
    const idx = variousSalesProduct ? variousSalesProduct.selectedIndex : -1;
    const opt = idx >= 0 && variousSalesProduct ? variousSalesProduct.options[idx] : null;
    const price = parseFloat(opt ? (opt.getAttribute('data-price') || '0') : '0') || 0;
    variousSalesTotal.textContent = `$${formatCurrency(price * qty)}`;
  }

  function registerBarProductSale(options) {
    const studentSap = String(options.studentSap || '').trim();
    const quantity = Math.max(1, Number(options.quantity || 1));
    const product = options.product;
    if (!studentSap || !product) {
      return { ok: false, message: 'Selecciona estudiante y producto para registrar la venta.' };
    }
    const amount = Number(product.price || 0) * quantity;
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      return { ok: false, message: 'El producto seleccionado tiene un precio inválido.' };
    }
    const student = findUserBySAP(studentSap);
    if (!student || student.role !== 'student' || student.active === false) {
      return { ok: false, message: 'Selecciona un estudiante activo válido.' };
    }
    const before = Number(student.walletBalance || 0);
    if (before < amount) {
      return { ok: false, message: `Saldo insuficiente. Saldo actual: $${formatCurrency(before)}.` };
    }
    const after = before - amount;
    const barSap = localStorage.getItem(storageKeys.studentSAP) || '';
    setUserBalance(studentSap, after);
    addTransaction(studentSap, {
      type: 'purchase',
      amount,
      prevBalance: before,
      balance: after,
      meta: {
        mealType: 'venta_varia',
        by: barSap,
        productId: product.id,
        productName: product.name,
        unitPrice: Number(product.price || 0),
        quantity
      }
    });
    return {
      ok: true,
      message: `Venta registrada para ${student.name}: ${quantity} x ${product.name}. Saldo actual: $${formatCurrency(after)}.`
    };
  }

  function registerBarConsumption(options) {
    const studentSap = String(options.studentSap || '').trim();
    const amount = Number(options.amount || 0);
    const mealType = options.mealType || 'meal';
    const photoName = options.photoName || '';
    const nutrition = options.nutrition || estimateMealNutrition({ mealType, amount, photoName });
    if (!studentSap || !amount || Number.isNaN(amount) || amount <= 0) {
      return { ok: false, message: 'Selecciona estudiante y un precio valido.' };
    }
    const student = findUserBySAP(studentSap);
    if (!student) return { ok: false, message: 'No se encontro el estudiante seleccionado.' };
    const before = Number(student.walletBalance || 0);
    const after = Math.max(0, before - amount);
    const barSap = localStorage.getItem(storageKeys.studentSAP) || '';
    setUserBalance(studentSap, after);
    addTransaction(studentSap, {
      type: 'purchase',
      amount,
      prevBalance: before,
      balance: after,
      meta: {
        mealType,
        by: barSap,
        recordedAt: new Date().toISOString(),
        photoName: photoName || undefined,
        calories: Number(nutrition.calories || 0),
        protein: Number(nutrition.protein || 0)
      }
    });
    return {
      ok: true,
      message: `Consumo registrado para ${student.name}. Saldo anterior: $${before.toFixed(2)} · saldo actual: $${after.toFixed(2)} · ${Math.round(Number(nutrition.calories || 0))} kcal · ${Math.round(Number(nutrition.protein || 0))} g proteína.`
    };
  }

  function getBarOperationRows() {
    const students = getStudentsForBar();
    const rows = [];
    students.forEach((student) => {
      const txs = Array.isArray(student.transactions) ? student.transactions : [];
      txs
        .filter((tx) => tx.type === 'purchase')
        .forEach((tx) => {
          const mealType = tx.meta && tx.meta.mealType ? tx.meta.mealType : 'consumo';
          const mealLabel = mealType === 'media_manana'
            ? 'Media mañana'
            : mealType === 'lunch'
              ? 'Lunch'
              : mealType === 'venta_varia'
                ? `Venta varia (${tx.meta?.productName || 'Producto'})`
                : 'Consumo';
          rows.push({
            studentName: student.name,
            sap: student.sap,
            mealType: mealLabel,
            amount: Number(tx.amount || 0),
            at: tx.at || '',
            photoName: tx.meta && tx.meta.photoName ? tx.meta.photoName : ''
          });
        });
    });
    rows.sort((a, b) => {
      const aTime = a.at ? new Date(a.at).getTime() : 0;
      const bTime = b.at ? new Date(b.at).getTime() : 0;
      return bTime - aTime;
    });
    return rows;
  }

  function renderBarOperations() {
    const ops = getBarOperationRows();
    if (!ops.length) {
      return '<p>No hay consumos registrados todavía.</p>';
    }
    const rowsHtml = ops.map((op) => {
      const at = op.at ? new Date(op.at).toLocaleString() : '-';
      const photo = op.photoName ? op.photoName : 'Sin foto';
      return `<tr><td>${op.studentName}</td><td>${op.sap}</td><td>${op.mealType}</td><td>$${formatCurrency(op.amount)}</td><td>${at}</td><td>${photo}</td></tr>`;
    }).join('');
    return `
      <table class="tx-table">
        <thead><tr><th>Estudiante</th><th>SAP</th><th>Tipo</th><th>Valor</th><th>Fecha</th><th>Foto</th></tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  }

  function renderRechargeList(items) {
    if (!items.length) return '<p>No hay recargas registradas.</p>';
    return items.map((item) => {
      const at = item.at ? new Date(item.at).toLocaleString() : '';
      const amount = formatCurrency(item.amount || 0);
      const balance = formatCurrency(item.balance || 0);
      const meta = item.meta && Object.keys(item.meta).length ? humanizeMeta(item.meta) : '';
      return `<div class="wallet-recharge-item"><small>${at}</small><strong>$${amount}</strong><span>Saldo después: $${balance}</span>${meta ? `<em>${meta}</em>` : ''}</div>`;
    }).join('');
  }

  function getParentChildren() {
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    const currentSap = localStorage.getItem(storageKeys.studentSAP) || '';
    if (currentRole !== 'parent' || !currentSap) return [];
    const parentUser = findUserBySAP(currentSap);
    if (!parentUser) return [];
    const saps = normalizeChildSap(parentUser.childSap);
    return saps.map((sap) => findUserBySAP(sap)).filter(Boolean);
  }

  function getParentLinkableStudents() {
    return getUsersByRole('student').filter((student) => student.active !== false);
  }

  function getSelectedParentChildSap() {
    return localStorage.getItem('parentHistorySap') || localStorage.getItem('parentWalletSap') || '';
  }

  function populateParentChildControls(students, currentUser) {
    if (!parentChildControls || !parentChildSelect) return;
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    if (currentRole !== 'parent') {
      parentChildControls.hidden = true;
      return;
    }
    parentChildControls.hidden = false;
    const linkedSaps = normalizeChildSap(currentUser?.childSap);
    const selectedSap = getSelectedParentChildSap();
    if (!students.length) {
      parentChildSelect.innerHTML = '<option value="">No hay estudiantes disponibles</option>';
      parentChildSelect.disabled = true;
      return;
    }
    parentChildSelect.disabled = false;
    parentChildSelect.innerHTML = students.map((student) => {
      const isLinked = linkedSaps.includes(student.sap);
      const label = `${student.name} (${student.sap})${isLinked ? ' · Vinculado' : ''}`;
      return `<option value="${student.sap}" ${student.sap === selectedSap ? 'selected' : ''}>${label}</option>`;
    }).join('');
    if (!selectedSap && students[0]) {
      parentChildSelect.value = students[0].sap;
    }
  }

  async function linkChildToParent(childSap) {
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    const parentSap = localStorage.getItem(storageKeys.studentSAP) || '';
    const cleanChildSap = String(childSap || '').trim();
    if (currentRole !== 'parent' || !parentSap || !cleanChildSap) {
      return false;
    }
    const parentUser = findUserBySAP(parentSap) || await loadUserBySAP(parentSap);
    const childUser = findUserBySAP(cleanChildSap) || await loadUserBySAP(cleanChildSap);
    if (!parentUser) throw new Error('No se encontró la cuenta de padre actual.');
    if (!childUser || childUser.role !== 'student') throw new Error('Selecciona un estudiante válido.');
    const linkedSaps = normalizeChildSap(parentUser.childSap);
    if (!linkedSaps.includes(cleanChildSap)) linkedSaps.push(cleanChildSap);
    await patchUser(parentSap, { childSap: linkedSaps });
    localStorage.setItem('parentHistorySap', cleanChildSap);
    localStorage.setItem('parentWalletSap', cleanChildSap);
    await loadUserBySAP(parentSap);
    await renderUserList();
    renderRoleSpecificPanelContent('parent');
    renderTransactionList();
    return true;
  }

  async function unlinkChildFromParent(childSap) {
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    const parentSap = localStorage.getItem(storageKeys.studentSAP) || '';
    const cleanChildSap = String(childSap || '').trim();
    if (currentRole !== 'parent' || !parentSap || !cleanChildSap) {
      return false;
    }
    const parentUser = findUserBySAP(parentSap) || await loadUserBySAP(parentSap);
    if (!parentUser) throw new Error('No se encontró la cuenta de padre actual.');
    const linkedSaps = normalizeChildSap(parentUser.childSap).filter((sap) => sap !== cleanChildSap);
    await patchUser(parentSap, { childSap: linkedSaps });
    if (localStorage.getItem('parentHistorySap') === cleanChildSap) {
      localStorage.removeItem('parentHistorySap');
    }
    if (localStorage.getItem('parentWalletSap') === cleanChildSap) {
      localStorage.removeItem('parentWalletSap');
    }
    await loadUserBySAP(parentSap);
    await renderUserList();
    renderRoleSpecificPanelContent('parent');
    renderTransactionList();
    return true;
  }

  function getMonthlyRechargeTotal(sap, year, month) {
    const user = findUserBySAP(sap);
    if (!user) return 0;
    const txs = Array.isArray(user.transactions) ? user.transactions : [];
    const now = new Date();
    const y = typeof year === 'number' ? year : now.getFullYear();
    const m = typeof month === 'number' ? month : now.getMonth();
    return txs.reduce((acc, t) => {
      if (t.type !== 'recharge') return acc;
      const at = t.at ? new Date(t.at) : null;
      if (!at) return acc;
      if (at.getFullYear() === y && at.getMonth() === m) return acc + Number(t.amount || 0);
      return acc;
    }, 0);
  }

  function openHistoryWithFilter(filter) {
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    if (currentRole === 'parent') {
      const children = getParentChildren();
      if (!children || children.length === 0) {
        // show history panel with a message explaining there's no child linked
        setPanel('history');
        const container = document.querySelector('#transactionList');
        if (container) container.innerHTML = '<p>No hay hijos vinculados a esta cuenta. Asigna un hijo desde Usuarios para ver su historial.</p>';
        return;
      }
      // if exactly one child, set it as subject for history
      if (children.length === 1) {
        localStorage.setItem('parentHistorySap', children[0].sap);
        const sel = document.querySelector('#txFilter'); if (sel) sel.value = filter || '';
        setPanel('history');
        return;
      }
      // multiple children: set a default and open history where the selector will appear
      localStorage.setItem('parentHistorySap', children[0].sap);
      const sel = document.querySelector('#txFilter'); if (sel) sel.value = filter || '';
      setPanel('history');
      return;
    }
    const sel = document.querySelector('#txFilter');
    if (sel) sel.value = filter;
    setPanel('history');
  }

  async function addOrUpdateUser(user) {
    const normalizedChildSap = normalizeChildSap(user.childSap);
    const payload = {
      ...user,
      childSap: normalizedChildSap,
      walletBalance: typeof user.walletBalance !== 'undefined' ? Number(user.walletBalance) : 0,
      transactions: Array.isArray(user.transactions) ? user.transactions : [],
      active: typeof user.active !== 'undefined' ? Boolean(user.active) : true
    };
    const saved = await saveUser(payload);
    if (typeof populateStudentSelects === 'function') populateStudentSelects();
    return saved;
  }

  function getUsersByRole(role) {
    if (!role) return getUsers();
    return getUsers().filter((user) => user.role === role);
  }

  function getUserCounts() {
    return getUsers().reduce((counts, user) => {
      counts[user.role] = (counts[user.role] || 0) + 1;
      return counts;
    }, {});
  }

  async function initializeDemoUsers() {
    // This application now stores user data in SQLite. Demo users are no longer auto-seeded.
    return [];
  }

  function populateStudentSelects() {
    const students = getUsersByRole('student') || [];
    const registerSelect = document.querySelector('#registerChildSap');
    const editorSelect = document.querySelector('[name="editChildSap"]');
    [registerSelect, editorSelect].forEach((sel) => {
      if (!sel) return;
      sel.innerHTML = '<option value="">Selecciona uno o más estudiantes</option>';
      students.forEach((s) => {
        const opt = document.createElement('option');
        opt.value = s.sap;
        opt.textContent = `${s.name} (${s.course || s.sap})`;
        sel.appendChild(opt);
      });
      sel.disabled = students.length === 0;
    });
  }

  function findUserIndexBySAP(sap) {
    const users = getUsers();
    return users.findIndex((user) => user.sap === String(sap).trim());
  }

  async function updateUserBySAP(oldSap, updated) {
    const payload = { ...updated };
    if (updated.childSap) payload.childSap = normalizeChildSap(updated.childSap);
    const result = await patchUser(oldSap, payload);
    if (typeof populateStudentSelects === 'function') populateStudentSelects();
    return result;
  }

  async function deleteUserBySAP(sap) {
    await deleteUser(sap);
    if (typeof populateStudentSelects === 'function') populateStudentSelects();
  }

  function canManageUsers(role) {
    return ['bar', 'nutrition', 'admin'].includes(role);
  }

  function clearSessionData() {
    localStorage.removeItem(storageKeys.lastScanCode);
    localStorage.removeItem(storageKeys.lastScanSource);
    localStorage.removeItem(storageKeys.lastScanAt);
    localStorage.removeItem(storageKeys.lastLunchPhoto);
    localStorage.removeItem('lastLunchPhotoName');
    localStorage.removeItem('lastLunchPhotoAt');
  }

  function restoreScanState() {
    const lastScan = localStorage.getItem(storageKeys.lastScanCode);
    const charge = localStorage.getItem(storageKeys.lastScanAt);
    if (scanResult && lastScan) {
      scanResult.textContent = `Ultimo codigo guardado: ${lastScan} (${charge ? new Date(charge).toLocaleString() : 'fecha desconocida'})`;
    }
    const lastPhoto = localStorage.getItem(storageKeys.lastLunchPhoto);
    if (photoPreview && lastPhoto) {
      photoPreview.src = lastPhoto;
      photoPreview.hidden = false;
    }
  }

  function showRedirectNotice() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('from') === 'legacy' && redirectNotice) {
      redirectNotice.hidden = false;
      history.replaceState(null, '', window.location.pathname + window.location.hash);
    }
  }

  function isSessionActive() {
    return localStorage.getItem(storageKeys.session) === 'active';
  }

  function updateAuthRouteVisibility() {
    const active = isSessionActive();
    document.body.classList.toggle('session-active', active);
    document.querySelectorAll('.auth-public-action').forEach((element) => {
      element.hidden = active;
      if ('disabled' in element) element.disabled = active;
      if (active) element.setAttribute('aria-hidden', 'true');
      else element.removeAttribute('aria-hidden');
      if (active) {
        // Save original inline display only once to avoid persisting 'none' after repeated toggles.
        if (typeof element.dataset.prevDisplay === 'undefined') {
          element.dataset.prevDisplay = element.style.display || '';
        }
        element.style.display = 'none';
      } else {
        if (typeof element.dataset.prevDisplay === 'undefined') {
          element.style.display = '';
        } else {
          element.style.display = element.dataset.prevDisplay;
          delete element.dataset.prevDisplay;
        }
      }
    });
  }

  function restoreSession() {
    const active = localStorage.getItem(storageKeys.session);
    if (active !== 'active') return false;
    const role = localStorage.getItem(storageKeys.userRole) || 'student';
    const name = localStorage.getItem(storageKeys.studentName) || 'David Nunez';
    const sap = localStorage.getItem(storageKeys.studentSAP) || '1234';
    const course = localStorage.getItem(storageKeys.studentCourse) || '';
    const allergies = localStorage.getItem(storageKeys.studentAllergies) || '';
    const existingUser = findUserBySAP(sap);
    if (!existingUser || existingUser.active === false) {
      localStorage.removeItem(storageKeys.session);
      localStorage.removeItem(storageKeys.userRole);
      localStorage.removeItem(storageKeys.studentName);
      localStorage.removeItem(storageKeys.studentSAP);
      localStorage.removeItem(storageKeys.studentCourse);
      localStorage.removeItem(storageKeys.studentAllergies);
      return false;
    }
    if (profileName) profileName.textContent = name;
    if (profileDetails) {
      const details = [`Codigo SAP: ${sap}`];
      if (course) details.push(course);
      if (allergies) details.push(`Alergias: ${allergies}`);
      details.push(`Rol: ${role}`);
      profileDetails.textContent = details.join(' · ');
    }
    configureDashboardForRole(role);
    updateAuthRouteVisibility();
    const panel = localStorage.getItem(storageKeys.dashboardPanel) || 'consumo';
    setPanel(panel);
    return true;
  }

  async function restoreSessionFromDb() {
    const persisted = await getAppState(appStateKeys.session);
    if (!persisted || persisted.active !== true) return false;
    const sap = String(persisted.sap || '').trim();
    if (!sap) return false;
    let user = findUserBySAP(sap);
    if (!user) user = await loadUserBySAP(sap);
    if (!user || user.active === false) {
      await clearAppState(appStateKeys.session);
      return false;
    }
    localStorage.setItem(storageKeys.session, 'active');
    localStorage.setItem(storageKeys.userRole, user.role || persisted.role || 'student');
    localStorage.setItem(storageKeys.studentName, user.name || persisted.name || 'David Nunez');
    localStorage.setItem(storageKeys.studentSAP, user.sap || sap);
    if (user.course || persisted.course) localStorage.setItem(storageKeys.studentCourse, user.course || persisted.course || '');
    else localStorage.removeItem(storageKeys.studentCourse);
    if (user.allergies || persisted.allergies) localStorage.setItem(storageKeys.studentAllergies, user.allergies || persisted.allergies || '');
    else localStorage.removeItem(storageKeys.studentAllergies);
    return restoreSession();
  }

  function setMenu(open) {
    if (!menuButton || !mainNav) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menu' : 'Abrir menu');
    mainNav.classList.toggle('open', open);
  }

  function routeTo(name) {
    const target = name || 'inicio';
    if (isSessionActive() && (target === 'login' || target === 'registro')) {
      setPanel(localStorage.getItem(storageKeys.dashboardPanel) || 'consumo');
      return;
    }
    views.forEach((view) => view.classList.toggle('is-active', view.dataset.view === target));
    window.location.hash = target;
    setMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Clear contact form when opening the Contact view
    if (target === 'contacto' && contactForm) {
      try {
        contactForm.reset();
        if (contactStatus) contactStatus.textContent = '';
        const first = contactForm.querySelector('[name="nombre"]');
        if (first) first.focus();
      } catch (e) {
        // ignore
      }
    }
    // Clear login SAP and helpers when opening the Login view
    if (target === 'login' && loginForm) {
      try {
        loginForm.reset();
        if (loginStatus) loginStatus.textContent = '';
        if (loginNote) loginNote.textContent = '';
        if (loginRoleSelect) loginRoleSelect.disabled = false;
        if (loginSapInput) {
          loginSapInput.value = '';
          loginSapInput.focus();
        }
      } catch (e) {
        // ignore
      }
    }
    // Clear registration form when opening the Registro view
    if (target === 'registro' && registerForm) {
      try {
        registerForm.reset();
        if (registerStatus) registerStatus.textContent = '';
        const first = registerForm.querySelector('[name="name"]');
        if (first) first.focus();
      } catch (e) {
        // ignore
      }
    }
  }

  function setPanel(name) {
    let panel = name || 'consumo';
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    const allowedPanels = rolePanelPermissions[currentRole] || rolePanelPermissions.student;
    if (!allowedPanels.includes(panel)) {
      panel = allowedPanels[0];
    }
    document.querySelectorAll('[data-panel-view]').forEach((view) => {
      view.classList.toggle('is-active', view.dataset.panelView === panel);
    });
    document.querySelectorAll('[data-panel]').forEach((button) => {
      button.classList.toggle('active', button.dataset.panel === panel);
    });
    if (panelTitle) {
      const defaultTitle = panel === 'users' && currentRole === 'nutrition'
        ? 'Estudiantes'
        : panelTitles[panel] || 'Dashboard';
      panelTitle.textContent = currentRole === 'admin' && panel === 'settings' ? 'Reporte' : defaultTitle;
    }
    updateDashboardHint(currentRole, panel);
    renderRoleSpecificPanelContent(currentRole);
    localStorage.setItem(storageKeys.dashboardPanel, panel);
    if (panel === 'users') renderUserList();
    if (panel === 'history') renderTransactionList();
    if (panel === 'settings' && currentRole === 'admin') renderAdminReportUsers();
    if (panel === 'products') {
      loadProducts().then(() => renderProducts()).catch(() => {
        if (productStatus) productStatus.textContent = 'No se pudo cargar productos.';
      });
    }
    if (panel === 'variousSales') {
      Promise.resolve(loadProducts())
        .then(() => {
          fillBarStudentSelects();
          fillVariousSalesProducts();
          updateVariousSalesTotal();
        })
        .catch(() => {
          if (variousSalesStatus) variousSalesStatus.textContent = 'No se pudo cargar estudiantes o productos.';
        });
    }
    // if opening the camera panel, clear the scan form and stop any previous stream
    if (panel === 'camera') {
      const current = getCurrentUser();
      clearScanForm({ preserveManual: true });
      if (manualCodeInput) {
        manualCodeInput.value = current.sap || '';
        manualCodeInput.readOnly = true;
      }
      startScanner();
    }
    routeTo('dashboard');
  }

  function getCurrentUser() {
    return {
      role: localStorage.getItem(storageKeys.userRole) || 'student',
      name: localStorage.getItem(storageKeys.studentName) || 'David Nunez',
      sap: localStorage.getItem(storageKeys.studentSAP) || '1234',
      course: localStorage.getItem(storageKeys.studentCourse) || '1 BGU A',
      allergies: localStorage.getItem(storageKeys.studentAllergies) || 'Ninguna registrada'
    };
  }

  function getParentChild() {
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    const currentSap = localStorage.getItem(storageKeys.studentSAP) || '';
    if (currentRole !== 'parent' || !currentSap) return null;
    const parentUser = findUserBySAP(currentSap);
    if (!parentUser) return null;
    const children = getParentChildren();
    return children.length ? children[0] : null;
  }

  function getParentWalletChild() {
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    const currentSap = localStorage.getItem(storageKeys.studentSAP) || '';
    if (currentRole !== 'parent' || !currentSap) return null;
    const children = getParentChildren();
    const selectedSap = localStorage.getItem('parentWalletSap') || '';
    if (selectedSap) {
      const selected = children.find((child) => child.sap === selectedSap);
      if (selected) return selected;
    }
    return children.length ? children[0] : null;
  }

  function getParentChildren() {
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    const currentSap = localStorage.getItem(storageKeys.studentSAP) || '';
    if (currentRole !== 'parent' || !currentSap) return [];
    const parentUser = findUserBySAP(currentSap);
    if (!parentUser) return [];
    const saps = normalizeChildSap(parentUser.childSap);
    return saps.map((sap) => findUserBySAP(sap)).filter(Boolean);
  }

  function updateDashboardHint(role, panel) {
    const hintElement = document.querySelector('#dashboardRoleHint');
    if (!hintElement) return;
    const panelHints = rolePanelHints[panel];
    if (panelHints && panelHints[role]) {
      hintElement.textContent = panelHints[role];
      return;
    }
    hintElement.textContent = role === 'student'
      ? 'Visualiza tu consumo, wallet, ranking y perfil SAP.'
      : role === 'parent'
        ? 'Revisa saldo, perfil y usuarios vinculados como padre.'
        : role === 'bar'
          ? 'Gestiona ventas, productos y escaneo del bar escolar.'
          : role === 'nutrition'
            ? 'Accede a ranking, perfil SAP, calendario y usuarios.'
            : 'Accede a la información clave de tu rol.';
  }

  function renderRoleSpecificPanelContent(role) {
    const user = getCurrentUser();
    const child = getParentChild();

    const consumoSection = document.querySelector('[data-panel-view="consumo"]');
    if (consumoSection) {
      const cards = consumoSection.querySelectorAll('.metric-card');
      if (cards.length >= 3) {
        if (role === 'student') {
          // Lunch data from student profile
          const current = findUserBySAP(user.sap) || {};
          const lunch = current.lastLunch || { calories: 0 };
          const lunchToday = getTodayMealSummary(user.sap, 'lunch');
          const snackToday = getTodayMealSummary(user.sap, 'media_manana');
          const totalCalories = Math.round(Number(lunchToday.calories || 0) + Number(snackToday.calories || 0));
          const totalProtein = Math.round(Number(lunchToday.protein || 0) + Number(snackToday.protein || 0));
          const metricIcon = cards[0].querySelector('.metric-icon');
          if (metricIcon) metricIcon.textContent = '📊';
          cards[0].querySelector('strong').textContent = 'Total calorias y proteinas del dia';
          cards[0].querySelector('p').textContent = `Registros hoy: ${lunchToday.count + snackToday.count} (Lunch + media mañana)`;
          cards[0].querySelector('b').textContent = `${totalCalories || (lunch.calories || 0)} kcal · ${totalProtein} g prot`;

          const water = clampWaterGlasses(typeof current.waterToday === 'number' ? current.waterToday : 0);
          cards[1].querySelector('strong').textContent = 'Agua registrada';
          cards[1].querySelector('p').innerHTML = `<span id="waterCount">${water}</span> vasos de 8 recomendados.`;
          cards[1].querySelector('b').textContent = `${getWaterProgressPercent(water)}%`;
          // add water controls for students
          if (role === 'student') {
            const actions = document.createElement('div');
            actions.className = 'water-actions';
            actions.innerHTML = '<button type="button" id="waterDec">-</button><button type="button" id="waterInc">+</button><button type="button" id="waterReset">Reset</button>';
            // remove existing actions if any and append
            const existing = cards[1].querySelector('.water-actions');
            if (existing) existing.remove();
            cards[1].appendChild(actions);
          }

          // Avatar based on nutrition and water
          const avatarImg = selectAvatarImage(totalCalories, totalProtein, water);
          const avatarLabel = selectAvatarLabel(totalCalories, totalProtein, water);
          const avatarMessage = selectAvatarMessage(totalCalories, totalProtein, water);
          cards[2].querySelector('strong').textContent = 'Avatar emocional';
          if (avatarImg) {
            cards[2].querySelector('p').innerHTML = `<img src="${avatarImg}" alt="avatar ${avatarLabel}" style="width:56px;height:56px">`;
            cards[2].querySelector('b').textContent = avatarLabel;
          } else {
            cards[2].querySelector('p').textContent = avatarMessage;
            cards[2].querySelector('b').textContent = avatarLabel;
          }
        } else if (role === 'parent') {
          const childName = child?.name || 'Tu hijo';
          cards[0].querySelector('strong').textContent = `Consumo de ${childName}`;
          cards[0].querySelector('p').textContent = `${childName} tiene un lunch balanceado y buena hidratación.`;
          cards[0].querySelector('b').textContent = '650 kcal';
          cards[1].querySelector('strong').textContent = 'Alertas de salud';
          cards[1].querySelector('p').textContent = child?.allergies
            ? `Alergias registradas: ${child.allergies}.`
            : 'Sin alergias activas ni intolerancias informadas.';
          cards[1].querySelector('b').textContent = child?.allergies ? 'Revisar' : '0 alertas';
          cards[2].querySelector('strong').textContent = 'Recomendacion';
          cards[2].querySelector('p').textContent = child
            ? 'Mantén una dieta rica en fibra, frutas y vegetales para su saludable crecimiento.'
            : 'No hay hijo vinculado. Asigna un estudiante para ver el resumen nutricional.';
          cards[2].querySelector('b').textContent = child ? 'Excelente' : 'Sin datos';
        } else if (role === 'bar') {
          cards[0].querySelector('strong').textContent = 'Ventas del día';
          cards[0].querySelector('p').textContent = '15 desayunos y 22 almuerzos vendidos.';
          cards[0].querySelector('b').textContent = '$125.50';
          cards[1].querySelector('strong').textContent = 'Productos destacados';
          cards[1].querySelector('p').textContent = 'Ensaladas y opciones bajas en azúcar.';
          cards[1].querySelector('b').textContent = 'Top 3';
          cards[2].querySelector('strong').textContent = 'Satisfacción escolar';
          cards[2].querySelector('p').textContent = 'Clientes satisfechos con la calidad del menú.';
          cards[2].querySelector('b').textContent = '92%';
        } else if (role === 'nutrition') {
          cards[0].querySelector('strong').textContent = 'Indice nutricional';
          cards[0].querySelector('p').textContent = 'Promedio de la semana escolar.';
          cards[0].querySelector('b').textContent = '84%';
          cards[1].querySelector('strong').textContent = 'Menú recomendado';
          cards[1].querySelector('p').textContent = 'Aumentar frutas y vegetales frescos.';
          cards[1].querySelector('b').textContent = 'Prioritario';
          cards[2].querySelector('strong').textContent = 'Seguimiento activo';
          cards[2].querySelector('p').textContent = 'Analizando hábitos y resultados.';
          cards[2].querySelector('b').textContent = '4 casos';
        }
        if (role === 'student') {
          renderStudentConsumptionWallets(user.sap);
        }
        // Update the larger 'Resumen nutricional de hoy' panel if present
        const summaryPanel = document.querySelector('.panel.nutrition-summary');
        if (summaryPanel) {
          // choose the right subject: student themselves or the parent's selected child
          const subject = (role === 'student') ? (findUserBySAP(user.sap) || {}) : (child || {});
          const summary = buildDailyNutritionSummaryForSap(subject.sap || '');
          const calories = summary.calories;
          const protein = summary.protein;
          const healthy = summary.healthy;
          const waterCount = summary.water;

          const rows = summaryPanel.querySelectorAll('.res-item');
          if (rows.length < 4) {
            summaryPanel.insertAdjacentHTML('beforeend', '<div class="res-item"><span>Agua registrada</span><b>0 / 8 vasos</b><i style="width:0%"></i></div>');
          }

          // Calories row
          const calRow = summaryPanel.querySelectorAll('.res-item')[0];
          if (calRow) {
            calRow.querySelector('span').textContent = 'Calorias consumidas';
            calRow.querySelector('b').textContent = `${calories} / 1.800 kcal`;
            const perc = Math.max(0, Math.min(100, Math.round((calories / 1800) * 100)));
            const bar = calRow.querySelector('i'); if (bar) bar.style.width = perc + '%';
          }

          // Protein row
          const proteinRow = summaryPanel.querySelectorAll('.res-item')[1];
          if (proteinRow) {
            proteinRow.querySelector('span').textContent = 'Proteinas consumidas';
            proteinRow.querySelector('b').textContent = `${protein} / 90 g`;
            const pperc = Math.max(0, Math.min(100, Math.round((protein / 90) * 100)));
            const bar = proteinRow.querySelector('i'); if (bar) bar.style.width = pperc + '%';
          }

          // Healthy portions row
          const healthyRow = summaryPanel.querySelectorAll('.res-item')[2];
          if (healthyRow) {
            healthyRow.querySelector('span').textContent = 'Alimentos saludables';
            healthyRow.querySelector('b').textContent = `${healthy} / 5 porciones`;
            const hperc = Math.max(0, Math.min(100, Math.round((healthy / 5) * 100)));
            const bar = healthyRow.querySelector('i'); if (bar) bar.style.width = hperc + '%';
          }

          // Water row
          const waterRow = summaryPanel.querySelectorAll('.res-item')[3];
          if (waterRow) {
            waterRow.querySelector('span').textContent = 'Agua registrada';
            waterRow.querySelector('b').textContent = `${waterCount} / 8 vasos`;
            const wperc = getWaterProgressPercent(waterCount);
            const bar = waterRow.querySelector('i'); if (bar) bar.style.width = wperc + '%';
          }
        }
      }
    }

    const walletSection = document.querySelector('[data-panel-view="wallet"]');
    if (walletSection) {
      const walletCards = walletSection.querySelectorAll('.wallet-card');
      const rechargeBox = document.querySelector('#parentRecharge');
      if (rechargeBox) rechargeBox.hidden = role !== 'parent';
      if (walletCards.length >= 2) {
        if (role === 'student') {
          // Student sees their wallet balance only, plus recharge summary
          walletCards[0].querySelector('strong').textContent = 'Saldo disponible para compras';
          const current = findUserBySAP(user.sap) || {};
          walletCards[0].querySelector('b').textContent = '$' + (Number(current.walletBalance || 0)).toFixed(2);
          walletCards[0].querySelector('p').textContent = 'Disponible en Sumo y Resto.';
          const recs = getRechargeTransactions(current.sap);
          walletCards[1].innerHTML = `
            <strong>Recargas</strong>
            <div class="wallet-month-total">Total de recargas: <b>$${formatCurrency(recs.reduce((acc, tx) => acc + Number(tx.amount || 0), 0))}</b></div>
            <div class="wallet-list">${renderRechargeList(recs)}</div>
            <strong style="display:block;margin-top:14px">Compras recientes</strong>
            <div class="wallet-list">${renderMealHistory(getMealTransactions(current.sap))}</div>
          `;
          if (rechargeBox) rechargeBox.hidden = true;
        } else if (role === 'parent') {
          const walletChild = getParentWalletChild();
          const children = getParentChildren();
          const childName = walletChild?.name || 'El estudiante';
          walletCards[0].querySelector('strong').textContent = `Saldo de ${childName}`;
          walletCards[0].querySelector('b').textContent = walletChild ? ('$' + (Number(walletChild.walletBalance || 0)).toFixed(2)) : '$0.00';
          walletCards[0].querySelector('p').textContent = walletChild
            ? `${childName} puede usarlo en el bar escolar.`
            : 'No hay hijo vinculado para mostrar saldo.';
          if (children.length > 1) {
            const selectorHtml = `<label>Seleccionar hijo: <select id="parentWalletSelector">${children.map(c => `<option value="${c.sap}" ${c.sap===walletChild?.sap? 'selected':''}>${c.name} (${c.sap})</option>`).join('')}</select></label>`;
            const selectorContainer = walletCards[0].querySelector('.wallet-selector');
            if (selectorContainer) {
              selectorContainer.innerHTML = selectorHtml;
            } else {
              walletCards[0].insertAdjacentHTML('beforeend', `<div class="wallet-selector">${selectorHtml}</div>`);
            }
            const sel = walletCards[0].querySelector('#parentWalletSelector');
            if (sel) {
              sel.addEventListener('change', (e) => {
                const value = e.target.value;
                if (value) {
                  localStorage.setItem('parentWalletSap', value);
                  renderRoleSpecificPanelContent('parent');
                }
              });
            }
          }
          // build recent recharges list
          if (walletChild) {
            const recs = getRechargeTransactions(walletChild.sap);
            const meals = getMealTransactions(walletChild.sap);
            const monthTotal = getMonthlyRechargeTotal(walletChild.sap);
            walletCards[1].innerHTML = `
              <strong>Recargas recientes</strong>
              <div class="wallet-month-total">Total este mes: <b>$${formatCurrency(monthTotal)}</b></div>
              <div class="wallet-list">${renderRechargeList(recs)}</div>
              <div class="wallet-actions"><a href="#" id="seeRechargesHistory">Ver historial de recargas</a></div>
              <strong style="display:block;margin-top:14px">Comidas del niño por fecha</strong>
              <div class="wallet-list">${renderMealHistory(meals)}</div>
            `;
            const btn = walletCards[1].querySelector('#seeRechargesHistory');
            if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); openHistoryWithFilter('recharge'); });
          } else {
            walletCards[1].innerHTML = `
              <strong>Recargas recientes</strong>
              <p>Asigna un alumno desde tu perfil para ver recargas.</p>
            `;
          }
          if (rechargeBox) rechargeBox.hidden = false;
        } else if (role === 'bar') {
          const students = getStudentsForBar();
          const rows = students.map((student) => {
            const balance = Number(student.walletBalance || 0);
            const recharges = getRechargeTransactions(student.sap).reduce((acc, tx) => acc + Number(tx.amount || 0), 0);
            const spent = getTotalSpent(student.sap);
            return `<tr><td>${student.name}</td><td>${student.sap}</td><td>$${formatCurrency(recharges)}</td><td>$${formatCurrency(spent)}</td><td>$${formatCurrency(balance)}</td></tr>`;
          }).join('');
          walletCards[0].innerHTML = `
            <strong>NutriWallet de estudiantes</strong>
            <p>Listado de recargas y saldo actual por estudiante.</p>
            <div class="wallet-list">
              <table class="tx-table">
                <thead><tr><th>Estudiante</th><th>SAP</th><th>Recargas</th><th>Consumo</th><th>Saldo</th></tr></thead>
                <tbody>${rows || '<tr><td colspan="5">No hay estudiantes registrados.</td></tr>'}</tbody>
              </table>
            </div>
          `;
          walletCards[1].innerHTML = `
            <strong>Operacion del bar</strong>
            <p>Consumos de Media Mañana y Lunch registrados por estudiante.</p>
            <div class="wallet-list">${renderBarOperations()}</div>
          `;
          fillBarStudentSelects();
        } else if (role === 'nutrition') {
          walletCards[0].innerHTML = '<strong>Presupuesto nutricional</strong><b>$3.200</b><p>Presupuesto mensual para menus saludables.</p><div class="progress"><span style="width:64%"></span></div>';
          walletCards[1].innerHTML = '<strong>Costos revisados</strong><b>Estable</b><p>Sostenible para la programacion nutricional.</p>';
        }
      }
    }

    const coinsSection = document.querySelector('[data-panel-view="coins"]');
    if (coinsSection) {
      const coinsCards = coinsSection.querySelectorAll('.card');
      if (coinsCards.length >= 3) {
        if (role === 'student') {
          coinsCards[0].querySelector('strong').textContent = 'EightCoins';
          coinsCards[0].querySelector('p').textContent = 'Calculando monedas...';
          coinsCards[1].querySelector('strong').textContent = 'Racha';
          coinsCards[1].querySelector('p').textContent = 'Calculando racha...';
          coinsCards[2].querySelector('strong').textContent = 'Evaluacion';
          coinsCards[2].querySelector('p').textContent = 'Calculando evaluacion...';
          refreshStudentEightCoins(user.sap, coinsCards);
        } else {
          coinsCards[0].querySelector('strong').textContent = 'Incentivos escolares';
          coinsCards[0].querySelector('p').textContent = 'Cargando datos semanales...';
          coinsCards[1].querySelector('strong').textContent = 'Promedio EightCoins';
          coinsCards[1].querySelector('p').textContent = 'Cargando...';
          coinsCards[2].querySelector('strong').textContent = 'Lider semanal';
          coinsCards[2].querySelector('p').textContent = 'Cargando...';
          refreshGlobalEightCoins(coinsCards);
        }
      }
    }

    const rankingSection = document.querySelector('[data-panel-view="ranking"]');
    if (rankingSection) {
      const list = rankingSection.querySelector('.ranking-list');
      if (list) {
        list.innerHTML = '<li><span>Cargando ranking...</span><strong>Consultando API</strong></li>';
        refreshRankingPanel(role, user, child, list);
      }
    }

    // Ensure transaction list updates for student/parent when panels change
    if (role === 'student' || role === 'parent') {
      renderTransactionList();
    }

      // Camera panel adjustments: manual code auto-fill and submit label
      const manualInput = document.querySelector('#manualCode');
      const scanSubmit = document.querySelector('.scan-controls button[type="submit"]');
      if (manualInput && scanSubmit) {
        if (role === 'student') {
          manualInput.value = user.sap || '';
          manualInput.readOnly = true;
          scanSubmit.textContent = 'Registrar comida';
        } else {
          manualInput.value = '';
          manualInput.readOnly = false;
          scanSubmit.textContent = 'Registrar codigo';
        }
      }

    const sapSection = document.querySelector('[data-panel-view="sap"]');
    if (sapSection) {
      const dataList = sapSection.querySelector('.data-list');
      if (dataList) {
        if (role === 'parent') {
          if (child) {
            dataList.innerHTML = `
              <p><strong>Nombre:</strong> ${child.name}</p>
              <p><strong>Codigo SAP:</strong> ${child.sap}</p>
              <p><strong>Curso:</strong> ${child.course || 'No definido'}</p>
              <p><strong>Alergias:</strong> ${child.allergies || 'Ninguna registrada'}</p>
              <p><strong>Rol:</strong> Estudiante</p>
            `;
          } else {
            dataList.innerHTML = `
              <p>No existe un estudiante vinculado a esta cuenta de padre.</p>
              <p>Asigna un hijo desde el perfil del padre para ver sus datos.</p>
            `;
          }
        } else {
          dataList.innerHTML = `
            <p><strong>Nombre:</strong> ${user.name}</p>
            <p><strong>Codigo SAP:</strong> ${user.sap}</p>
            <p><strong>Curso:</strong> ${user.course}</p>
            <p><strong>Alergias:</strong> ${user.allergies}</p>
            <p><strong>Rol:</strong> ${role}</p>
          `;
        }
      }
    }
  }

  function openUserEditor(user) {
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    if (!canManageUsers(currentRole) || !userEditor || !userEditorForm) return;
    editingUserSAP = user.sap;
    userEditorForm.elements.editName.value = user.name;
    userEditorForm.elements.editSap.value = user.sap;
    userEditorForm.elements.editRole.value = user.role;
    userEditorForm.elements.editActive.value = user.active ? '1' : '0';
    userEditorForm.elements.editCourse.value = user.course || '';
    userEditorForm.elements.editAllergies.value = user.allergies || '';
    if (userEditorForm.elements.editChildSap) {
      const childSelect = userEditorForm.elements.editChildSap;
      const selectedValues = normalizeChildSap(user.childSap);
      if (user.role === 'parent') {
        childSelect.innerHTML = '';
        if (!selectedValues.length) {
          const emptyOption = document.createElement('option');
          emptyOption.value = '';
          emptyOption.textContent = 'No hay hijos vinculados';
          childSelect.appendChild(emptyOption);
          childSelect.disabled = true;
        } else {
          selectedValues.forEach((sapValue) => {
            const linkedStudent = findUserBySAP(sapValue);
            const option = document.createElement('option');
            option.value = sapValue;
            option.textContent = linkedStudent
              ? `${linkedStudent.name} (${linkedStudent.course || linkedStudent.sap})`
              : `${sapValue} (No registrado)`;
            option.selected = true;
            childSelect.appendChild(option);
          });
          childSelect.disabled = false;
        }
      } else {
        childSelect.innerHTML = '<option value="">Selecciona uno o más estudiantes</option>';
        childSelect.disabled = true;
      }

      const childLabel = document.querySelector('#userEditorChildLabel');
      if (childLabel) {
        childLabel.hidden = user.role !== 'parent' || selectedValues.length === 0;
      }
    }

    if (userEditorStatus) userEditorStatus.textContent = '';
    userEditor.hidden = false;
    userEditor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function renderTransactionList() {
    const container = document.querySelector('#transactionList');
    if (!container) return;
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    const txFilter = document.querySelector('#txFilter');
    const exportCsvBtn = document.querySelector('#exportCsvButton');
    const txControls = document.querySelector('.tx-controls');
    let subject = null;
    let childSelectorHtml = '';
    if (currentRole === 'student') {
      const current = getCurrentUser();
      subject = findUserBySAP(current.sap);
      if (txControls) txControls.hidden = true;
      if (txFilter) txFilter.closest('label').hidden = true;
      if (exportCsvBtn) exportCsvBtn.hidden = true;
      if (!subject) {
        container.innerHTML = '<p>No hay usuario activo para ver historial.</p>';
        return;
      }
      try {
        const historyItems = await loadNutritionHistory(subject.sap);
        if (!historyItems.length) {
          container.innerHTML = '<p>No hay resumenes nutricionales guardados para este estudiante.</p>';
          return;
        }
        const rows = historyItems.map((item) => {
          const at = item.createdAt ? new Date(item.createdAt).toLocaleString() : item.summaryDate;
          return `<tr><td>${at}</td><td>${item.calories} kcal</td><td>${item.protein} g</td><td>${item.healthy} / 5</td><td>${item.water} / 8</td></tr>`;
        }).join('');
        container.innerHTML = `
          <table class="tx-table">
            <thead><tr><th>Fecha</th><th>Calorias</th><th>Proteinas</th><th>Saludables</th><th>Agua</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        `;
      } catch (error) {
        container.innerHTML = `<p>No se pudo cargar el historial nutricional: ${error.message}</p>`;
      }
      return;
    }
    if (txControls) txControls.hidden = false;
    if (txFilter) txFilter.closest('label').hidden = false;
    if (exportCsvBtn) exportCsvBtn.hidden = false;
    if (currentRole === 'parent') {
      const children = getParentChildren();
      const selectedSap = localStorage.getItem('parentHistorySap') || '';
      if (!children || children.length === 0) {
        container.innerHTML = '<p>No hay hijos vinculados a esta cuenta. Asigna un hijo desde Usuarios para ver su historial.</p>';
        return;
      }
      // determine subject
      if (selectedSap) subject = findUserBySAP(selectedSap) || children[0];
      else subject = children[0];
      // if multiple children, render selector
      if (children.length > 1) {
        childSelectorHtml = `<label>Seleccionar hijo: <select id="parentChildSelector">${children.map(c => `<option value="${c.sap}" ${c.sap===subject.sap? 'selected':''}>${c.name} (${c.sap})</option>`).join('')}</select></label>`;
      }
    } else {
      const current = getCurrentUser();
      subject = findUserBySAP(current.sap);
    }
    if (!subject) {
      container.innerHTML = '<p>No hay transacciones para mostrar.</p>';
      return;
    }
    const txs = Array.isArray(subject.transactions) ? subject.transactions : [];
    const filter = (document.querySelector('#txFilter')?.value || '').trim();
    const filtered = filter ? txs.filter((t) => t.type === filter) : txs;
    if (!txs.length) {
      container.innerHTML = '<p>No hay transacciones registradas para este usuario.</p>';
      return;
    }
    // Render as table for readability
    const rows = filtered.map((t) => {
      const at = t.at ? new Date(t.at).toLocaleString() : '';
      const typeLabel = t.type === 'purchase' ? 'Compra' : t.type === 'recharge' ? 'Recarga' : (t.type || 'Otro');
      const sign = t.type === 'purchase' ? '-' : '+';
      const amount = formatCurrency(t.amount || 0);
      const meta = t.meta && Object.keys(t.meta).length ? humanizeMeta(t.meta) : '';
      const prev = formatCurrency(t.prevBalance || 0);
      const balance = formatCurrency(t.balance || 0);
      return `<tr><td>${at}</td><td>${typeLabel}</td><td class="tx-amt">${sign}${amount}</td><td>$${prev}</td><td>$${balance}</td><td>${meta}</td></tr>`;
    }).join('');
    container.innerHTML = `
      ${childSelectorHtml}
      <table class="tx-table">
        <thead><tr><th>Fecha</th><th>Tipo</th><th>Monto</th><th>Saldo antes</th><th>Saldo después</th><th>Detalles</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    // attach change handler for parent child selector
    const childSel = container.querySelector('#parentChildSelector');
    if (childSel) {
      childSel.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val) localStorage.setItem('parentHistorySap', val);
        renderTransactionList();
      });
    }
  }

  function formatCurrency(n) {
    try {
      return Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (e) {
      return Number(n).toFixed(2);
    }
  }

  function clampWaterGlasses(value) {
    const parsed = Number(value || 0);
    if (Number.isNaN(parsed)) return 0;
    return Math.max(0, Math.min(8, parsed));
  }

  function clampHealthyPortions(value) {
    const parsed = Number(value || 0);
    if (Number.isNaN(parsed)) return 0;
    return Math.max(0, Math.min(5, parsed));
  }

  function getWaterProgressPercent(glasses) {
    return Number(((clampWaterGlasses(glasses) / 8) * 100).toFixed(1));
  }

  function selectAvatarImage(calories, protein, water) {
    // For students: require calories and protein data, then choose avatar by water level.
    try {
      const hasNutrition = Number(calories || 0) > 0 && Number(protein || 0) > 0;
      if (!hasNutrition) return null;
      const normalizedWater = clampWaterGlasses(water);
      if (normalizedWater >= 8) return `images/${encodeURIComponent('AVATAR FELIZ.png')}`;
      if (normalizedWater >= 6) return `images/${encodeURIComponent('AVATAR CANSADO.png')}`;
      if (normalizedWater >= 4) return `images/${encodeURIComponent('AVATAR DE ATENCIÓNpng.png')}`;
      return null;
    } catch (e) {
      return null;
    }
  }

  function selectAvatarLabel(calories, protein, water) {
    try {
      const hasNutrition = Number(calories || 0) > 0 && Number(protein || 0) > 0;
      if (!hasNutrition) return 'Sin datos';
      const normalizedWater = clampWaterGlasses(water);
      if (normalizedWater >= 8) return 'Feliz';
      if (normalizedWater >= 6) return 'Cansado';
      if (normalizedWater >= 4) return 'Atencion';
      return 'En progreso';
    } catch (e) {
      return 'Sin datos';
    }
  }

  function selectAvatarMessage(calories, protein, water) {
    try {
      const hasNutrition = Number(calories || 0) > 0 && Number(protein || 0) > 0;
      if (!hasNutrition) return 'Registra calorias y proteina para activar el avatar emocional.';
      const normalizedWater = clampWaterGlasses(water);
      if (normalizedWater < 4) return 'Sigue hidratandote para mejorar tu estado emocional.';
      return 'Tu avatar refleja tu progreso de hoy.';
    } catch (e) {
      return 'No se pudo calcular el estado emocional.';
    }
  }

  function humanizeMeta(meta) {
    if (!meta) return '';
    if (meta.productName) {
      const qty = Number(meta.quantity || 1);
      const unit = Number(meta.unitPrice || 0);
      const by = meta.by ? ` · Por: ${meta.by}` : '';
      return `${meta.productName} x${qty} ($${formatCurrency(unit)} c/u)${by}`;
    }
    if (meta.mealType === 'media_manana') return `Comida media mañana${meta.by ? ` · Por: ${meta.by}` : ''}`;
    if (meta.mealType === 'lunch') return `Lunch${meta.by ? ` · Por: ${meta.by}` : ''}`;
    if (meta.by) return `Por: ${meta.by}`;
    return JSON.stringify(meta);
  }

  function exportTransactionsToCSV() {
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    let subject = null;
    if (currentRole === 'parent') {
      const sel = localStorage.getItem('parentHistorySap');
      if (sel) subject = findUserBySAP(sel);
      else subject = getParentChild();
    } else subject = findUserBySAP(getCurrentUser().sap);
    if (!subject) return alert('No hay usuario con transacciones para exportar.');
    const txs = Array.isArray(subject.transactions) ? subject.transactions : [];
    if (!txs.length) return alert('No hay transacciones para exportar.');
    const header = ['Fecha','Tipo','Monto','Saldo antes','Saldo después','Detalles'];
    const lines = [header.join(',')];
    txs.forEach((t) => {
      const at = t.at ? new Date(t.at).toLocaleString() : '';
      const typeLabel = t.type === 'purchase' ? 'Compra' : t.type === 'recharge' ? 'Recarga' : (t.type || 'Otro');
      const amount = (t.amount || 0).toFixed(2);
      const prev = (t.prevBalance || 0).toFixed(2);
      const balance = (t.balance || 0).toFixed(2);
      const details = t.meta && Object.keys(t.meta).length ? JSON.stringify(t.meta) : '';
      lines.push([`"${at}"`, `"${typeLabel}"`, amount, prev, balance, `"${details}"`].join(','));
    });
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject.name || 'transactions'}_${subject.sap || ''}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function closeUserEditor() {
    if (!userEditor) return;
    editingUserSAP = null;
    userEditor.hidden = true;
    if (userEditorStatus) userEditorStatus.textContent = '';
  }

  function saveEditedUser(event) {
    if (!userEditorForm) return;
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    if (!canManageUsers(currentRole)) {
      if (userEditorStatus) userEditorStatus.textContent = 'No tienes permiso para editar usuarios.';
      return;
    }
    const formData = new FormData(userEditorForm);
    const name = String(formData.get('editName') || '').trim();
    const sap = String(formData.get('editSap') || '').trim();
    const role = String(formData.get('editRole') || '').trim();
    const course = String(formData.get('editCourse') || '').trim();
    const allergies = String(formData.get('editAllergies') || '').trim();
    const childSap = Array.isArray(formData.getAll('editChildSap'))
      ? formData.getAll('editChildSap').map((value) => String(value || '').trim()).filter(Boolean)
      : [];
    const active = String(formData.get('editActive') || '1') === '1';
    if (!name || !sap || !role) {
      if (userEditorStatus) userEditorStatus.textContent = 'Completa nombre, SAP y rol antes de guardar.';
      return;
    }
    if (!editingUserSAP) {
      if (userEditorStatus) userEditorStatus.textContent = 'No hay usuario seleccionado para editar.';
      return;
    }
    const existing = findUserBySAP(sap);
    if (existing && sap !== editingUserSAP) {
      if (userEditorStatus) userEditorStatus.textContent = 'Ya existe un usuario con ese codigo SAP.';
      return;
    }
    const updated = {
      name,
      sap,
      role,
      course,
      allergies,
      childSap,
      active
    };
    if (sap !== editingUserSAP) {
      deleteUserBySAP(editingUserSAP);
      addOrUpdateUser(updated);
    } else {
      updateUserBySAP(editingUserSAP, updated);
    }
    if (userEditorStatus) userEditorStatus.textContent = 'Usuario actualizado correctamente.';
    closeUserEditor();
    renderUserList();
  }

  function startSession(role, name, sap, course = '', allergies = '') {
    clearSessionData();
    localStorage.setItem(storageKeys.session, 'active');
    localStorage.setItem(storageKeys.userRole, role || 'student');
    localStorage.setItem(storageKeys.studentName, name || 'David Nunez');
    localStorage.setItem(storageKeys.studentSAP, sap || '1234');
    if (course) localStorage.setItem(storageKeys.studentCourse, course);
    if (allergies) localStorage.setItem(storageKeys.studentAllergies, allergies);
    localStorage.setItem('nutriWalletBalance', '20.00');
    localStorage.setItem('eightCoins', '8');
    if (profileName) profileName.textContent = name || 'David Nunez';
    if (profileDetails) {
      const details = [`Codigo SAP: ${sap || '1234'}`];
      if (course) details.push(course);
      if (allergies) details.push(`Alergias: ${allergies}`);
      details.push(`Rol: ${role}`);
      profileDetails.textContent = details.join(' · ');
    }
    updateAuthRouteVisibility();
    configureDashboardForRole(role);
    renderRoleSpecificPanelContent(role);
    setPanel(roleDefaultPanel[role] || 'consumo');
    setAppState(appStateKeys.session, {
      active: true,
      role: role || 'student',
      name: name || 'David Nunez',
      sap: sap || '1234',
      course: course || '',
      allergies: allergies || ''
    });
  }

  function logout() {
    stopScanner();
    localStorage.removeItem(storageKeys.session);
    localStorage.removeItem(storageKeys.userRole);
    localStorage.removeItem(storageKeys.studentName);
    localStorage.removeItem(storageKeys.studentSAP);
    localStorage.removeItem(storageKeys.studentCourse);
    localStorage.removeItem(storageKeys.studentAllergies);
    clearAppState(appStateKeys.session);
    updateAuthRouteVisibility();
    routeTo('inicio');
  }

  function showScanResult(message) {
    if (scanResult) scanResult.textContent = message;
  }

  function configureDashboardForRole(role) {
    const allowedPanels = rolePanelPermissions[role] || rolePanelPermissions.student;
    const dashboardHint = document.querySelector('#dashboardRoleHint');
    const usersNavButton = document.querySelector('.sidebar button[data-panel="users"]');
    const usersPanelTitle = document.querySelector('[data-panel-view="users"] .panel-head h3');
    if (dashboardHint) {
      dashboardHint.textContent = role === 'student'
        ? 'Visualiza tu consumo, wallet, ranking y perfil SAP.'
        : role === 'parent'
          ? 'Revisa saldo, perfil y usuarios vinculados como padre.'
          : role === 'bar'
            ? 'Gestiona ventas, productos y escaneo del bar escolar.'
            : role === 'nutrition'
              ? 'Accede a ranking, perfil SAP, calendario y usuarios.'
              : role === 'admin'
                ? 'Administra usuarios del sistema, actualiza SAP e inactiva cuentas.'
              : 'Accede a la información clave de tu rol.';
    }
    panelButtons.forEach((button) => {
      const panel = button.dataset.panel;
      const isAllowed = allowedPanels.includes(panel);
      button.hidden = !isAllowed;
      button.disabled = !isAllowed;
    });
    if (usersNavButton) usersNavButton.textContent = role === 'nutrition' ? 'Estudiantes' : 'Usuarios';
    if (usersPanelTitle) usersPanelTitle.textContent = role === 'nutrition' ? 'Estudiantes activos' : 'Usuarios registrados';
    updateSettingsUiByRole(role);
  }

  async function renderAdminReportUsers() {
    if (!adminReportList) return;
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    if (currentRole !== 'admin') {
      adminReportList.innerHTML = '';
      return;
    }
    await ensureUsersLoaded();
    const filter = String(adminReportFilter?.value || 'all');
    const users = getUsers().filter((user) => {
      if (filter === 'active') return user.active !== false;
      if (filter === 'inactive') return user.active === false;
      return true;
    });

    if (!users.length) {
      adminReportList.innerHTML = '<p>No hay usuarios para el filtro seleccionado.</p>';
      return;
    }

    const rows = users.map((user) => {
      const isActive = user.active !== false;
      return `<tr>
        <td>${user.name}</td>
        <td>${user.sap}</td>
        <td>${user.role}</td>
        <td>${isActive ? 'Activo' : 'Inactivo'}</td>
        <td>
          <button type="button" class="button ${isActive ? 'danger' : 'primary'}" data-action="toggle-report-user" data-sap="${user.sap}" data-next-active="${isActive ? '0' : '1'}">${isActive ? 'Desactivar' : 'Activar'}</button>
        </td>
      </tr>`;
    }).join('');

    adminReportList.innerHTML = `
      <table class="tx-table">
        <thead><tr><th>Nombre</th><th>SAP</th><th>Rol</th><th>Estado</th><th>Acción</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function registerScan(value, source) {
    const cleanValue = String(value || '').trim();
    if (!cleanValue) {
      showScanResult('Ingresa o escanea un codigo valido.');
      return;
    }
    localStorage.setItem('lastScanCode', cleanValue);
    localStorage.setItem('lastScanSource', source || 'manual');
    localStorage.setItem('lastScanAt', new Date().toISOString());
    // If the scanned code matches a student, simulate a consumption and deduct from wallet
    const scannedUser = findUserBySAP(cleanValue);
    if (scannedUser && scannedUser.role === 'student') {
      const price = 3.50;
      const before = getUserBalance(scannedUser.sap);
      const after = Math.max(0, Number(before) - price);
      setUserBalance(scannedUser.sap, after);
      // record purchase transaction with previous and resulting balance
      addTransaction(scannedUser.sap, { type: 'purchase', amount: price, meta: { source }, prevBalance: before, balance: after });
      showScanResult(`Codigo registrado: ${cleanValue}. Compra simulada: $${price.toFixed(2)}. Nuevo saldo: $${after.toFixed(2)}.`);
      // Refresh displays
      renderRoleSpecificPanelContent(localStorage.getItem(storageKeys.userRole) || 'student');
      renderUserList();
      renderTransactionList();
      return;
    }
    showScanResult(`Codigo registrado: ${cleanValue}. Estudiante identificado y lunch listo para validar.`);
  }

  async function startScanner() {
    if (!scanVideo || !navigator.mediaDevices?.getUserMedia) {
      showScanResult('Este navegador no permite camara aqui. Usa el campo manual o sube una foto.');
      return;
    }

    try {
      scanStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      scanVideo.srcObject = scanStream;
      await scanVideo.play();
      showScanResult('Camara activa. Enfoca un QR o codigo de barras.');

      if ('BarcodeDetector' in window) {
        const detector = new BarcodeDetector({
          formats: ['qr_code', 'ean_13', 'ean_8', 'code_128', 'code_39', 'upc_a', 'upc_e']
        });
        scanTimer = window.setInterval(async () => {
          if (!scanVideo.videoWidth) return;
          const codes = await detector.detect(scanVideo);
          if (codes.length) {
            registerScan(codes[0].rawValue, 'camera');
            stopScanner();
          }
        }, 700);
      } else {
        showScanResult('Camara activa. Tu navegador no tiene lector nativo; usa el campo manual tras ver el codigo.');
      }
    } catch (error) {
      showScanResult('No se pudo abrir la camara. Revisa permisos o usa el registro manual.');
    }
  }

  function stopScanner() {
    if (scanTimer) {
      window.clearInterval(scanTimer);
      scanTimer = null;
    }
    if (scanStream) {
      scanStream.getTracks().forEach((track) => track.stop());
      scanStream = null;
    }
    if (scanVideo) scanVideo.srcObject = null;
  }

  function clearScanForm(options = {}) {
    const preserveManual = Boolean(options.preserveManual);
    try {
      // stop any active camera
      stopScanner();
      // clear inputs and previews
      if (!preserveManual && manualCodeInput) manualCodeInput.value = '';
      if (photoPreview) { photoPreview.src = ''; photoPreview.hidden = true; }
      if (photoCanvas) {
        const ctx = photoCanvas.getContext && photoCanvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, photoCanvas.width || 0, photoCanvas.height || 0);
      }
      if (photoInput) photoInput.value = '';
      const mark = document.querySelector('#markHealthy'); if (mark) mark.checked = false;
      const hp = document.querySelector('#healthyPortions'); if (hp) hp.value = 0;
      // clear temporary stored preview
      try { localStorage.removeItem(storageKeys.lastLunchPhoto); } catch (e) {}
      try { localStorage.removeItem('lastLunchPhotoName'); } catch (e) {}
      try { localStorage.removeItem('lastLunchPhotoAt'); } catch (e) {}
      if (scanResult) scanResult.textContent = 'Listo para escanear.';
    } catch (e) {
      // ignore
    }
  }

  function savePhoto(dataUrl, label) {
    localStorage.setItem('lastLunchPhoto', dataUrl);
    localStorage.setItem('lastLunchPhotoName', label || 'foto-lunch');
    localStorage.setItem('lastLunchPhotoAt', new Date().toISOString());
    if (photoPreview) {
      photoPreview.src = dataUrl;
      photoPreview.hidden = false;
    }
    showScanResult('Foto tomada. Analisis simulado: lunch equilibrado, sin alertas.');
    // auto-process captured photo for students
    try {
      const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
      if (currentRole === 'student') {
        const current = getCurrentUser();
        const calories = estimateCaloriesFromImage(dataUrl);
        updateLunchForUser(current.sap, { calories, photoUrl: dataUrl, photoLabel: 'Lunch (foto)'});
      }
    } catch (e) {
      // ignore
    }
  }

  function estimateCaloriesFromImage(dataUrl) {
    // Simple heuristic / stub: random between 400 and 800
    return Math.floor(400 + Math.random() * 400);
  }

  function updateLunchForUser(sap, data) {
    const users = getUsers();
    const idx = users.findIndex(u => u.sap === String(sap).trim());
    if (idx < 0) return false;
    const u = users[idx];
    u.lastLunch = u.lastLunch || {};
    const prevCalories = Number(u.lastLunch.calories || 0);
    u.lastLunch.calories = typeof data.calories !== 'undefined' ? Number(data.calories) : prevCalories;
    // healthy portions handling
    const prevHealthy = Number(u.lastLunch.healthyPortions || 0);
    if (typeof data.healthyPortions !== 'undefined') {
      u.lastLunch.healthyPortions = Number(data.healthyPortions || 0);
    }
    if (data.photoUrl) u.lastLunch.photoUrl = data.photoUrl;
    if (data.photoLabel) u.lastLunch.photoLabel = data.photoLabel;
    u.updatedAt = new Date().toISOString();
    // persist
    saveUsers(users);
    // record in transactions/history as a lunch processing event
    try {
      const bal = Number(u.walletBalance || 0);
      addTransaction(u.sap, {
        type: 'lunch',
        amount: 0,
        prevBalance: bal,
        balance: bal,
        meta: { calories: u.lastLunch.calories, prevCalories }
      });
    } catch (e) {
      // ignore history logging failures
    }
    // if healthy portions changed, add a separate 'healthy' transaction and award rewards
    try {
      const newHealthy = Number(u.lastLunch.healthyPortions || 0);
      if (newHealthy !== prevHealthy) {
        const bal2 = Number(u.walletBalance || 0);
        addTransaction(u.sap, {
          type: 'healthy',
          amount: 0,
          prevBalance: bal2,
          balance: bal2,
          meta: { prevHealthy, newHealthy, portions: newHealthy }
        });

        // Award rewards for any increase in healthy portions
        const delta = newHealthy - prevHealthy;
        if (delta > 0) {
          const coinsPerPortion = 5; // grant 5 coins per new healthy portion
          const pointsPerPortion = 1; // grant 1 point per new healthy portion
          const coinsAward = delta * coinsPerPortion;
          const pointsAward = delta * pointsPerPortion;
          // update balances and points
          u.walletBalance = Number(u.walletBalance || 0) + coinsAward;
          u.points = Number(u.points || 0) + pointsAward;
          u.updatedAt = new Date().toISOString();
          saveUsers(users);
          // record reward transaction
          const newBal = Number(u.walletBalance || 0);
          addTransaction(u.sap, {
            type: 'reward',
            amount: coinsAward,
            prevBalance: newBal - coinsAward,
            balance: newBal,
            meta: { reason: 'healthy_portions', portionsAwarded: delta, pointsAwarded: pointsAward }
          });
        }
      }
    } catch (e) {
      // ignore
    }
    renderRoleSpecificPanelContent(localStorage.getItem(storageKeys.userRole) || 'student');
    return true;
  }

  function updateWaterForUser(sap, delta) {
    const users = getUsers();
    const idx = users.findIndex(u => u.sap === String(sap).trim());
    if (idx < 0) return false;
    const u = users[idx];
    const prev = clampWaterGlasses(u.waterToday || 0);
    u.waterToday = clampWaterGlasses(prev + Number(delta || 0));
    u.updatedAt = new Date().toISOString();
    saveUsers(users);
    patchUser(sap, { waterToday: u.waterToday }).catch(() => {});
    // log water change
    try {
      const bal = Number(u.walletBalance || 0);
      addTransaction(u.sap, {
        type: 'water',
        amount: 0,
        prevBalance: bal,
        balance: bal,
        meta: { delta: Number(delta || 0), prevWater: prev, newWater: u.waterToday }
      });
    } catch (e) {
      // ignore
    }
    renderRoleSpecificPanelContent(localStorage.getItem(storageKeys.userRole) || 'student');
    return true;
  }

  function updateHealthyForUser(sap, delta) {
    const users = getUsers();
    const idx = users.findIndex(u => u.sap === String(sap).trim());
    if (idx < 0) return false;
    const u = users[idx];
    const prev = clampHealthyPortions(u.healthyToday || 0);
    u.healthyToday = clampHealthyPortions(prev + Number(delta || 0));
    u.updatedAt = new Date().toISOString();
    saveUsers(users);
    patchUser(sap, { healthyToday: u.healthyToday }).catch(() => {});
    try {
      const bal = Number(u.walletBalance || 0);
      addTransaction(u.sap, {
        type: 'healthy_today',
        amount: 0,
        prevBalance: bal,
        balance: bal,
        meta: { delta: Number(delta || 0), prevHealthy: prev, newHealthy: u.healthyToday }
      });
    } catch (e) {}
    renderRoleSpecificPanelContent(localStorage.getItem(storageKeys.userRole) || 'student');
    return true;
  }

  function setHealthyForUser(sap, value) {
    const users = getUsers();
    const idx = users.findIndex(u => u.sap === String(sap).trim());
    if (idx < 0) return false;
    const u = users[idx];
    const prev = clampHealthyPortions(u.healthyToday || 0);
    u.healthyToday = clampHealthyPortions(value || 0);
    u.updatedAt = new Date().toISOString();
    saveUsers(users);
    patchUser(sap, { healthyToday: u.healthyToday }).catch(() => {});
    try {
      const bal = Number(u.walletBalance || 0);
      addTransaction(u.sap, {
        type: 'healthy_today',
        amount: 0,
        prevBalance: bal,
        balance: bal,
        meta: { delta: u.healthyToday - prev, prevHealthy: prev, newHealthy: u.healthyToday }
      });
    } catch (e) {}
    renderRoleSpecificPanelContent(localStorage.getItem(storageKeys.userRole) || 'student');
    return true;
  }

  async function saveStudentDailyNutritionSummary() {
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    if (currentRole !== 'student') return;
    const current = getCurrentUser();
    const summary = buildDailyNutritionSummaryForSap(current.sap);
    if (!summary.sap) return;
    if (saveNutritionSummaryStatus) saveNutritionSummaryStatus.textContent = 'Guardando resumen...';
    try {
      await createNutritionHistory(summary);
      const users = getUsers();
      const idx = users.findIndex((u) => u.sap === summary.sap);
      if (idx >= 0) {
        const entry = users[idx];
        const txs = Array.isArray(entry.transactions) ? entry.transactions : [];
        entry.transactions = txs.filter((tx) => {
          const isToday = isSameLocalDay(tx.at);
          const mealType = tx.meta?.mealType;
          const isTodayMeal = tx.type === 'purchase' && (mealType === 'lunch' || mealType === 'media_manana') && isToday;
          const isTodayWater = tx.type === 'water' && isToday;
          const isTodayHealthy = tx.type === 'healthy_today' && isToday;
          return !isTodayMeal && !isTodayWater && !isTodayHealthy;
        });
        entry.waterToday = 0;
        entry.healthyToday = 0;
        entry.updatedAt = new Date().toISOString();
        saveUsers(users);
        patchUser(summary.sap, {
          transactions: entry.transactions,
          waterToday: 0,
          healthyToday: 0
        }).catch(() => {});
      }
      renderRoleSpecificPanelContent('student');
      if (saveNutritionSummaryStatus) saveNutritionSummaryStatus.textContent = 'Resumen guardado y datos del dia reiniciados.';
    } catch (error) {
      if (saveNutritionSummaryStatus) saveNutritionSummaryStatus.textContent = `No se pudo guardar el resumen: ${error.message}`;
    }
  }

  function setWaterForUser(sap, value) {
    const users = getUsers();
    const idx = users.findIndex(u => u.sap === String(sap).trim());
    if (idx < 0) return false;
    const u = users[idx];
    const prev = clampWaterGlasses(u.waterToday || 0);
    u.waterToday = clampWaterGlasses(value || 0);
    u.updatedAt = new Date().toISOString();
    saveUsers(users);
    patchUser(sap, { waterToday: u.waterToday }).catch(() => {});
    try {
      const bal = Number(u.walletBalance || 0);
      addTransaction(u.sap, {
        type: 'water',
        amount: 0,
        prevBalance: bal,
        balance: bal,
        meta: { delta: u.waterToday - prev, prevWater: prev, newWater: u.waterToday }
      });
    } catch (e) {}
    renderRoleSpecificPanelContent(localStorage.getItem(storageKeys.userRole) || 'student');
    return true;
  }

  function capturePhoto() {
    if (!scanVideo || !photoCanvas || !scanVideo.videoWidth) {
      showScanResult('Primero abre la camara y espera a que se vea la imagen.');
      return;
    }

    photoCanvas.width = scanVideo.videoWidth;
    photoCanvas.height = scanVideo.videoHeight;
    const context = photoCanvas.getContext('2d');
    context.drawImage(scanVideo, 0, 0, photoCanvas.width, photoCanvas.height);
    savePhoto(photoCanvas.toDataURL('image/jpeg', 0.88), 'captura-lunch.jpg');
  }

  routeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      routeTo(trigger.dataset.route);
    });
  });

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    setMenu(open);
  });

  document.addEventListener('click', (event) => {
    const panelButton = event.target.closest('[data-panel]');
    if (panelButton) {
      setPanel(panelButton.dataset.panel);
      return;
    }

    const actionButton = event.target.closest('[data-action]');
    if (actionButton?.dataset.action === 'logout') {
      logout();
      return;
    }

    const languageButton = event.target.closest('[data-language]');
    if (languageButton) {
      applyLanguage(languageButton.dataset.language);
      renderUserList();
      renderRoleSpecificPanelContent(localStorage.getItem(storageKeys.userRole) || 'student');
      return;
    }

    // water controls
    if (event.target && (event.target.id === 'waterInc' || event.target.closest?.('#waterInc'))) {
      const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
      if (currentRole === 'student') {
        const cur = getCurrentUser(); updateWaterForUser(cur.sap, 1);
      } else if (currentRole === 'parent') {
        const child = getParentChild(); if (child) updateWaterForUser(child.sap, 1);
      }
      return;
    }
    if (event.target && (event.target.id === 'waterDec' || event.target.closest?.('#waterDec'))) {
      const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
      if (currentRole === 'student') {
        const cur = getCurrentUser(); updateWaterForUser(cur.sap, -1);
      } else if (currentRole === 'parent') {
        const child = getParentChild(); if (child) updateWaterForUser(child.sap, -1);
      }
      return;
    }
    if (event.target && (event.target.id === 'waterReset' || event.target.closest?.('#waterReset'))) {
      const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
      if (currentRole === 'student') {
        const cur = getCurrentUser(); setWaterForUser(cur.sap, 0);
      } else if (currentRole === 'parent') {
        const child = getParentChild(); if (child) setWaterForUser(child.sap, 0);
      }
      return;
    }

    // healthy food controls
    if (event.target && (event.target.id === 'healthyInc' || event.target.closest?.('#healthyInc'))) {
      const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
      if (currentRole === 'student') {
        const cur = getCurrentUser(); updateHealthyForUser(cur.sap, 1);
      }
      return;
    }
    if (event.target && (event.target.id === 'healthyReset' || event.target.closest?.('#healthyReset'))) {
      const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
      if (currentRole === 'student') {
        const cur = getCurrentUser(); setHealthyForUser(cur.sap, 0);
      }
      return;
    }

    if (event.target && (event.target.id === 'saveNutritionSummaryButton' || event.target.closest?.('#saveNutritionSummaryButton'))) {
      saveStudentDailyNutritionSummary();
      return;
    }
  });

  async function ensureUsersLoaded() {
    if (!getUsers().length) {
      try {
        await loadUsers();
      } catch (error) {
        console.warn('No se pudo cargar usuarios desde la API:', error);
      }
    }
  }

  async function renderNutritionCareForStudent(studentSap) {
    if (!nutritionDateSummary || !nutritionCareRecords) return;
    const cleanSap = String(studentSap || '').trim();
    const currentNutritionist = getCurrentUser();
    if (!cleanSap) {
      nutritionDateSummary.innerHTML = '<p>Selecciona un estudiante para ver su historial nutricional.</p>';
      nutritionCareRecords.innerHTML = '<p>No hay atenciones registradas todavia.</p>';
      return;
    }
    try {
      const historyItems = await loadNutritionHistory(cleanSap);
      if (!historyItems.length) {
        nutritionDateSummary.innerHTML = '<p>Este estudiante no tiene resumenes nutricionales guardados.</p>';
      } else {
        const rows = historyItems.map((item) => `<tr><td>${item.summaryDate || '-'}</td><td>${Math.round(Number(item.calories || 0))} kcal</td><td>${Math.round(Number(item.protein || 0))} g</td><td>${Math.round(Number(item.healthy || 0))} / 5</td><td>${Math.round(Number(item.water || 0))} / 8</td></tr>`).join('');
        nutritionDateSummary.innerHTML = `
          <table class="tx-table">
            <thead><tr><th>Fecha</th><th>Calorias</th><th>Proteinas</th><th>Saludables</th><th>Agua</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        `;
      }
    } catch (error) {
      nutritionDateSummary.innerHTML = `<p>No se pudo cargar resumen por fechas: ${error.message}</p>`;
    }
    try {
      const records = await loadNutritionCareRecords({ nutritionistSap: currentNutritionist.sap, studentSap: cleanSap });
      if (!records.length) {
        nutritionCareRecords.innerHTML = '<p>No hay atenciones guardadas para este estudiante.</p>';
      } else {
        const rows = records.map((item) => {
          const bmiTxt = item.bmi ? ` (IMC: ${item.bmi})` : '';
          const weightTxt = item.weight ? `${item.weight} kg` : '-';
          const heightTxt = item.height ? `${item.height} cm` : '-';
          const bpTxt = item.bloodPressure || '-';
          const nextTxt = item.nextDate || '-';
          return `<tr>
            <td>${item.attentionDate}</td>
            <td>${item.status || 'seguimiento'}</td>
            <td>${weightTxt} / ${heightTxt}${bmiTxt}</td>
            <td>${bpTxt}</td>
            <td>${item.assessment || ''}</td>
            <td>${item.plan || ''}</td>
            <td>${nextTxt}</td>
            <td>${item.createdAt ? new Date(item.createdAt).toLocaleString() : '-'}</td>
          </tr>`;
        }).join('');
        nutritionCareRecords.innerHTML = `
          <table class="tx-table">
            <thead><tr><th>Fecha</th><th>Estado</th><th>Peso / Talla</th><th>Presion art.</th><th>Evaluacion</th><th>Plan</th><th>Prox. cita</th><th>Registrado</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        `;
      }
    } catch (error) {
      nutritionCareRecords.innerHTML = `<p>No se pudieron cargar atenciones: ${error.message}</p>`;
    }
  }

  async function renderNutritionRoleWorkspace(users) {
    if (!nutritionCarePanel) return;
    const students = Array.isArray(users) ? users : [];
    nutritionCarePanel.hidden = false;
    // Hide records section by default – shown only after "Consultar" or save
    if (nutritionCareRecords) nutritionCareRecords.hidden = true;
    if (nutritionCareRecordsHead) nutritionCareRecordsHead.hidden = true;
    if (nutritionCareDate && !nutritionCareDate.value) {
      nutritionCareDate.value = getLocalSummaryDate();
    }
    if (nutritionCareStudent) {
      if (!students.length) {
        nutritionCareStudent.innerHTML = '<option value="">No hay estudiantes activos</option>';
        nutritionCareStudent.disabled = true;
      } else {
        nutritionCareStudent.disabled = false;
        const currentValue = String(nutritionCareStudent.value || '').trim();
        nutritionCareStudent.innerHTML = students.map((student) => `<option value="${student.sap}">${student.name} · ${student.course || 'Sin curso'}</option>`).join('');
        if (currentValue && students.some((s) => s.sap === currentValue)) nutritionCareStudent.value = currentValue;
      }
    }
    if (nutritionCareDate) nutritionCareDate.value = getLocalSummaryDate();
    if (nutritionCareState) nutritionCareState.value = 'seguimiento';
    if (nutritionCareWeight) nutritionCareWeight.value = '';
    if (nutritionCareHeight) nutritionCareHeight.value = '';
    if (nutritionCareBMI) nutritionCareBMI.value = '';
    if (nutritionCareBloodPressure) nutritionCareBloodPressure.value = '';
    if (nutritionCareNextDate) nutritionCareNextDate.value = '';
    if (nutritionCareAssessment) nutritionCareAssessment.value = '';
    if (nutritionCarePlan) nutritionCarePlan.value = '';
    if (nutritionCareStatus) nutritionCareStatus.textContent = '';
    await renderNutritionCareForStudent(nutritionCareStudent?.value || students[0]?.sap || '');
  }

  async function renderUserList() {
    if (!userListContainer) return;
    await ensureUsersLoaded();
    const roleFilter = userRoleFilter?.value || '';
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    const currentSap = localStorage.getItem(storageKeys.studentSAP) || '';
    const currentUser = currentRole === 'parent' ? findUserBySAP(currentSap) : null;
    const parentStudents = currentRole === 'parent' ? getParentLinkableStudents() : [];
    const users = currentRole === 'parent'
      ? parentStudents
      : getUsersByRole(roleFilter);
    const totalUsers = getUsers().length;
    const counts = getUserCounts();
    const canManageUsers = ['bar', 'nutrition', 'admin'].includes(currentRole);
    const linkedSaps = normalizeChildSap(currentUser?.childSap);

    if (currentRole === 'nutrition') {
      const activeStudents = getUsersByRole('student').filter((u) => u.active !== false);
      if (roleStats) roleStats.textContent = `Estudiantes activos: ${activeStudents.length}.`;
      if (userPanelNote) {
        userPanelNote.textContent = 'Consulta estudiantes activos y registra atenciones nutricionales con seguimiento por fecha.';
        userPanelNote.classList.remove('manage', 'view');
      }
      if (parentChildControls) parentChildControls.hidden = true;
      if (userEditor) userEditor.hidden = true;
      const actionsBlock = document.querySelector('[data-panel-view="users"] .user-actions');
      if (actionsBlock) actionsBlock.style.display = 'none';
      if (clearUsersButton) clearUsersButton.hidden = true;
      if (refreshUsersButton) refreshUsersButton.hidden = false;
      userListContainer.innerHTML = activeStudents.length
        ? activeStudents.map((student) => `
          <article class="card user-card">
            <div class="user-card-body">
              <strong>${student.name}</strong>
              <p>Curso: ${student.course || 'Sin curso asignado'}</p>
            </div>
            <div class="user-card-actions">
              <button type="button" class="button primary" data-action="select-student-nutrition" data-sap="${student.sap}">Seleccionar para atencion</button>
            </div>
          </article>
        `).join('')
        : '<p>No hay estudiantes activos para mostrar.</p>';
      await renderNutritionRoleWorkspace(activeStudents);
      return;
    }

    if (nutritionCarePanel) nutritionCarePanel.hidden = true;
    const actionsBlock = document.querySelector('[data-panel-view="users"] .user-actions');
    if (actionsBlock) actionsBlock.style.display = '';
    if (userRoleFilter) {
      userRoleFilter.disabled = currentRole === 'parent';
      if (currentRole === 'parent') userRoleFilter.value = 'student';
    }
    if (roleStats) {
      roleStats.textContent = currentRole === 'parent'
        ? `Mostrando ${users.length} estudiante(s) disponibles para vincular. ${linkedSaps.length ? `Hijos actuales: ${linkedSaps.length}.` : 'Aún no hay hijos vinculados.'}`
        : `Mostrando ${users.length} de ${totalUsers} usuarios. ${Object.entries(counts).map(([role, count]) => `${role}: ${count}`).join(' · ')}`;
    }
    if (userPanelNote) {
      if (currentRole === 'parent') {
        userPanelNote.textContent = linkedSaps.length
          ? 'Selecciona otro estudiante para vincularlo como hijo o usa el panel de recargas con el estudiante actual.'
          : 'Selecciona un estudiante de la lista para vincularlo como hijo y poder consultar sus datos y recargar su cuenta.';
      } else {
        userPanelNote.textContent = canManageUsers
          ? 'Tu rol permite consultar, editar SAP, inactivar y eliminar usuarios desde este panel.'
          : 'Tu rol solo permite consultar usuarios; solo Bar, Nutrición y Administrador tienen permisos de gestión.';
      }
      userPanelNote.classList.toggle('manage', canManageUsers && currentRole !== 'parent');
      userPanelNote.classList.toggle('view', !canManageUsers || currentRole === 'parent');
    }
    populateParentChildControls(parentStudents, currentUser);
    if (!users.length) {
      userListContainer.innerHTML = currentRole === 'parent'
        ? '<p>No hay estudiantes activos disponibles para vincular.</p>'
        : '<p>No hay usuarios registrados para ese rol.</p>';
      return;
    }
    userListContainer.innerHTML = users.map((user) => {
      const childList = normalizeChildSap(user.childSap);
      const childInfo = user.role === 'parent'
        ? `<p>${childList.length ? `Hijo(s) vinculados: ${childList.map((sap) => `${getStudentNameBySap(sap) || 'No registrado'} (${sap})`).join(', ')}` : 'No asignado'}</p>`
        : currentRole === 'parent'
          ? `<p>${linkedSaps.includes(user.sap) ? 'Ya vinculado como hijo.' : 'Disponible para vincular como hijo.'}</p>`
        : '';
      return `
      <article class="card user-card">
        <div class="user-card-body">
          <strong>${user.name}</strong>
          <p>Codigo SAP: ${user.sap}</p>
          <p>Rol: ${user.role}</p>
          ${user.course ? `<p>Curso: ${user.course}</p>` : ''}
          ${user.allergies ? `<p>Alergias: ${user.allergies}</p>` : ''}
          ${childInfo}
          <p>Creado: ${new Date(user.createdAt).toLocaleString()}</p>
        </div>
        ${currentRole === 'parent' ? `
          <div class="user-card-actions">
            ${linkedSaps.includes(user.sap)
              ? `<button type="button" class="button danger" data-action="unlink-child" data-sap="${user.sap}">Desvincular</button>`
              : `<button type="button" class="button primary" data-action="link-child" data-sap="${user.sap}">Vincular hijo</button>`}
          </div>
        ` : canManageUsers ? `
          <div class="user-card-actions">
            <button type="button" class="button secondary" data-action="edit-user" data-sap="${user.sap}">Editar</button>
            <button type="button" class="button danger" data-action="delete-user" data-sap="${user.sap}">Eliminar</button>
          </div>
        ` : ''}
      </article>
      `;
    }).join('');
  }

  refreshUsersButton?.addEventListener('click', async () => {
    try {
      await loadUsers();
      renderUserList();
    } catch (error) {
      alert('No se pudo cargar la lista de usuarios: ' + error.message);
    }
  });
  clearUsersButton?.addEventListener('click', async () => {
    await clearAllUsers();
  });

  adminReportFilter?.addEventListener('change', () => {
    renderAdminReportUsers();
  });

  adminReportList?.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-action="toggle-report-user"]');
    if (!button) return;
    const sap = String(button.dataset.sap || '').trim();
    const nextActive = String(button.dataset.nextActive || '1') === '1';
    if (!sap) return;
    try {
      await patchUser(sap, { active: nextActive });
      if (adminReportStatus) {
        adminReportStatus.textContent = `Usuario ${sap} actualizado a estado ${nextActive ? 'activo' : 'inactivo'}.`;
      }
      renderAdminReportUsers();
      renderUserList();
    } catch (error) {
      if (adminReportStatus) adminReportStatus.textContent = `No se pudo actualizar ${sap}: ${error.message}`;
    }
  });
  parentChildSelect?.addEventListener('change', () => {
    const sap = String(parentChildSelect.value || '').trim();
    if (!sap) return;
    localStorage.setItem('parentHistorySap', sap);
    localStorage.setItem('parentWalletSap', sap);
    renderRoleSpecificPanelContent(localStorage.getItem(storageKeys.userRole) || 'parent');
    renderTransactionList();
  });
  linkParentChildButton?.addEventListener('click', () => {
    const sap = String(parentChildSelect?.value || '').trim();
    if (!sap) {
      if (userPanelNote) userPanelNote.textContent = 'Selecciona un estudiante antes de vincularlo.';
      return;
    }
    linkChildToParent(sap).catch((error) => {
      if (userPanelNote) userPanelNote.textContent = `No se pudo vincular el estudiante: ${error.message}`;
    });
  });
  userRoleFilter?.addEventListener('change', renderUserList);
  userListContainer?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const sap = button.dataset.sap;
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    if (button.dataset.action === 'select-student-nutrition') {
      if (currentRole !== 'nutrition') return;
      if (nutritionCareStudent) {
        nutritionCareStudent.value = sap;
      }
      if (nutritionCareDate) nutritionCareDate.value = getLocalSummaryDate();
      if (nutritionCareState) nutritionCareState.value = 'seguimiento';
      if (nutritionCareWeight) nutritionCareWeight.value = '';
      if (nutritionCareHeight) nutritionCareHeight.value = '';
      if (nutritionCareBMI) nutritionCareBMI.value = '';
      if (nutritionCareBloodPressure) nutritionCareBloodPressure.value = '';
      if (nutritionCareNextDate) nutritionCareNextDate.value = '';
      if (nutritionCareAssessment) nutritionCareAssessment.value = '';
      if (nutritionCarePlan) nutritionCarePlan.value = '';
      if (nutritionCareStatus) nutritionCareStatus.textContent = '';
      if (nutritionCareRecords) nutritionCareRecords.hidden = true;
      if (nutritionCareRecordsHead) nutritionCareRecordsHead.hidden = true;
      renderNutritionCareForStudent(sap);
      nutritionCarePanel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (button.dataset.action === 'link-child') {
      if (currentRole !== 'parent') return;
      linkChildToParent(sap).catch((error) => {
        if (userPanelNote) userPanelNote.textContent = `No se pudo vincular el estudiante: ${error.message}`;
      });
      return;
    }
    if (button.dataset.action === 'unlink-child') {
      if (currentRole !== 'parent') return;
      if (!confirm('¿Deseas desvincular este estudiante de tu cuenta de padre?')) return;
      unlinkChildFromParent(sap).catch((error) => {
        if (userPanelNote) userPanelNote.textContent = `No se pudo desvincular el estudiante: ${error.message}`;
      });
      return;
    }
    if (!canManageUsers(currentRole)) return;
    if (button.dataset.action === 'edit-user') {
      const user = findUserBySAP(sap);
      if (user) openUserEditor(user);
      return;
    }
    if (button.dataset.action === 'delete-user') {
      if (!confirm('¿Eliminar este usuario? Esta accion no se puede deshacer.')) return;
      deleteUserBySAP(sap);
      renderUserList();
      return;
    }
  });

  userEditorForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveEditedUser(event);
  });

  cancelEditUserButton?.addEventListener('click', (event) => {
    event.preventDefault();
    closeUserEditor();
  });

  nutritionCareStudent?.addEventListener('change', () => {
    renderNutritionCareForStudent(nutritionCareStudent.value);
  });

  // Auto-calculate BMI when weight or height changes
  function recalcBMI() {
    const w = parseFloat(nutritionCareWeight?.value || '0');
    const h = parseFloat(nutritionCareHeight?.value || '0') / 100;
    if (w > 0 && h > 0 && nutritionCareBMI) {
      const bmi = w / (h * h);
      nutritionCareBMI.value = `${bmi.toFixed(1)} (${bmi < 18.5 ? 'Bajo peso' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Sobrepeso' : 'Obesidad'})`;
    } else if (nutritionCareBMI) {
      nutritionCareBMI.value = '';
    }
  }
  nutritionCareWeight?.addEventListener('input', recalcBMI);
  nutritionCareHeight?.addEventListener('input', recalcBMI);

  nutritionCareLoadRecords?.addEventListener('click', async () => {
    await renderNutritionCareForStudent(nutritionCareStudent?.value || '');
    if (nutritionCareRecords) nutritionCareRecords.hidden = false;
    if (nutritionCareRecordsHead) nutritionCareRecordsHead.hidden = false;
    nutritionCareRecords?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  nutritionCareForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    if (currentRole !== 'nutrition') return;
    const nutritionist = getCurrentUser();
    const studentSap = String(nutritionCareStudent?.value || '').trim();
    const attentionDate = String(nutritionCareDate?.value || '').trim();
    const assessment = String(nutritionCareAssessment?.value || '').trim();
    const plan = String(nutritionCarePlan?.value || '').trim();
    const status = String(nutritionCareState?.value || 'seguimiento').trim();
    const weight = parseFloat(nutritionCareWeight?.value || '0') || 0;
    const height = parseFloat(nutritionCareHeight?.value || '0') || 0;
    const bmiRaw = height > 0 ? weight / Math.pow(height / 100, 2) : 0;
    const bmi = Math.round(bmiRaw * 10) / 10;
    const bloodPressure = String(nutritionCareBloodPressure?.value || '').trim();
    const nextDate = String(nutritionCareNextDate?.value || '').trim();
    if (!studentSap || !attentionDate || !assessment || !plan) {
      if (nutritionCareStatus) nutritionCareStatus.textContent = 'Completa estudiante, fecha, evaluacion y plan.';
      return;
    }
    if (nutritionCareStatus) nutritionCareStatus.textContent = 'Guardando atencion...';
    try {
      await createNutritionCareRecord({
        nutritionistSap: nutritionist.sap,
        studentSap,
        attentionDate,
        assessment,
        plan,
        status,
        weight,
        height,
        bmi,
        bloodPressure,
        nextDate
      });
      if (nutritionCareStatus) nutritionCareStatus.textContent = 'Atencion guardada correctamente.';
      if (nutritionCareRecords) nutritionCareRecords.hidden = false;
      if (nutritionCareRecordsHead) nutritionCareRecordsHead.hidden = false;
      await renderNutritionCareForStudent(studentSap);
      if (nutritionCareDate) nutritionCareDate.value = getLocalSummaryDate();
      if (nutritionCareState) nutritionCareState.value = 'seguimiento';
      if (nutritionCareWeight) nutritionCareWeight.value = '';
      if (nutritionCareHeight) nutritionCareHeight.value = '';
      if (nutritionCareBMI) nutritionCareBMI.value = '';
      if (nutritionCareBloodPressure) nutritionCareBloodPressure.value = '';
      if (nutritionCareNextDate) nutritionCareNextDate.value = '';
      if (nutritionCareAssessment) nutritionCareAssessment.value = '';
      if (nutritionCarePlan) nutritionCarePlan.value = '';
      nutritionCareRecords?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
      if (nutritionCareStatus) nutritionCareStatus.textContent = `No se pudo guardar la atencion: ${error.message}`;
    }
  });

  // Recharge handler for parents
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target) return;
    if (target.id === 'rechargeButton') {
      const amtInput = document.querySelector('#rechargeAmount');
      const walletStatus = document.querySelector('#walletStatus');
      const amount = parseFloat(amtInput?.value || '0');
      if (!amount || Number.isNaN(amount) || amount <= 0) {
        if (walletStatus) walletStatus.textContent = 'Ingresa un monto valido para recargar.';
        return;
      }
      const child = getParentWalletChild();
      if (!child) {
        if (walletStatus) walletStatus.textContent = 'No hay un hijo vinculado a esta cuenta.';
        return;
      }
      const prevBal = Number(child.walletBalance || 0);
      const newBal = prevBal + Number(amount);
      setUserBalance(child.sap, newBal);
      // record recharge transaction (by parent) with prev and new balance
      const parentSap = localStorage.getItem(storageKeys.studentSAP) || '';
      addTransaction(child.sap, { type: 'recharge', amount: amount, meta: { by: parentSap }, prevBalance: prevBal, balance: newBal });
      if (walletStatus) walletStatus.textContent = `Recarga exitosa. Nuevo saldo: $${newBal.toFixed(2)}`;
      if (amtInput) amtInput.value = '';
      renderRoleSpecificPanelContent(localStorage.getItem(storageKeys.userRole) || 'parent');
      renderUserList();
      renderTransactionList();
    }
  });

  // Export CSV handler
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target) return;
    if (target.id === 'exportCsvButton') {
      exportTransactionsToCSV();
      return;
    }
  });

  // Filter change for transactions
  document.addEventListener('change', (event) => {
    const t = event.target;
    if (!t) return;
    if (t.id === 'txFilter') renderTransactionList();
  });

  loginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    const sap = String(data.get('sap') || '').trim();
    const role = String(data.get('role') || 'student');
    if (!sap) {
      if (loginStatus) loginStatus.textContent = 'Introduce tu codigo SAP.';
      return;
    }
    let user = findUserBySAP(sap);
    if (!user) user = await loadUserBySAP(sap);
    if (!user) {
      if (loginStatus) loginStatus.textContent = 'Usuario no encontrado. Regístrate para crear uno nuevo.';
      return;
    }
    if (user.role) {
      if (loginStatus) loginStatus.textContent = '';
      startSession(user.role, user.name, user.sap, user.course, user.allergies);
      loginForm.reset();
      return;
    }
    if (loginStatus) loginStatus.textContent = '';
    startSession(role, user.name, user.sap, user.course, user.allergies);
    loginForm.reset();
  });

  // Autofill and enforce role based on entered SAP
  if (loginSapInput && loginRoleSelect) {
    loginSapInput.addEventListener('input', () => {
      loginRoleSelect.disabled = false;
      if (loginNote) loginNote.textContent = '';
      const loginName = document.querySelector('#loginUserName');
      if (loginName) loginName.textContent = '';
    });
    loginSapInput.addEventListener('blur', async () => {
      const sapVal = String(loginSapInput.value || '').trim();
      const loginName = document.querySelector('#loginUserName');
      if (!sapVal) {
        loginRoleSelect.disabled = false;
        if (loginNote) loginNote.textContent = '';
        if (loginName) loginName.textContent = '';
        return;
      }
      let user = findUserBySAP(sapVal);
      if (!user) user = await loadUserBySAP(sapVal);
      if (user) {
        loginRoleSelect.value = user.role || 'student';
        loginRoleSelect.disabled = true;
        if (loginNote) loginNote.textContent = `Usuario encontrado: ${user.name}. Rol fijado a "${user.role}".`;
        if (loginName) loginName.textContent = `Nombre: ${user.name}`;
      } else {
        loginRoleSelect.disabled = false;
        if (loginNote) loginNote.textContent = 'Usuario no encontrado — puedes crear una cuenta en Registrarse.';
        if (loginName) loginName.textContent = '';
      }
    });
  }

  registerForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(registerForm);
    const name = String(data.get('name') || '').trim();
    const sap = String(data.get('sap') || '').trim();
    const role = String(data.get('role') || 'student');
    const course = String(data.get('course') || '').trim();
    const allergies = String(data.get('allergies') || '').trim();
    const childSap = role === 'parent'
      ? data.getAll('childSap').map((value) => String(value || '').trim()).filter(Boolean)
      : [];
    if (!name || !sap || !role) {
      if (registerStatus) registerStatus.textContent = 'Completa nombre, codigo SAP y rol para registrarte.';
      return;
    }
    try {
      await addOrUpdateUser({ name, sap, role, course, allergies, childSap });
      if (registerStatus) registerStatus.textContent = 'Usuario creado exitosamente. Iniciando sesión...';
      startSession(role, name, sap, course, allergies);
      if (typeof populateStudentSelects === 'function') populateStudentSelects();
      registerForm.reset();
    } catch (error) {
      if (registerStatus) registerStatus.textContent = 'Error al registrar usuario: ' + error.message;
    }
  });

  // Show/hide child selector on registration role change
  registerForm?.querySelector('[name="role"]')?.addEventListener('change', (e) => {
    const isParent = e.target.value === 'parent';
    const label = document.querySelector('#registerChildLabel');
    if (label) label.hidden = !isParent;
    if (!isParent && registerForm) {
      Array.from(registerForm.elements.childSap?.options || []).forEach((option) => {
        option.selected = false;
      });
    }
  });

  // Show/hide child selector in editor when role changes
  userEditorForm?.querySelector('[name="editRole"]')?.addEventListener('change', (e) => {
    const isParent = e.target.value === 'parent';
    const label = document.querySelector('#userEditorChildLabel');
    if (label) label.hidden = !isParent;
    if (!isParent && userEditorForm) {
      Array.from(userEditorForm.elements.editChildSap?.options || []).forEach((option) => {
        option.selected = false;
      });
    }
  });

  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = String(data.get('nombre') || '').trim();
    const role = String(data.get('rol') || '').trim();
    const message = String(data.get('mensaje') || '').trim();
    if (!name || !role || !message) {
      contactStatus.textContent = 'Completa nombre, rol y mensaje.';
      contactForm.querySelector(':invalid')?.focus();
      return;
    }
    const subject = encodeURIComponent(`Consulta NutriScan - ${role}`);
    const body = encodeURIComponent(`Nombre: ${name}\nRol: ${role}\n\nMensaje:\n${message}`);
    const mailto = `mailto:nutriscan.demo@example.com?subject=${subject}&body=${body}`;
    contactStatus.textContent = 'Abriendo cliente de correo...';
    try {
      window.open(mailto, '_blank');
    } catch (e) {
      window.location.href = mailto;
    }
  });

  contactWhatsapp?.addEventListener('click', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = String(data.get('nombre') || '').trim();
    const role = String(data.get('rol') || '').trim();
    const message = String(data.get('mensaje') || '').trim();
    if (!name || !role || !message) {
      contactStatus.textContent = 'Completa nombre, rol y mensaje antes de enviar por WhatsApp.';
      contactForm.querySelector(':invalid')?.focus();
      return;
    }
    const waNumber = '593999056335';
    const text = `Consulta NutriScan - ${role}%0A%0ANombre: ${encodeURIComponent(name)}%0A%0AMensaje:%0A${encodeURIComponent(message)}`;
    const waUrl = `https://wa.me/${waNumber}?text=${text}`;
    contactStatus.textContent = 'Abriendo WhatsApp...';
    window.open(waUrl, '_blank');
  });

  settingsForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(settingsForm);
    const saved = {
      notify: String(data.get('notify') || 'Activadas'),
      language: String(data.get('language') || 'Espanol')
    };
    localStorage.setItem(storageKeys.settings, JSON.stringify(saved));
    settingsStatus.textContent = 'Configuracion guardada correctamente.';
  });

  startScanButton?.addEventListener('click', startScanner);
  capturePhotoButton?.addEventListener('click', capturePhoto);
  stopScanButton?.addEventListener('click', () => {
    stopScanner();
    showScanResult('Camara detenida.');
  });

  scanForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    if (currentRole === 'student') {
      // treat as register food
      const current = getCurrentUser();
      const calories = estimateCaloriesFromImage(photoPreview?.src || '');
      const healthyChecked = document.querySelector('#markHealthy')?.checked;
      const healthyPortions = Number(document.querySelector('#healthyPortions')?.value || 0);
      const data = { calories, photoLabel: 'Lunch (manual)' };
      if (healthyChecked || healthyPortions > 0) data.healthyPortions = healthyPortions || 1;
      updateLunchForUser(current.sap, data);
      showScanResult(`Lunch registrado: ${calories} kcal.${(data.healthyPortions? ' Marcado saludable: '+data.healthyPortions+' porciones.' : '')}`);
    } else {
      // parents can mark healthy too when registering codes
      const healthyChecked = document.querySelector('#markHealthy')?.checked;
      const healthyPortions = Number(document.querySelector('#healthyPortions')?.value || 0);
      registerScan(manualCodeInput?.value, 'manual', { healthyPortions: healthyChecked ? (healthyPortions || 1) : 0 });
    }
    if (manualCodeInput) manualCodeInput.value = '';
  });

  photoInput?.addEventListener('change', () => {
    if (photoInput.files?.length) {
      const file = photoInput.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => savePhoto(String(reader.result || ''), file.name));
      reader.readAsDataURL(file);
    }
  });

  processPhotoButton?.addEventListener('click', () => {
    // process the currently loaded preview photo
    const currentRole = localStorage.getItem(storageKeys.userRole) || 'student';
    const dataUrl = photoPreview?.src || localStorage.getItem('lastLunchPhoto');
    if (!dataUrl) return alert('No hay foto cargada para procesar.');
    const calories = estimateCaloriesFromImage(dataUrl);
    const healthyChecked = document.querySelector('#markHealthy')?.checked;
    const healthyPortions = Number(document.querySelector('#healthyPortions')?.value || 0);
    const payload = { calories, photoUrl: dataUrl, photoLabel: 'Lunch (foto)' };
    if (healthyChecked || healthyPortions > 0) payload.healthyPortions = healthyPortions || 1;
    if (currentRole === 'parent') {
      const child = getParentChild();
      if (!child) return alert('No hay hijo vinculado para procesar la foto.');
      updateLunchForUser(child.sap, payload);
      alert(`Procesado: ${calories} kcal registrado para ${child.name}${payload.healthyPortions? ' (+ saludable: '+payload.healthyPortions+' porciones)' : ''}`);
    } else {
      const current = getCurrentUser();
      updateLunchForUser(current.sap, payload);
      alert(`Procesado: ${calories} kcal registrado para ${current.name}${payload.healthyPortions? ' (+ saludable: '+payload.healthyPortions+' porciones)' : ''}`);
    }
  });

  snackForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const amount = Number(snackPrice?.value || 0);
    const photoName = snackPhoto?.files?.[0]?.name || '';
    const estimated = estimateMealNutrition({
      mealType: 'media_manana',
      amount,
      photoName
    });
    const nutrition = {
      calories: Number(snackCalories?.value || estimated.calories || 0),
      protein: Number(snackProtein?.value || estimated.protein || 0)
    };
    const result = registerBarConsumption({
      studentSap: snackStudent?.value,
      amount,
      mealType: 'media_manana',
      photoName,
      nutrition
    });
    if (snackStatus) snackStatus.textContent = result.message;
    if (!result.ok) return;
    snackForm.reset();
    if (snackCalories) snackCalories.value = '';
    if (snackProtein) snackProtein.value = '';
    fillBarStudentSelects();
    renderRoleSpecificPanelContent('bar');
    renderTransactionList();
  });

  lunchMealForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const amount = Number(lunchPrice?.value || 0);
    const photoName = lunchPhoto?.files?.[0]?.name || '';
    const estimated = estimateMealNutrition({
      mealType: 'lunch',
      amount,
      photoName
    });
    const nutrition = {
      calories: Number(lunchCalories?.value || estimated.calories || 0),
      protein: Number(lunchProtein?.value || estimated.protein || 0)
    };
    const result = registerBarConsumption({
      studentSap: lunchStudent?.value,
      amount,
      mealType: 'lunch',
      photoName,
      nutrition
    });
    if (lunchStatus) lunchStatus.textContent = result.message;
    if (!result.ok) return;
    lunchMealForm.reset();
    if (lunchCalories) lunchCalories.value = '';
    if (lunchProtein) lunchProtein.value = '';
    fillBarStudentSelects();
    renderRoleSpecificPanelContent('bar');
    renderTransactionList();
  });

  snackPhoto?.addEventListener('change', () => {
    if (!snackStatus || !snackPhoto?.files?.length) return;
    const amount = Number(snackPrice?.value || 0);
    const photoName = snackPhoto.files[0].name;
    const nutrition = estimateMealNutrition({ mealType: 'media_manana', amount, photoName });
    if (snackCalories) snackCalories.value = String(Math.round(Number(nutrition.calories || 0)));
    if (snackProtein) snackProtein.value = String(Math.round(Number(nutrition.protein || 0)));
    snackStatus.textContent = `Foto cargada: ${photoName}. Estimado automático: ${nutrition.calories} kcal · ${nutrition.protein} g proteína.`;
  });

  lunchPhoto?.addEventListener('change', () => {
    if (!lunchStatus || !lunchPhoto?.files?.length) return;
    const amount = Number(lunchPrice?.value || 0);
    const photoName = lunchPhoto.files[0].name;
    const nutrition = estimateMealNutrition({ mealType: 'lunch', amount, photoName });
    if (lunchCalories) lunchCalories.value = String(Math.round(Number(nutrition.calories || 0)));
    if (lunchProtein) lunchProtein.value = String(Math.round(Number(nutrition.protein || 0)));
    lunchStatus.textContent = `Foto cargada: ${photoName}. Estimado automático: ${nutrition.calories} kcal · ${nutrition.protein} g proteína.`;
  });

  productForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = String(productNameInput?.value || '').trim();
    const price = Number(productPriceInput?.value || 0);
    const id = Number(productIdInput?.value || 0);
    if (!name || Number.isNaN(price) || price < 0) {
      if (productStatus) productStatus.textContent = 'Ingresa nombre y precio valido.';
      return;
    }
    try {
      if (id) {
        await updateProduct(id, { name, price });
        if (productStatus) productStatus.textContent = 'Producto actualizado correctamente.';
      } else {
        await createProduct({ name, price, active: true });
        if (productStatus) productStatus.textContent = 'Producto creado correctamente.';
      }
      resetProductForm();
      renderProducts();
      fillVariousSalesProducts();
    } catch (error) {
      if (productStatus) productStatus.textContent = `Error: ${error.message}`;
    }
  });

  clearProductFormButton?.addEventListener('click', () => {
    resetProductForm();
    if (productStatus) productStatus.textContent = '';
  });

  productsTableContainer?.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const id = Number(button.dataset.id || 0);
    if (!id) return;
    try {
      if (button.dataset.action === 'edit-product') {
        const product = getProducts().find((p) => p.id === id);
        if (!product) return;
        if (productIdInput) productIdInput.value = String(product.id);
        if (productNameInput) productNameInput.value = product.name;
        if (productPriceInput) productPriceInput.value = String(product.price);
        if (saveProductButton) saveProductButton.textContent = 'Actualizar producto';
        if (productStatus) productStatus.textContent = `Editando: ${product.name}`;
        return;
      }
      if (button.dataset.action === 'toggle-product') {
        const currentActive = button.dataset.active === '1';
        await updateProduct(id, { active: !currentActive });
        if (productStatus) productStatus.textContent = currentActive ? 'Producto desactivado.' : 'Producto activado.';
        renderProducts();
        fillVariousSalesProducts();
      }
    } catch (error) {
      if (productStatus) productStatus.textContent = `Error: ${error.message}`;
    }
  });

  variousSalesProduct?.addEventListener('change', () => {
    updateVariousSalesTotal();
  });

  variousSalesQty?.addEventListener('input', () => {
    updateVariousSalesTotal();
  });

  variousSalesQty?.addEventListener('change', () => {
    updateVariousSalesTotal();
  });

  variousSalesForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const studentSap = String(variousSalesStudent?.value || '').trim();
    const quantity = Math.max(1, Number(variousSalesQty?.value || 1));
    const product = getSelectedVariousProduct();
    const result = registerBarProductSale({ studentSap, quantity, product });
    if (variousSalesStatus) variousSalesStatus.textContent = result.message;
    if (!result.ok) return;
    if (variousSalesQty) variousSalesQty.value = '1';
    updateVariousSalesTotal();
    fillBarStudentSelects();
    renderRoleSpecificPanelContent('bar');
    renderTransactionList();
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.querySelector(`[data-view="${hash}"]`)) routeTo(hash);
  });

  restoreSettings();
  applyLanguage(localStorage.getItem('language') || currentLanguage || 'es');
  restoreScanState();
  try {
    await loadUsers();
    await loadProducts();
  } catch (error) {
    console.warn('No se pudo cargar los usuarios iniciales:', error);
  }
  if (typeof populateStudentSelects === 'function') populateStudentSelects();
  showRedirectNotice();
  updateAuthRouteVisibility();
  if (!await restoreSessionFromDb() && !restoreSession()) {
    const initial = window.location.hash.replace('#', '') || 'inicio';
    routeTo(document.querySelector(`[data-view="${initial}"]`) ? initial : 'inicio');
  }
})();
