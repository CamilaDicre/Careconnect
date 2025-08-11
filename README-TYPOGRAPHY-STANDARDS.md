# 📝 Guía de Estandarización de Tipografía - CareConnect

Este documento establece los estándares para diferenciar claramente entre títulos de sección y contenido descriptivo en todo el sitio web CareConnect.

## 🎯 Objetivo

Estandarizar la tipografía para que en móviles y tablets se diferencie claramente entre:
- **Títulos de sección** (principales)
- **Títulos de características** (secundarios)
- **Contenido descriptivo** (párrafos)

## 📋 Clases CSS Estandarizadas

### 1. Títulos de Sección (Principales)
```html
<h2 class="section-title">Título Principal de Sección</h2>
```
- **Desktop**: 2.5rem, font-weight: 700, color: var(--pal-primary)
- **Tablet**: 2rem
- **Mobile**: 1.8rem
- **Uso**: Títulos principales de cada sección del sitio

### 2. Títulos de Subsección
```html
<h3 class="subsection-title">Título de Subsección</h3>
```
- **Desktop**: 2rem, font-weight: 600, color: #2d4b6e
- **Tablet**: 1.6rem
- **Mobile**: 1.4rem
- **Uso**: Subtítulos dentro de secciones principales

### 3. Títulos de Características/Features
```html
<h4 class="service-feature-title">Nombre de Característica</h4>
```
- **Desktop**: 1.4rem, font-weight: 600, color: #2d4b6e
- **Tablet**: 1.2rem
- **Mobile**: 1.1rem
- **Uso**: Nombres de características, servicios, valores

### 4. Descripciones de Características
```html
<p class="service-feature-description">Descripción de la característica</p>
```
- **Desktop**: 1rem, font-weight: 400, color: #6c757d
- **Tablet**: 0.95rem
- **Mobile**: 0.9rem
- **Uso**: Descripciones breves de características

### 5. Contenido de Párrafo Regular
```html
<p class="content-text">Contenido de párrafo regular</p>
```
- **Desktop**: 1.1rem, font-weight: 400, color: #495057
- **Tablet**: 1rem
- **Mobile**: 1rem
- **Uso**: Párrafos de contenido general

## 🎨 Jerarquía Visual

### Desktop (> 768px)
```
Título Sección: 2.5rem (40px)
Título Subsección: 2rem (32px)
Título Característica: 1.4rem (22px)
Descripción: 1rem (16px)
Contenido: 1.1rem (18px)
```

### Tablet (481px - 768px)
```
Título Sección: 2rem (32px)
Título Subsección: 1.6rem (26px)
Título Característica: 1.2rem (19px)
Descripción: 0.95rem (15px)
Contenido: 1rem (16px)
```

### Mobile (≤ 480px)
```
Título Sección: 1.8rem (29px)
Título Subsección: 1.4rem (22px)
Título Característica: 1.1rem (18px)
Descripción: 0.9rem (14px)
Contenido: 1rem (16px)
```

## 📱 Ejemplos de Implementación

### Sección de Servicios
```html
<section class="services-section">
    <h2 class="section-title">Why should you choose Careconnect?</h2>
    
    <div class="service-item">
        <div class="service-icon">
            <i class="bi bi-globe-americas"></i>
        </div>
        <div class="service-content">
            <h4 class="service-feature-title">Our Users Are First</h4>
            <p class="service-feature-description">We prioritize your needs and experience above everything else.</p>
        </div>
    </div>
</section>
```

### Sección de Valores
```html
<section class="values-section">
    <h2 class="section-title">Our values</h2>
    
    <div class="value-item">
        <div class="value-icon">
            <i class="bi bi-compass"></i>
        </div>
        <div class="value-content">
            <h4 class="service-feature-title">Integrity</h4>
            <p class="service-feature-description">We maintain the highest ethical standards in everything we do.</p>
        </div>
    </div>
</section>
```

### Sección de Razones
```html
<section class="reasons-section">
    <h2 class="section-title">What makes us unique?</h2>
    
    <div class="reason-container">
        <h4 class="service-feature-title">Easy</h4>
        <p class="service-feature-description">Simple and straightforward to use</p>
    </div>
</section>
```

## 🔧 Reglas de Uso

### ✅ Hacer
- Usar `section-title` para títulos principales de sección
- Usar `service-feature-title` para nombres de características
- Siempre incluir `service-feature-description` para describir características
- Mantener consistencia en toda la aplicación
- Usar las clases responsive automáticamente

### ❌ No Hacer
- Usar `h3` con `fw-bold` para características (parece título)
- Dejar características sin descripción
- Mezclar diferentes estilos de títulos
- Usar tamaños de fuente hardcodeados

## 🎯 Beneficios

1. **Claridad Visual**: Diferenciación clara entre títulos y contenido
2. **Consistencia**: Mismo estilo en toda la aplicación
3. **Responsive**: Adaptación automática a diferentes dispositivos
4. **Mantenibilidad**: Fácil actualización de estilos globales
5. **Accesibilidad**: Jerarquía semántica correcta

## 📝 Notas de Implementación

- Las clases son automáticamente responsive
- Los colores usan variables CSS para consistencia
- Las fuentes están optimizadas para legibilidad
- Los espaciados están calculados para una buena jerarquía visual

---

**Última actualización**: Diciembre 2024
**Versión**: 1.0
**Aplicable a**: Todo el sitio web CareConnect
