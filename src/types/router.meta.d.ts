import 'vue-router';

export {};

declare module 'vue-router' {
  interface RouteMeta {
    // Campo opcional para verificar si es admin
    isAdmin?: boolean;
    // Campo requerido para verificar si requiere autenticación
    requiresAuth: boolean;
  }
}
