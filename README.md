# NUTRISCAN
Plataforma inteligente de alimentación escolar para monitoreo nutricional, pagos internos, alertas preventivas y gamificación saludable.
<img width="1016" height="664" alt="LOGO" src="https://github.com/user-attachments/assets/f0756180-6784-4792-bf12-3028c4c73c56" />
## Estructura del proyecto
- `index.html` — landing page principal y acceso a los dashboards (estudiante, padres, bar escolar, nutricionista).
- `1B.html` … `7E.html` — pantallas/prototipos individuales por rol y flujo (B = Bar, E = Estudiante, G = Gestión/General, P = Padres).
- `*.png` / `*.jpeg` — avatares, logos e ilustraciones usadas en las páginas.
- `*.pdf` / `*.docx` — documentación del proyecto (investigación, whitepaper, cronograma, encuestas).

## Arquitectura del proyecto
NutriScan está diseñado en capas, seguro y escalable:
Capa de Usuarios: Estudiantes, padres, docentes, nutricionista, catering y administración.
Capa de Acceso: Plataforma web responsiva + concepto de Tótem Inteligente (punto físico con pantalla en la institución).
Capa Frontend: HTML5, CSS3, JavaScript vanilla, Tailwind CSS. 38 pantallas interactivas organizadas por rol.
Capa Backend — Firebase: Firestore (base de datos), Firebase Auth (autenticación), Firebase Storage (imágenes), Cloud Functions (lógica de negocio con Admin SDK).
Motor de IA: Google Cloud Vision API para identificación de alimentos por fotografía.
Capa de Seguridad: Cloud Functions como única vía autorizada para escribir datos críticos (saldo, EightCoins, alertas). Firestore Security Rules por rol.
Escalabilidad hacia Blockchain: La arquitectura de Cloud Functions y el modelo de datos están diseñados para agregar una capa Blockchain (registro inmutable de eventos críticos) en la versión de producción sin rediseño estructural.
<img width="1657" height="576" alt="Arquitectura_NutriScan_v1" src="https://github.com/user-attachments/assets/1f513d2d-7611-4c90-8341-fd104cb247cb" />
## Arquitectura del Sistema
NutriScan está compuesto por los siguientes módulos:
- Estudiante
Registro de consumo
Perfil
EightCoins
Recompensas
- Padres
Seguimiento de hábitos
Reportes
Alertas
- Bar Escolar
Gestión de ventas
Registro de consumos
- Nutricionista
Seguimiento nutricional
Recomendaciones
- Docente
Alertas de alimentación
Seguimiento general
- Administrador (Fase futura)
Configuración institucional
Reportes globales
## Stack técnico
- HTML5 + CSS3 (estilos inline por página)
- [Tailwind CSS](https://tailwindcss.com/) vía CDN
- [Lucide Icons](https://lucide.dev/) vía CDN
- JavaScript vanilla (sin frameworks ni backend conectado; los datos mostrados son simulados/mock)

# Integrantes
– Líder: David Núnez 
 – Secretario: Carlos Cruz
 – Diseñador: Amelia Bueno 
 – Investigador: Valentina Hernández
# Problema que se quiere resolver
En Eight Academy se identifican diversas situaciones relacionadas con la alimentación escolar que pueden afectar el bienestar de los estudiantes:
Padres sin información inmediata
Estudiantes que no comen a tiempo
Filas largas en el bar escolar
Riesgos por alergias o restricciones alimenticias
Falta de seguimiento nutricional organizado
Baja motivación hacia hábitos saludables
# Propuesta de solución y cómo funciona.
La solución propuesta es NutriScan, una plataforma inteligente de alimentación escolar que conecta tecnología, nutrición y educación.
# Solución propuesta
NutriScan permite:
Identificar estudiantes de forma rápida
Consultar saldo, lunch, alergias y menú
Registrar historial de consumo
Realizar pagos internos desde NutriScan Wallet
Generar EightCoins por hábitos saludables
Mostrar el estado del estudiante mediante un Avatar Nutricional
Enviar alertas a padres, docentes y nutricionista
Programar citas nutricionales
Proteger información mediante Blockchain.
# ODS al que se vincula
ODS 3 — Salud y Bienestar: registro de alergias, historial de consumo, alertas preventivas, EightCoins para motivar hábitos saludables
ODS 4 — Educación de Calidad (nuevo, reemplaza ODS 2): biblioteca nutricional, análisis de fotos por IA como retroalimentación, paneles educativos por rol, acompañamiento familiar y docente
ODS 9 — Innovación e Infraestructura: Firebase, Google Cloud Vision, NutriWallet, EightCoins, arquitectura multi-rol — con tecnologías reales del proyecto
# Tecnologías que se usarán
Inteligencia Artificial.
Blockchain.
NutriScan Wallet.
EightCoins.
Desarrollo web.
Base de datos en la nube.
Firebase.
Dashboards interactivos.
Diseño UI/UX.
Código SAP.
Avatar Nutricional Interactivo.
Tótem Inteligente.
Paneles Inteligentes;
# Validacion del Mercado
## Encuesta digital:
Se aplicó una encuesta digital en Eight Academy durante junio 2025. Se obtuvieron 52 respuestas válidas distribuidas en tres segmentos de usuarios: estudiantes (n=20), docentes (n=30) y personal del bar/catering (n=2).
https://docs.google.com/document/d/1ypkRaBw1IamOtqYknleptn7EIzk6dksKC63busNnTkM/edit?usp=drive_link
## Entrevista a: 
### Nutricionista 
https://drive.google.com/file/d/1eRui02g90H308NjMZhwpsPdHXktW57id/view?usp=drive_link
### Servicio de Catering "Sumo y Resto".
https://drive.google.com/file/d/1oU0GeQTOSw8NVWTXVkTQaTsOFaLzgGYR/view?usp=drive_link
# Documentación
## Página Web
https://kpmonserrateq-hash.github.io/NUTRISCAN/#inicio
## Arquitectura en figma
https://half-pear-30137326.figma.site/
## Video Demo
https://drive.google.com/file/d/1kaO_vrdVseaKXUM8WVpm09GMMbvlHSRK/view?usp=drive_link
## Presentación.
https://docs.google.com/presentation/d/1lH7aYlEV6InCriuzth0_ADfn6DGOZ8Xa/edit?usp=drive_link&ouid=101896877784773350938&rtpof=true&sd=true
## Infografía
<img width="1024" height="1536" alt="ChatGPT Image 17 jun 2026, 07_28_23 p m" src="https://github.com/user-attachments/assets/69248f0b-4691-40f3-afe3-95a68737b251" />
