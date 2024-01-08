// Recupera os registros armazenados localmente ou inicializa um array vazio
let registros = JSON.parse(localStorage.getItem("pressaoRegistros")) || [];

function registrarAfericao() {
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const sistolica = document.getElementById("sistolica").value;
    const diastolica = document.getElementById("diastolica").value;

    const afericao = { data, hora, sistolica, diastolica };
    registros.push(afericao);

    // Salva os registros localmente
    localStorage.setItem("pressaoRegistros", JSON.stringify(registros));

    exibirRegistros();
    limparFormulario();
}

function exibirRegistros() {
    const registrosDiv = document.getElementById("pressaoRegistros");
    registrosDiv.innerHTML = "<h3>Aferições Registradas</h3>";

    registros.forEach(afericao => {
        const div = document.createElement("div");
        div.innerHTML = `<p>Data: ${afericao.data} | Hora: ${afericao.hora} | Sistólica: ${afericao.sistolica} | Diastólica: ${afericao.diastolica}</p>`;
        registrosDiv.appendChild(div);
    });
}

function limparFormulario() {
    document.getElementById("data").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("sistolica").value = "";
    document.getElementById("diastolica").value = "";
}

// Exibe os registros ao carregar a página
window.onload = exibirRegistros;
