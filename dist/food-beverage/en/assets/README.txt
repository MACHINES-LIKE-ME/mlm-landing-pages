=====================================================
 ASSETS DE LA LANDING PAGE — FOOD & BEVERAGE
=====================================================

Esta carpeta contiene todos los assets locales que la landing
food_beverage necesita. Si falta alguno (salvo el logo), el HTML
tiene un fallback automatico (Unsplash o iniciales).

-----------------------------------------------------
 1) MLM LOGO  (header)  [YA SHIPPEADO]
-----------------------------------------------------
Filename : mlm-logo.png
Path     : assets/mlm-logo.png

Dimensiones : 800 x 349 px (transparente)
Formato     : PNG con fondo transparente
Contenido   : wordmark negro "MACHINES / LIKE / ME" apilado en 3 lineas

Ya esta copiado de la carpeta de construction. NO regenerar.

-----------------------------------------------------
 2) HERO BACKGROUND VIDEO  ★ CRITICO
-----------------------------------------------------
Filename : hero-video.mp4
Path     : (en la misma carpeta que el .html, NO dentro de assets/)

EN F&B EL VIDEO HACE EL 50% DEL TRABAJO DE LA LANDING.

A diferencia de construction (donde una drone-over-site basta),
el comprador de F&B (plant director, head of trade marketing,
CEO de CPG) compra con los sentidos. Si el video se ve generico
o stock-cheesy, la landing pierde tono y se siente como otra
herramienta SaaS mas.

Apuntar a Apple-grade :
 - Cinematica, slow-mo, color graded, sin logos
 - Una sola accion centrada (no collage de 12 escenas)
 - Loop limpio (8-12 segundos)
 - No texto, no graficos overlay, no marcas

Sugerencias por segmento de Pexels / Coverr / Mixkit :

  Confectionery / chocolate :
    "chocolate enrobing", "chocolate factory", "candy production"
  Coffee :
    "coffee roasting drum", "coffee beans falling", "espresso pour"
  Beverages / soft drinks / juice :
    "bottling line", "soda filling", "juice production close up"
  Bakery / cereals :
    "bread production", "cereal flakes pouring", "dough kneading"
  Dairy / culinary / sauces (si fuera necesario para variantes) :
    "sauce stirring", "creamy mixing", "industrial mixer"

Si falta, el poster Unsplash (factory line) cubre el placeholder
pero la pagina queda mucho menos memorable. Vale la pena
pagar 30-60 EUR por un Pexels Pro o filmar uno corto en cliente.

-----------------------------------------------------
 3) CHRISTOPHER'S PHOTO  [YA SHIPPEADO]
-----------------------------------------------------
Filename : christopher.jpg
Path     : assets/christopher.jpg

Tamaño recomendado : 800 x 800 px (cuadrada)
Formato            : JPG o WebP

Ya esta copiada de la carpeta de construction.

-----------------------------------------------------
 4) MLM APPROACH BACKGROUND  [PENDIENTE]
-----------------------------------------------------
Filename : mlm-approach-bg.jpg
Path     : assets/mlm-approach-bg.jpg

Tamaño recomendado : 2000 x 1400 px (paisaje)
Contenido          : foto real de planta de F&B — pasillo de planta,
                     linea de envasado, sala de control, mixer/extruder
                     en operacion. NO bandera, NO supermercado, NO logos.

Sugerencias Unsplash search : "food factory", "bottling line",
                              "chocolate factory", "coffee roasting".

-----------------------------------------------------
 5) CASE STUDY PHOTOS (opcional)
-----------------------------------------------------
Filenames : case-1.jpg, case-2.jpg, case-3.jpg
Path      : assets/case-*.jpg

Recomendados :
 - case-1 : retailer shelf / promo display (trade promo case)
 - case-2 : QA lab / batch release / micro testing (batch release case)
 - case-3 : warehouse / DC / pallets / SAP screen (procurement & AP case)

Si no existen, el HTML levanta fotos de Unsplash como fallback.

-----------------------------------------------------
 NOTA TECNICA
-----------------------------------------------------
Claude no puede extraer el binario de una imagen pegada en el chat
y escribirla al disco. Por eso cada archivo visual (excepto los que
estan shippeados) tiene que guardarse manualmente una sola vez
desde el chat. Despues queda referenciado permanentemente en el HTML.
