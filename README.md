# Módulo Lunar

Programa de recolección de minerales lunares desarrollado con Angular 19+ y Node.js, siguiendo buenas prácticas, usando signals, y bajo una arquitectura Modelo–Vista–Controlador (MVC).

## 🛰️ Descripción del Proyecto

Módulo Lunar es una aplicación Angular diseñada para gestionar la recolección, almacenamiento y visualización de minerales extraídos de la superficie lunar. La aplicación utiliza las capacidades modernas de Angular, como:

* **Signals** para manejo de estado reactivo y desacoplado.
* **Standalone Components** y estructura modular.
* Arquitectura **MVC** para mantener separación clara entre presentación, lógica de negocio y datos.
* Buenas prácticas como inyección de dependencias, uso de servicios, tipado fuerte con TypeScript, y separación por dominios.
* **Node.js** como entorno de ejecución para Angular CLI y herramientas de desarrollo.

## 🎯 Gestión de Misiones

El proyecto permite crear y gestionar misiones lunares. Cada misión requiere definir:

* **Criterio de búsqueda:** Parámetro para seleccionar los minerales que se recogerán.
* **Astronauta asignado:** Nombre e identificación del astronauta responsable de la misión.
* **Material a recolectar:** Paramentros del mineral para identificar.
* **Sistema de salida:** Sistema para mostrar la validacion y datos del mineral.

Esto permite planificar, ejecutar y registrar las misiones de recolección de manera estructurada y clara.

## 🧱 Arquitectura del Proyecto

La aplicación se organiza bajo el patrón **MVC** adaptado a Angular:

* **Modelo (Model)s:** Interfaces y clases que representan minerales, misiones y de más clases.
* **Vista (Components):** Componentes standalone que usan señales para reaccionar a cambios sin sobrecarga.
* **Controlador (Services):** Servicios que contienen la lógica de negocio, gestión de estado mediante signals y comunicación con APIs.

Estructura:

```
src/
  app/
    components/
    models/
    services/
```

## 🚀 Funcionalidades Principales 

* Creación y seguimiento de misiones con criterios, astronauta, material y sistema de salida.
* Gestión de inventario lunar.
* Señales para actualización en tiempo real.
* Componentes desacoplados y reutilizables.
* Arquitectura escalable y preparada para producción.

---

# 🛠️ Instrucciones Técnicas

## ✔️ Generado con Angular CLI 21.0.0

Este proyecto fue creado usando **Angular CLI versión 21.0.0**, lo que permite usar herramientas modernas para desarrollo, construcción y pruebas.

## 📦 Instalación de dependencias (node_modules)

La carpeta node_modules está excluida por el .gitignore, se puede reconstruir todas las dependencias ejecutando:
```
npm install
```
Este comando leerá el archivo package.json y descargará nuevamente todos los módulos necesarios para ejecutar el proyecto.
Para información adicional: 
```
npm help
```

## 🏗️ Construcción (Build)

Para compilar el proyecto:
```
ng build
```
Los artefactos generados se guardan en `dist/`.
La compilación de producción incluye optimizaciones automáticas. Esta carpeta tambien esta excluida con por .gitignore

## ▶️ Servidor de Desarrollo

Para iniciar un servidor local, ejecutar:
```
ng serve
```
Luego abrir en el navegador:
```
http://localhost:4200/
```
La aplicación se recarga automáticamente al guardar cambios.
Para poder realizar ambas a la vez utilizar el observable: 
```
ng s -o
```

## 🧪 Pruebas Unitarias

Para ejecutar pruebas unitarias con Karma:

```
ng test
```

## 🧭 Pruebas End‑to‑End (e2e)

Para pruebas E2E:

```
ng e2e
```

Angular CLI no incluye un framework e2e por defecto, por lo que puedes elegir el que prefieras.

## 📚 Recursos Adicionales

Más información disponible en la documentación oficial de Angular CLI.
[Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)

---

# 🌑 Créditos

**Módulo Lunar** – Creado por Alejandro Pinedo.
