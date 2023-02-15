// Fiz o selecionamento para puxar os codigos que irei aplicar o javascript atraves do id deles //  
let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');

// Adicionando o evento que sera excutado no input nova tarefa (evento para adicionar com 'Enter') // 
inputNovaTarefa.addEventListener('keydown', (e) => {
    if(e.keyCode == 13) {
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        }
        adicionarTarefa(tarefa);
    }
});

janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alterarJanelaEdicao();
});

// Adicionando o evento de click que sera excutado ao clicar no botão adicionar tarefa //
btnAddTarefa.addEventListener('click', (e) => {
    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId(),  
    }
    adicionarTarefa(tarefa);
});

btnAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();
    let idTarefa = idTarefaEdicao.innerHTML.replace('#', ''); 
    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById('' + idTarefa + '');
    if(tarefaAtual) {
        let li = criarTagLI(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alterarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!')
    }

})

// Criando a função para adicionar a tarefa na lista de baixo //
function gerarId() {
    return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa) {
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';
}

function criarTagLI(tarefa) {
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}


function editar(idTarefa) {
    let li = document.getElementById('' + idTarefa + '');
    if(li) {
        idTarefaEdicao.innerHTML = '#' + idTarefa; 
        inputTarefaNomeEdicao.value = li.innerText;
        alterarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!')
    }
}

// Configurando o botão excluir, para poder excluir um item da lista //
function excluir(idTarefa) {
    let confirmacao = window.confirm('Tem certeza que deseja excluir esse item?');
    if(confirmacao) {
        let li = document.getElementById(''+ idTarefa + '');
        if (li) {
            listaTarefas.removeChild(li);
        } else {
            alert('Elemento HTML não encontrado!')
        }
    } 
}

function alterarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}



