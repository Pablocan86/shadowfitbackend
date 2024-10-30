const lista = document.querySelector("#profesores");
const selectProfesor = document.querySelector("#select_profesor");
const uid = document.querySelector("#usuario_id");

if (selectProfesor) {
  selectProfesor.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = uid.getAttribute("data-id");
    const pid = lista.value;

    const response = await fetch(`/api/users/cargarprofesor/${id}/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (response.ok) {
      window.location.reload();
    }
  });
}
