# CIELO BLANCO Sitio Web de Marca de Mezcal de Lujo

## Descripción General
Un sitio web de lujo multi-página para la marca premium de mezcal CIELO BLANCO, con diseño minimalista, tipografía elegante Cinzel y animaciones suaves inspiradas en casas de alta costura. Incluye página de bienvenida con verificación de edad, página principal con desplazamiento continuo, tienda de producto único con múltiples opciones de pago y venta, seguimiento de pedidos con información de envío, panel de administración con gestión de envíos, y páginas legales completas. El favicon del sitio utiliza el logo de marca (1.png) para aparecer en las pestañas del navegador.

## Página de Bienvenida
- Página inicial que aparece antes de acceder al sitio principal
- Modal de verificación de edad elegante, centrado y compacto con diseño tipo tarjeta flotante más pequeña y equilibrada
- Pregunta de verificación de edad: "¿Tienes más de 18 años?"
- Dos botones de respuesta:
  - "Sí" - permite el acceso al sitio principal
  - "No" - redirige a Google o muestra mensaje de acceso denegado
- Diseño del modal rediseñado para mayor elegancia minimalista:
  - Tarjeta flotante más compacta y proporcionalmente equilibrada
  - Fondo blanco puro #FFFFFF con transparencia y sombras suaves
  - Botones con acentos dorados
  - Tipografía Cinzel elegante
  - Logo de marca (1.png) integrado de manera más sutil
  - Estilo modal centrado con overlay semitransparente
  - Dimensiones optimizadas para mantener la elegancia minimalista de CIELO BLANCO
- Transición suave hacia el sitio principal tras confirmación de edad

## Icono Flotante de WhatsApp
- Icono flotante de WhatsApp posicionado de manera fija en todas las páginas del sitio
- Ubicación elegante que no interfiera con el contenido principal ni la navegación
- Diseño consistente con la estética minimalista de CIELO BLANCO: fondo blanco con acentos dorados
- Al hacer clic, abre un modal flotante con:
  - Campos de entrada para nombre del usuario y motivo de contacto
  - Botón "Enviar" con estilo dorado consistente
  - Diseño del modal con fondo blanco puro, tipografía Cinzel y espaciado elegante
  - Animación suave de aparición del modal
- **Funcionalidad de redirección corregida**: Al enviar el formulario, redirige correctamente a WhatsApp con mensaje prellenado que incluye:
  - Datos ingresados por el usuario (nombre y motivo)
  - Número de WhatsApp de la marca: +525519654396
  - Formato de mensaje profesional y elegante
  - **Transición suave sin errores de redirección**
- Hover states con acentos dorados
- Responsive design para escritorio y móvil

## Navegación
- Barra de navegación con efecto glassmorphism translúcido y esmerilado
- **Logo transparente de CIELO BLANCO (1-removebg-preview.png) reemplazando el texto "CIELO BLANCO" en la navegación**
- **Logo escalado proporcionalmente dentro de la navbar manteniendo el estilo glassmorphism y alineación con otros elementos de navegación**
- **Animaciones de hover y estilo de transparencia consistentes con el lenguaje de diseño existente del sitio**
- **Enlace correcto del asset para que el logo se muestre claramente en vistas de escritorio y móvil**
- Estados de hover con acentos dorados
- Menú hamburguesa plegable para dispositivos móviles
- Enlaces de navegación en línea mínimos para escritorio incluyendo "Tienda" y "Seguimiento de Pedido"
- Los elementos del menú se anclan a las secciones correspondientes en la página principal
- Navegación entre páginas (Inicio, Tienda, Seguimiento de Pedido)
- Elementos de navegación posicionados para evitar superposición con contenido o animaciones
- Comportamiento de desplazamiento suave al navegar entre secciones
- Sin botones de login/logout ni lógica de autenticación

## Páginas del Sitio

### Página Principal
Experiencia de desplazamiento de una sola página con las siguientes secciones:

#### Sección Hero
- Hero de pantalla completa con nombre de marca centrado "CIELO BLANCO"
- Logo de marca (1.png) mostrado prominentemente
- Eslogan: "Espíritu Puro. Origen Sagrado."
- Fondo blanco puro #FFFFFF exactamente coincidiendo con el logo
- Diseño minimalista centrado en la tipografía Cinzel y el logo
- Animación de indicación de desplazamiento para fomentar la exploración hacia abajo

#### Sección La Esencia
- Diseño editorial con tipografía Cinzel para estética de lujo minimalista
- Contenido describiendo la pureza del mezcal, agave sagrado y filosofía de marca
- Efectos de desplazamiento parallax con imágenes de fondo
- Detalles dorados al pasar el cursor sobre elementos interactivos

#### Sección Nuestra Tienda
- Showcase de productos para todas las botellas CIELO BLANCO integrado en la página principal, ubicado inmediatamente después de "La Esencia"
- Diseño minimalista de lujo consistente con otras secciones
- **Layout adaptativo basado en la cantidad de productos disponibles**:
  - **Un solo producto**: mostrado centrado en la pantalla tanto horizontal como verticalmente, con espacios en blanco generosos consistentes con la estética de CIELO BLANCO
  - **Múltiples productos**: mostrados en un carrusel elegante y suave consistente con el diseño minimalista de la marca
- **Transición fluida y sin interrupciones** entre layouts de producto único y múltiples productos que mantiene todas las animaciones actuales, tipografía y estilos de espaciado
- **Tarjetas de producto rediseñadas** que muestran únicamente:
  - Imagen del producto
  - Descripción del producto
  - Especificaciones del producto (contenido de alcohol, tipo de agave, tamaño de botella, accesorios decorativos)
  - **Un solo botón "Ver más"** que navega a la página dedicada de detalle del producto
- **Eliminación completa de botones de compra** (Mercado Libre, Comprar Ahora) y logos de métodos de pago de las tarjetas de producto
- **Layout visualmente equilibrado y refinado** que presenta la descripción y especificaciones de manera elegante y organizada
- Fondo blanco puro #FFFFFF exactamente coincidiendo con el logo
- **Mantenimiento de todos los estilos existentes**, interacciones con acentos dorados y consistencia tipográfica refinada en todos los dispositivos y breakpoints
- Transiciones suaves de desplazamiento hacia y desde esta sección
- Layout y tipografía consistentes manteniendo la estética de CIELO BLANCO

#### Sección El Arte
- Diseño de cuadrícula/división mostrando el proceso artesanal
- Secciones cubriendo agave cosechado a mano, destilación tradicional y artesanía
- Separadores de línea dorada entre bloques de contenido
- Animaciones de entrada suaves cuando la sección entra en vista

#### Sección Galería
- Carrusel elegante y minimalista de ancho completo mostrando visuales de marca curados
- Utiliza todas las imágenes subidas (1.png a 7.png) más los assets generados
- Transiciones de desvanecimiento suave entre diapositivas del carrusel
- Puntos de navegación con acentos dorados para control de diapositivas
- Ciclo automático con opción de navegación manual
- Diseño centrado que se adapta perfectamente a todos los tamaños de dispositivo
- Espaciado alineado al layout editorial minimalista
- Animaciones de carga elegantes para preservar rendimiento
- Proporciones de imagen consistentes manteniendo armonía de espacios en blanco
- Sin elementos superpuestos, siguiendo la estética de lujo de CIELO BLANCO

#### Sección La Fundadora
- Retrato de la CEO Blanca González (7.png)
- Párrafo biográfico conciso sobre la fundadora
- Diseño elegante consistente con estética de lujo

