(function () {
  const PANEL_POR_ROL = { padre:'1P.html', bar:'1B.html', nutricionista:'1N.html', docente:'1D.html', estudiante:'index.html' };
  const PREFIJO_POR_ROL = { padre:'P', bar:'B', nutricionista:'N', docente:'D' };
  auth.onAuthStateChanged(async (user) => {
    if (!user) { window.location.href='index.html'; return; }
    const snap = await db.collection('usuarios').doc(user.uid).get();
    if (!snap.exists) { window.location.href='index.html'; return; }
    const role = snap.data().role;
    const archivo = window.location.pathname.split('/').pop();
    const prefijo = PREFIJO_POR_ROL[role];
    if (prefijo && !archivo.endsWith(prefijo+'.html')) window.location.href = PANEL_POR_ROL[role];
  });
})();
