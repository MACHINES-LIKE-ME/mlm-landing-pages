=====================================================
 ASSETS DE LA LANDING PAGE — DONDE VA CADA ARCHIVO
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

Si se crea una landing para otra industria, COPIAR este PNG
tal cual al assets/ de la nueva industria. No se regenera ni se
sustituye por texto inline.

-----------------------------------------------------
 2) CHRISTOPHER'S PHOTO
-----------------------------------------------------
Filename : christopher.jpg
Path     : assets/christopher.jpg

Tamaño recomendado : 800 x 800 px (cuadrada)
Formato            : JPG o WebP
Fondo              : idealmente lavanda suave o neutro

Fallback: Unsplash placeholder -> iniciales "CM" sobre degrade azul.

-----------------------------------------------------
 3) MLM APPROACH BACKGROUND
-----------------------------------------------------
Filename : mlm-approach-bg.jpg
Path     : assets/mlm-approach-bg.jpg

Tamaño recomendado : 2000 x 1400 px (paisaje)
Contenido          : foto real que matchee la industria (site, factory,
                     hospital, lobby bancario, etc.) — NO bandera, NO skyline
                     generico, NO texturas abstractas.

-----------------------------------------------------
 4) CASE STUDY PHOTOS (opcional)
-----------------------------------------------------
Filenames : case-1.jpg, case-2.jpg, case-3.jpg
Path      : assets/case-*.jpg

Si no existen, el HTML levanta fotos de Unsplash como fallback.

-----------------------------------------------------
 NOTA TECNICA
-----------------------------------------------------
Claude no puede extraer el binario de una imagen pegada en el chat
y escribirla al disco. Por eso cada archivo visual (excepto el logo,
que ya esta shippeado) tiene que guardarse manualmente una sola vez
desde el chat. Despues queda referenciado permanentemente en el HTML.
