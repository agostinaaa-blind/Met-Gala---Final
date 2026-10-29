from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Preformatted, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'output/pdf/guia-edicion-manual-the-met-archives.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
INK = HexColor('#20201d'); RED = HexColor('#8b1126'); PAPER = HexColor('#f4f0e8'); MUTED = HexColor('#666158'); LINE = HexColor('#d8d1c5')
styles = {
 'kicker': ParagraphStyle('kicker', fontName='Helvetica-Bold', fontSize=8, leading=12, textColor=RED, spaceAfter=12),
 'title': ParagraphStyle('title', fontName='Times-Roman', fontSize=29, leading=32, textColor=INK, spaceAfter=11),
 'intro': ParagraphStyle('intro', fontName='Helvetica', fontSize=10.3, leading=15, textColor=MUTED, spaceAfter=11),
 'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9.4, leading=13.4, textColor=INK, spaceAfter=6),
 'h2': ParagraphStyle('h2', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=INK, spaceBefore=10, spaceAfter=6),
 'small': ParagraphStyle('small', fontName='Helvetica', fontSize=8.5, leading=12.5, textColor=MUTED, spaceAfter=6),
 'cell': ParagraphStyle('cell', fontName='Helvetica', fontSize=8.6, leading=12, textColor=INK),
 'th': ParagraphStyle('th', fontName='Helvetica-Bold', fontSize=8.5, leading=12, textColor=white),
 'code': ParagraphStyle('code', fontName='Courier', fontSize=8.2, leading=10.5, textColor=INK),
}
story=[]
def para(text, style='body'): story.append(Paragraph(text,styles[style]))
def heading(n,title,intro):
 para(f'GUÍA PRÁCTICA / {n:02d}', 'kicker');para(title,'title');para(intro,'intro')
def sub(t):para(t,'h2')
def code(t):
 block=Preformatted(t,styles['code'])
 tab=Table([[block]],colWidths=[499],hAlign='LEFT')
 tab.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),HexColor('#eae5dc')),('BOX',(0,0),(-1,-1),.5,LINE),('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
 story.extend([tab,Spacer(1,8)])
def table(headers,rows,widths):
 cells=[[Paragraph(escape(h),styles['th']) for h in headers]]+[[Paragraph(x,styles['cell']) for x in row] for row in rows]
 tab=Table(cells,colWidths=widths,hAlign='LEFT',repeatRows=1)
 tab.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),INK),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,1),(-1,-1),.5,LINE),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6)]))
 story.extend([tab,Spacer(1,8)])
def note(title,text):
 tab=Table([[Paragraph(f'<b>{title}</b><br/>{text}',styles['body'])]],colWidths=[499])
 tab.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),HexColor('#e9dfd7')),('LINEBEFORE',(0,0),(0,0),3,RED),('LEFTPADDING',(0,0),(-1,-1),12),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),5)]))
 story.extend([tab,Spacer(1,8)])
def page():story.append(PageBreak())

heading(1,'Cómo editar<br/>The Met Archives','Manual de contenido para una persona que recién empieza. Fotos, textos, videos, artículos y páginas, sin cambiar la programación del sitio.')
para('VERSIÓN DEL PROYECTO / 19 DE OCTUBRE DE 2026','kicker')
sub('Antes de empezar')
para('1. Hacé una copia de la carpeta completa del proyecto.<br/>2. Abrí la carpeta original en un editor de código, por ejemplo Visual Studio Code.<br/>3. Usá <b>Ctrl + F</b> dentro de un archivo para buscar el nombre de un artista o un texto.<br/>4. Cambiá una cosa por vez, guardá con <b>Ctrl + S</b> y revisala en el navegador.')
sub('Mapa rápido de archivos')
table(['Quiero cambiar…','Archivo y ubicación'],[
 ('Foto principal y ficha de un look','<b>looks-data.js</b><br/>archiveLooks o archiveGalleryLooks'),
 ('Fotos adicionales y YouTube','<b>look-stories.js</b><br/>Bloque del artista y año'),
 ('Textos de la página de un look','<b>look-stories.js</b><br/>Hay tres excepciones: ver página 2'),
 ('Tres artículos destacados del inicio','<b>looks-data.js</b><br/>archiveArticles'),
 ('Cuatro artículos del PDF y sus enlaces','<b>articles-data.js</b><br/>journalArticles'),
 ('Preguntas frecuentes y contacto','<b>acerca-de.html / contacto.html</b><br/>Correos del formulario: contacto.js'),
 ('Títulos de páginas, menús o diseño','<b>Archivos .html y .css</b><br/>Ver página 5'),
], [211,288])
para('Todos los nombres de archivo de esta guía son relativos a la carpeta principal del proyecto. No hace falta modificar main.js ni look.js para editar contenido.','small')
page()

