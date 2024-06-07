document.addEventListener('DOMContentLoaded', () => {
    const addContaForm = document.getElementById('addContaForm');
    const fetchContasBtn = document.getElementById('fetchContasBtn');
    const clearContasBtn = document.getElementById('clearContasBtn');
    const contasList = document.getElementById('contasList');

    clearContasBtn.addEventListener('click', () => {
        contasList.innerHTML = ''; // Limpa o conteúdo da lista
    });

    addContaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const valorOriginal = document.getElementById('valorOriginal').value;
        const dataVencimento = document.getElementById('dataVencimento').value;
        const dataPagamento = document.getElementById('dataPagamento').value;

        const conta = {
            nome: nome,
            valorOriginal: parseFloat(valorOriginal),
            dataVencimento: dataVencimento,
            dataPagamento: dataPagamento
        };

        try {
            const response = await fetch('http://localhost:5261/api/conta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(conta)
            });
            if (response.ok) {
                alert('Conta adicionada com sucesso!');
                addContaForm.reset();
                fetchContas();
            } else {
                alert('Erro ao adicionar conta.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    });

    fetchContasBtn.addEventListener('click', fetchContas);

    async function fetchContas() {
        try {
            const response = await fetch('http://localhost:5261/api/conta');
            const contas = await response.json();
            contasList.innerHTML = '';
            contas.forEach(conta => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                <span><strong>Nome:</strong> ${conta.nome}</span>
                <span><strong>Valor Original:</strong> ${conta.valorOriginal}</span>
                <span><strong>Valor Corrigido:</strong> ${conta.valorCorrigido}</span>
                <span><strong>Dias de Atraso:</strong> ${conta.diasAtraso}</span>
                <span><strong>Data de Pagamento:</strong> ${conta.dataPagamento}</span>
            `;
                contasList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    fetchContas();
});
