# 🐟 Andrimar - Mariscos Frescos en Quito

## 📋 Descripción

Sitio web profesional para **Andrimar**, proveedores directos de mariscos frescos en Quito con 20 años de experiencia. El sitio está optimizado para SEO, accesibilidad y rendimiento, ofreciendo una experiencia de usuario excepcional.

## ✨ Características Principales

### 🎨 Diseño y UX
- **Diseño responsivo** - Optimizado para todos los dispositivos
- **Paleta de colores profesional** - Azules/verdes marinos coherentes
- **Animaciones suaves** - Transiciones y efectos visuales atractivos
- **Modal de imágenes** - Vista ampliada de productos
- **Navegación sticky** - Menú siempre accesible

### 🚀 Rendimiento
- **CSS y JS separados** - Código organizado y mantenible
- **Lazy loading** - Carga optimizada de imágenes
- **Preload de recursos críticos** - Mejora tiempos de carga
- **Optimización de imágenes** - Formatos modernos y tamaños optimizados
- **Service Worker** - Funcionalidad PWA

### 🔍 SEO y Accesibilidad
- **Meta tags completos** - Open Graph, Twitter Cards
- **Schema.org markup** - Datos estructurados para buscadores
- **Sitemap XML** - Indexación optimizada
- **Robots.txt** - Control de crawlers
- **Accesibilidad WCAG** - Navegación por teclado, screen readers
- **Skip links** - Navegación rápida para usuarios con discapacidad

### 📱 PWA (Progressive Web App)
- **Manifest.json** - Instalable como app nativa
- **Service Worker** - Funcionalidad offline
- **Iconos múltiples** - Soporte para diferentes dispositivos
- **Tema personalizado** - Colores de marca

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Flexbox, Grid, Variables CSS, Media Queries
- **JavaScript ES6+** - Clases, módulos, async/await
- **PWA** - Service Workers, Manifest
- **SEO** - Schema.org, Meta tags, Sitemap

## 📁 Estructura del Proyecto

```
Andrimar_web/
├── index.html              # Página principal
├── styles.css              # Estilos CSS optimizados
├── script.js               # JavaScript modular
├── site.webmanifest        # Configuración PWA
├── robots.txt              # Control de crawlers
├── sitemap.xml             # Mapa del sitio
├── README.md               # Documentación
├── logo.png                # Logo principal
├── favicon.ico             # Favicon
├── favicon-16x16.png       # Favicon 16x16
├── favicon-32x32.png       # Favicon 32x32
├── apple-touch-icon.png    # Icono para iOS
├── android-chrome-192x192.png  # Icono Android 192x192
├── android-chrome-512x512.png  # Icono Android 512x512
└── img/                    # Imágenes de productos
    ├── pulpa_cangrejo.png
    ├── langostino.png
    ├── pulpo.png
    ├── calamar_anillos.png
    ├── calamar_pota.png
    ├── calamar_baby.png
    ├── almeja_blanca.png
    ├── almeja_perla.png
    ├── almeja_gris.png
    ├── almeja_pulpa.png
    ├── mejillon_cascara.png
    ├── mejillon_pulpa.png
    ├── concha.png
    └── unas_cangrejo.png
```

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno
- Servidor web (para desarrollo local)

### Instalación Local
1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador
3. Para desarrollo local, usa un servidor:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   
   # Con PHP
   php -S localhost:8000
   ```

### Despliegue en GitHub Pages
1. Sube los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama principal
4. El sitio estará disponible en `https://tuusuario.github.io/repositorio`

## 📊 Métricas de Rendimiento

### Lighthouse Score (Objetivo: 90+)
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### Optimizaciones Implementadas
- ✅ Compresión de imágenes
- ✅ Minificación de CSS/JS
- ✅ Lazy loading
- ✅ Preload de recursos críticos
- ✅ Cache headers
- ✅ CDN ready

## 🎯 Funcionalidades Específicas

### Modal de Imágenes
- Clic en cualquier imagen de producto
- Navegación por teclado (Enter, ESC)
- Animaciones suaves
- Focus management para accesibilidad

### Navegación
- Scroll suave entre secciones
- Navegación sticky
- Enlaces internos optimizados

### Contacto
- Botón WhatsApp flotante
- Enlaces directos a WhatsApp con mensaje predefinido
- Ubicación en Google Maps
- Información de contacto completa

## 🔧 Personalización

### Colores
Los colores se pueden modificar en las variables CSS:
```css
:root {
  --primary-color: #004d4d;
  --secondary-color: #009999;
  --accent-color: #25D366;
}
```

### Contenido
- Edita `index.html` para cambiar textos
- Modifica `styles.css` para ajustar estilos
- Actualiza `script.js` para funcionalidades

### Imágenes
- Reemplaza las imágenes en la carpeta `img/`
- Mantén las proporciones recomendadas
- Optimiza para web (WebP recomendado)

## 📈 Analytics y Monitoreo

### Eventos Rastreados
- Visualizaciones de página
- Clics en CTA
- Apertura de modales
- Hover en productos
- Navegación entre secciones

### Integración con Google Analytics
```javascript
// Agregar en el head del HTML
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Seguridad

- **HTTPS** - Conexión segura
- **CSP** - Content Security Policy
- **Validación de entrada** - Sanitización de datos
- **Headers de seguridad** - Protección adicional

## 🌐 Compatibilidad

### Navegadores Soportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dispositivos
- Desktop (1920x1080+)
- Tablet (768x1024)
- Mobile (375x667+)

## 📞 Soporte

Para soporte técnico o consultas:
- **Email**: ana_acosta_ra@hotmail.com
- **WhatsApp**: +593 99 499 9468

## 📄 Licencia

Este proyecto es propiedad de Andrimar. Todos los derechos reservados.

## 🎉 Créditos

Desarrollado con ❤️ para Andrimar - Mariscos Frescos en Quito

---

**Versión**: 2.0  
**Última actualización**: Enero 2025  
**Estado**: ✅ Producción 