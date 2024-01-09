// Recupera os registros armazenados localmente ou inicializa um array vazio
let registros = JSON.parse(localStorage.getItem("pressaoRegistros")) || [];

function registrarAfericao() {
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const sistolica = document.getElementById("sistolica").value;
    const diastolica = document.getElementById("diastolica").value;

    // Validar se os campos estão preenchidos
    if (!data || !hora || !sistolica || !diastolica) {
        exibirNotificacao("Preencha todos os campos antes de registrar a aferição.");
        return;
    }

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

    // Adicione a chamada para enviarDadosParaDoutores após exibir os registros
    setTimeout(enviarDadosParaDoutores, 21 * 24 * 60 * 60 * 1000); // 21 dias em milissegundos
}

function limparFormulario() {
    document.getElementById("data").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("sistolica").value = "";
    document.getElementById("diastolica").value = "";
}

// Função para enviar dados para os doutores
function enviarDadosParaDoutores() {
    const emailDoutores = "g-suzuki@hotmail.com";
    
    // Construir o corpo do e-mail com os registros
    const corpoEmail = "Aferições Registradas:\n\n";
    registros.forEach(afericao => {
        corpoEmail += `Data: ${afericao.data} | Hora: ${afericao.hora} | Sistólica: ${afericao.sistolica} | Diastólica: ${afericao.diastolica}\n`;
    });

    // Simular o envio do e-mail abrindo o cliente de e-mail padrão
    window.location.href = `mailto:${emailDoutores}?subject=Aferições%20Registradas&body=${encodeURIComponent(corpoEmail)}`;
}

// Adicione a função para exibir notificações
function exibirNotificacao(mensagem) {
    const notificacoesDiv = document.getElementById("notificacoes");
    notificacoesDiv.innerHTML = `<p>${mensagem}</p>`;
    // Adicione estilos ou classes para estilização visual
    // Use setTimeout para remover a notificação após alguns segundos
    setTimeout(() => {
        notificacoesDiv.innerHTML = "";
    }, 5000); // Remover após 5 segundos
}

// Exibe os registros ao carregar a página
window.onload = exibirRegistros
