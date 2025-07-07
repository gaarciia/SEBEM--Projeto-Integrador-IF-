// Variável global para armazenar o valor da TMB
let tmbCalculada = 0;

// Função para calcular a Taxa de Metabolismo Basal (TMB)
function calcularTMB(peso, altura, idade, sexo) {
    let tmb;

    // Fórmulas de Harris-Benedict ajustadas conforme o sexo
    if (sexo === "masculino") {
        tmb = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade);
    } else if (sexo === "feminino") {
        tmb = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
    }

    tmbCalculada = tmb.toFixed(2); // Armazenamos o valor da TMB na variável global
    return tmbCalculada;
}

// Função para calcular a Necessidade Diária de Calorias (NDC)
function calcularNDC(tmb, atividade) {
    let fatorAtividade;

    if (atividade === "nenhuma") {
        fatorAtividade = 1.2; // Nenhuma atividade
    } else if (atividade === "moderada") {
        fatorAtividade = 1.375; // Atividade moderada
    } else if (atividade === "intensa") {
        fatorAtividade = 1.55; // Atividade intensa
    }

    const ndc = (tmb * fatorAtividade).toFixed(2);
    return ndc;
}

// Função para exibir o resultado do cálculo da TMB
function mostrarResultadoTMB(tmb) {
    document.getElementById("tmbResultado").innerText = `Sua Taxa de Metabolismo Basal (TMB) é ${tmb} kcal/dia.`;
    document.getElementById("resultado-tmb").classList.remove("hidden");
}

// Função para exibir o resultado da NDC
function mostrarResultadoNDC(ndc) {
    document.getElementById("ndcResultado").innerText = `Sua Necessidade Diária de Calorias (NDC) é ${ndc} kcal/dia.`;
    document.getElementById("resultado-ndc").classList.remove("hidden");
}

// Função para lidar com o envio do formulário de TMB
document.getElementById("tmbForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const idade = parseInt(document.getElementById("idade").value);
    const sexo = document.getElementById("sexo").value;

    if (peso && altura && idade && sexo) {
        const tmb = calcularTMB(peso, altura, idade, sexo);
        mostrarResultadoTMB(tmb);
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
});

// Função para lidar com o envio do formulário de NDC
document.getElementById("ndcForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const atividade = document.getElementById("atividade").value;

    if (atividade && tmbCalculada) {
        const ndc = calcularNDC(tmbCalculada, atividade);
        mostrarResultadoNDC(ndc);
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
});
