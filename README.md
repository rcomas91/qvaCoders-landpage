# gusanosCode - Landing Page

Una landing page moderna y minimalista para gusanosCode, empresa de desarrollo de software a la medida.

## 🚀 Características

- **Diseño Responsivo**: Se adapta perfectamente a todos los dispositivos
- **Interfaz Moderna**: Diseño minimalista con gradientes y animaciones suaves
- **Navegación Suave**: Scroll suave entre secciones
- **Formulario de Contacto**: Validación en tiempo real y envío de emails
- **Animaciones**: Efectos visuales atractivos y profesionales
- **Optimizado**: Código limpio y optimizado para rendimiento

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS y Flexbox/Grid
- **TypeScript**: Funcionalidad interactiva con tipado estático
- **Font Awesome**: Iconos profesionales
- **Google Fonts**: Tipografía Inter para mejor legibilidad

## 📁 Estructura del Proyecto

```
gusanos-code/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.ts           # Código TypeScript
├── script.js           # JavaScript compilado
└── README.md           # Documentación
```

## 🎨 Secciones de la Landing Page

1. **Header**: Navegación fija con menú responsive
2. **Hero**: Sección principal con llamada a la acción
3. **Servicios**: Catálogo de servicios ofrecidos
4. **Tecnologías**: Stack tecnológico utilizado
5. **Testimonios**: Opiniones de clientes satisfechos
6. **Contacto**: Formulario de contacto y información
7. **Footer**: Enlaces adicionales y redes sociales

## 🚀 Servicios Ofrecidos

- **Desarrollo Web**: Aplicaciones web modernas y responsivas
- **Desarrollo Móvil**: Apps nativas e híbridas
- **Backend & APIs**: APIs robustas y escalables
- **Bases de Datos**: Diseño y optimización
- **Cloud Computing**: Migración y gestión en la nube
- **Mantenimiento**: Soporte técnico continuo

## 💻 Tecnologías Destacadas

### Frontend
- Angular
- React
- Vue.js
- TypeScript

### Backend
- .NET Core
- Node.js
- Python
- Java

### Móvil
- Flutter
- React Native
- Swift
- Kotlin

## 📧 Contacto

- **Email**: raydelcomas1991@gmail.com
- **Teléfono**: +53 52811698
- **Horario**: Lun - Vie: 9:00 AM - 6:00 PM

## 🎯 Funcionalidades Interactivas

- **Menú Móvil**: Navegación hamburguesa para dispositivos móviles
- **Scroll Suave**: Navegación fluida entre secciones
- **Validación de Formularios**: Verificación en tiempo real
- **Notificaciones**: Mensajes de éxito y error
- **Efectos Parallax**: Animaciones de scroll
- **Hover Effects**: Interacciones visuales atractivas

## 🔧 Instalación y Uso

1. **Clona o descarga** los archivos del proyecto
2. **Abre** `index.html` en tu navegador
3. **Personaliza** el contenido según tus necesidades
4. **Configura** el envío de emails en `script.js`

## � Configuración del Formulario de Contacto

Para que el formulario de contacto envíe emails automáticamente, necesitas configurar EmailJS:

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/) y crea una cuenta gratuita
2. Verifica tu email

### 2. Configurar Email Service
1. En el dashboard de EmailJS, ve a "Email Services"
2. Agrega un nuevo servicio (Gmail, Outlook, etc.)
3. Conecta tu cuenta de email (raydelcomas1991@gmail.com)

### 3. Crear Email Template
1. Ve a "Email Templates" y crea un nuevo template
2. Usa este contenido para el template:

```
Asunto: Nuevo mensaje de contacto - {{from_name}}

Hola,

Has recibido un nuevo mensaje de contacto desde tu sitio web:

Nombre: {{from_name}}
Email: {{from_email}}
Empresa: {{company}}
Servicio: {{service}}

Mensaje:
{{message}}

---
Este email fue enviado desde el formulario de contacto de gusanosCode.
```

