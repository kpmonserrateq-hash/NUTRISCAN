REPLACE
Proyecto backend + SPA ligero usando SQLite embebida. El repositorio está organizado para poder trabajar **localmente** o desde GitHub (Codespaces / Actions).

Rápido — ejecutar en local:

```bash
git clone <tu-repo-url>
cd "Nutriscan 2"
npm ci
npm run seed    # crea/actualiza data/nutriscan.db
npm start       # arranca API en http://localhost:3000
```

Abrir en el navegador: http://localhost:3000

Archivos importantes:
- `server/index.js` — servidor Express + API
- `server/db.js` — migraciones y conexión SQLite
- `public/` — SPA y assets estáticos servidos por Express
- `data/nutriscan.db` — base de datos SQLite (seed incluida)

Automatización en GitHub:
- `.github/workflows/seed-and-commit.yml` — workflow que ejecuta `npm run seed` y commit/pu.sh de `data/nutriscan.db` cuando corresponde.

Desarrollo en GitHub Codespaces / DevContainer:
1. Abre el repositorio en Codespaces o usa `Remote - Containers` en VS Code.
2. El contenedor (si se crea) ejecuta `npm ci` y `npm run seed` en `postCreateCommand`.

Notas:
- Si quieres desplegar el backend en producción, recomiento un servicio que soporte Node y archivos persistentes (DigitalOcean App Platform, Render, o un droplet). GitHub Pages sólo sirve la parte estática.

Si quieres, configuro el deploy automático a un servicio (Render/Heroku/Vercel) o preparo un `Procfile`/`Dockerfile`.

## Deploy automático a Render

1. Crea un servicio Web en Render y conéctalo a este repositorio.
2. Asegura que la rama de deploy sea `main`.
3. En GitHub, agrega estos secrets en Settings > Secrets:
   - `RENDER_API_KEY`
   - `RENDER_SERVICE_ID`
4. Cada push a `main` activará `.github/workflows/deploy-render.yml` y disparará el despliegue en Render.

Para Render, el `Dockerfile` ya está listo y el servicio debe iniciarse en el puerto `3000`.
# NutriScan

Proyecto SPA + backend Express para roles de estudiante/padre/bar/nutricion, wallet, recargas, historial, escaneo y seguimiento de habitos.

## Ejecucion local

1. Instala dependencias:
   - `npm install`
2. Inicia servidor y frontend en el mismo puerto:
   - `npm start`
3. Abre:
   - `http://localhost:3000/`

## Ejecución en GitHub Pages

Este proyecto ahora soporta una versión estática para GitHub Pages. En ese modo:

- No se requiere ejecutar `server.js` en el host estático.
- Los datos se almacenan y simulan en el navegador usando `localStorage`.
- El sitio puede publicarse desde la rama `published-local`.
- Las funciones de usuarios, productos, historial y estado funcionan localmente en el navegador.

Si quieres usar un backend real, debes desplegar `server.js` en un host Node y configurar `window.NUTRISCAN_API_BASE` para apuntar a ese servicio.

## Persistencia en base de datos

- La informacion critica se guarda en SQLite.
- Base de datos por defecto: `data/nutriscan.db`.
- Se crean tablas automaticamente al iniciar (`users`, `products`, `app_state`).
- Tambien puedes cambiar carpeta de datos con variable de entorno:
  - `NUTRISCAN_DATA_DIR=/ruta/datos npm start`

## Portabilidad (copiar carpeta a otra computadora)

Para no perder informacion ni funcionalidad, copia toda la carpeta del proyecto incluyendo:

- `data/nutriscan.db`
- `package.json`
- `server.js`, `db.js`, `app.js`, `index.html`, `styles.css`, `images/`

Recomendacion: no copiar `node_modules` entre Linux y Windows. Si se copia, `ejecutar-nutriscan-windows.bat` lo repara automaticamente.

Luego en la nueva computadora:

1. `npm install`
2. `npm start`
3. abrir `http://localhost:3000/`

## Ejecutar en Windows (forma mas sencilla)

1. Copia toda la carpeta del proyecto en la PC Windows.
2. Haz doble clic en:
   - `ejecutar-nutriscan-windows.bat`

Que hace este archivo automaticamente:

- intenta instalar Node.js LTS si no existe (con `winget` o instalador local en `instaladores/`)
- instala dependencias si es la primera vez
- repara `node_modules` cuando detecta binarios incompatibles
- inicia el servidor en `http://localhost:3000`
- abre `http://localhost:3000/` en el navegador

Nota: deja abierta la ventana de servidor mientras uses NutriScan.

### Si aparece "no es una aplicacion Win32 valida" (sqlite3)

Ese error ocurre cuando `node_modules` se copio desde otro sistema operativo (por ejemplo Linux) y los binarios nativos no coinciden con Windows.

Solucion recomendada:

1. Ejecuta de nuevo `ejecutar-nutriscan-windows.bat`.
2. El script detecta el problema y reinstala dependencias automaticamente para Windows.

Solucion manual (si hace falta):

1. Borra carpeta `node_modules`.
2. Ejecuta `npm install`.
3. Ejecuta `npm start`.

Tambien puedes usar reparacion de un clic:

1. Ejecuta `reparar-dependencias-windows.bat`.
2. Cuando termine, ejecuta `ejecutar-nutriscan-windows.bat`.

Si copias `data/nutriscan.db`, conservas usuarios, productos, transacciones y estado de sesion persistido.

## Archivos clave

- `index.html` - UI principal
- `app.js` - logica SPA y consumo de API
- `styles.css` - estilos
- `server.js` - API REST y archivos estaticos
- `db.js` - conexion SQLite y migraciones
- `data/nutriscan.db` - base de datos local
