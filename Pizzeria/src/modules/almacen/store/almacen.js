import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useAlmacenStore = defineStore("almacenStore", () => {
  const busqueda = ref("");
  const productos = ref([
    { producto: "Harina", cantidad: 25, costo: 15.5, unidad: "kg" },
    { producto: "Queso", cantidad: 10, costo: 80, unidad: "kg" },
    { producto: "Salsa", cantidad: 40, costo: 12, unidad: "botella" },
  ]);
  const producto = ref({
    nombre: "",
    cantidad: 0,
    costo: 0,
    unidad: "",
  });
  const mostrarModal = ref(false);
  const productosFiltrados = computed(() =>
    productos.value.filter((p) =>
      p.producto.toLowerCase().includes(busqueda.value.toLowerCase())
    )
  );

  function editar(item) {
    if (item != null) {
      producto.value = {
        nombre: item.producto,
        cantidad: item.cantidad,
        costo: item.costo,
        unidad: item.unidad,
      };
    }
    mostrarModal.value = true;
  }

  function eliminar(item) {
    Swal.fire({
      icon: "warning",
      title: "Eliminar producto",
      text: "No se puede regresar esta acción",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });
  }

  async function guardarProducto() {
    comprobarProducto();
  }

  async function comprobarProducto() {
    if (
      producto.value.cantidad == 0 ||
      producto.value.costo == 0 ||
      producto.value.nombre == "" ||
      producto.value.unidad == ""
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
    producto.value = {
      nombre: "",
      cantidad: 0,
      costo: 0,
      unidad: "",
    };
  }
  return {
    busqueda,
    productos,
    productosFiltrados,
    editar,
    eliminar,
    mostrarModal,
    producto,
    cerrarModal,
    guardarProducto,
  };
});