### 4. Configurar en script.js
1. Abre `script.js`
2. Reemplaza los placeholders con tus IDs reales:
   - `TU_SERVICE_ID`: El Service ID de tu email service
   - `TU_TEMPLATE_ID`: El Template ID que acabas de crear
   - `TU_PUBLIC_KEY`: Tu Public Key (encontrada en Account > General)

### 5. Probar el formulario
1. Abre la página en tu navegador
2. Llena y envía el formulario de contacto
3. Verifica que recibas el email en raydelcomas1991@gmail.com

## 🔍 Solución de Problemas (Troubleshooting)

Si el formulario no envía emails, sigue estos pasos:

### 1. Verificar configuración
- Abre `test-emailjs.html` en tu navegador
- Haz clic en "Probar EmailJS"
- Si funciona, el problema está en el formulario
- Si no funciona, revisa tu configuración de EmailJS

### 2. Usar el script de diagnóstico
1. Abre tu sitio web en el navegador
2. Presiona F12 para abrir las herramientas de desarrollo
3. Ve a la pestaña "Console"
4. Copia y pega el contenido de `diagnostico-emailjs.js`
5. Presiona Enter
6. Ejecuta `testEmailJSConnection()` para probar el envío

### 3. Revisar la consola del navegador
Cuando envíes el formulario, mira los mensajes en la consola (F12 > Console) para ver exactamente dónde está el error.

### 3. Errores comunes
- **"EmailJS no está cargado"**: Verifica tu conexión a internet
- **"Invalid service ID"**: Revisa que el Service ID sea correcto
- **"Invalid template ID"**: Verifica el Template ID
- **"Invalid public key"**: Confirma tu Public Key
- **"Template parameters missing"**: Asegúrate de que el template use las variables correctas

### 4. Verificar template de EmailJS
Asegúrate de que tu template en EmailJS use exactamente estas variables:
- `{{from_name}}`
- `{{from_email}}`
- `{{company}}`
- `{{service}}`
- `{{message}}`
- `{{to_email}}`

### 5. Contacto de soporte
Si nada funciona, contacta al soporte de EmailJS con tus IDs de configuración.

## �📱 Responsive Design

La landing page está optimizada para:
- 📱 Móviles (320px - 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Desktop (1024px+)

## 🎨 Personalización

### Colores
Los colores se pueden modificar en las variables CSS:
```css
:root {
    --primary: #2563eb;    /* Color principal */
    --secondary: #64748b;  /* Color secundario */
    --accent: #f59e0b;     /* Color de acento */
    --dark: #1e293b;       /* Color oscuro */
    --light: #f8fafc;      /* Color claro */
}
```

### Contenido
- Modifica el texto en `index.html`
- Actualiza los testimonios con casos reales
- Cambia la información de contacto
- Personaliza los servicios ofrecidos

## 📈 Optimización SEO

- Meta tags optimizados
- Estructura HTML semántica
- Imágenes con alt text
- URLs amigables
- Contenido relevante y actualizado

## 🔒 Seguridad

- Validación de formularios en frontend y backend
- Sanitización de datos de entrada
- Protección contra XSS
- HTTPS recomendado para producción

## 📊 Analytics

Para agregar analytics:
1. Google Analytics
2. Facebook Pixel
3. Hotjar para heatmaps
4. Google Tag Manager

## 🚀 Despliegue

### Opciones de Hosting:
- **Netlify**: Despliegue gratuito y fácil
- **Vercel**: Optimizado para aplicaciones web
- **GitHub Pages**: Hosting gratuito para proyectos
- **AWS S3**: Almacenamiento escalable
- **Firebase Hosting**: Hosting de Google

### Pasos para Despliegue:
1. Sube los archivos a tu servidor
2. Configura el dominio
3. Activa HTTPS
4. Configura el envío de emails
5. Prueba todas las funcionalidades

## 🤝 Contribución

Si quieres contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Haz tus cambios
4. Envía un pull request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos comerciales y personales.

## 📞 Soporte

Para soporte técnico o consultas:
- Email: raydelcomas1991@gmail.com
- Documentación: Este README
- Issues: Usa el sistema de issues del repositorio

---

**gusanosCode** - Transformando ideas en soluciones digitales innovadoras 🚀 