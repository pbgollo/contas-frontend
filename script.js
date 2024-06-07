document.addEventListener('DOMContentLoaded', () => {
    const addContaForm = document.getElementById('addContaForm');
    const fetchContasBtn = document.getElementById('fetchContasBtn');
    const contasList = document.getElementById('contasList');

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
                listItem.textContent = `Nome: ${conta.nome}, Valor Original: ${conta.valorOriginal}, Valor Corrigido: ${conta.valorCorrigido}, Dias de Atraso: ${conta.diasAtraso}, Data de Pagamento: ${conta.dataPagamento}`;
                contasList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    fetchContas();
});
