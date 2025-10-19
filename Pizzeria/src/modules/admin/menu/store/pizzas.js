import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { inject } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export const usePizzasStore = defineStore("pizzasStore", () => {
  const busqueda = ref("");

  const pizzas = ref([
    {
      nombre: "Pizza Hawaiana",
      costo: 120,
      estado: 1,
      receta: [
        { id_insumo: 0, insumo: "", cantidad: 1 },
        { id_insumo: 0, insumo: "Llll", cantidad: 2 },
      ],
    },
    {
      nombre: "Pizza Pepperoni",
      costo: 110,
      estado: 1,
      receta: [{ id_insumo: 0, insumo: "", cantidad: 2 }],
    },
    {
      nombre: "Pizza Mexicana",
      costo: 130,
      estado: 0,
      receta: [{ id_insumo: 0, insumo: "", cantidad: 3 }],
    },
    {
      nombre: "Pizza Vegetariana",
      costo: 115,
      estado: 1,
      receta: [{ id_insumo: 0, insumo: "", cantidad: 4 }],
    },
    {
      nombre: "Pizza 4 Quesos",
      costo: 140,
      estado: 1,
      receta: [{ id_insumo: 0, insumo: "", cantidad: 5 }],
    },
  ]);

  const pizza = ref({
    nombre: "",
    costo: 0,
    estado: 1,
    receta: [{ id_insumo: 0, insumo: "", cantidad: 0 }],
  });
  const mostrarModal = ref(false);
  const mostrarModalReceta = ref(false);
  const pizzasFiltradas = computed(() =>
    pizzas.value.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
    )
  );

  function editar(item) {
    asignarPizza(item);
    mostrarModal.value = true;
  }
  function asignarPizza(item) {
    if (item != null) {
      pizza.value = {
        nombre: item.nombre,
        costo: item.costo,
        estado: item.estado,
        receta: item.receta.map((i) => ({
          insumo: i.insumo,
          cantidad: i.cantidad,
        })),
      };
    }
  }
  function eliminar(item) {
    Swal.fire({
      icon: "warning",
      title: "Eliminar pizza",
      text: "No se puede regresar esta acción",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });
  }

  async function guardarPizzas(item) {
    comprobarPizza();
  }

  async function comprobarPizza() {
    if (
      (pizza.nombre =
        "" ||
        pizza.costo == 0 ||
        pizza.estado == 0 ||
        pizza.receta.insumo == "")
    ) {
      Swal.fire({
        icon: "warning",
        title: "Error al guardar Producto",
        text: "Rellene todos los campos correctamente",
      });
    }
  }
  function cerrarModal() {
    mostrarModal.value = false;
    limpiarModal();
  }

  function limpiarModal() {
    pizza.value = {
      nombre: "",
      costo: 0,
      estado: 0,
      receta: [{ id_insumo: 0, insumo: "", cantidad: 0 }],
    };
  }

  function agregarInsumo() {
    pizza.value.receta.push({ id_insumo: 0, insumo: "", cantidad: 0 });
  }

  function eliminarInsumo(indexLinea) {
    pizza.value.receta.splice(indexLinea, 1);
  }

  function verModalReceta(item) {
    asignarPizza(item);
    mostrarModalReceta.value = true;
  }
  return {
    pizza,
    pizzas,
    pizzasFiltradas,
    mostrarModal,
    editar,
    eliminar,
    guardarPizzas,
    cerrarModal,
    busqueda,
    agregarInsumo,
    eliminarInsumo,
    mostrarModalReceta,
    verModalReceta,
  };
});
