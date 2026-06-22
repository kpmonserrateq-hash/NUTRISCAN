# NutriScan

Proyecto SPA + backend Express para roles de estudiante/padre/bar/nutricion, wallet, recargas, historial, escaneo y seguimiento de habitos.

## Ejecucion local

1. Instala dependencias:
   - `npm install`
2. Inicia servidor y frontend en el mismo puerto:
   - `npm start`
3. Abre:
   - `http://localhost:3000/`

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
