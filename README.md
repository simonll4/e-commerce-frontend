# Proyecto: Gestión de Productos

## Descripción del Proyecto

El objetivo es construir una aplicación sencilla para gestionar productos en una tienda. Los usuarios podrán ver una lista de productos, agregar nuevos productos, editar los existentes y eliminarlos. La aplicación será una SPA (Single Page Application) utilizando Vue 3 y Composition API.

## Requisitos del Proyecto

- **Vue.js 3** utilizando **Composition API**.
- **Vue Router** para la navegación entre vistas.
- **Pinia** o **Vuex** para la gestión del estado si se desea implementar una lógica más compleja.
- **Fetch API** o **Axios** para simular una API de productos.
- **CSS** o **SCSS** para el estilizado de la aplicación.

## Funcionalidades

1. **Vista de Lista de Productos**:
   - Mostrar una lista de productos con su nombre, precio, y una breve descripción.
   - Cada producto tendrá opciones para editar o eliminar.

2. **Agregar Producto**:
   - Formulario para agregar un nuevo producto con campos: nombre, precio, y descripción.
   - Validación básica de formularios.

3. **Editar Producto**:
   - Capacidad para seleccionar un producto y modificar sus detalles.

4. **Eliminar Producto**:
   - Confirmación antes de eliminar un producto.

5. **Detalles del Producto**:
   - Vista individual del producto con más detalles.

## Estructura del Proyecto

1. **Carpeta `src/components`:**
   - `ProductList.vue`: Componente que muestra la lista de productos.
   - `ProductItem.vue`: Componente para un solo producto con botones para editar/eliminar.
   - `ProductForm.vue`: Componente de formulario para agregar o editar productos.

2. **Carpeta `src/views`:**
   - `HomeView.vue`: Vista principal que muestra `ProductList`.
   - `ProductDetailView.vue`: Vista para mostrar los detalles de un producto individual.
   - `AddProductView.vue`: Vista con el formulario de `ProductForm` para agregar un producto.
   - `EditProductView.vue`: Vista con el formulario de `ProductForm` para editar un producto.

3. **Carpeta `src/store`:**
   - `index.js`: Gestión del estado con Pinia o Vuex para manejar la lista de productos.

4. **Carpeta `src/router`:**
   - Configuración de rutas para navegar entre las vistas.

## Pasos para Implementar el Proyecto

1. **Configurar el Proyecto**:
   - Crear un nuevo proyecto Vue 3 usando Vue CLI o Vite.
   - Instalar las dependencias necesarias como Vue Router y Pinia/Vuex.

2. **Desarrollo de Componentes**:
   - Crear y organizar los componentes dentro de la carpeta `components`.
   - Implementar la lógica de los componentes usando Composition API.

3. **Configurar el Router**:
   - Definir rutas para las vistas de la lista de productos, detalles, agregar, y editar.

4. **Gestionar el Estado**:
   - Implementar la gestión del estado global de la aplicación (opcionalmente usando Pinia/Vuex).

5. **Estilizar la Aplicación**:
   - Aplicar estilos básicos para hacer la aplicación visualmente atractiva.



## Mejora 1 del Proyecto
El objetivo es continuar con el desarrollo de una aplicación web avanzada para la gestión de productos en una tienda, utilizando Vue 3 con la Composition API y aprovechando los conocimientos sobre el ciclo de vida de los componentes y otras técnicas avanzadas de desarrollo web.

## Funcionalidades Ampliadas
1. **Autenticación de Usuarios**: Sistema de login para acceder a la aplicación, gestionado a través de hooks como `onMounted` para verificar el estado de autenticación.
2. **Búsqueda y Filtrado Dinámico**: Implementar funcionalidades de búsqueda y filtrado de productos, con actualizaciones eficientes manejadas en los hooks `onBeforeUpdate` y `onUpdated`.
3. **Paginación y Carga Diferida**: Implementación de paginación y carga diferida para gestionar grandes listas de productos, optimizando la carga de datos con `onMounted` y limpieza de procesos con `onBeforeUnmount`.


# Proyecto: Gestión de Productos - Parte 2
## Descripción del Proyecto
Este proyecto es una continuación del Proyecto 1, expandiendo la funcionalidad de la aplicación de gestión de productos. El objetivo es incorporar nuevas características y pantallas, aprovechando los conocimientos adquiridos sobre reactividad, propiedades computadas y el uso de librerías gráficas.

## Nuevas Funcionalidades

### 1. Pantalla de Login
- Permite a los usuarios autenticarse antes de acceder a la aplicación.
- Implementa validaciones y manejo de errores en el login.
- Utiliza propiedades computadas para gestionar el estado del formulario y reactividad para actualizar la interfaz.

### 2. Pantalla de Registro
- Permite a nuevos usuarios registrarse en la aplicación.
- Incluye validaciones en tiempo real utilizando reactividad.
- Usa propiedades computadas para mostrar mensajes dinámicos y verificar la fortaleza de la contraseña.

### 3. Pantalla de Dashboard
- Muestra estadísticas clave sobre los productos, como el número total de productos, los más vendidos, etc.
- Integra gráficos utilizando una librería gráfica como PrimeVue o Vuetify, aprovechando las propiedades computadas para actualizar los datos en tiempo real.

### 4. Pantalla de Perfil de Usuario
- Permite a los usuarios ver y editar su información personal.
- Implementa la reactividad para manejar cambios en la información del usuario y propiedades computadas para mostrar el estado de la edición.
