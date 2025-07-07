// Função para calcular a distribuição dos macronutrientes
function calcularDieta(peso, altura, idade, sexo, objetivo, carboidratos, gorduras, proteinas, refeicoes) {
    // Primeiro, calcular a TMB
    let tmb;

    if (sexo === "masculino") {
        tmb = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade);
    } else if (sexo === "feminino") {
        tmb = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
    }

    // Ajustar a TMB conforme o objetivo (manter, perder, ganhar)
    let caloriasDiarias;

    if (objetivo === "manter") {
        caloriasDiarias = tmb;
    } else if (objetivo === "perder") {
        caloriasDiarias = tmb - 500;
    } else if (objetivo === "ganhar") {
        caloriasDiarias = tmb + 500;
    }

    // Calcular a quantidade de carboidratos, gorduras e proteínas em kcal
    const caloriasCarboidratos = (caloriasDiarias * (carboidratos / 100)).toFixed(2);
    const caloriasGorduras = (caloriasDiarias * (gorduras / 100)).toFixed(2);
    const caloriasProteinas = (caloriasDiarias * (proteinas / 100)).toFixed(2);

    // Calcular a distribuição por refeição
    const carboPorRefeicao = (caloriasCarboidratos / refeicoes).toFixed(2);
    const gordPorRefeicao = (caloriasGorduras / refeicoes).toFixed(2);
    const proteinaPorRefeicao = (caloriasProteinas / refeicoes).toFixed(2);

    return {
        caloriasDiarias,
        carboPorRefeicao,
        gordPorRefeicao,
        proteinaPorRefeicao
    };
}

// Função para exibir o resultado da dieta
function mostrarResultadoDieta(dieta) {
    document.getElementById("caloriasResultado").innerText = `Calorias diárias: ${dieta.caloriasDiarias} kcal`;
    document.getElementById("carboidratosResultado").innerText = `Carboidratos por refeição: ${dieta.carboPorRefeicao} kcal`;
    document.getElementById("gordurasResultado").innerText = `Gorduras por refeição: ${dieta.gordPorRefeicao} kcal`;
    document.getElementById("proteinasResultado").innerText = `Proteínas por refeição: ${dieta.proteinaPorRefeicao} kcal`;
    document.getElementById("resultado-dieta").classList.remove("hidden");
}

// Função para lidar com o envio do formulário de Dieta
document.getElementById("dietaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const idade = parseInt(document.getElementById("idade").value);
    const sexo = document.getElementById("sexo").value;
    const objetivo = document.getElementById("objetivo").value;
    const carboidratos = parseInt(document.getElementById("carboidratos").value);
    const gorduras = parseInt(document.getElementById("gorduras").value);
    const proteinas = parseInt(document.getElementById("proteinas").value);
    const refeicoes = parseInt(document.getElementById("refeicoes").value);

    if (peso && altura && idade && sexo && objetivo && carboidratos && gorduras && proteinas && refeicoes) {
        const dieta = calcularDieta(peso, altura, idade, sexo, objetivo, carboidratos, gorduras, proteinas, refeicoes);
        mostrarResultadoDieta(dieta);
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
});
