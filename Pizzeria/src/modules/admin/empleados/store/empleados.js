import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { inject } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export const useEmpleadosStore = defineStore("empleadosStore", () => {
  const busqueda = ref("");

  const empleados = ref([]);

  const empleado = ref({
    id: null,
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    rol_id: "",
    rol: "",
    fecha_de_contrato: "",
  });

  const mostrarModal = ref(false);

  const empleadosFiltrados = computed(() =>
    empleados.value.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
    )
  );
  function editar(item) {
    if (item != null) {
      empleado.value = {
        id: item.id_empleado,
        nombre: item.nombre,
        apellido_paterno: item.apellido_paterno,
        apellido_materno: item.apellido_materno,
        rol_id: item.rol_id,
        rol: item.rol_nombre,
        fecha_de_contrato: item.fecha_de_contrato,
      };
    }
    mostrarModal.value = true;
  }

  function eliminar(item) {
    Swal.fire({
      icon: "warning",
      title: "Eliminar Empleado",
      text: "No se puede regresar esta acción",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });
  }
  function cerrarModal() {
    mostrarModal.value = false;
    limpiarModal();
  }

  function limpiarModal() {
    empleado.value = {
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      rol_id: "",
      rol: "",
      fecha_de_contrato: "",
    };
  }

  async function guardarEmpleado() {
    console.log(empleado.value);
    if (!comprobarEmpleado()) {
      return;
    }
    try {
      const response = await axios.post("/update-empleado", empleado.value);
      Swal.fire({
        icon: "success",
        title: "Empleado guardado",
        text: "El empleado ha sido guardado correctamente",
      });
      cerrarModal();
      getEmpleados();
    } catch (error) {
      console.error("Error al guardar el empleado:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar el empleado",
      });
    }
  }
  async function getEmpleados() {
    try {
      const response = await axios.get("/get-users");
      let empleadosArray = [];
      if (typeof response.data === "object" && !Array.isArray(response.data)) {
        empleadosArray = Object.values(response.data).flat();
      } else if (Array.isArray(response.data)) {
        empleadosArray = response.data.flat();
      } else {
        empleadosArray = response.data;
      }
      empleados.value = empleadosArray;
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
    }
  }

  async function comprobarEmpleado() {
    let flag = true;
    if (
      empleado.value.nombre == "" ||
      empleado.value.apellido_paterno == "" ||
      empleado.value.apellido_materno == "" ||
      empleado.value.rol_id == "" ||
      empleado.value.fecha_de_contrato == ""
    ) {
      flag = false;
      Swal.fire({
        icon: "warning",
        title: "Error al guardar empleado",
        text: "Rellene todos los campos correctamente",
      });
    }
    return flag;
  }
  getEmpleados();

  return {
    empleado,
    empleadosFiltrados,
    mostrarModal,
    busqueda,
    editar,
    eliminar,
    cerrarModal,
    guardarEmpleado,
    getEmpleados,
  };
});