#### Sección Dónde Encontrar
- Sección de contacto mínima con información de localizador de tiendas
- Formulario de contacto con campos: nombre, correo electrónico, mensaje
- Botón de llamada a la acción con acentos dorados

#### Sección Pie de Página
- Visualización del nombre de marca
- **Texto de derechos de autor actualizado**: "Cielo Blanco S.A de C.V todos los derechos reservados 2025"
- Iconos de redes sociales con acentos dorados:
  - Icono de Instagram que redirige a: `https://www.instagram.com/cieloblancomezcal?igsh=NGl1Z3g3c3k0MWpv`
  - Eliminación completa de iconos de Facebook y Twitter
- **Enlaces legales**:
  - Enlace a "Política de Privacidad" que navega a la página dedicada
  - Enlace a "Términos de Servicio" que navega a la página dedicada
- Icono de administración que redirige al panel de administración
- Eliminación del texto "hecho con amor usando caffeine"

### Página Tienda
- Showcase de todos los productos CIELO BLANCO con vista simplificada
- Diseño minimalista de lujo consistente con la página principal
- Cuadrícula de productos mostrando todos los productos publicados en una cuadrícula organizada
- Cada producto muestra únicamente: imagen, nombre, descripción corta
- Botón "Ver más" en cada producto que navega a la página dedicada de detalle del producto
- Fondo blanco puro #FFFFFF exactamente coincidiendo con el logo
- Diseño responsivo perfecto para escritorio y móvil
- Mantenimiento de la estética de lujo y tipografía Cinzel consistente con CIELO BLANCO
- Layout y tipografía organizados de manera consistente con el diseño actual de la tienda

### Página de Detalle del Producto
- Página dedicada completa que se abre al hacer clic en "Ver más" o en la tarjeta del producto
- URL única para cada producto permitiendo navegación directa y compartir enlaces
- Muestra información completa del producto:
  - Imagen del producto
  - Nombre completo
  - Descripción detallada
  - Precio
  - **Información de envío**:
    - Precio de envío (si es mayor a 0, mostrar el monto; si es 0, mostrar "Envío gratis")
    - Empresa de paquetería configurada
  - **Especificaciones del producto actualizadas en tiempo real** (contenido de alcohol, tipo de agave, tamaño de botella, accesorios decorativos, etc.) que reflejan inmediatamente cualquier cambio realizado por el administrador
  - **Control de selección de cantidad** con botones elegantes de incremento/decremento para seleccionar número de botellas
  - Logos de métodos de pago configurados por el administrador
- **Sección de Producto Combinado**:
  - Si el producto tiene una combinación configurada, mostrar una subsección elegante debajo del producto principal
  - **Título de la subsección**:
    - **"Combínalo con esto"** si es un bundle
    - **"Personalízalo"** si es una personalización
  - **Tarjeta del producto asociado** dentro de la subsección siguiendo la estética actual de CIELO BLANCO (espacios en blanco, acentos dorados, tipografía equilibrada)
  - Diseño consistente con el minimalismo de alta costura de la marca
  - Transiciones suaves y animaciones elegantes para la aparición de la subsección
- **Gestión de stock integrada**:
  - Si el producto tiene stock disponible: muestra botones de compra normales con selección de cantidad
  - Si el producto está marcado como "Sin stock": muestra mensaje "Por ahora estamos sin stock, déjanos tus datos para mantenerte informado/a."
  - **Formulario de contacto para productos sin stock** con campos:
    - Nombre (requerido)
    - Email (requerido)
    - Teléfono (requerido)
    - Cantidad de botellas deseada (opcional)
    - Botón "Enviar" con estilo dorado consistente con CIELO BLANCO
- Botones dinámicos basados en el tipo de venta configurado por el administrador (solo cuando hay stock):
  - Si es "Mercado Libre": botón "Mercado Libre" con estilo dorado que redirige a la URL específica configurada
  - Si es venta interna: botón "Comprar Ahora" que activa el formulario de checkout interno
  - Si es "Ambas": ambos botones mostrados - "Mercado Libre" y "Comprar Ahora"
- **Sincronización automática con React Query cache** para mostrar especificaciones actualizadas inmediatamente después de modificaciones del administrador
- Diseño consistente con la estética minimalista de lujo de CIELO BLANCO
- Tipografía Cinzel y acentos dorados
- Fondo blanco puro #FFFFFF
- Transiciones suaves de entrada y navegación
- Navegación de regreso a la tienda o página principal
- Diseño de página completa con layout elegante y espaciado generoso

### Página Checkout
- Formulario de pago interno embebido en el sitio
- Campos del formulario: nombre, email, dirección, detalles de tarjeta
- **Sección "Resumen del pedido"** que muestra la cantidad seleccionada del producto principal, precio del producto y precio de envío
- **Sección de producto combinado** posicionada directamente debajo del "Resumen del pedido":
  - Aparece solo si el producto principal tiene una combinación configurada (bundle o personalización)
  - Muestra la información del producto combinado con diseño elegante consistente con CIELO BLANCO
  - **Botón CTA "¡Lo quiero!"** con estilo dorado que permite agregar el producto combinado al carrito
  - Al hacer clic en "¡Lo quiero!", el producto combinado se agrega automáticamente al pedido
  - **Actualización inmediata del resumen del pedido** para mostrar ambos productos y recalcular el precio total
- **Cálculo dinámico del precio total** que incluye tanto el producto principal como cualquier producto combinado agregado, más el precio de envío
- Botón "Pagar Ahora" que abre un modal de pago simulado con el **monto total actualizado**
- Diseño consistente con la estética minimalista de lujo
- Tipografía Cinzel en todos los elementos
- Fondo blanco puro #FFFFFF

#### Modal de Pago Simulado
- Modal que se abre al hacer clic en "Pagar Ahora"
- Diseño consistente con CIELO BLANCO: fondo blanco, tipografía Cinzel, acentos dorados
- Animación suave de desvanecimiento al aparecer
- **Muestra el monto total actualizado** incluyendo productos combinados agregados y precio de envío
- Campos de entrada para tarjeta de crédito/débito:
  - Número de tarjeta
  - Fecha de expiración
  - CVV
- Botones de opciones de pago simuladas:
  - Apple Pay
  - Google Pay
- Botón "Confirmar Pago" que simula pago exitoso con el **monto total correcto**, genera número de pedido automáticamente y redirige a la página de seguimiento de pedido
- Estética minimalista de lujo manteniendo la identidad visual de la marca
- Funcionalidad completamente simulada para fines de demostración únicamente

### Página de Éxito de Pago
- Página de confirmación que aparece después del pago simulado exitoso
- Mensaje de agradecimiento y confirmación de pedido
- **Muestra el resumen completo del pedido** incluyendo productos combinados si fueron agregados y información de envío
- Diseño consistente con la estética minimalista de lujo de CIELO BLANCO
- Tipografía Cinzel y acentos dorados
- Fondo blanco puro #FFFFFF

### Página Seguimiento de Pedido
- Página dedicada para rastrear el estado de pedidos usando número de pedido generado automáticamente
- Campo de entrada para que los usuarios ingresen su número de pedido
- **Botón "Buscar" con funcionalidad corregida** que actualiza los resultados dinámicamente sin requerir recarga manual de página
- **Actualización inmediata del estado** mediante React Query o React state para recargar datos de pedidos sin problemas
- **Refrescado automático de estado** cuando se realiza una búsqueda de pedido
- Visualización de pasos de progreso: "Pedido recibido", "Pedido despachado", "Pedido en tránsito", "Pedido entregado"
- **Información de envío mejorada**: Cuando el pedido está en estado "En tránsito", mostrar debajo del indicador de progreso:
  - **Empresa de envío**: [Nombre de la empresa de paquetería]
  - **Número de seguimiento**: [Número de tracking proporcionado por el administrador]
