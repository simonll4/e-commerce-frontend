<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <router-link class="navbar-brand" to="/">MiTienda</router-link>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/add-product">Agregar Producto</router-link>
          </li>
          <li class="nav-item profile-dropdown">
            <router-link class="nav-link" to="/auth/login">
              <i class="fas fa-user-circle"></i> Cerrar Sesion
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* General */
.navbar {
  background-color: #2c3e50;
  /* Color de fondo oscuro */
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* Sombra suave */
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo de la marca */
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ecf0f1;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.navbar-brand:hover {
  color: #3498db;
  /* Color al pasar el mouse */
}

/* Navegación */
.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-left: 1.5rem;
}

.nav-link {
  font-size: 1rem;
  color: #ecf0f1;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.nav-link:hover {
  background-color: #3498db;
  /* Fondo azul al pasar el mouse */
  color: #fff;
  /* Texto blanco al pasar el mouse */
}

/* Iconos */
.nav-link i {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

/* Dropdown del perfil */
.profile-dropdown {
  position: relative;
}

.profile-dropdown-content {
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.profile-dropdown:hover .profile-dropdown-content {
  display: block;
}

.profile-dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.profile-dropdown-content a:hover {
  background-color: #ddd;
}
</style>