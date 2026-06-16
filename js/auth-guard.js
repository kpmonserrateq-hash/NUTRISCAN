/**
 * Protege las pantallas internas de NutriScan: si no hay sesión activa,
 * redirige a index.html. Si el rol del usuario no corresponde al panel que
 * está abriendo, lo redirige a su propio panel.
 */
(function () {
  const PANEL_POR_ROL = {
    padre: '1P.html',
    bar: '1B.html',
    nutricionista: '1N.html',
    docente: '1D.html',
    estudiante: 'index.html',
  };

  const PREFIJO_POR_ROL = {
    padre: 'P',
    bar: 'B',
    nutricionista: 'N',
    docente: 'D',
  };

  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = 'index.html';
      return;
    }

    const snap = await db.collection('usuarios').doc(user.uid).get();
    if (!snap.exists) {
      window.location.href = 'index.html';
      return;
    }

    const role = snap.data().role;
    const archivoActual = window.location.pathname.split('/').pop();
    const prefijoEsperado = PREFIJO_POR_ROL[role];

    // Si el rol tiene un panel propio (padre/bar/nutricionista/docente) y el
    // archivo actual no pertenece a ese panel (ej. un padre abriendo 1N.html),
    // lo regresamos a su panel correcto.
    if (prefijoEsperado && !archivoActual.endsWith(prefijoEsperado + '.html')) {
      window.location.href = PANEL_POR_ROL[role];
    }
  });
})();