- Presentación visual minimalista con estética blanca y dorada de CIELO BLANCO
- Indicadores de progreso con acentos dorados para mostrar el estado actual
- Diseño responsivo consistente con el resto del sitio
- Tipografía Cinzel y fondo blanco puro #FFFFFF
- Animaciones suaves de desvanecimiento para la aparición de contenido

### Página Política de Privacidad
- **Página dedicada con Política de Privacidad completa** conforme a la legislación mexicana
- Contenido completamente en español
- Secciones requeridas por ley mexicana incluyendo:
  - Información sobre recopilación de datos personales
  - Finalidades del tratamiento de datos
  - Derechos ARCO (Acceso, Rectificación, Cancelación, Oposición)
  - Transferencias de datos
  - Medidas de seguridad
  - Contacto del responsable de datos
  - Procedimientos para ejercer derechos
- Diseño consistente con la estética minimalista de lujo de CIELO BLANCO
- Tipografía Cinzel y acentos dorados
- Fondo blanco puro #FFFFFF
- Layout elegante con espaciado generoso y jerarquía visual clara
- Navegación de regreso al sitio principal

### Página Términos de Servicio
- **Página dedicada con Términos de Servicio completos** conforme a la legislación mexicana
- Contenido completamente en español
- Secciones requeridas por ley mexicana incluyendo:
  - Aceptación de términos
  - Descripción del servicio
  - Obligaciones del usuario
  - Política de compras y devoluciones
  - Limitaciones de responsabilidad
  - Ley aplicable y jurisdicción
  - Modificaciones a los términos
  - Contacto y atención al cliente
- Diseño consistente con la estética minimalista de lujo de CIELO BLANCO
- Tipografía Cinzel y acentos dorados
- Fondo blanco puro #FFFFFF
- Layout elegante con espaciado generoso y jerarquía visual clara
- Navegación de regreso al sitio principal

### Panel de Administración
- Página de administración accesible mediante icono de administración en el pie de página
- Autenticación simulada con credenciales estáticas de demostración:
  - Usuario: `crisdorao`
  - Contraseña: `Messi24@`
- Formulario de login centrado directamente sobre el fondo de pantalla sin contenedor de tarjeta:
  - Diseño minimalista y elegante con tipografía Cinzel refinada
  - Espaciado generoso y centrado perfecto vertical y horizontalmente
  - Campos de entrada con estilo consistente con CIELO BLANCO
  - Fondo blanco puro #FFFFFF con acentos dorados sutiles
  - Eliminación completa del contenedor de tarjeta flotante para mayor minimalismo

#### Sección Productos
- **Tabla/cuadrícula completamente funcional** de todos los productos publicados actualmente en la tienda con sus detalles (nombre, descripción, precio, imagen, tipo de venta, URL de Mercado Libre si aplica, métodos de pago configurados, **precio de envío**, **empresa de paquetería**, **especificaciones actualizadas**, **cantidad en stock**, **estado de stock**, **información de combinación**)
- **Botones de eliminación funcionales** para cada producto con confirmación de alerta que advierte "Esta acción es irreversible" antes de proceder
- **Actualización dinámica inmediata** después de eliminaciones sin recargar página mediante React Query invalidation
- **Gestión de stock por producto**:
  - Campo editable para cantidad en stock
  - Toggle/checkbox para marcar producto como "Sin stock"
  - Indicador visual del estado de stock (disponible/sin stock)
- **Funcionalidad de actualización de productos completamente operativa** que garantiza que las modificaciones a las especificaciones se guarden correctamente en el backend y se reflejen inmediatamente en la tienda y páginas de detalle
- **Formulario para agregar nuevos productos completamente funcional** con campos para:
  - Nombre del producto
  - Descripción
  - Precio
  - **Precio de envío** (campo numérico, por defecto 0 para envío gratis)
  - **Empresa de paquetería** (dropdown con opciones válidas y valores no vacíos: FedEx, DHL, Estafeta, Redpack, UPS, Paqueteexpress, 99Minutos, J&T Express)
  - **Cantidad inicial en stock**
  - Subida de imagen
  - **Tipo de venta** (dropdown con valores válidos y no vacíos: "Sitio Web Interno", "Mercado Libre", "Ambas")
  - Campo de entrada de URL de Mercado Libre (aparece y es requerido cuando se selecciona "Mercado Libre" o "Ambas")
  - Configuración de métodos de pago con checkboxes para:
    - Tarjeta de crédito/débito
    - Efectivo
    - Transferencia
  - **Sección "Especificaciones" completamente operativa** con campos editables elegantes y toggles consistentes con el diseño de CIELO BLANCO:
    - Contenido de alcohol (campo de texto)
    - Tipo de agave (campo de texto)
    - Tamaño de botella (campo de texto)
    - Accesorios decorativos (campo de texto)
    - Campos adicionales de especificaciones según sea necesario
    - **Validación y persistencia correcta** de todos los cambios realizados a las especificaciones
    - Diseño con etiquetas elegantes y espaciado consistente con la estética minimalista de lujo
  - **Sección "Producto Combinado" completamente funcional**:
    - **Dropdown con opciones válidas y valores no vacíos**:
      - "Sin combinación" (value="none")
      - "Bundle (Combina con otro producto)" (value="bundle")
      - "Personalización (Agrega accesorios o presentación)" (value="personalization")
    - Cuando se selecciona bundle o personalización, aparece otro dropdown con productos existentes para asociar como producto secundario
    - Campos guardados como `combinationType` y `combinedProductId` en los datos del producto
    - Diseño consistente con la estética minimalista de CIELO BLANCO
- **Invalidación automática de React Query cache** después de actualizaciones de productos para asegurar sincronización inmediata
- **Funcionalidad para ver, editar o eliminar combinaciones de productos** en la sección de gestión de productos con el mismo layout refinado usado en el resto de la interfaz de administración
- Todos los nuevos productos aparecen organizados y consistentes con el diseño actual de la tienda
- Mantenimiento del mismo layout y tipografía Cinzel

#### Sección Pedidos
- **Visualización completa y funcional** de todos los pedidos
- **Botones de eliminación funcionales** para cada pedido con confirmación de alerta que advierte "Esta acción es irreversible" antes de proceder
- **Actualización dinámica inmediata** después de eliminaciones sin recargar página mediante React Query invalidation
- **Visualización correcta de pedidos** que persiste datos apropiadamente y se actualiza dinámicamente en todos los navegadores
- Información detallada de pedidos recopilada durante el checkout (incluyendo número de pedido generado automáticamente, **cantidad de productos**, **productos combinados agregados**, **información de envío**)
- **Almacenamiento de información completa del carrito** incluyendo producto principal y cualquier producto combinado agregado
- **Visualización del monto total correcto** para cada pedido incluyendo productos combinados y precio de envío
- **Funcionalidad mejorada para actualizar el estado de cada pedido**:
  - Cuando se cambia el estado a "En tránsito", aparecen campos obligatorios:
    - **Número de seguimiento** (campo de texto requerido)
    - **Empresa de paquetería** (dropdown con las mismas opciones que en productos)
  - Estos datos se almacenan con el pedido y se muestran en la página de seguimiento
  - Validación para asegurar que ambos campos se completen antes de guardar el estado "En tránsito"

