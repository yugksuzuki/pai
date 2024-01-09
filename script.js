// Função para obter a saudação com base no período do dia
function obterSaudacao() {
    const dataAtual = new Date();
    const hora = dataAtual.getHours();

    if (hora >= 6 && hora < 12) {
        return "Bom dia";
    } else if (hora >= 12 && hora < 18) {
        return "Boa tarde";
    } else {
        return "Boa noite";
    }
}

// Função para formatar a data e hora
function formatarDataHora(data, hora) {
    return `${data} às ${hora}`;
}

// Função para registrar aferição
function registrarAfericao() {
    const data = document.getElementById("data").value;
    const periodo = document.getElementById("hora").value;
    const sistolica = document.getElementById("sistolica").value;
    const diastolica = document.getElementById("diastolica").value;

    // Validar se os campos estão preenchidos
    if (!data || !periodo || !sistolica || !diastolica) {
        exibirNotificacao("Preencha todos os campos antes de registrar a aferição.");
        return;
    }

    const saudacao = obterSaudacao();
    const horaAtual = new Date().toLocaleTimeString();

    const afericao = {
        data: formatarDataHora(data, horaAtual),
        periodo,
        sistolica,
        diastolica
    };

    registros.push(afericao);

    // Salvar os registros localmente
    localStorage.setItem("pressaoRegistros", JSON.stringify(registros));

    exibirRegistros();
    limparFormulario();
}

// Função para exibir registros
function exibirRegistros() {
    const registrosDiv = document.getElementById("pressaoRegistros");
    registrosDiv.innerHTML = `<h3>Aferições Registradas</h3>`;

    registros.forEach(afericao => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${afericao.data} - ${afericao.periodo}: Sistólica: ${afericao.sistolica}, Diastólica: ${afericao.diastolica}</p>`;
        registrosDiv.appendChild(div);
    });

    // Chamar a função para enviar dados para os doutores após exibir os registros
    setTimeout(enviarDadosParaDoutores, 21 * 24 * 60 * 60 * 1000); // 21 dias em milissegundos
}

// Função para limpar o formulário
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
        corpoEmail += `${afericao.data} - ${afericao.periodo}: Sistólica: ${afericao.sistolica}, Diastólica: ${afericao.diastolica}\n`;
    });

    // Simular o envio do e-mail abrindo o cliente de e-mail padrão
    window.location.href = `mailto:${emailDoutores}?subject=Aferições%20Registradas&body=${encodeURIComponent(corpoEmail)}`;
}

// Função para exibir notificações
function exibirNotificacao(mensagem) {
    const notificacoesDiv = document.getElementById("notificacoes");
    notificacoesDiv.innerHTML = `<p>${mensagem}</p>`;
    
    // Remover a notificação após alguns segundos
    setTimeout(() => {
        notificacoesDiv.innerHTML = "";
    }, 5000); // Remover após 5 segundos
}

// Array para armazenar os registros
let registros = JSON.parse(localStorage.getItem("pressaoRegistros")) || [];

// Exibir saudação ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    const saudacao = obterSaudacao();
    document.getElementById("saudacao").innerHTML = saudacao;
});