heading(2,'Foto principal y textos<br/>de un look','Primero identificá al artista y el año. Si aparece más de una vez, cada edición es un look distinto.')
sub('La tarjeta, la portada y la ficha')
para('Abrí <b>looks-data.js</b>. Buscá el artista dentro de <b>archiveLooks</b> (grilla del inicio) o <b>archiveGalleryLooks</b> (galería histórica). Estos datos también alimentan la página individual.')
code('''name: "Emma Chamberlain",
year: 2026,
designer: "Mugler",
theme: "Fashion Is Art",
image: "images/vertical/emma.webp",
position: "50% 28%",
description: "Presentación breve del look."''')
para('<b>image</b> cambia la foto principal. <b>position</b> ajusta el encuadre; el primer valor es horizontal y el segundo vertical. <b>description</b> es el resumen. <b>designer</b> y <b>theme</b> se muestran en la ficha.')
note('Nombre y año también afectan la URL','Cambiar name o year cambia el enlace del look. Si no necesitás corregirlos, dejalos como están. Revisá también su clave en look-stories.js y cualquier enlace escrito a mano.')
sub('El contenido de la nota')
para('Abrí <b>look-stories.js</b> y buscá la clave, por ejemplo <b>"emma-chamberlain-2026"</b>. Editá estos campos sin borrar el resto del bloque:')
table(['Campo','Qué cambia'],[
 ('title / subtitle','Título de la portada / presentación debajo del título.'),
 ('heading','Subtítulo dentro del cuerpo de la nota.'),
 ('paragraphs','Lista de párrafos. Cada texto va entre comillas y separado por una coma.'),
 ('detail','Texto destacado en el bloque “La clave del look”.'),
], [145,354])
note('Excepción: Nicole Kidman, Tyla y Elle Fanning','Sus textos principales se toman de <b>archiveArticles en looks-data.js</b>: title (título), dek (presentación), lead (introducción), paragraphs (cuerpo), closing (cierre) y author (autor). Sus fotos adicionales, YouTube, heading y detail siguen en look-stories.js.')
page()

heading(3,'Fotos adicionales<br/>y video de YouTube','Todo se configura dentro del bloque del look en look-stories.js. No hace falta modificar el HTML.')
sub('Agregar una foto en “El look, de cerca”')
para('1. Guardá la foto dentro de <b>images/</b>, por ejemplo emma-detalle.webp.<br/>2. Buscá el arreglo <b>photos</b> del look.<br/>3. Completá una entrada existente como esta:')
code('''photos: [
  {
    src: "images/emma-detalle.webp",
    alt: "Detalle de la pintura del vestido de Emma",
    caption: "El color y la textura de la pieza.",
    position: "50% 50%"
  }
],''')
para('<b>src:</b> ruta del archivo de imagen.<br/><b>alt:</b> descripción de lo que se ve, para accesibilidad.<br/><b>caption:</b> pie de foto visible debajo de la imagen.<br/><b>position:</b> encuadre de la foto; probá cambiar el segundo porcentaje si necesitás subir o bajar el foco.')
para('Para sumar más fotos, copiá un objeto completo entre <b>{ }</b> dentro de photos y separalo del anterior con una coma. No reemplaces todo el look por este ejemplo.')
table(['Configuración','Resultado'],[
 ('src: ""','Mantiene un espacio reservado para esa foto.'),
 ('photos: []','Oculta la sección completa de fotos de ese look.'),
], [145,354])
sub('Pegar un video de YouTube')
para('En el mismo bloque, buscá <b>youtubeUrl</b> y reemplazá el contenido entre comillas por el enlace real del video:')
code('''youtubeUrl: "https://www.youtube.com/watch?v=ID_DEL_VIDEO",''')
para('Reemplazá ID_DEL_VIDEO por el identificador real, o pegá directamente el enlace que te da YouTube. También se aceptan enlaces youtu.be, Shorts, /embed/ y /live/.')
note('Mostrar u ocultar el video','Con <b>youtubeUrl: ""</b>, el reproductor no aparece. Si el enlace no es válido, tampoco se muestra. Algunos videos pueden tener restricciones para reproducirse fuera de YouTube.')
page()