#### **Sección Contactos/Leads**
- **Visualización completa y funcional** de contactos de productos sin stock
- **Botones de eliminación funcionales** para cada lead con confirmación de alerta que advierte "Esta acción es irreversible" antes de proceder
- **Actualización dinámica inmediata** después de eliminaciones sin recargar página mediante React Query invalidation
- **Visualización correcta de leads** que persiste datos apropiadamente y se actualiza dinámicamente en todos los navegadores
- Lista de todos los formularios de contacto enviados desde páginas de productos sin stock
- Información mostrada por cada lead:
  - Nombre del contacto
  - Email
  - Teléfono
  - Producto de interés
  - Cantidad deseada (si se proporcionó)
  - Fecha de envío
  - Estado: "Nuevo" / "Contactado"
- **Funcionalidad para marcar leads como "Contactado"**
- Diseño consistente con la estética minimalista de CIELO BLANCO
- Filtros para ver leads por estado (todos, nuevos, contactados)

#### **Sección Contactos WhatsApp**
- **Visualización completa y funcional** de contactos recibidos a través del icono flotante de WhatsApp
- **Botones de eliminación funcionales** para cada contacto con confirmación de alerta que advierte "Esta acción es irreversible" antes de proceder
- **Actualización dinámica inmediata** después de eliminaciones sin recargar página mediante React Query invalidation
- **Visualización correcta de contactos WhatsApp** que persiste datos apropiadamente y se actualiza dinámicamente en todos los navegadores
- Lista de todos los formularios de contacto enviados desde el modal de WhatsApp
- Información mostrada por cada contacto:
  - Nombre del contacto
  - Motivo de contacto
  - Fecha de envío
  - Estado: "Nuevo" / "Contactado"
- **Funcionalidad para marcar contactos como "Contactado"**
- Diseño consistente con la estética minimalista de CIELO BLANCO
- Filtros para ver contactos por estado (todos, nuevos, contactados)

#### **Sección Galería/Site Assets - Funcionalidad Completamente Operativa**
- **Visualización completa de todas las imágenes actuales del sitio** organizadas en una cuadrícula elegante con datos persistentes
- **Botones de eliminación completamente funcionales** para cada imagen con confirmación de alerta que advierte "Esta acción es irreversible" antes de proceder
- **Actualización dinámica inmediata** después de eliminaciones sin recargar página mediante React Query invalidation
- **Interfaz completamente funcional para actualizar imágenes de galería**:
  - Botón "Subir Nueva Imagen" con diseño consistente con CIELO BLANCO
  - **Funcionalidad de subida de archivos completamente operativa** usando la integración de blob storage existente
  - **Vista previa inmediata** de las imágenes subidas antes de confirmar
  - **Actualización en tiempo real** de la galería después de subir nuevas imágenes
  - **Eliminación completa de mensajes de placeholder** y errores de subida
  - Botón "Reemplazar" completamente funcional para cada imagen existente que permite actualizar imágenes individuales
- **Interfaz completamente funcional para actualizar logo del sitio**:
  - Sección dedicada para el logo de marca con vista previa actual
  - Botón "Actualizar Logo" con estilo dorado consistente
  - **Funcionalidad de subida de logo completamente operativa** con integración correcta al blob storage
  - **Actualización automática** del logo en toda la navegación del sitio después de la subida
  - **Persistencia correcta** del nuevo logo en el backend
  - **Eliminación completa de errores de subida** y mensajes de placeholder
- **Organización clara de todos los assets visuales** con etiquetas descriptivas en español
- **Feedback visual inmediato** para operaciones de subida exitosas y errores
- **Validación de tipos de archivo** para asegurar formatos de imagen compatibles
- Diseño consistente con la estética minimalista de CIELO BLANCO: fondos blancos limpios, tipografía Cinzel, acentos dorados
- **Mensajes de confirmación en español** cuando las imágenes se suben exitosamente
- **Manejo elegante de errores** con mensajes informativos en español

- Diseño consistente con la estética de CIELO BLANCO: fondos blancos limpios, tipografía Cinzel, separadores dorados sutiles
- Animaciones suaves de desvanecimiento para preservar la sensación de lujo
- Diseño responsivo para escritorio y móvil
- Sincronización visual consistente entre el panel de administración y la página de tienda manteniendo el lenguaje de diseño refinado de CIELO BLANCO
- Consistencia estilística completa: paleta de colores, tipografía Cinzel, acentos dorados, equilibrio de blancos

## Gestión de Productos
- Componente de gestión de productos en el frontend para administrar detalles del mezcal
- Campos editables: nombre del producto, descripción, precio, **precio de envío**, **empresa de paquetería**, imagen, tipo de venta, URL de Mercado Libre, métodos de pago, **especificaciones con lógica de actualización corregida**, **cantidad en stock**, **estado de stock**, **configuración de combinación de productos**
- **Datos del producto almacenados correctamente en el backend** incluyendo especificaciones detalladas, **información de stock**, **información de envío** y **datos de combinación** con persistencia garantizada
- **API de actualización de productos completamente operativa** que asegura que las modificaciones a las especificaciones y combinaciones se guarden y persistan correctamente
- Interfaz simple para actualizar información del producto con **validación y feedback inmediato**
- **Funcionalidad para agregar nuevos productos completamente operativa** desde el panel de administración
- **Formulario de agregar producto con dropdowns corregidos** con campo de selección requerido para tipo de venta:
  - **Opción "Sitio Web Interno" con value válido y no vacío**
  - **Opción "Mercado Libre" con value válido y no vacío**
  - **Opción "Ambas" con value válido y no vacío**
  - Campo adicional requerido de URL de Mercado Libre que aparece cuando se selecciona "Mercado Libre" o "Ambas"
- **Campos de configuración de envío**:
  - **Precio de envío** (numérico, por defecto 0)
  - **Empresa de paquetería** (dropdown con opciones válidas y valores no vacíos)
- Configuración de métodos de pago con checkboxes para tarjeta de crédito/débito, efectivo y transferencia
- **Sección de especificaciones con persistencia completamente operativa** con campos editables para contenido de alcohol, tipo de agave, tamaño de botella, accesorios decorativos y otros detalles técnicos
- **Campo para cantidad inicial en stock** al crear nuevos productos
- **Sección de producto combinado con dropdown corregido** con opciones válidas y valores no vacíos para seleccionar tipo de combinación y producto asociado
- **Sincronización inmediata entre backend y frontend** para reflejar cambios de especificaciones y combinaciones en tiempo real
- Productos actualmente publicados aparecen en el Panel de Administración bajo la sección Productos

## Sistema de Diseño

### Paleta de Colores
- Blanco puro #FFFFFF como fondo principal en todas las páginas y componentes
- Marfil cálido para variaciones sutiles
- Oro metálico suave para acentos y elementos interactivos
- Tonos beige/piedra claros para textura

### Tipografía
- Fuente Cinzel aplicada consistentemente en todo el sitio web
- Todos los encabezados, texto del cuerpo y elementos de UI utilizan Cinzel
- Jerarquía clara a través de variaciones de tamaño, peso y espaciado
- Dimensionamiento de texto proporcional manteniendo legibilidad y sensación de lujo

### Animación e Interacciones
- Animaciones de desvanecimiento suave para aparición de contenido
- Efectos de desplazamiento parallax en secciones clave
- Estados de hover dorados para elementos interactivos
- Comportamiento de desplazamiento suave entre secciones
- Transiciones cinematográficas calmadas a lo largo de la experiencia
- Transiciones suaves entre páginas
- Transiciones de desplazamiento suaves hacia y desde la sección de tienda integrada
- Animación suave de desvanecimiento para el modal de pago
- Modal de verificación de edad rediseñado con transiciones elegantes y tarjeta flotante más compacta
- Transiciones suaves para la página dedicada de detalle del producto
- **Animaciones suaves para el icono flotante de WhatsApp y su modal**
- **Transiciones elegantes para la aparición de subsecciones de productos combinados**
- **Animaciones suaves para la actualización del resumen del pedido** cuando se agregan productos combinados

