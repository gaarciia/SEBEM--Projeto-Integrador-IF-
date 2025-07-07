document.addEventListener('DOMContentLoaded', function() {
    const protocoloInputs = document.querySelectorAll('input[name="protocolo"]');
    const resultadoDiv = document.getElementById('resultado');
    const lowResultDiv = document.getElementById('low-result');
    const highResultDiv = document.getElementById('high-result');
    
    const campoCarboidratos = document.getElementById('carboidratos');
    const campoGorduras = document.getElementById('gorduras');
    const campoProteinas = document.getElementById('proteinas');
    const campoKcalTotal = document.getElementById('kcal-total');

    // Função para calcular o ciclo de carboidratos
    function calcularCiclo() {
        // Pegar os valores dos campos de entrada e garantir que são números válidos
        const carboidratos = parseFloat(campoCarboidratos.value) || 0;
        const gorduras = parseFloat(campoGorduras.value) || 0;
        const proteinas = parseFloat(campoProteinas.value) || 0;

        // Verificar se os valores não são NaN (não são números) ou se os campos estão vazios
        if (carboidratos <= 0 || gorduras <= 0 || proteinas <= 0) {
            // Se algum campo estiver vazio ou com valor menor que 0, não mostrar o erro
            campoKcalTotal.value = 'Preencha todos os campos';
            return; // Impede o cálculo
        }

        // Calcular as kcal totais
        const kcalCarboidratos = carboidratos * 4;
        const kcalGorduras = gorduras * 9;
        const kcalProteinas = proteinas * 4;

        const kcalTotal = kcalCarboidratos + kcalGorduras + kcalProteinas;

        // Atualizar o campo "Kcal Médio Total"
        campoKcalTotal.value = kcalTotal.toFixed(2) + " kcal";
        document.getElementById('resultado-kcal-total').textContent = `Kcal Total: ${kcalTotal.toFixed(2)} kcal`;

        // Exibir protocolo selecionado
        const protocoloSelecionado = document.querySelector('input[name="protocolo"]:checked').value;
        document.getElementById('resultado-protocolo').textContent = `Protocolo Selecionado: ${protocoloSelecionado}`;

        // Mostrar o resultado baseado no protocolo selecionado
        if (protocoloSelecionado) {
            resultadoDiv.classList.remove('hidden');
            mostrarResultado(protocoloSelecionado, kcalTotal, carboidratos, gorduras, proteinas);
        }
    }

    // Função para mostrar os resultados baseados no protocolo
    function mostrarResultado(protocolo, kcalTotal, carboidratos, gorduras, proteinas) {
        // Exibir resultados para os dias "low"
        lowResultDiv.classList.remove('hidden');
        
        // Exibir resultados para os dias "high"
        highResultDiv.classList.remove('hidden');

        // Calcular e exibir macronutrientes para os protocolos
        if (protocolo === '2 low 1 high') {
            // Calcular e exibir macronutrientes para o protocolo "2 low 1 high"
            document.getElementById('low-carboidratos').value = (carboidratos * 0.7).toFixed(2) + " g";  
            document.getElementById('low-gorduras').value = (gorduras * 0.7).toFixed(2) + " g";  
            document.getElementById('low-proteinas').value = (proteinas * 0.7).toFixed(2) + " g";  
            document.getElementById('low-kcal').value = (kcalTotal * 0.7).toFixed(2) + " kcal";  

            // Calcular valores para a parte High
            document.getElementById('high-carboidratos').value = (carboidratos * 1.3).toFixed(2) + " g";
            document.getElementById('high-gorduras').value = (gorduras * 1.3).toFixed(2) + " g";
            document.getElementById('high-proteinas').value = (proteinas * 1.3).toFixed(2) + " g";
            document.getElementById('high-kcal').value = (kcalTotal * 1.3).toFixed(2) + " kcal";
        }
        else if (protocolo === '3 low 1 high') {
            // Calcular e exibir macronutrientes para o protocolo "3 low 1 high"
            document.getElementById('low-carboidratos').value = (carboidratos * 0.6).toFixed(2) + " g";
            document.getElementById('low-gorduras').value = (gorduras * 0.6).toFixed(2) + " g";
            document.getElementById('low-proteinas').value = (proteinas * 0.6).toFixed(2) + " g";
            document.getElementById('low-kcal').value = (kcalTotal * 0.6).toFixed(2) + " kcal";

            // Calcular e exibir valores para os dias "high" (carboidrato alto)
            document.getElementById('high-carboidratos').value = (carboidratos * 1.4).toFixed(2) + " g";
            document.getElementById('high-gorduras').value = (gorduras * 1.4).toFixed(2) + " g";
            document.getElementById('high-proteinas').value = (proteinas * 1.4).toFixed(2) + " g";
            document.getElementById('high-kcal').value = (kcalTotal * 1.4).toFixed(2) + " kcal";
        }
        else if (protocolo === '4 low 1 high') {
            // Calcular e exibir macronutrientes para o protocolo "4 low 1 high"
            document.getElementById('low-carboidratos').value = (carboidratos * 0.5).toFixed(2) + " g";
            document.getElementById('low-gorduras').value = (gorduras * 0.5).toFixed(2) + " g";
            document.getElementById('low-proteinas').value = (proteinas * 0.5).toFixed(2) + " g";
            document.getElementById('low-kcal').value = (kcalTotal * 0.5).toFixed(2) + " kcal";

            // Calcular e exibir valores para os dias "high" (carboidrato alto)
            document.getElementById('high-carboidratos').value = (carboidratos * 1.5).toFixed(2) + " g";
            document.getElementById('high-gorduras').value = (gorduras * 1.5).toFixed(2) + " g";
            document.getElementById('high-proteinas').value = (proteinas * 1.5).toFixed(2) + " g";
            document.getElementById('high-kcal').value = (kcalTotal * 1.5).toFixed(2) + " kcal";
        }
    }

    // Adicionar event listeners para cada protocolo
    protocoloInputs.forEach(input => {
        input.addEventListener('change', calcularCiclo);
    });

    // Adicionar event listeners para os campos de input para recalcular o valor de kcal em tempo real
    campoCarboidratos.addEventListener('input', calcularCiclo);
    campoGorduras.addEventListener('input', calcularCiclo);
    campoProteinas.addEventListener('input', calcularCiclo);

    // Calcular ao clicar em "Calcular"
    document.querySelector('button').addEventListener('click', calcularCiclo);
});
