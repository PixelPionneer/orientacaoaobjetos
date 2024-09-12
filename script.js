document.addEventListener('DOMContentLoaded', function() {
    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');

    // Função para buscar estados do Brasil
    function carregarEstados() {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena os estados pelo nome
                data.forEach(estado => {
                    const option = document.createElement('option');
                    option.value = estado.id;
                    option.textContent = estado.nome;
                    estadoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar os estados:', error));
    }

    // Função para buscar cidades de um estado
    function carregarCidades(estadoId) {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .then(response => response.json())
            .then(data => {
                cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>'; // Limpa as opções
                data.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena as cidades pelo nome
                data.forEach(cidade => {
                    const option = document.createElement('option');
                    option.value = cidade.id;
                    option.textContent = cidade.nome;
                    cidadeSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar as cidades:', error));
    }

    // Carrega os estados ao iniciar a página
    carregarEstados();

    // Quando um estado for selecionado, carregar as cidades
    estadoSelect.addEventListener('change', function() {
        const estadoId = estadoSelect.value;
        if (estadoId) {
            carregarCidades(estadoId);
        } else {
            cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>'; // Limpa as cidades se nenhum estado estiver selecionado
        }
    });
});
