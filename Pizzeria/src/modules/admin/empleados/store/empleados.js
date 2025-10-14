import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { inject } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export const useEmpleadosStore = defineStore("empleadosStore", () => {
  const busqueda = ref("");

  const empleados = ref([
    {
      nombre: "Juan",
      apellidos: "Pérez López",
      cargo: "administrador",
      fechaContrato: "2023-01-15",
    },
    {
      nombre: "María",
      apellidos: "García Sánchez",
      cargo: "cajero",
      fechaContrato: "2023-03-10",
    },
    {
      nombre: "Luis",
      apellidos: "Martínez Ruiz",
      cargo: "almacenista",
      fechaContrato: "2022-11-22",
    },
    {
      nombre: "Ana",
      apellidos: "Hernández Torres",
      cargo: "chef",
      fechaContrato: "2024-05-01",
    },
    {
      nombre: "Carlos",
      apellidos: "Ramírez Díaz",
      cargo: "chef",
      fechaContrato: "2023-07-18",
    },
  ]);

  const empleado = ref({
    nombre: "",
    apellidos: "",
    cargo: "",
    fechaContrato: "",
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
        nombre: item.nombre,
        apellidos: item.apellidos,
        cargo: item.cargo,
        fechaContrato: item.fechaContrato,
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
      apellidos: "",
      cargo: "",
      fechaContrato: "",
    };
  }

  async function guardarEmpleado() {
    console.log("entro");
    comprobarEmpleado();
  }

  async function comprobarEmpleado() {
    if (
      empleado.value.nombre == "" ||
      empleado.value.apellidos == "" ||
      empleado.value.cargo == "" ||
      empleado.value.fechaContrato == ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Error al guardar empleado",
        text: "Rellene todos los campos correctamente",
      });
    }
  }

  return {
    empleado,
    empleadosFiltrados,
    mostrarModal,
    busqueda,
    editar,
    eliminar,
    cerrarModal,
    guardarEmpleado,
  };
});