heading(4,'Artículos: fotos,<br/>textos y enlaces','Hay dos grupos independientes: los tres destacados del inicio y los cuatro artículos externos de la página Artículos.')
sub('Los cuatro artículos del PDF')
para('Abrí <b>articles-data.js</b>. Dentro de <b>window.journalArticles</b>, cada objeto representa una tarjeta. Ejemplo de campos editables:')
code('''title: "Título del artículo",
author: "Nombre de la persona autora",
source: "Architectural Digest",
category: "diseno",
year: 2025,
image: "images/articles/mi-foto.webp",
alt: "Descripción de lo que muestra la foto",
position: "50% 50%",
summary: "Resumen breve de la nota.",
url: "https://sitio.com/nota-completa"''')
para('<b>title</b> es el título; <b>summary</b>, el texto breve; <b>author</b>, la firma; <b>source</b>, el medio; <b>year</b>, el año mostrado; <b>image</b>, la foto, y <b>url</b>, el destino al hacer clic.')
para('<b>category</b> debe ser exactamente <b>"diseno"</b>, <b>"historia"</b> o <b>"tematicas"</b>. Los filtros usan esos valores. Para agregar otro artículo, copiá un objeto completo dentro del arreglo y separalo con una coma.')
note('Qué podés editar de una nota externa','Tu proyecto controla la tarjeta y el enlace. La nota completa se abre en la web del medio original; sus textos y fotos no se modifican desde este proyecto.')
sub('Los tres artículos del inicio')
para('Se editan en <b>looks-data.js</b>, dentro de <b>archiveArticles</b>. Sus campos image, position, title y description cambian la tarjeta. El modal usa también dek, lead, paragraphs, quote, closing, author y readTime.')
para('Esas notas también alimentan las páginas de Nicole Kidman, Tyla y Elle Fanning. Cambiar sus textos puede verse en ambos lugares; cambiar image aquí cambia la foto del artículo, pero la portada del look usa su propia image en archiveLooks.')
sub('La portada de la página Artículos')
para('Abrí <b>articulos.html</b>. Los títulos y textos generales están escritos en el HTML. La foto de portada se encuentra en <b>journal-cover-image</b>: cambiá el src y el alt de su etiqueta &lt;img&gt;. La imagen actual es <b>images/articles/portada-articulos.webp</b>.')
page()

heading(5,'Nosotros, contacto<br/>y diseño general','Los contenidos fijos están en HTML; la apariencia está en CSS. Editá el archivo de la página que querés cambiar.')
sub('Preguntas frecuentes: acerca-de.html')
para('Cada pregunta está dentro de un bloque <b>&lt;details class="about-question"&gt;</b>. La pregunta se escribe en <b>&lt;h3&gt;</b>; la respuesta, dentro de <b>about-answer</b>. Cambiá el texto conservando las etiquetas.')
para('Para agregar otra pregunta, copiá un bloque details completo, cambiá su número y sus textos. Actualizá también el contador “10” y la presentación “Diez preguntas”, porque esos textos no se recalculan solos.')
sub('Página de contacto: contacto.html')
para('Ahí se editan los títulos, la presentación del museo, direcciones, teléfonos y textos del formulario. Las dos fotos se identifican por estas rutas:')
code('''images/met-exterior.webp
images/met-gallery.webp''')
para('Para cambiar un teléfono, actualizá tanto el número visible como su enlace <b>tel:</b>. Si cambiás una dirección, revisá también el enlace de ubicación de Google Maps.')
para('Los correos destinatarios del formulario se editan en <b>contacto.js</b>, dentro de <b>departments</b>. Conservá las claves collections, library y press; cambiá email o label si corresponde.')
note('El formulario prepara un correo','No envía mensajes desde el sitio ni guarda consultas en un servidor. Abre la aplicación de correo de quien lo completa para que revise y envíe el mensaje.')
sub('Qué archivo controla cada diseño')
table(['Archivo','Dónde se ve'],[
 ('styles.css','Colores globales, cabecera, pie e inicio. Los colores están en :root.'),
 ('look.css / look.html','Diseño y estructura compartida de las páginas de looks.'),
 ('articulos.css / articulos.html','Diseño y estructura de la página con los artículos externos.'),
 ('acerca-de.css / acerca-de.html','Diseño y contenido de las preguntas frecuentes.'),
 ('contacto.css / contacto.html','Diseño y contenido de Contacto.'),
], [198,301])
para('El menú se repite en los HTML de las páginas. Si cambiás su texto o destino, actualizalo en index.html, look.html, articulos.html, acerca-de.html y contacto.html. navigation.js controla el submenú; no hace falta tocarlo para cambiar un enlace.','small')
page()