## Favicon
- El favicon del sitio utiliza el logo de marca (1.png) para aparecer como icono en las pestañas del navegador
- Implementación del favicon en todos los formatos estándar para compatibilidad completa del navegador

## Requisitos Técnicos

### Backend
- **Almacenamiento persistente robusto de múltiples productos** (nombre, descripción, precio, **precio de envío**, **empresa de paquetería**, imagen, tipo de venta, URL de Mercado Libre, métodos de pago configurados, **especificaciones detalladas con persistencia corregida**, **cantidad en stock**, **estado de stock**, **tipo de combinación y producto asociado**) usando variables estables en Motoko
- **API para gestión de productos completamente operativa** (crear, leer, actualizar, eliminar) incluyendo especificaciones, **gestión de stock**, **información de envío** y **configuración de combinaciones** con validación y persistencia adecuada
- **API de eliminación de productos funcional** con validación y actualización de referencias
- **API de actualización de especificaciones completamente operativa** que garantiza que los cambios se guarden correctamente y se reflejen en las consultas posteriores
- **API para actualizar stock de productos** (cantidad y estado de disponibilidad)
- **API para gestionar combinaciones de productos** (crear, actualizar, eliminar asociaciones entre productos)
- **Almacenamiento persistente de datos de combinación** incluyendo `combinationType` y `combinedProductId` para cada producto usando variables estables
- **Almacenamiento persistente de información de envío** incluyendo `shippingPrice` y `shippingCarrier` para cada producto usando variables estables
- API para subida de imágenes de productos
- **API completamente funcional para actualizar imágenes de galería** con integración operativa al blob storage y persistencia garantizada
- **API de eliminación de imágenes de galería funcional** con limpieza de archivos del blob storage
- **API completamente funcional para actualizar logo del sitio** con integración operativa al blob storage y persistencia garantizada
- **Almacenamiento persistente correcto de assets del sitio** (imágenes de galería y logo) con URLs actualizadas y persistencia de datos usando variables estables
- **Validación de tipos de archivo** para subidas de imágenes (formatos compatibles: JPG, PNG, WEBP)
- **Manejo robusto de errores** para operaciones de subida de assets con mensajes informativos
- Generación automática de números de pedido aleatorios
- **Almacenamiento persistente de detalles completos del carrito** incluyendo producto principal, cantidad, cualquier producto combinado agregado con sus respectivos precios, y precio de envío usando variables estables
- **Cálculo y almacenamiento persistente del monto total correcto** para cada pedido incluyendo productos combinados y envío usando variables estables
- **API de eliminación de pedidos funcional** con validación de integridad y persistencia de datos
- **Almacenamiento persistente de formularios de contacto de productos sin stock** con información completa del lead usando variables estables
- **API para gestionar leads/contactos** (crear, leer, actualizar estado, eliminar) con persistencia de datos
- **API de eliminación de leads funcional** con validación y persistencia de datos
- **Almacenamiento persistente de contactos de WhatsApp** con información del formulario del modal flotante usando variables estables
- **API para gestionar contactos de WhatsApp** (crear, leer, actualizar estado, eliminar) con persistencia de datos
- **API de eliminación de contactos de WhatsApp funcional** con validación y persistencia de datos
- **Mapa persistente** que asocia números de pedido con su estado actual (comenzando en "Pedido recibido") usando variables estables
- **API mejorada para recuperar estado de pedido** con actualización dinámica de estado
- **API mejorada para actualizar estado de pedido** que incluye:
  - Validación de campos requeridos cuando el estado cambia a "En tránsito"
  - Almacenamiento persistente de número de seguimiento y empresa de paquetería usando variables estables
  - Persistencia de información de tracking asociada al pedido
- **Almacenamiento persistente de información completa de pedidos** para el panel de administración incluyendo productos combinados, monto total, y **datos de tracking cuando aplique** usando variables estables
- **Almacenamiento persistente de información de tracking** incluyendo `trackingNumber` y `shippingCarrier` cuando el pedido está en tránsito usando variables estables
- Sin procesamiento de pagos reales - toda la funcionalidad de pago es simulada en el frontend
- **Verificación de integridad de datos** para asegurar que las operaciones de actualización de productos funcionen correctamente
- **Manejo robusto de errores** para operaciones de productos con mensajes informativos
- **Almacenamiento persistente correcto de especificaciones de productos** incluyendo contenido de alcohol, tipo de agave, tamaño de botella, accesorios decorativos y otros campos de especificaciones con validación de persistencia usando variables estables
- **API para recuperar información de productos combinados** que permita mostrar dinámicamente los productos asociados en el frontend
- **Persistencia de datos robusta usando variables estables en Motoko** para todos los tipos de registros (productos, pedidos, leads, contactos WhatsApp, imágenes de galería, logo del sitio) que funcione consistentemente en todos los navegadores y se mantenga entre reinicios del canister
- **Implementación de serialización backend** con soporte de variables estables o mecanismo de migración para hacer todos los mapas (storeProducts, leads, whatsappContacts, orders, galleryImages, userProfiles, etc.) persistentes
- **Patrones de almacenamiento de datos estables** usando declaraciones `stable var` en lugar de estado transitorio en actores Motoko

### Frontend
- Página de bienvenida con modal de verificación de edad rediseñado: tarjeta flotante más pequeña, equilibrada y elegante como punto de entrada
- **Logo transparente de CIELO BLANCO (1-removebg-preview.png) integrado en la barra de navegación reemplazando el texto "CIELO BLANCO"**
- **Escalado proporcional del logo dentro de la navbar manteniendo el estilo glassmorphism y alineación con otros elementos de navegación**
- **Animaciones de hover y estilo de transparencia consistentes con el lenguaje de diseño existente del sitio**
- **Enlace correcto del asset del logo para visualización clara en vistas de escritorio y móvil**
- **Icono flotante de WhatsApp** posicionado de manera fija en todas las páginas con diseño consistente con CIELO BLANCO
- **Modal flotante de contacto WhatsApp** con campos para nombre y motivo de contacto, diseño elegante con tipografía Cinzel y acentos dorados
- **Funcionalidad de redirección a WhatsApp corregida** con mensaje prellenado incluyendo datos del usuario y número +525519654396, **sin errores de redirección y transición suave**
- **Tarjetas de producto rediseñadas en la sección "Nuestra Tienda"** que muestran únicamente imagen, descripción, especificaciones y botón "Ver más"
- **Eliminación completa de botones de compra y logos de métodos de pago** de las tarjetas de producto en la página principal
- **Layout visualmente equilibrado y refinado** para mostrar descripción y especificaciones de manera elegante
- **Cuadrícula de productos completamente funcional** que muestra solo imagen, nombre y descripción corta con botón "Ver más"
- **Página dedicada completa de detalle del producto con especificaciones actualizadas en tiempo real** (no modal flotante) que muestra información completa incluyendo precio, **información de envío**, especificaciones actualizadas, métodos de pago y botones de compra
- **Visualización de información de envío** en la página de detalle:
  - Mostrar precio de envío (si es 0, mostrar "Envío gratis")
  - Mostrar empresa de paquetería configurada
