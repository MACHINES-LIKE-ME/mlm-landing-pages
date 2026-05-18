# MLM Landing Pages — Dist folder

Carpeta `dist/` lista para deployar en Azure Static Web Apps via el repo
`Oladapoolasunkanmi/frontend-demo-template`, branch `sales/landing-pages`.

## Estructura actual (18 landings: 6 industrias × 3 idiomas)

Organizada **por industria** (sugerencia de Oladapo / dev team). Cada
industria contiene sus 3 versiones de idioma.

```
dist/
  README.md
  brewery/
    en/   index.html + assets/        ← Jeff Fiedler · /usa/consulting/
    de/   index.html + assets/        ← Andreas Jung · /de/consulting/
    nl/   index.html + assets/        ← Thomas Tervoort · /nl/consulting/
  construction/
    en/ de/ nl/   (en y de incluyen hero-video.mp4)
  dairy/
    en/ de/ nl/   (incluye hero-video.mp4)
  food-beverage/
    en/ de/ nl/
  healthcare/
    en/ de/ nl/
  private-equity/
    en/ de/ nl/
```

URLs después del deploy (bajo `discover.machineslikeme.com`):
- `/[industria]/en/` → Jeff Fiedler (Head of Sales US)
- `/[industria]/de/` → Andreas Jung (Vertriebsleiter Deutschland)
- `/[industria]/nl/` → Thomas Tervoort (Hoofd Sales Nederland)

Ej: `discover.machineslikeme.com/construction/de/`

El **language switcher** en el header de cada landing usa links
relativos (`../en/`, `../de/`, `../nl/`) — funcionan al deployar todo
el `dist/` junto como una unidad.

## Contactos por idioma

| Idioma | Rep                | Email                          | Demo URL                                 |
|--------|--------------------|--------------------------------|------------------------------------------|
| EN     | Jeff Fiedler       | jeff.fiedler@machineslikeme.com| https://machineslikeme.com/usa/consulting/ |
| DE     | Andreas Jung       | aj@machineslikeme.com          | https://machineslikeme.com/de/consulting/  |
| NL     | Thomas Tervoort    | tt@machineslikeme.com          | https://machineslikeme.com/nl/consulting/  |

## Flujo del form "Automation Map"

Cuando un visitante completa el form en cualquier landing:

1. **POST a HubSpot Forms API v3** con `firstname`, `lastname`, `email`
   - Portal ID: `139585830`
   - Form GUID: `e8e6ab7a-1d07-48a2-bce1-832a1cd50d9c`
   - El lead aparece en HubSpot CRM como nuevo contacto.

2. **`mailto:` al rep regional** con todos los detalles (nombre, email,
   rol, empresa, tamaño, UTM, etc.). Se abre el cliente de email del
   visitante con el mensaje pre-llenado dirigido al rep correcto:
   - EN → jeff.fiedler@machineslikeme.com
   - DE → aj@machineslikeme.com
   - NL → tt@machineslikeme.com

## Notas sobre la traducción (DE/NL)

Traducidos a fondo en estas versiones:
- Nav, hero, botones, CTAs
- Ribbon regulatorio + KPI bar
- Sección "MLM Approach" (badge + headline)
- Sección "Benefits" / system status (filas, valores, badges)
- FAQ master + títulos de preguntas
- "Book a demo" CTA
- Form modal (labels, placeholders, validación, success state)
- Footer (regional presence + tagline)
- Popup overlay

Quedaron en inglés (pendientes de revisión profesional):
- Cuerpos de respuestas FAQ (textos largos)
- Descripciones de cada departamento en el approach drawer
- Algunos sub-headlines y mock-UI labels específicos por industria

## Responsive

Cada landing tiene 3 breakpoints:
- `≤1100px` → grids se compactan
- `≤900px` → nav se oculta, depts → 3 cols, footer 1 col
- `≤480px` → mobile fino: depts → 2 cols, KPI → 2 cols, CTAs full-width, paddings reducidos

## Construction: case studies removidos

A pedido, el bloque "Proof, not promises" (3 case studies rotativos)
quedó fuera de las 3 versiones de construction. Dairy mantiene sus cases.

## Workflow para deployar

En el codespace `Oladapoolasunkanmi/frontend-demo-template`,
branch `sales/landing-pages`:

```bash
git add dist/
git commit -m "Add DE + NL versions, HubSpot form, mobile responsive"
git push origin sales/landing-pages
./deploy-static-webapp.sh landing-pages
```

El script reemplaza todo el contenido de la Static Web App con
lo que está en `dist/`.

## Estado del deploy

- ✅ Branch creada: `sales/landing-pages`
- ✅ HubSpot form publicado y wired en las 18 landings
- 🟡 Deploy a Azure pendiente (requiere acceso a la subscription
  `942d53f0-c834-421a-a9c7-ce18ad160809`)

## Referencias rápidas

- App name para el script: `landing-pages`
- Resource group: `frontend-demos`
- Location: `westeurope`
- Subscription: `942d53f0-c834-421a-a9c7-ce18ad160809`

Comando final:
```bash
./deploy-static-webapp.sh landing-pages
```