heading(6,'Guardar, comprobar<br/>y resolver errores','Una revisión breve después de cada cambio evita que un pequeño error se extienda a otras partes del sitio.')
sub('Reglas básicas para editar sin romper el código')
para('<b>Comillas:</b> mantené las comillas de los textos. Si necesitás escribir comillas dobles dentro de un texto, usá la secuencia de escape que aparece en el ejemplo.<br/><b>Comas:</b> separá los campos y los objetos del arreglo con comas.<br/><b>Llaves y corchetes:</b> conservá los símbolos { }, [ ] y el cierre final del archivo.<br/><b>Rutas:</b> escribí rutas del proyecto con /, no una ruta de tu computadora.')
code('''title: "Un vestido llamado \\"Obra de arte\\"",
image: "images/articles/mi-foto.webp",''')
sub('Si algo no aparece')
table(['Problema','Qué revisar primero'],[
 ('La foto no carga','Que exista el archivo; que nombre, carpeta y extensión coincidan exactamente con src o image. Usá nombres simples y evitá renombrar fotos que usan otras páginas.'),
 ('El encuadre corta la cara','Ajustá position, por ejemplo "50% 25%". Si es una foto fija del HTML, el encuadre puede estar definido en su CSS.'),
 ('No aparece YouTube','Que youtubeUrl contenga un enlace real y completo. Revisá restricciones del video y probá la página desde el servidor local o el sitio publicado.'),
 ('Un texto no cambia','Confirmá el archivo correcto. Nicole, Tyla y Elle usan archiveArticles para sus textos principales. Después guardá y recargá.'),
 ('Desaparecen las tarjetas','Deshacé el último cambio con Ctrl + Z. Revisá comillas, comas y cierres en el JS que editaste.'),
 ('El cambio no llega a la web pública','Editar la carpeta local no publica el sitio. Hay que subir los archivos modificados mediante el proceso de alojamiento del proyecto.'),
], [137,362])
sub('Antes de entregar el cambio')
para('1. Guardá todos los archivos modificados.<br/>2. Recargá la página; si sigue mostrando lo anterior, probá Ctrl + F5.<br/>3. Abrí la tarjeta del look o del artículo y comprobá el destino.<br/>4. Revisá la foto, el pie de foto, el video y los textos.<br/>5. Comprobá la página con una ventana angosta o desde un celular.')
para('La vista local de esta sesión usa http://localhost:4173 mientras el servidor esté activo. En otra computadora, quien configure el proyecto debe iniciar su servidor local o facilitar una vista publicada.','small')

def decorate(canvas,doc):
 canvas.saveState();w,h=doc.pagesize
 canvas.setFillColor(PAPER);canvas.rect(0,0,w,h,fill=1,stroke=0)
 canvas.setFillColor(INK);canvas.setFont('Helvetica-Bold',8);canvas.drawString(48,h-30,'THE MET / ARCHIVES')
 canvas.setFillColor(RED);canvas.setFont('Helvetica',8);canvas.drawRightString(w-48,h-30,'MANUAL DE EDICIÓN')
 canvas.setStrokeColor(LINE);canvas.line(48,40,w-48,40)
 canvas.setFillColor(MUTED);canvas.setFont('Helvetica',7);canvas.drawString(48,26,'Guía de contenido | 19 octubre 2026');canvas.drawRightString(w-48,26,f'{doc.page} / 6')
 canvas.restoreState()
doc=SimpleDocTemplate(str(OUT),pagesize=(595,842),rightMargin=48,leftMargin=48,topMargin=58,bottomMargin=50,title='Guía de edición manual - The Met Archives',author='The Met Archives',subject='Manual para modificar fotos, videos, artículos y contenido del sitio')
doc.build(story,onFirstPage=decorate,onLaterPages=decorate)
print(OUT)