- **Sección de producto combinado en la página de detalle**:
  - Subsección elegante que aparece debajo del producto principal cuando hay una combinación configurada
  - Título dinámico: "Combínalo con esto" para bundles o "Personalízalo" para personalizaciones
  - Tarjeta del producto asociado con diseño consistente con la estética de CIELO BLANCO
  - Transiciones suaves y animaciones elegantes para la aparición de la subsección
  - **Sincronización automática** para mostrar información actualizada del producto combinado
- **Control de selección de cantidad** en la página de detalle del producto con botones de incremento/decremento elegantes
- **Gestión de estado de stock** en la página de detalle:
  - Mostrar controles de compra normales cuando hay stock
  - Mostrar mensaje de sin stock y formulario de contacto cuando no hay stock
- **Formulario de contacto para productos sin stock** con validación y envío al backend
- URLs únicas para cada página de producto permitiendo navegación directa y compartir enlaces
- Renderizado dinámico de botones en la página de detalle basado en el tipo de venta del producto:
  - Botón "Mercado Libre" con redirección a URL específica para productos de Mercado Libre
  - Botón "Comprar Ahora" para activar checkout interno para productos de venta interna
  - Ambos botones para productos con tipo de venta "Ambas"
- **Visualización de especificaciones actualizadas** en la página de detalle del producto que reflejan inmediatamente los cambios realizados por el administrador
- Visualización de logos de métodos de pago configurados en la página de detalle del producto
- **Formulario de checkout embebido mejorado** con:
  - Campos de pago estándar (nombre, email, dirección, detalles de tarjeta)
  - **Sección "Resumen del pedido"** mostrando producto principal, cantidad, precio del producto y precio de envío
  - **Sección de producto combinado** posicionada debajo del resumen:
    - Aparece solo si el producto tiene combinación configurada
    - Muestra información del producto combinado con diseño elegante
    - **Botón CTA "¡Lo quiero!"** con estilo dorado para agregar al carrito
    - **Actualización inmediata del resumen** al agregar producto combinado
    - **Recálculo automático del precio total** incluyendo productos combinados y envío
- **Estado de carrito dinámico** que maneja tanto producto principal como productos combinados agregados, incluyendo cálculo de envío
- **Modal de pago simulado mejorado** con:
  - Campos de tarjeta y opciones de pago (Apple Pay, Google Pay)
  - **Visualización del monto total actualizado** incluyendo productos combinados y precio de envío
  - **Procesamiento del monto total correcto** en la simulación de pago
- **Página de éxito de pago mejorada** que muestra el resumen completo del pedido incluyendo productos combinados e información de envío
- **Página de seguimiento de pedido con funcionalidad corregida**:
  - Campo de entrada de número de pedido
  - **Botón "Buscar" que actualiza resultados dinámicamente** sin requerir recarga manual de página
  - **Actualización inmediata del estado** mediante React Query o React state
  - **Refrescado automático de estado** cuando se realiza búsqueda
  - Visualización de estado con indicadores de progreso dorados
  - **Información de tracking mejorada**: Cuando el pedido está "En tránsito", mostrar:
    - **Empresa de envío**: [Nombre de la paquetería]
    - **Número de seguimiento**: [Tracking number]
- **Páginas legales dedicadas**:
  - **Página Política de Privacidad** con contenido completo conforme a legislación mexicana
  - **Página Términos de Servicio** con contenido completo conforme a legislación mexicana
  - Diseño consistente con la estética minimalista de lujo de CIELO BLANCO
  - Enlaces desde el pie de página a ambas páginas legales
- **Pie de página actualizado**:
  - **Texto de derechos de autor actualizado**: "Cielo Blanco S.A de C.V todos los derechos reservados 2025"
  - Icono de Instagram que redirige a: `https://www.instagram.com/cieloblancomezcal?igsh=NGl1Z3g3c3k0MWpv`
  - Eliminación completa de iconos de Facebook y Twitter
  - **Enlaces a Política de Privacidad y Términos de Servicio**
  - Eliminación del texto "hecho con amor usando caffeine"
- **Panel de administración completamente funcional** con:
  - **Formulario de login centrado directamente sobre el fondo de pantalla** sin contenedor de tarjeta, con diseño minimalista y tipografía Cinzel refinada
  - **Sección Productos completamente operativa**: tabla/cuadrícula de productos actualmente publicados en la tienda **con información de stock, especificaciones actualizadas, información de envío y datos de combinación**
  - **Botones de eliminación completamente funcionales** para todos los productos con confirmación de alerta que advierte "Esta acción es irreversible"
  - **Actualización dinámica inmediata** después de eliminaciones sin recargar página mediante React Query invalidation
  - **Controles de gestión de stock** para cada producto (editar cantidad, marcar como sin stock)
  - **Formulario de actualización de productos completamente operativo** que garantiza que las modificaciones a las especificaciones y combinaciones se guarden y persistan correctamente
  - **Formulario para agregar nuevos productos completamente funcional** con subida de imagen, selección requerida de tipo de venta, **configuración de envío**, configuración de métodos de pago, **cantidad inicial en stock** y **configuración de producto combinado**
  - **Campos de configuración de envío**:
    - **Precio de envío** (campo numérico, por defecto 0)
    - **Empresa de paquetería** (dropdown con opciones válidas y valores no vacíos: FedEx, DHL, Estafeta, Redpack, UPS, Paqueteexpress, 99Minutos, J&T Express)
  - **Campo condicional requerido de URL de Mercado Libre** que aparece cuando se selecciona "Mercado Libre" o "Ambas"
  - Checkboxes para configurar métodos de pago (tarjeta de crédito/débito, efectivo, transferencia)
  - **Sección "Especificaciones" completamente operativa** con campos editables elegantes para contenido de alcohol, tipo de agave, tamaño de botella, accesorios decorativos y otros detalles técnicos
  - **Sección "Producto Combinado" con dropdown corregido** con opciones válidas y valores no vacíos para seleccionar tipo de combinación y producto asociado
  - **Funcionalidad para ver, editar o eliminar combinaciones de productos** con el mismo layout refinado del resto de la interfaz de administración
  - **Sección "Pedidos" completamente funcional**:
    - **Botones de eliminación completamente funcionales** para todos los pedidos con confirmación de alerta que advierte "Esta acción es irreversible"
    - **Actualización dinámica inmediata** después de eliminaciones sin recargar página mediante React Query invalidation
    - **Visualización correcta de pedidos** que persiste datos apropiadamente y se actualiza dinámicamente en todos los navegadores
    - **Gestión de pedidos mejorada** que muestra información completa incluyendo productos combinados, monto total correcto e información de envío
    - **Funcionalidad mejorada para actualizar estado de pedidos**:
      - Cuando se selecciona "En tránsito", aparecen campos obligatorios:
        - **Número de seguimiento** (campo de texto requerido)
        - **Empresa de paquetería** (dropdown con las mismas opciones que en productos)
      - Validación para asegurar que ambos campos se completen antes de guardar
      - Almacenamiento de datos de tracking con el pedido
  - **Sección "Contactos/Leads" completamente funcional**:
    - **Botones de eliminación completamente funcionales** para todos los leads con confirmación de alerta que advierte "Esta acción es irreversible"
    - **Actualización dinámica inmediata** después de eliminaciones sin recargar página mediante React Query invalidation
    - **Visualización correcta de leads** que persiste datos apropiadamente y se actualiza dinámicamente en todos los navegadores
    - **Funcionalidad para marcar leads como contactados** y filtrar por estado
  - **Sección "Contactos WhatsApp" completamente funcional**:
    - **Botones de eliminación completamente funcionales** para todos los contactos con confirmación de alerta que advierte "Esta acción es irreversible"
    - **Actualización dinámica inmediata** después de eliminaciones sin recargar página mediante React Query invalidation
    - **Visualización correcta de contactos WhatsApp** que persiste datos apropiadamente y se actualiza dinámicamente en todos los navegadores
    - **Funcionalidad para marcar contactos de WhatsApp como contactados** y filtrar por estado
  - **Sección Galería/Site Assets completamente operativa**:
    - **Botones de eliminación completamente funcionales** para todas las imágenes con confirmación de alerta que advierte "Esta acción es irreversible"
    - **Actualización dinámica inmediata** después de eliminaciones sin recargar página mediante React Query invalidation
    - **Visualización completa de todas las imágenes actuales** con datos persistentes que se muestran correctamente en todos los navegadores
    - **Interfaz completamente funcional para subir nuevas imágenes de galería** con integración operativa al blob storage
    - **Botón "Subir Nueva Imagen" completamente operativo** con vista previa inmediata
    - **Funcionalidad "Reemplazar" completamente operativa** para imágenes existentes sin errores de subida
    - **Interfaz completamente funcional para actualizar logo del sitio** con persistencia garantizada
    - **Actualización automática del logo en toda la navegación** después de la subida
    - **Eliminación completa de mensajes de placeholder** y errores de funcionalidad
    - **Feedback visual inmediato** para operaciones exitosas y manejo elegante de errores
    - **Validación de tipos de archivo** con mensajes informativos en español
    - **Mensajes de confirmación en español** para operaciones exitosas
