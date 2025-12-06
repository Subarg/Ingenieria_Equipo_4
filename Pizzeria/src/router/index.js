import { createRouter, createWebHistory } from "vue-router";
import login from "../modules/login/views/login.vue";

const routes = [
  { path: "/", name: "login", component: login },
  {
    path: "/registro",
    name: "registro",
    component: () => import("../modules/login/views/registroUsuario.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../layouts/layoutAdmin.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../components/home.vue"),
      },
      {
        path: "/almacen",
        name: "almacen",
        component: () => import("../modules/almacen/views/almacen.vue"),
      },
      {
        path: "/empleados",
        name: "empleados",
        component: () =>
          import("../modules/admin/empleados/views/empleados.vue"),
      },
      {
        path: "/pizzas",
        name: "pizzas",
        component: () => import("../modules/admin/menu/views/pizzas.vue"),
      },
    ],
  },
  {
    path: "/cajero",
    name: "cajero",
    component: () => import("../layouts/layoutAdmin.vue"),
    children: [
      {
        path: "/pos",
        name: "pos",
        component: () => import("../modules/cajero/views/pos.vue"),
      },
      {
        path: "/punto-venta",
        name: "punto_venta",
        component: () => import("../modules/cajero/views/punto_de_venta.vue"),
      },
      {
        path: "/corte-caja",
        name: "corte-caja",
        component: () => import("../modules/cajero/views/corte_de_caja.vue"),
      },
      {
        path: "/reporte-compras",
        name: "reporte-compras",
        component: () =>
          import("../modules/admin/Reporte_Pro/views/reporte_de_productos.vue"),
      },
      {
        path: "/pedidos",
        name: "pedidos",
        component: () => import("../modules/pedidos/views/pedidos_sig.vue"),
      },
      {
        path: "/venta",
        name: "venta",
        component: () => import("../modules/cajero/views/realizarVenta.vue"),
      },
      {
        path: "/dashboard-ventas",
        name: "dashboard-ventas",
        component: () =>
          import("../modules/admin/dashboard/views/vista_de_ventas.vue"),
      },
      {
        path: "/dashboard-ventas-total",
        name: "dashboard-ventas-total",
        component: () =>
          import("../modules/admin/dashboard/views/dashboardVentas.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
