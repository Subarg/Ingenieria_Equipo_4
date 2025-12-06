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

  const mostrarModalCompra = ref(false);
  function abrirModalCompra() {
    mostrarModalCompra.value = true;
  }
  function cerrarModalCompra() {
    mostrarModalCompra.value = false;
  }
  const compra = ref({
    user_id: localStorage.getItem("user_id"),
    id_insumo: "",
    cantidad: null,
    costoTotal: null,
    fecha: "",
  });
  function formatoFecha(fecha) {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    const hh = String(fecha.getHours()).padStart(2, "0");
    const mm = String(fecha.getMinutes()).padStart(2, "0");
    const ss = String(fecha.getSeconds()).padStart(2, "0");

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
  async function asignarIdUsuario() {
    compra.value.user_id = localStorage.getItem("user_id");
  }
  async function registrarCompra() {
    ((compra.value.user_id = localStorage.getItem("user_id")),
      (compra.value.fecha = formatoFecha(new Date())));
    if (!validarCompra()) {
      return;
    }
    try {
      const response = axios.post("/registrar-compra", compra.value);
      getInsumos();
    } catch {}
    cerrarModalCompra();
  }

  const validarCompra = async () => {
    let flag = true;
    if (
      compra.value.id_insumo == "" ||
      compra.value.cantidad == null ||
      compra.value.costoTotal == null
    ) {
      flag = false;
    }
    return flag;
  };

  const insumoAlarma = ref({});
  async function crearAlarma() {
    try {
      insumoAlarma.value.user_id = localStorage.getItem("user_id");
      const response = await axios.post("crear-alerta", insumoAlarma.value);

      Swal.fire({
        icon: "success",
        title: "¡Alarma creada!",
        text: `Se creó la alarma para ${insumoAlarma.value.nombre}`,
        timer: 2000,
        showConfirmButton: false,
      });

      cerrarModalCrearAlarma();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la alarma. Intenta de nuevo.",
      });
    }
  }
  const alertas = ref({});
  async function getAlertas() {
    const response = await axios.get("get-alertas");
    alertas.value = response.data.alertas;
  }
  const modalCrearAlarma = ref(false);
  function abrirModalCrearAlarma(item) {
    modalCrearAlarma.value = true;
    insumoAlarma.value = item;
  }
  function cerrarModalCrearAlarma() {
    modalCrearAlarma.value = false;
  }

  const mostrarAlertas = ref(false);

  async function marcarAlerta(item) {
    const confirm = await Swal.fire({
      title: "¿Marcar alerta como atendida?",
      text: "Esta acción registrará que la alerta ya fue atendida.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, marcar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.post("marcar-alerta", item);
        Swal.fire({
          title: "Marcada",
          text: "La alerta ha sido marcada como atendida.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        getAlertas();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al marcar la alerta.",
          icon: "error",
        });
      }
    }
  }

  getAlertas();

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
    abrirModalCompra,
    mostrarModalCompra,
    cerrarModalCompra,
    compra,
    registrarCompra,
    modalCrearAlarma,
    abrirModalCrearAlarma,
    cerrarModalCrearAlarma,
    insumoAlarma,
    crearAlarma,
    alertas,
    mostrarAlertas,
    marcarAlerta,
  };
});
