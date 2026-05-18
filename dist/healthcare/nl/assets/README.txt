=====================================================
 ASSETS DE LA LANDING PAGE — HEALTHCARE & SOCIAL CARE
=====================================================

Esta carpeta contiene todos los assets locales que la landing
healthcare v2 necesita.

-----------------------------------------------------
 1) MLM LOGO  (header)  [YA SHIPPEADO]
-----------------------------------------------------
Filename : mlm-logo.png
Path     : assets/mlm-logo.png

Ya esta en la carpeta. NO regenerar.

-----------------------------------------------------
 2) HERO POSTER  [Unsplash URL en HTML — opcional override local]
-----------------------------------------------------
Filename si lo descargas local : hero-poster.jpg
Path                            : assets/hero-poster.jpg

Por ahora el HTML referencia una URL de Unsplash directamente
(doctor con tablet en clinical setting). Si queres usar una
foto propia o de otro source, descargala como hero-poster.jpg
y cambia el atributo poster="" del <video> en el HTML para
apuntar a "./assets/hero-poster.jpg".

Sugerencias de busqueda Unsplash :
 - "doctor stethoscope tablet"
 - "hospital nurse care"
 - "clinician computer EMR"
 - "modern hospital interior"

EVITAR : stock de pacientes ancianos genericos, fotos con
muchos logos visibles, escenas demasiado dramaticas tipo ER.

-----------------------------------------------------
 3) HERO BACKGROUND VIDEO (opcional)
-----------------------------------------------------
Filename : hero-video.mp4
Path     : (en la misma carpeta que el .html)

EN HEALTHCARE EL VIDEO ES IMPORTANTE PERO TIENE QUE SER SOBRIO.
Para healthcare buyer (CMO, COO de hospital, CFO) el video
debe transmitir solidez clinica y calma operativa, no urgencia.

Apuntar a "calm clinical professionalism" :
 - Cinematica, slow-mo, sin urgencia
 - Una sola accion centrada (no collage de ER scenes)
 - Loop limpio (8-12 segundos)
 - No texto, no graficos overlay, no logos

Sugerencias de escenas Pexels / Coverr / Mixkit :
  Clinical workflow :
    "doctor tablet rounds", "nurse station calm", "EMR screen close-up"
  Modern facility :
    "modern hospital corridor", "operating room overhead", "lab equipment slow motion"
  Care interactions (carefully) :
    "doctor patient consultation slow motion", "telehealth consultation"

EVITAR : escenas de emergencia, sangre, dolor visible, escenas
sensacionalistas tipo grey's anatomy.

-----------------------------------------------------
 4) CHRISTOPHER'S PHOTO  [YA SHIPPEADO]
-----------------------------------------------------
Filename : christopher.jpg
Path     : assets/christopher.jpg

Ya esta copiada. Si en el futuro hay un vertical lead para
healthcare (alguien con background en hospital ops o health IT),
reemplazar con esa foto y ajustar el copy del Christopher card.

-----------------------------------------------------
 5) MLM APPROACH BACKGROUND  [Unsplash URL en HTML]
-----------------------------------------------------
Filename si lo descargas local : mlm-approach-bg.jpg
Path                            : assets/mlm-approach-bg.jpg

Por ahora el HTML referencia una URL de Unsplash directamente
(modern hospital corridor). Si queres usar una foto propia,
descargala como mlm-approach-bg.jpg y cambia la url() en el CSS
del .sec-approach para apuntar a "./assets/mlm-approach-bg.jpg".

Sugerencias :
 - Hospital corridor moderno (no genericos viejos)
 - OR / quirofano de alta tecnologia
 - Lab con equipos sofisticados
 - Telehealth station / control room

-----------------------------------------------------
 NOTA TECNICA
-----------------------------------------------------
Las URLs de Unsplash en el HTML son para que la pagina
renderice out-of-the-box con imagery healthcare apropiada.
Cuando el equipo tenga sus propias fotos (idealmente de
clientes reales o de fotografos de healthcare), reemplazar
las URLs con archivos locales en /assets/.

-----------------------------------------------------
 GAPS DE CONVERSION CONOCIDOS (pendientes futuros)
-----------------------------------------------------
 - Logo wall de clientes (entre reg-ribbon y KPI bar)
 - Seccion de metodologia 4 pasos (Discover, Design, Build, Live)
 - Comparativo "Why MLM" vs traditional consulting / build-yourself
 - Cases anonimizados o reales (cuando haya proof publicable
   de hospitales reales)
