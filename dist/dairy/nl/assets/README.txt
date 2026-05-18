=====================================================
 ASSETS DE LA LANDING PAGE — DAIRY
=====================================================

Esta carpeta contiene todos los assets locales que la landing necesita.
Si falta alguno (salvo el logo), el HTML tiene un fallback automatico
(Unsplash o iniciales).

-----------------------------------------------------
 1) MLM LOGO  (header)  [ya shippeado]
-----------------------------------------------------
Filename : mlm-logo.png
Path     : assets/mlm-logo.png

Dimensiones : 800 x 349 px (transparente)
Formato     : PNG con fondo transparente
Contenido   : wordmark negro "MACHINES / LIKE / ME" apilado en 3 lineas

El archivo ya esta en la carpeta. El HTML lo referencia via:
  <img src="./assets/mlm-logo.png" alt="Machines Like Me">
con height:38px, max-width:110px en CSS.

-----------------------------------------------------
 2) CHRISTOPHER'S PHOTO  [ya shippeado]
-----------------------------------------------------
Filename : christopher.jpg
Path     : assets/christopher.jpg

Tamano recomendado : 800 x 800 px (cuadrada)
Formato            : JPG o WebP

Fallback: Unsplash placeholder -> iniciales "CM" sobre degrade azul.

-----------------------------------------------------
 3) MLM APPROACH BACKGROUND  [pendiente]
-----------------------------------------------------
Filename : mlm-approach-bg.jpg
Path     : assets/mlm-approach-bg.jpg

Tamano recomendado : 2000 x 1400 px (paisaje)
Contenido          : foto real de dairy — planta de procesamiento, tanque
                     de leche, linea de llenado de yogur, maduracion de
                     queso, o granja de ganado lechero. NO bandera, NO
                     logos de marcas reales, NO texturas abstractas.

Sugerencias de busqueda en Unsplash/Pexels:
  - "dairy processing plant"
  - "milk tanker"
  - "cheese maturation cave"
  - "dairy production line"
  - "modern dairy farm"

Sin este archivo, el fondo de la seccion "MLM Approach" queda lavanda
plano (se ve bien igual, pero pierde la conexion visual con la industria).

-----------------------------------------------------
 4) HERO VIDEO (opcional)
-----------------------------------------------------
Filename : hero-video.mp4
Path     : (raiz del HTML, no en assets/)

Recomendado : 10-20s loop, silencioso, 1920x1080, H.264, < 8 MB
Contenido   : vaca lechera, tanque de leche girando, linea de filling,
              corte de queso, o mantequilla en proceso.

Fuentes gratis: pexels.com/videos, coverr.co, mixkit.co

Si no existe, el hero levanta el poster image de Unsplash y queda
perfectamente usable.

-----------------------------------------------------
 5) CASE STUDY PHOTOS (opcional)
-----------------------------------------------------
Filenames : case-1.jpg, case-2.jpg, case-3.jpg
Path      : assets/case-*.jpg

Si no existen, el HTML levanta fotos de Unsplash como fallback
(ya configuradas para temas de dairy: granja, laboratorio de QA,
y cold-chain).

-----------------------------------------------------
 NOTA TECNICA
-----------------------------------------------------
Claude no puede extraer el binario de una imagen pegada en el chat
y escribirla al disco. Cada archivo visual (excepto el logo y la
foto de Christopher, que ya estan shippeados) hay que guardarlo
manualmente una sola vez. Despues queda referenciado permanentemente
en el HTML.