- **Invalidación automática de React Query cache** después de actualizaciones de productos para asegurar que las especificaciones y combinaciones modificadas se muestren inmediatamente
- **Sincronización en tiempo real** entre el panel de administración y las páginas de tienda/detalle de producto
- **Sincronización frontend mejorada vía React Query refetch** para mostrar elementos guardados previamente de manera consistente entre navegadores y sesiones
- **Verificación de que AdminDashboardPage refleje correctamente los datos almacenados** y todas las funciones CRUD permanezcan completamente operativas
- Eliminación completa de botones de login/logout y lógica de autenticación (excepto para el panel de administración)
- Navegación glassmorphism con efecto translúcido y esmerilado
- Carrusel de galería elegante con transiciones de desvanecimiento suave y puntos de navegación dorados
- Navegación y transiciones suaves entre todas las páginas
- Manejo de estados de la página de bienvenida y acceso al sitio principal
- **Funcionalidad de pago completamente simulada** que maneja correctamente el monto total incluyendo productos combinados y envío
- **Redirección automática a la página de seguimiento de pedido** después de pago exitoso con número de pedido mostrado
- Sincronización visual consistente entre panel de administración y página de tienda
- Consistencia estilística completa preservada en todas las páginas: paleta de colores, tipografía Cinzel, acentos dorados, equilibrio de blancos
- Implementación del favicon utilizando el logo de marca (1.png) en todos los formatos estándar
- **Manejo de errores mejorado** para operaciones de productos con mensajes de error claros en español
- **Validación de formularios robusta** para la actualización de productos con feedback inmediato
- **Actualización automática de la interfaz** después de modificar productos exitosamente
- **Sincronización inmediata** entre el dashboard de administración y la vista de tienda para reflejar cambios de productos, especificaciones y combinaciones
- **Funcionalidad de subida de assets completamente operativa** sin errores de integración con blob storage
- **React Query invalidation apropiada** para todas las operaciones de eliminación y actualización en el panel de administración
- **Corrección de errores de Select.Item value** asegurando que todos los dropdowns tengan valores válidos y no vacíos con manejo apropiado de placeholders por defecto

### Experiencia del Usuario
- Verificación de edad obligatoria con modal elegante rediseñado (más compacto y equilibrado) antes del acceso al sitio
- **Acceso fácil a contacto WhatsApp** desde cualquier página con icono flotante elegante y modal intuitivo **con redirección funcional sin errores**
- Navegación multi-página con transiciones suaves
- Diseño responsivo móvil primero
- Rendimiento de carga rápida con imágenes optimizadas
- Espacios en blanco generosos y ritmo intencional
- Consideraciones de accesibilidad para animaciones y navegación
- Alineación perfecta y responsividad en escritorio y móvil
- Consistencia de layout mantenida con la sección de tienda ubicada inmediatamente después de "La Esencia"
- **Experiencia simplificada en la sección "Nuestra Tienda"** con tarjetas de producto que muestran solo información esencial y botón "Ver más"
- **Navegación fluida a páginas dedicadas de detalle** con información completa de productos incluyendo información de envío
- **Transparencia en costos de envío** con visualización clara de precios y empresa de paquetería
- **Descubrimiento intuitivo de productos combinados** con subsecciones elegantes que aparecen automáticamente cuando están configuradas
- **Experiencia de combinación de productos fluida** que mantiene la estética de lujo de CIELO BLANCO
- **Proceso de checkout mejorado** con descubrimiento intuitivo de productos combinados:
  - **Visualización clara del producto combinado** solo en la página de checkout
  - **CTA atractivo "¡Lo quiero!"** que facilita la adición al carrito
  - **Actualización inmediata del resumen** con feedback visual claro incluyendo costos de envío
  - **Experiencia de compra fluida** que mantiene la elegancia de CIELO BLANCO
- Proceso de compra triple: redirección externa a Mercado Libre con URLs específicas, checkout interno simulado, o ambas opciones disponibles
- **Selección de cantidad intuitiva** en la página de detalle del producto
- **Experiencia diferenciada para productos sin stock** con formulario de contacto elegante
- **Visualización actualizada en tiempo real** de especificaciones de productos que reflejan inmediatamente cualquier cambio realizado por el administrador
- Visualización clara de métodos de pago aceptados para cada producto en la página de detalle
- **Experiencia de pago simulada fluida** con modal elegante que procesa correctamente el monto total incluyendo productos combinados y envío
- **Seguimiento de pedidos intuitivo y funcional** con búsqueda dinámica sin recargas de página y visualización clara del progreso
- **Información de tracking transparente** con empresa de envío y número de seguimiento cuando el pedido está en tránsito
- **Acceso fácil a información legal** con páginas dedicadas de Política de Privacidad y Términos de Servicio
- **Panel de administración completamente funcional** para gestión completa de productos, pedidos, **leads, contactos WhatsApp y combinaciones de productos**
- **Gestión de eliminaciones completamente funcional** con confirmaciones de seguridad y actualizaciones dinámicas inmediatas
- **Gestión de stock simplificada** para administradores con controles intuitivos
- **Configuración intuitiva de información de envío** con campos claros para precio y empresa de paquetería
- **Configuración intuitiva de combinaciones de productos** con dropdowns elegantes y feedback claro
- **Gestión de tracking de pedidos simplificada** con campos obligatorios cuando se marca como "En tránsito"
- **Actualización de especificaciones y combinaciones sin errores** con feedback claro sobre el estado de las operaciones
- **Gestión de assets del sitio completamente funcional** con funcionalidad de subida completamente operativa
- **Actualización de galería e imágenes completamente funcional** con vista previa inmediata y feedback claro
- **Actualización de logo completamente funcional** con cambios reflejados automáticamente en todo el sitio
- Vista simplificada de productos en la tienda con acceso fácil a páginas dedicadas de detalles completos
- Página dedicada de detalle del producto elegante y funcional manteniendo la estética de lujo con URLs únicas
- Productos actualmente publicados visibles en el Panel de Administración
- Nuevos productos agregados aparecen organizados y consistentes con el diseño actual de la tienda
- Favicon del sitio mostrando el logo de marca en las pestañas del navegador
- **Experiencia de administración de productos sin errores** con feedback claro sobre el estado de las operaciones de actualización
- Mensajes de confirmación en español cuando los productos se actualizan exitosamente
- **Manejo elegante de errores** de conectividad con mensajes informativos para el administrador
- **Formulario de login del panel de administración** con diseño minimalista centrado directamente sobre el fondo sin contenedor de tarjeta
- **Pie de página actualizado** con texto de derechos de autor correcto y enlaces legales
- **Experiencia de administración de assets completamente funcional** con funcionalidad de subida completamente operativa y feedback inmediato
- **Experiencia de administración sin frustraciones** con todas las funcionalidades de eliminación y actualización operativas
- **Persistencia de datos confiable** que asegura que todos los registros creados (productos, pedidos, contactos, WhatsApp, leads, galería y logo) se guarden correctamente y se restauren al recargar o acceder desde otro navegador

