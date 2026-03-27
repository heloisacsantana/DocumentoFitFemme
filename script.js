function calcularTotal() {
    const qtd = parseFloat(document.getElementById('c4').value) || 0;
    const unit = parseFloat(document.getElementById('c5').value) || 0;
    const total = qtd * unit;
    document.getElementById('c6').value = total.toFixed(2);
}

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function gerar(pdf = false) {
    // Coletar dados do formulário
    const r1 = document.getElementById('c1').value || '---------------------------';
    const r2Raw = document.getElementById('c2').value;
    const r2 = r2Raw ? r2Raw.split('-').reverse().join('/') : '--/--/----';
    const r3 = document.getElementById('c3').value || '---------------------------';
    const r4 = document.getElementById('c4').value || '--';
    const r5Val = parseFloat(document.getElementById('c5').value) || 0;
    const r6Val = parseFloat(document.getElementById('c6').value) || 0;
    
    const r7_nome = document.getElementById('c7_nome').value || '---------------------------';
    const r7_cargo = document.getElementById('c7_cargo').value || 'Solicitante';
    const r8_nome = document.getElementById('c8_nome').value || '---------------------------';
    const r8_cargo = document.getElementById('c8_cargo').value || 'Aprovador';
    const r9 = document.getElementById('c9').value || 'Nenhuma observação informada para este pedido.';

    // Atualizar elementos do relatório
    document.getElementById('r1').textContent = r1;
    document.getElementById('r2').textContent = r2;
    document.getElementById('r3').textContent = r3;
    document.getElementById('r4').textContent = r4;
    document.getElementById('r5').textContent = formatarMoeda(r5Val);
    document.getElementById('r6').textContent = formatarMoeda(r6Val);
    document.getElementById('r7_nome').textContent = r7_nome;
    document.getElementById('r7_cargo').textContent = r7_cargo;
    document.getElementById('r8_nome').textContent = r8_nome;
    document.getElementById('r8_cargo').textContent = r8_cargo;
    document.getElementById('r9').textContent = r9;

    const relatorioContainer = document.getElementById('relatorio-container');
    const relatorio = document.getElementById('relatorio');
    
    // Tornar visível para o script ler
    relatorioContainer.classList.remove('relatorio-hidden');

    if (pdf) {
        const opt = {
            margin: 0,
            filename: `FitFemme_Pedido_${r1.substring(0, 10).replace(/\s+/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Gerar o PDF
        html2pdf().set(opt).from(relatorio).save().then(() => {
            // Opcional: manter visível ou ocultar após gerar
        });
    } else {
        // Rolar suavemente até o documento para pré-visualização
        relatorio.scrollIntoView({ behavior: 'smooth' });
    }
}
