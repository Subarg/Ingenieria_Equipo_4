import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axios from "axios";

export const useAlmacenStore = defineStore("almacenStore", () => {
  const busqueda = ref("");
  const productos = ref([]);
  const producto = ref({
    id: 0,
    nombre: "",
    cantidad_en_almacen: 0,
    costo: "0",
    unidad_de_medida: "",
  });
  const mostrarModal = ref(false);
  const productosFiltrados = computed(() =>
    productos.value.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
    )
  );

  function editar(item) {
    if (item != null) {
      producto.value = {
        id: item.id_insumo,
        nombre: item.nombre,
        cantidad: item.cantidad_en_almacen,
        costo: item.costo,
        unidad: item.unidad_de_medida,
      };
    }
    console.log(producto.value);
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
    if (!comprobarProducto()) {
      return;
    }
    try {
      const response = await axios.post("/update-insumo", producto.value);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Producto guardado",
          timer: 1500,
          showConfirmButton: false,
        });
        cerrarModal();
        getInsumos();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al guardar producto",
          text: response.data.message || "Inténtalo de nuevo",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar producto",
        text: "Inténtalo de nuevo",
      });
      console.error("Error al guardar el producto:", error);
    }
  }

  async function comprobarProducto() {
    let flag = true;
    if (
      producto.value.cantidad_en_almacen == 0 ||
      producto.value.costo == 0 ||
      producto.value.nombre == "" ||
      producto.value.unidad_de_medida == ""
    ) {
      flag = false;
      Swal.fire({
        icon: "warning",
        title: "Error al guardar Producto",
        text: "Rellene todos los campos correctamente",
      });
    }
    return flag;
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

  const getInsumos = async () => {
    try {
      const response = await axios.get("/get-insumos");
      let insumosArray = [];
      if (typeof response.data === "object" && !Array.isArray(response.data)) {
        insumosArray = Object.values(response.data).flat();
      } else if (Array.isArray(response.data)) {
        insumosArray = response.data.flat();
      } else {
        insumosArray = response.data;
      }
      productos.value = insumosArray.map((item) => ({
        ...item,
        costo: parseFloat(item.costo) || 0,
      }));
    } catch (error) {
      console.error("Error al obtener los insumos:", error);
    }
  };

  getInsumos();
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
