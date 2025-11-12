import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { inject } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export const usePizzasStore = defineStore("pizzasStore", () => {
  const busqueda = ref("");
  const insumos = ref([]);
  const pizzas = ref([]);

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

  const getPizzas = async () => {
    try {
      const response = await axios.get("/get-pizzas");
      pizzas.value = response.data.pizzas;
    } catch (error) {
      console.error("Error al obtener las pizzas:", error);
    }
  };
  function editar(item) {
    asignarPizza(item);
    mostrarModal.value = true;
  }
  function asignarPizza(item) {
    if (item != null) {
      pizza.value = {
        nombre: item.nombre,
        costo: item.precio,
        estado: item.estado,
        receta: item.receta.map((i) => ({
          insumo: i.nombre,
          cantidad: i.cantidad,
          unidad_de_medida: i.unidad_de_medida,
        })),
      };
      console.log(pizza.value);
    }
  }
  const getInsumos = async () => {
    try {
      const response = await axios.get("/get-insumos");
      insumos.value = response.data.insumos;
    } catch (error) {
      console.error("Error al obtener los insumos:", error);
      return [];
    }
  };
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
  getPizzas();
  getInsumos();
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
    getPizzas,
    insumos,
  };
});