### Diseño y Espaciado
- Alineación vertical consistente con espaciado generoso
- Puntos de quiebre responsivos para móvil, tableta y escritorio
- Jerarquía visual consistente en todas las páginas
- Composición equilibrada asegurando que no haya elementos superpuestos
- Padding y márgenes consistentes en todo el sitio
- Fondo blanco uniforme #FFFFFF en todas las páginas y componentes
- Transiciones de desplazamiento suaves mantenidas con la ubicación de la sección de tienda después de "La Esencia"
- Modal de pago centrado con overlay semitransparente
- Modal de verificación de edad rediseñado: centrado con diseño elegante tipo tarjeta flotante más compacta y equilibrada
- **Formulario de login del panel de administración centrado directamente sobre el fondo** con espaciado refinado y tipografía elegante
- Cuadrícula de productos organizada con espaciado consistente y estética de lujo
- **Tarjetas de producto rediseñadas** con layout visualmente equilibrado para mostrar descripción y especificaciones de manera refinada
- Página dedicada de detalle del producto con diseño de página completa, layout elegante y espaciado generoso
- **Sección de información de envío** integrada armoniosamente en la página de detalle del producto
- **Controles de cantidad elegantes** integrados armoniosamente en la página de detalle
- **Subsección de producto combinado** con espaciado elegante y transiciones suaves que mantienen la armonía visual
- **Formulario de contacto para productos sin stock** con espaciado y estilo consistente con CIELO BLANCO
- **Icono flotante de WhatsApp** posicionado elegantemente sin interferir con el contenido principal
- **Modal de contacto WhatsApp** con espaciado y diseño consistente con la estética minimalista de CIELO BLANCO
- **Páginas legales** con layout elegante, espaciado generoso y jerarquía visual clara
- **Sección Galería/Site Assets** con cuadrícula organizada y espaciado elegante para visualización de assets
- **Botones de subida de assets** con diseño consistente y posicionamiento intuitivo
- **Botones de eliminación completamente funcionales** con diseño consistente y posicionamiento apropiado en todas las secciones del panel de administración
- **Página de checkout con espaciado refinado**:
  - **Sección "Resumen del pedido"** con espaciado elegante y tipografía clara incluyendo información de envío
  - **Sección de producto combinado** posicionada armoniosamente debajo del resumen
  - **Botón CTA "¡Lo quiero!"** con estilo dorado consistente y espaciado apropiado
  - **Actualización visual suave** del resumen sin interrumpir el flujo de la página
- **Campos de tracking en el panel de administración** con espaciado elegante y diseño consistente
- **Información de tracking en la página de seguimiento** con jerarquía visual clara y espaciado apropiado
- Consistencia estilística completa: paleta de colores, tipografía Cinzel, acentos dorados, equilibrio de blancos

## Localización
- Todo el contenido en español
- Formularios y mensajes en español
- Etiquetas de botones y navegación en español
- Página de bienvenida con texto de verificación de edad en español
- **Formulario de checkout y modal de pago en español** incluyendo:
  - **Sección "Resumen del pedido"**
  - **Información de envío**: "Envío gratis" o precio de envío
  - **Botón CTA "¡Lo quiero!"** para productos combinados
  - **Mensajes de actualización del carrito** en español
- Página de éxito de pago en español
- **Página de seguimiento de pedido en español** con botón "Buscar" y mensajes de estado
- **Información de tracking en español**:
  - **"Empresa de envío"**: [Nombre de la paquetería]
  - **"Número de seguimiento"**: [Tracking number]
- **Páginas legales completamente en español**:
  - **Política de Privacidad** con terminología legal mexicana apropiada
  - **Términos de Servicio** con terminología legal mexicana apropiada
- Panel de administración en español
- Formulario de agregar producto con etiquetas en español para tipo de venta, URL de Mercado Libre, métodos de pago, **precio de envío**, **empresa de paquetería**, especificaciones, **stock** y **combinación de productos**
- **Etiquetas de configuración de envío**:
  - **"Precio de envío"** (campo numérico)
  - **"Empresa de paquetería"** (dropdown)
- **Opciones de empresas de paquetería en español**: FedEx, DHL, Estafeta, Redpack, UPS, Paqueteexpress, 99Minutos, J&T Express
- **Campos de tracking de pedidos en español**:
  - **"Número de seguimiento"** (campo requerido)
  - **"Empresa de paquetería"** (dropdown requerido)
- **Mensaje de sin stock**: "Por ahora estamos sin stock, déjanos tus datos para mantenerte informado/a."
- **Formulario de contacto de productos sin stock** con etiquetas en español
- **Sección "Contactos/Leads"** con interfaz completamente en español
- **Modal de contacto WhatsApp** con etiquetas y mensajes en español:
  - Campos: "Nombre" y "Motivo de contacto"
  - Botón: "Enviar"
  - Mensaje de WhatsApp prellenado en español
- **Sección "Contactos WhatsApp"** en el panel de administración con interfaz en español
- **Sección Galería/Site Assets en español** con etiquetas y botones en español:
  - "Subir Nueva Imagen"
  - "Actualizar Logo"
  - "Reemplazar"
  - **Mensajes de confirmación**: "Imagen subida exitosamente", "Logo actualizado correctamente"
  - **Mensajes de error**: "Error al subir la imagen", "Formato de archivo no compatible"
- Página dedicada de detalle del producto con texto y botones en español
- Botón "Ver más" en español
- **Títulos de subsección de productos combinados** en español:
  - "Combínalo con esto" para bundles
  - "Personalízalo" para personalizaciones
- **Etiquetas de la sección "Producto Combinado"** en español:
  - "Sin combinación"
  - "Bundle (Combina con otro producto)"
  - "Personalización (Agrega accesorios o presentación)"
- **Mensajes de error y confirmación del panel de administración** en español con feedback específico para operaciones de actualización de especificaciones y combinaciones
- **Feedback de estado de operaciones de productos** en español incluyendo confirmaciones de actualización exitosa
- **Sección "Especificaciones"** con etiquetas y campos en español
- **Texto de derechos de autor actualizado**: "Cielo Blanco S.A de C.V todos los derechos reservados 2025"
- **Enlaces del pie de página**: "Política de Privacidad" y "Términos de Servicio" en español
- **Feedback de operaciones de assets** completamente en español con mensajes claros y profesionales
- **Mensajes de carrito y checkout** en español incluyendo confirmaciones de productos agregados
- **Alertas de confirmación de eliminación** en español: "Esta acción es irreversible"
- **Botones de eliminación** con etiquetas en español: "Eliminar"
- **Validación de campos de tracking** con mensajes en español cuando se requieren para estado "En tránsito"
