let tmb = 0;

function calcularTMB() {
    // Pegar os valores do formulário
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const idade = parseInt(document.getElementById('idade').value);
    const sexo = document.getElementById('sexo').value;
    const objetivo = document.querySelector('input[name="objetivo"]:checked');
    const refeicoes = parseInt(document.getElementById('refeicoes').value);

    // Verificar se o objetivo foi selecionado
    if (!objetivo) {
        alert('Por favor, escolha o objetivo (Emagrecer ou Ganhar Massa).');
        return;
    }

    // Cálculo da TMB baseado no sexo
    if (sexo === 'masculino') {
        tmb = 10 * peso + 6.25 * altura - 5 * idade + 5;  // Fórmula de Harris-Benedict para homens
    } else {
        tmb = 10 * peso + 6.25 * altura - 5 * idade - 161;  // Fórmula de Harris-Benedict para mulheres
    }

    console.log("TMB calculada: ", tmb);

    // Ajuste da TMB baseado no objetivo
    const objetivoValor = objetivo.value;
    if (objetivoValor === 'emagrecer') {
        tmb -= tmb * 0.15;  // Reduz 15% das calorias para emagrecimento
    } else if (objetivoValor === 'ganhar-massa') {
        tmb += tmb * 0.15;  // Aumenta 15% das calorias para ganho de massa
    }

    console.log("TMB ajustada para o objetivo: ", tmb);

    // Calcular a distribuição dos macronutrientes
    const proteinas = tmb * 0.25 / 4;  // 25% para proteínas (1g de proteína = 4 calorias)
    const carboidratos = tmb * 0.50 / 4;  // 50% para carboidratos (1g de carboidrato = 4 calorias)
    const gorduras = tmb * 0.25 / 9;  // 25% para gorduras (1g de gordura = 9 calorias)

    // Calcular a quantidade de calorias por refeição
    const caloriasPorRefeicao = tmb / refeicoes;

    // Calcular os valores por refeição de macronutrientes
    const proteinasPorRefeicao = proteinas / refeicoes;
    const carboidratosPorRefeicao = carboidratos / refeicoes;
    const gordurasPorRefeicao = gorduras / refeicoes;

    // Exibir os resultados na página
    const resultado = document.getElementById('resultado');
    
    // Preencher as quantidades diárias de macronutrientes
    document.getElementById('proteina').value = proteinas.toFixed(2) + " g";
    document.getElementById('gordura').value = gorduras.toFixed(2) + " g";
    document.getElementById('carboidrato').value = carboidratos.toFixed(2) + " g";

    // Exibir a distribuição das calorias por refeição
    document.getElementById('resultado-refeicao-gordura').textContent = `Gorduras por refeição: ${gordurasPorRefeicao.toFixed(2)} g`;
    document.getElementById('resultado-refeicao-proteina').textContent = `Proteínas por refeição: ${proteinasPorRefeicao.toFixed(2)} g`;
    document.getElementById('resultado-refeicao-carboidrato').textContent = `Carboidratos por refeição: ${carboidratosPorRefeicao.toFixed(2)} g`;

    // Mostrar o resultado
    resultado.classList.remove('hidden'); // Remove a classe hidden para mostrar o resultado
}
