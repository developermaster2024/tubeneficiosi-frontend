export const createCategory = (name, children) => ({ name, children });

export const categories = [
  createCategory('Gastronomía', [
    createCategory('Comodidades', [
      createCategory('Wi-fi Gratis', [
        createCategory('De 10MB'),
        createCategory('De 20MB'),
        createCategory('De 50MB'),
      ]),
      createCategory('Acepta tarjetas de crédito'),
      createCategory('Incluye estacionamiento'),
      createCategory('Juegos para niños'),
      createCategory('Televisión'),
      createCategory('Acepta Reservas'),
      createCategory('Tiene servicio de delivery'),
      createCategory('Al aire libre'),
      createCategory('Acceso para silla de ruedas'),
      createCategory('Menú ejecutivo'),
    ]),
    createCategory('Restricciones alimentarias', [
      createCategory('Opciones vegetarianas'),
      createCategory('Opciones veganas'),
      createCategory('Kosher'),
      createCategory('Sin gluten'),
      createCategory('Halal'),
    ]),
    createCategory('Tipos de cocina', [
      createCategory('Comida argentina'),
      createCategory('Comida venezolana'),
      createCategory('Comida italiana'),
      createCategory('Comida francesa'),
      createCategory('Comida arabe'),
      createCategory('Comida armenia'),
      createCategory('Bar'),
      createCategory('Hamburgesería'),
      createCategory('Comida rápida'),
      createCategory('Fusión'),
      createCategory('Fusión peruana'),
      createCategory('Comida peruana'),
      createCategory('Parrilla'),
      createCategory('Pizzería'),
      createCategory('Cervecería'),
      createCategory('Cerveza artesanal'),
      createCategory('Bar de vinos'),
      createCategory('Internacional'),
      createCategory('Cafetería'),
      createCategory('Chocolatería'),
      createCategory('Comida mexicana'),
      createCategory('Pescadería'),
      createCategory('Comida española'),
      createCategory('Comida Israeli'),
      createCategory('Comida Japonesa'),
      createCategory('Comida China'),
      createCategory('Pastas'),
      createCategory('Brunch'),
      createCategory('Sandwichería'),
      createCategory('Milanesas'),
      createCategory('Sushi'),
      createCategory('Buffet libre'),
      createCategory('Picadas'),
      createCategory('Postres'),
      createCategory('Tartas'),
      createCategory('Pollo'),
    ]),
  ]),
  createCategory('Farmacias', [
    createCategory('Cuidado capilar', [
      createCategory('Shampoo'),
      createCategory('Acondicionadores'),
      createCategory('Enjuagues'),
      createCategory('Balsamos'),
      createCategory('Modelado y peinado'),
      createCategory('Reparación y tratamiento'),
      createCategory('Coloración y oxidantes'),
    ]),
    createCategory('Belleza y maquillaje', [
      createCategory('Mascaras'),
      createCategory('Labiales'),
      createCategory('Desmaquillantes'),
      createCategory('Correctores'),
      createCategory('Bases'),
      createCategory('Esmaltes'),
      createCategory('Sombras'),
      createCategory('Accesorios'),
      createCategory('Brochas y pinceles'),
      createCategory('Espejos'),
      createCategory('Esponjas y cisnes'),
      createCategory('Planchas bucleras'),
      createCategory('Secadores'),
      createCategory('Polvos y rubores'),
      createCategory('Cuidado de manos y pies'),
      createCategory('Delineadores'),
      createCategory('Quitaesmaltes'),
      createCategory('Tratamientos'),
      createCategory('Cepillos y peines'),
      createCategory('Secadores'),
      createCategory('Fijadores de esmalte'),
    ]),
    createCategory('Cuidado personal', [
      createCategory('Afeitado y depilación'),
      createCategory('Jabones y geles de ducha'),
      createCategory('Protección femenina'),
      createCategory('Protección para adultos'),
    ]),
    createCategory('Alimentos y bebidas', [
      createCategory('Alfajores'),
      createCategory('Golosinas'),
      createCategory('Cereales y granolas'),
      createCategory('Galletitas y snacks'),
      createCategory('Semillas y frutos secos'),
      createCategory('Apto para celiacos'),
      createCategory('Almacen'),
      createCategory('Bebidas'),
      createCategory('Gaseosas'),
      createCategory('Jugos'),
    ]),
    createCategory('Perfumes y fragancias', [
      createCategory('Desodorantes'),
      createCategory('Perfumes'),
      createCategory('Colonias y body spash'),
      createCategory('Bebes y niños'),
      createCategory('Sets de cofres'),
    ]),
    createCategory('Cuidado corporal', [
      createCategory('Cremas corporales'),
      createCategory('Cremas faciales'),
      createCategory('Protectores solares'),
      createCategory('Rostro'),
    ]),
    createCategory('Cuidado de la salud', [
      createCategory('Alchol'),
      createCategory('Curitas'),
      createCategory('Baño e higiene'),
      createCategory('Optica'),
      createCategory('Vendas y gasas'),
      createCategory('Termometros'),
      createCategory('Tapones para oido'),
      createCategory('Pastilleros y ordenadores'),
      createCategory('Plantillas y taloneras'),
      createCategory('Accesorios'),
      createCategory('Balanzas'),
      createCategory('Nebulizadores'),
      createCategory('Postulares'),
      createCategory('Tensiometros'),
      createCategory('Vaporizadores y humidificadores'),
      createCategory('Bolsas y geles refrigerantes'),
    ]),
    createCategory('Cuidado oral', [
      createCategory('Accesorios y adhesivos dentales'),
      createCategory('Cepillos Dentales'),
      createCategory('Cremas y enjuagues dentales'),
      createCategory('Blanqueadores'),
    ]),
    createCategory('Hogar', [
      createCategory('Papel Higiénico'),
      createCategory('Accesorios de limpieza'),
      createCategory('Aromatizadores'),
      createCategory('cocina Cuidado de la ropa '),
      createCategory('decoración '),
      createCategory('desinfección'),
      createCategory('Repelentes'),
      createCategory('desinfectantes'),
    ]),

    createCategory('Nutrición y deportes', [
      createCategory('Barras'),
      createCategory('Invierno y defensas'),
      createCategory('Piel, Uñas y Cabello'),
      createCategory('Proteínas'),
      createCategory('Salud del Corazón'),
      createCategory('Alimentos Nutracéuticos'),
      createCategory('Control de Peso'),
      createCategory('Energizantes'),
      createCategory('Antioxidantes'),
      createCategory('Creatina'),
      createCategory('Digestivos'),
      createCategory('Flebotonicos'),
      createCategory('Ganadores de Peso'),
      createCategory('Geles'),
      createCategory('Levadura de Cerveza'),
      createCategory('Multivitaminico'),
      createCategory('Muñequeras y Coderas'),
      createCategory('Celulitis'),
      createCategory('Climaterio'),
      createCategory('Falta de Sueño'),
      createCategory('Huesos y Articulaciones'),
      createCategory('memoria'),
      createCategory('Minerales'),
      createCategory('Refrigerantes'),
      createCategory('Salud Intestinal'),
      createCategory('Aminoácidos'),
      createCategory('Pastillas bronceadoras'),
    ]),

    createCategory('Soluciones Bacias', [
      createCategory('Pilas y Baterías'),
      createCategory('Accesorios para viajes'),
      createCategory('Lápices y Lapiceras '),
      createCategory('Indumentaria'),
    ]),

    createCategory('Bienestar Sexual', [
      createCategory('preservativos'),
      createCategory('Lubricantes'),
      createCategory('Juguetes Eróticos'),
    ]),

    createCategory('bebés y maternidad', [
      createCategory('Chupetes y Mordillos'),
      createCategory('Pañales  y Toallas Húmedas '),
      createCategory('Nutrición Infantil'),
      createCategory('Shampoo y Enjuagues'),
      createCategory('jabones '),
      createCategory('aceites y oleos'),
      createCategory('Cremas y emulsiones'),
      createCategory('Protectores mamarios'),
      createCategory('Apositos'),
      createCategory('Cepillos dentales'),
      createCategory('Accesorios'),
      createCategory('Accesorios para Cochecitos'),
      createCategory('Cepillos y Peines'),
      createCategory('Cuidado de Uñas'),
      createCategory('Fajas'),
    ]),

    createCategory('Dermocosmetica'),

    createCategory('Electro', [
      createCategory('Electro'),
    ]),

    createCategory('Belleza y Dermocosmetica', [
      createCategory('Elvive'),
      createCategory('Fructis'),
      createCategory('Granier'),
      createCategory('Loréal Paris'),
      createCategory('Maybelline'),
      createCategory('Vichy'),
      createCategory('La Roche-Posay'),
    ]),

  ]),
  createCategory('Supermercados', [
    createCategory('Panadería y repostería', [
      createCategory('Panes'),
      createCategory('Otros panificados'),
      createCategory('Budines, magdalenas y bizcochuelos'),
      createCategory('repostería'),
      createCategory('Tostadas, grisines y Marineras'),
      createCategory('Especialidades Dulces'),
      createCategory('Tortas'),
    ]),
    createCategory('Carne, pollos y pescados', [
      createCategory('Carne vacuna'),
      createCategory('Pollo y granja'),
      createCategory('Carre de cerdo'),
      createCategory('Pescados'),
      createCategory('Rebozados'),
      createCategory('Achuras y Embutidos'),
    ]),
    createCategory('Enlatados y Conservas', [
      createCategory('Carne vacunaConservas de Carne y Pescado'),
      createCategory('Conservas de Legumbres y Verduras'),
      createCategory('Aceitunas y Encurtidos'),
      createCategory('Conservas de frutas'),
    ]),

    createCategory('Sin TACC', [
      createCategory('Pastas, Arroz y legumbres'),
      createCategory('Conservas de Legumbres y Verduras'),
      createCategory('Harinas y Pan Rallado'),
      createCategory('Galletitas y Snacks'),
      createCategory('Alfajores y Barritas'),
      createCategory('Lácteos y Productos Frescos'),
      createCategory('Panaderia y Reposteria'),
      createCategory('Almacén'),
    ]),

    createCategory('Vinos', [
      createCategory('Vinos Tintos'),
      createCategory('Vinos Blancos'),
      createCategory('Banco de Vinos Rosados'),
    ]),

    createCategory('Congelados', [
      createCategory('comidas congeladas'),
      createCategory('Congelados de Pollo'),
      createCategory('Hamburguesas y Milanesas'),
      createCategory('Papas'),
      createCategory('Verduras Congeladas'),
      createCategory('Rebozados'),
      createCategory('Pizzas y Tartas'),
      createCategory('Helados y Postres'),
    ]),

    createCategory('Limpieza', [
      createCategory('Papeles'),
      createCategory('Limpieza de Baño'),
      createCategory('Limpieza de Cocina'),
      createCategory('Limpieza de Pisos y Superficies'),
      createCategory('Cuidado para la ropa'),
      createCategory('Lavandina'),
      createCategory('Accesorios de Limpieza'),
      createCategory('Desodorantes de ambiente'),
      createCategory('Insecticidas'),
      createCategory('Calzado'),
    ]),

    createCategory('Lácteos', [
      createCategory('Leches'),
      createCategory('Yogures'),
      createCategory('Postres'),
      createCategory('Cremas'),
      createCategory('Dulce de Leche'),
      createCategory('Mantecas y Margarinas'),
      createCategory('Pastas Frescas'),
      createCategory('Tapas'),
      createCategory('Comidas Elaboradas'),
    ]),

    createCategory('Quesos y Fiambres', [
      createCategory('Quesos'),
      createCategory('Fiambres'),
    ]),

    createCategory('Frutas y Verduras', [
      createCategory('Frutas'),
      createCategory('Verduras'),
      createCategory('Huevos'),
    ]),

    createCategory('Galletas, golosinas y Snacks', [
      createCategory('Galletitas y Bizcochitos'),
      createCategory('Crackers y galletas de Arroz'),
      createCategory('Cereales y Barritas'),
      createCategory('Snacks Salados'),
      createCategory('Golosinas'),
      createCategory('Alfajores'),
      createCategory('Chocolates y Coberturas'),
    ]),

    createCategory('Almacén', [
      createCategory('Snacks'),
      createCategory('Aceites y Vinagres'),
      createCategory('Condimentos'),
      createCategory('Encurtidos'),
      createCategory('Conservas'),
      createCategory('Salsa de Tomate'),
      createCategory('Semillas'),
      createCategory('Cereales'),
      createCategory('galletitas'),
      createCategory('Mermeladas y dulces'),
      createCategory('Panadería'),
      createCategory('Golosinas y Chocolates'),
      createCategory('Repostería'),
      createCategory('Suplementos Dietarios'),
      createCategory('Arroz'),
      createCategory('Legumbres'),
      createCategory('Endulzantes'),
      createCategory('Pastas'),
      createCategory('Harinas'),
      createCategory('Premezclas'),
      createCategory('Sopas y Saborizantes'),
      createCategory('Rebozador y Pan Rallado'),
      createCategory('Panificado'),
      createCategory('Infusiones'),
    ]),

    createCategory('Perfumería', [
      createCategory('Cuidado Personal'),
      createCategory('Cuidado del Cabello '),
      createCategory('Desodorantes'),
      createCategory('Antitranspirantes'),
      createCategory('Protector Solar'),
      createCategory('Cuidado Bucal'),
      createCategory('Cremas de Belleza'),
      createCategory('Cosméticos'),
      createCategory('Desmaquillantes'),
      createCategory('Colonias y Perfumes '),
      createCategory('Accesorios'),
      createCategory('Farmacia'),
      createCategory('Pañales'),
      createCategory('Productos para Incontinencias'),
      createCategory('Higiene Personal'),
      createCategory('Protección Femenina'),
    ]),

    createCategory('Bebés y Maternidad', [
      createCategory('pañales'),
      createCategory('Alimentos para bebe'),
      createCategory('Cuidado del bebe y de la mama'),
    ]),

    createCategory('Bebidas sin Alcohol', [
      createCategory('Gaseosas'),
      createCategory('aguas'),
      createCategory('aguas saborizadas'),
      createCategory('Jugos'),
      createCategory('Isotónicas'),
      createCategory('Energizantes'),
      createCategory('Bebidas amargas'),
      createCategory('Granadinas'),
    ]),

    createCategory('Bebidas con Alcohol', [
      createCategory('Cervezas'),
      createCategory('Aperitivos'),
      createCategory('Champagne y espumantes'),
      createCategory('bebidas Blancas y Destiladas'),
      createCategory('Whiskys'),
      createCategory('Licores'),
      createCategory('Conservadoras'),
    ]),

    createCategory('Mascotas', [
      createCategory('Alimentos para perros'),
      createCategory('alimentos para gatos'),
      createCategory('alimentos para peces'),
      createCategory('snacks'),
      createCategory('higiene'),
      createCategory('accesorios y juguetes'),
      createCategory('collares y correas'),
      createCategory('comederos'),
    ]),

    createCategory('tecnología', [
      createCategory('televisores'),
      createCategory('Teléfonos'),
      createCategory('Cargadores'),
      createCategory('Caminadoras'),
      createCategory('parlantes'),
      createCategory('cámaras'),
      createCategory('Planchas de pelo'),
      createCategory('Air Fries'),
      createCategory('Aire acondicionado'),
    ]),
  ]),
  createCategory('Espectaculos', [
    createCategory('Documentales'),
    createCategory('Biográficos'),
    createCategory('históricos'),
    createCategory('Musical'),
    createCategory('Comedia'),
    createCategory('Infantil'),
    createCategory('Western'),
    createCategory('Aventura y acción'),
    createCategory('Bélico'),
    createCategory('Ciencia Ficción'),
    createCategory('Drama'),
    createCategory('Suspenso'),
    createCategory('Terror/Horror'),
    createCategory('Romántico'),
    createCategory('Independiente'),
    createCategory('Misterio'),
    createCategory('Policial'),
    createCategory('thrillers'),
    createCategory('Monólogos'),
    createCategory('Stand Up'),
  ]),
  createCategory('Boliches', [
    createCategory('After'),
    createCategory('Bar'),
    createCategory('Bar & Boliche'),
    createCategory('Musical'),
    createCategory('Boliche'),
    createCategory('Cena Show Disco'),
    createCategory('Sector VIP'),
    createCategory('Egresados'),
    createCategory('Festival'),
    createCategory('Recital'),
    createCategory('Cachengue'),
    createCategory('Cumbia'),
    createCategory('Electrónica'),
    createCategory('Funny Music'),
    createCategory('House'),
    createCategory('Pop'),
    createCategory('Progressive'),
    createCategory('Reggaeton'),
    createCategory('Rock nacional'),
    createCategory('Rock Internacional'),
    createCategory('R&B'),
    createCategory('Techno'),
    createCategory('Ambiente'),
    createCategory('Banda'),
    createCategory('Blues'),
    createCategory('Clásica'),
    createCategory('Dustep'),
    createCategory('Funk'),
    createCategory('Grupera'),
    createCategory('heavy metal'),
    createCategory('Indie Dance'),
    createCategory('Internacional'),
    createCategory('Inclusivo'),
    createCategory('Jazz'),
    createCategory('Mayores de 15 años'),
    createCategory('mayores de 18 años'),
    createCategory('Mayores de 21 años'),
    createCategory('Mayores de 40 años'),
    createCategory('Metallica'),
    createCategory('Punk'),
    createCategory('Rap'),
    createCategory('Salsa'),
    createCategory('Romantica'),
    createCategory('Reggae'),
    createCategory('Soul'),
  ]),
];
