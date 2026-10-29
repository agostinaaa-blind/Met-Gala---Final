// Lecturas editoriales originales de los looks del archivo.
// Las claves incluyen el año para distinguir futuras apariciones de cada artista.
// FOTOS DE CADA LOOK
// En photos, completá src con la ruta de tu imagen (por ejemplo: "images/emma-detalle.webp").
// alt describe la foto para accesibilidad; caption es el pie de foto visible.
// position ajusta el encuadre (por ejemplo: "50% 25%").
// orientation define si la foto es "vertical" (por defecto, ratio 3/4) u "horizontal" (ratio 4/3, ocupa todo el ancho).
// Podés copiar un objeto para sumar fotos. Con src vacío se reserva el espacio.
// Para quitar toda la galería de un look, usá photos: [].
// VIDEO DE YOUTUBE
// En youtubeUrl pegá el enlace del video (youtube.com/watch?v=... o youtu.be/...).
// También se aceptan enlaces de Shorts y /embed/. Con "" la sección queda oculta.
window.lookStories = {
  "rihanna-2015": {
    youtubeUrl: "https://youtu.be/HQK2R2yXSBk",
    photos: [
      { src: "images/articulos-fotos/rihanna1.webp", alt: "", caption: "Otra mirada del look", position: "50% 50%" },
      { src: "images/articulos-fotos/rihanna2.webp", alt: "", caption: "Los detalles de la pieza", position: "50% 50%" }
    ],
    title: "Rihanna y el amarillo que hizo historia",
    subtitle: "La creación de Guo Pei convirtió las escalinatas del Met en una pasarela para la alta costura china.",
    heading: "Una silueta que ocupa la escena",
    paragraphs: [
      "Hay looks que se recuerdan por un detalle y otros que cambian la escala de una alfombra roja. La aparición de Rihanna en 2015 pertenece al segundo grupo: el amarillo intenso, los bordados y la extensión de la capa hicieron que la prenda pareciera transformar el espacio a su alrededor.",
      "En diálogo con China: Through the Looking Glass, la propuesta de Guo Pei puso el trabajo artesanal en primer plano. La superficie bordada se lee como un paisaje de texturas; cada pliegue aporta profundidad y cada paso permite descubrir otra parte de la composición.",
      "La fuerza del look está en su equilibrio entre presencia y movimiento. El volumen envuelve a Rihanna, pero también sigue su recorrido: una imagen en la que el vestido deja de ser un acompañamiento para convertirse en el centro del relato visual."
    ],
    detail: "El amarillo como protagonista, el bordado como textura y la capa como una prolongación de la silueta."
  },
  "zendaya-2018": {
    youtubeUrl: "https://www.youtube.com/watch?v=x-ccfWcbht4",
    photos: [
      { src: "images/articulos-fotos/zendaya1.webp", alt: "", caption: "Otra mirada del look", position: "50% 50%" },
      { src: "images/articulos-fotos/zendaya2.webp", alt: "", caption: "Los detalles de la pieza", position: "50% 50%" }
    ],
    title: "Zendaya: la fuerza de una armadura de alta costura",
    subtitle: "Versace traduce la imagen de Juana de Arco al lenguaje de la alfombra roja.",
    heading: "Entre la protección y el brillo",
    paragraphs: [
      "Para la edición de 2018, Zendaya eligió una silueta que lleva la idea de fuerza a su propia construcción. El brillo metálico y las formas de armadura evocan a Juana de Arco y conectan con el universo religioso de Heavenly Bodies.",
      "La propuesta de Versace juega con dos lecturas: la rigidez visual de una pieza protectora y la fluidez que se espera de un vestido de noche. El metal se convierte en una herramienta expresiva, capaz de dibujar el cuerpo sin perder su carácter monumental.",
      "Más que una referencia literal, el resultado es un personaje construido a través de la moda. La postura, la silueta y la luz trabajan juntas para crear una presencia que combina solemnidad, teatralidad y determinación."
    ],
    detail: "Las superficies metálicas y las líneas de armadura construyen una silueta de fuerza."
  },
  "blake-lively-2022": {
    youtubeUrl: "https://youtu.be/P6Ps7MYB2bI",
    photos: [
      { src: "images/articulos-fotos/blake1.webp", alt: "", caption: "Otra mirada del look", position: "50% 50%" },
      { src: "images/articulos-fotos/blake2.webp", alt: "", caption: "Los detalles de la pieza", position: "50% 50%" }
    ],
    title: "Blake Lively y un vestido que cambia con el tiempo",
    subtitle: "Del cobre al turquesa: Versace convierte una transformación de color en un homenaje a Nueva York.",
    heading: "La ciudad como punto de partida",
    paragraphs: [
      "El look de Blake Lively en 2022 propone una historia que se descubre en dos momentos. Primero aparece el cobre; después, el turquesa abre una nueva lectura de la misma silueta. El cambio hace visible el paso del tiempo a través del color.",
      "La referencia a la oxidación de la Estatua de la Libertad conecta la creación de Versace con uno de los símbolos de Nueva York. En el contexto de Gilded Glamour, el vestido utiliza el brillo y el volumen para tender un puente entre la arquitectura, la ciudad y la moda.",
      "La transformación es parte del diseño, no solo de su presentación. El contraste entre ambos tonos permite que el look funcione como una pequeña narración visual: una imagen inicial que se despliega y revela otra historia en su interior."
    ],
    detail: "El contraste entre cobre y turquesa remite a la pátina de la Estatua de la Libertad."
  },
  "nicole-kidman-2024": {
    youtubeUrl: "https://youtu.be/rfuzzLb1fys",
    photos: [
      { src: "images/articulos-fotos/nicole1.webp", alt: "", caption: "Otra mirada del look", position: "50% 50%" },
      { src: "images/articulos-fotos/nicole2.avif", alt: "", caption: "Los detalles de la pieza", position: "50% 50%" }
    ],
    title: "Nicole Kidman: el archivo vuelve a cobrar vida",
    subtitle: "Balenciaga revisita una silueta de 1951 en un encuentro entre memoria y alta costura.",
    heading: "El pasado en movimiento",
    paragraphs: [
      "En una edición dedicada a despertar la memoria de la moda, el look de Nicole Kidman encuentra su fuerza en el archivo. La silueta de Balenciaga recupera una referencia de 1951 y la lleva al presente a través del contraste entre blanco y negro.",
      "El satén blanco aporta una superficie luminosa y definida. La organza negra introduce profundidad, textura y movimiento. Juntos, los materiales construyen un juego de volúmenes que se entiende tanto desde la distancia como al observar los detalles.",
      "La propuesta permite pensar el archivo como un punto de partida creativo. Una forma histórica puede volver a hablar cuando cambia de contexto: sobre la alfombra roja, la memoria del vestido se encuentra con una nueva presencia y una nueva mirada."
    ],
    detail: "El contraste del satén blanco con la organza negra organiza toda la composición."
  },
  "tyla-2024": {
    youtubeUrl: "https://youtu.be/-RC_TKi5ecc",
    photos: [
      { src: "images/articulos-fotos/tyla1.avif", alt: "", caption: "Otra mirada del look", position: "50% 50%" },
      { src: "images/articulos-fotos/tyla2.avif", alt: "", caption: "Los detalles de la pieza", position: "50% 50%" }
    ],
    title: "Tyla y el arte de vestir lo efímero",
    subtitle: "Balmain convierte la arena en una silueta que parece detener el tiempo.",
    heading: "Una escultura sobre el cuerpo",
    paragraphs: [
      "El debut de Tyla en el archivo de 2024 gira alrededor de una idea tan sencilla como poderosa: vestir el tiempo. La arena, asociada a lo que se escapa entre los dedos, se transforma aquí en una superficie que define y acompaña el cuerpo.",
      "La propuesta de Balmain dialoga con The Garden of Time desde la materia. Los tonos cálidos y los microcristales producen una textura que cambia con la luz, mientras la silueta ajustada refuerza la impresión de estar ante una escultura.",
      "El interés del look nace de esa tensión entre fragilidad y permanencia. Un material que evoca lo pasajero se convierte en una imagen que permanece: la moda encuentra una forma de hablar del tiempo sin recurrir a una representación literal."
    ],
    detail: "La textura de arena y los reflejos de los microcristales acercan el vestido a una pieza escultórica."
  },
  "elle-fanning-2024": {
    youtubeUrl: "https://youtu.be/gw2Q-5125XM",
    photos: [
      { src: "images/articulos-fotos/elle1.avif", alt: "", caption: "Otra mirada del look", position: "50% 50%" },
      { src: "images/articulos-fotos/elle2.webp", alt: "", caption: "Los detalles de la pieza", position: "80% 50%" }
    ],
    title: "Elle Fanning: un jardín de cristal en movimiento",
    subtitle: "Transparencia, luz y una ilusión de hielo en la propuesta de Balmain.",
    heading: "La luz también viste",
    paragraphs: [
      "El look de Elle Fanning en 2024 explora una idea de delicadeza que parece situada entre lo natural y lo imaginario. La silueta translúcida de Balmain evoca el cristal y el hielo, dos materiales que cambian por completo según la luz que los atraviesa.",
      "En el universo de The Garden of Time, las formas florales y la transparencia permiten pensar el vestido como un jardín suspendido. La superficie no se impone por el color, sino por los reflejos, los contornos y la sensación de ligereza.",
      "El movimiento completa esa ilusión. Al cambiar el punto de vista, aparecen nuevos brillos y se desdibujan algunos límites de la prenda. El resultado convierte la relación entre cuerpo y vestido en una imagen casi etérea."
    ],
    detail: "Las transparencias y los reflejos construyen la ilusión de una pieza hecha de cristal."
  },
  "bad-bunny-2025": {
    youtubeUrl: "https://youtu.be/hS02V3TkoE8",
    photos: [
      { src: "images/articulos-fotos/badb1.webp", alt: "", caption: "Otra mirada del look", position: "50% 50%" },
      { src: "images/articulos-fotos/badb2.webp", alt: "", caption: "Los detalles de la pieza", position: "50% 50%" }
    ],
    title: "Bad Bunny: vestir la identidad",
    subtitle: "La sastrería y el símbolo boricua se encuentran en una misma declaración de estilo.",
    heading: "El detalle que cuenta una historia",
    paragraphs: [
      "En el look de Bad Bunny de 2025, la sastrería funciona como un lenguaje de identidad. La silueta se construye a partir de códigos reconocibles, pero el significado aparece en la manera de combinarlos y en el lugar que ocupa cada accesorio.",
      "El sombrero inspirado en la pava jíbara introduce una referencia puertorriqueña que organiza la lectura del conjunto. Más que un complemento, se convierte en un punto de conexión entre la imagen de alfombra roja y una memoria cultural propia.",
      "La propuesta recuerda que un look también puede leerse desde sus símbolos. La forma de vestir comunica pertenencia, oficio y personalidad: la presencia del artista surge del diálogo entre esas referencias y su interpretación de la elegancia."
    ],
    detail: "El sombrero inspirado en la pava jíbara concentra el sentido cultural del conjunto."
  },
  "anok-yai-2026": {
    youtubeUrl: "https://youtu.be/b6IRRP-WxNM",
    photos: [
      { src: "images/articulos-fotos/anok1.webp", alt: "", caption: "Otra mirada del look", position: "50% 50%" },
      { src: "images/articulos-fotos/anok2.webp", alt: "", caption: "Los detalles de la pieza", position: "50% 50%" }
    ],
    title: "Anok Yai: el cuerpo como pieza de museo",
    subtitle: "Una lectura escultórica de la moda a través del volumen, la luz y la silueta.",
    heading: "La silueta como obra",
    paragraphs: [
      "El look de Anok Yai reúne los elementos con los que el archivo interpreta Fashion Is Art: volumen, reflejos y una presencia solemne. La propuesta de Balenciaga invita a observar el cuerpo como el centro de una composición escultórica.",
      "Las superficies adquieren profundidad a través de la luz. Los reflejos líquidos contrastan con la definición de la silueta y generan una tensión visual entre lo que parece sólido y lo que parece estar en movimiento.",
      "Esta lectura del look coloca la forma por delante del adorno aislado. Cada proporción contribuye a una imagen completa, concebida para observarse como una pieza en el espacio y para transformarse con cada nuevo ángulo."
    ],
    detail: "Los volúmenes y los reflejos articulan una presencia de carácter escultórico."
  },
  "emma-chamberlain-2026": {
    youtubeUrl: "https://youtu.be/ZLN-JythCFk",
    photos: [
      { src: "images/articulos-fotos/emma2.avif", alt: "", caption: "Otra mirada del look", position: "50% 50%" },
      { src: "images/articulos-fotos/emma1.webp", alt: "", caption: "Los detalles de la pieza", position: "50% 50%" }
    ],
    title: "Emma Chamberlain se convierte en un lienzo de la mano de Mugler",
    subtitle: "Moda y pintura se encuentran en un vestido que lleva el gesto artístico sobre la piel.",
    heading: "Cuando el vestido se vuelve lienzo",
    paragraphs: [
      "El look de Emma Chamberlain propone una conexión directa entre la moda y la pintura. En esta pieza de Mugler, el color se extiende por la silueta como si la tela fuera un lienzo, y el cuerpo aporta una dimensión que una superficie plana no puede ofrecer.",
      "La pintura a mano introduce variaciones, matices y una sensación de gesto. Las zonas de color se encuentran y se superponen; al seguir las líneas del vestido, la mirada descubre una composición que cambia con el movimiento.",
      "En diálogo con Fashion Is Art, la propuesta invita a mirar más allá de la separación entre disciplinas. El vestido puede ser una imagen, una pieza artesanal y una experiencia en movimiento al mismo tiempo. Emma aparece como parte de esa obra, completándola con su presencia."
    ],
    detail: "La pintura a mano convierte la superficie del vestido en una composición de color y movimiento."
  },
  "halston-y-bianca-jagger-1977": {
    youtubeUrl: "",
    "photos": [
      {
        "src": "images/articulos-fotos/bianca2.jpg",
        "alt": "",
        "caption": "Otra mirada del look",
        "position": "50% 50%"
      },
      {
        "src": "images/articulos-fotos/bianca1.webp",
        "alt": "",
        "caption": "Los detalles de la pieza",
        "position": "50% 50%"
      }
    ],
    "title": "Halston y Bianca Jagger: el brillo de los setenta",
    "heading": "La superficie como protagonista",
    "paragraphs": [
      "El vestido dorado organiza la imagen a través de una superficie de efecto metálico. La luz encuentra en esa textura el recurso principal para dar presencia a la silueta.",
      "En esta lectura del archivo, el glamour de los años setenta se expresa mediante el brillo. El interés está en observar cómo un mismo tono puede adquirir profundidad y movimiento sin depender de un contraste de colores."
    ]
  },
  "princesa-diana-1996": {
    youtubeUrl: "https://youtu.be/UPntAJHaNE0",
    "photos": [
      {
        "src": "images/articulos-fotos/diana1.webp",
        "alt": "",
        "caption": "Otra mirada del look",
        "position": "50% 50%"
      },
      {
        "src": "images/articulos-fotos/diana2.webp",
        "alt": "",
        "caption": "Los detalles de la pieza",
        "position": "50% 50%"
      }
    ],
    "title": "Princesa Diana: azul marino y un acento de zafiro",
    "heading": "El diálogo entre vestido y joyas",
    "paragraphs": [
      "El vestido lencero azul marino propone una silueta de líneas sencillas. Su presencia nace de la relación entre la caída de la prenda y los accesorios que la acompañan.",
      "Las perlas y el zafiro del collar introducen un segundo foco visual. El conjunto invita a mirar cómo una joya puede completar la composición y dar otro ritmo a una superficie de color profundo."
    ]
  },
  "rihanna-2014": {
    youtubeUrl: "https://youtu.be/rLZAAexFOPk",
    "photos": [
      {
        "src": "images/articulos-fotos/rihannam1.webp",
        "alt": "",
        "caption": "Otra mirada del look",
        "position": "50% 50%"
      },
      {
        "src": "images/articulos-fotos/rihannam2.webp",
        "alt": "",
        "caption": "Los detalles de la pieza",
        "position": "50% 30%"
      }
    ],
    "title": "Rihanna: dos piezas, una misma silueta",
    "heading": "La construcción del blanco",
    "paragraphs": [
      "El conjunto blanco se construye a partir de dos piezas: un top corto estructurado y una falda larga. La separación entre ambas define el ritmo de la silueta.",
      "El interés de esta propuesta está en la relación entre estructura y continuidad. El color reúne las piezas, mientras sus proporciones permiten leer cada una por separado y como parte de una imagen completa."
    ]
  },
  "taylor-swift-2014": {
    youtubeUrl: "",
    "photos": [
      {
        "src": "images/articulos-fotos/taylor2.webp",
        "alt": "",
        "caption": "Otra mirada del look",
        "position": "50% 35%"
      },
      {
        "src": "images/articulos-fotos/taylor1.webp",
        "alt": "",
        "caption": "Los detalles de la pieza",
        "position": "50% 35%"
      }
    ],
    "title": "Taylor Swift: el vestido que se descubre al girar",
    "heading": "Una composición en rosa pálido",
    "paragraphs": [
      "Los bordados, la extensa cola y el gran lazo posterior convierten el vestido en una composición que requiere más de un punto de vista. La imagen frontal es solo una parte del conjunto.",
      "El rosa pálido funciona como fondo para esos detalles. La cola prolonga la silueta y el lazo aporta un foco posterior: el recorrido de la mirada forma parte de la experiencia del look."
    ]
  },
  "olivier-rousteing-y-justin-bieber-2015": {
    youtubeUrl: "https://youtu.be/UT3I5REIrso",
    "photos": [
      {
        "src": "images/articulos-fotos/justin2.webp",
        "alt": "",
        "caption": "Otra mirada del look",
        "position": "50% 40%"
      },
      {
        "src": "images/articulos-fotos/justin1.webp",
        "alt": "",
        "caption": "Los detalles de la pieza",
        "position": "50% 50%"
      }
    ],
    "title": "Olivier Rousteing y Justin Bieber: el contraste del dragón dorado",
    "heading": "El bordado dibuja la silueta",
    "paragraphs": [
      "El negro del traje ofrece una base definida para los dragones dorados. El contraste hace que el motivo decorativo sea el primer elemento que atrae la mirada.",
      "La lectura del conjunto alterna entre la línea de la sastrería y la presencia del dibujo. La decoración aporta un recorrido sobre la prenda sin borrar la estructura que la sostiene."
    ]
  },
  "katy-perry-2018": {
    youtubeUrl: "https://youtu.be/aeLselsHtiA",
    "photos": [
      {
        "src": "images/articulos-fotos/katy1.webp",
        "alt": "",
        "caption": "Otra mirada del look",
        "position": "50% 50%"
      },
      {
        "src": "images/articulos-fotos/katy2.webp",
        "alt": "",
        "caption": "Los detalles de la pieza",
        "position": "50% 50%"
      }
    ],
    "title": "Katy Perry: una silueta que despliega sus alas",
    "heading": "El volumen transforma la escena",
    "paragraphs": [
      "Las enormes alas de plumas amplían la silueta más allá del vestido. El look dorado toma la figura del ángel como una imagen que se reconoce a través de su contorno.",
      "El contraste entre el cuerpo y la extensión de las alas construye el carácter teatral de la propuesta. El espacio alrededor de la figura pasa a formar parte del look y de su impacto visual."
    ]
  },
  "harry-styles-2019": {
    youtubeUrl: "https://www.youtube.com/watch?v=wUfElcG0LNs",
    "photos": [
      {
        "src": "images/articulos-fotos/harry1.webp",
        "alt": "",
        "caption": "Otra mirada del look",
        "position": "50% 25%"
      },
      {
        "src": "images/articulos-fotos/harry2.webp",
        "alt": "",
        "caption": "Los detalles de la pieza",
        "position": "50% 50%"
      }
    ],
    "title": "Harry Styles: transparencia, sastrería y una perla",
    "heading": "El equilibrio entre texturas",
    "paragraphs": [
      "La blusa transparente y el pantalón de cintura alta combinan dos maneras de definir la silueta: una superficie ligera y una línea de sastrería marcada.",
      "El delicado pendiente de perla introduce un detalle de otra escala. La mirada pasa de las proporciones del conjunto a ese pequeño acento, que completa el diálogo entre textura, forma y accesorio."
    ]
  },
  "billie-eilish-2021": {
    youtubeUrl: "https://www.youtube.com/watch?v=C-QFO6W9Lmc",
    "photos": [
      {
        "src": "images/articulos-fotos/billie1.webp",
        "alt": "",
        "caption": "Otra mirada del look",
        "position": "50% 50%"
      },
      {
        "src": "images/articulos-fotos/billie2.webp",
        "alt": "",
        "caption": "Los detalles de la pieza",
        "position": "50% 35%"
      }
    ],
    "title": "Billie Eilish: el volumen del glamour clásico",
    "heading": "El tul como forma",
    "paragraphs": [
      "El voluminoso vestido de tul se presenta en el archivo como una referencia a Marilyn Monroe y al Hollywood clásico. Su silueta utiliza la amplitud para construir una presencia envolvente.",
      "La textura del tul suaviza los límites de la prenda y permite leer el volumen como una sucesión de capas. El interés del look está en esa relación entre una forma amplia y una superficie de apariencia ligera."
    ]
  },
  "stray-kids-2024": {
    youtubeUrl: "https://youtu.be/zSAVfK49qDE",
    "photos": [
      {
        "src": "images/articulos-fotos/skz1.webp",
        "alt": "",
        "caption": "Otra mirada del look",
        "position": "50% 50%",
        "orientation": "horizontal"
      },
      {
        "src": "images/articulos-fotos/skz2.webp",
        "alt": "",
        "caption": "Los detalles de la pieza",
        "position": "50% 50%",
        "orientation": "horizontal"
      }
    ],
    "title": "Stray Kids: una imagen coral de sastrería y color",
    "heading": "La coordinación como lenguaje",
    "paragraphs": [
      "Los conjuntos en rojo, blanco y azul permiten leer la propuesta como una imagen de grupo. La coordinación de colores conecta las siluetas sin exigir que cada una sea idéntica.",
      "La sastrería y los detalles florales aportan distintas escalas de observación. De lejos aparece la composición del grupo; de cerca, las particularidades que dan carácter a cada conjunto."
    ]
  },
  "hudson-williams-2026": {
    youtubeUrl: "https://youtu.be/FQnETkP9sE8",
    "photos": [
      {
        "src": "images/articulos-fotos/hudson1.webp",
        "alt": "",
        "caption": "Otra mirada del look",
        "position": "50% 50%"
      },
      {
        "src": "images/articulos-fotos/hudson2.webp",
        "alt": "",
        "caption": "Los detalles de la pieza",
        "position": "50% 50%"
      }
    ],
    "title": "Hudson Williams: sastrería celeste y gesto teatral",
    "heading": "El diálogo entre traje y maquillaje",
    "paragraphs": [
      "El traje celeste inspirado en los toreros y el maquillaje basado en El cisne negro reúnen dos referencias dentro de una misma imagen. El look se lee tanto desde su silueta como desde el rostro.",
      "El color del traje y el carácter del maquillaje aportan focos distintos. La propuesta invita a observar cómo la belleza y la indumentaria pueden construir juntas la presencia de un personaje."
    ]
  }
};
