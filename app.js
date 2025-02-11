// Lista para armazenar os números já sorteados, evitando repetições
let listaDeMiausSorteados = [];
let limiteMiau = 10; // Define o número máximo do sorteio
let miauSecreto = gerarMiauSecreto(); // Número secreto gerado aleatoriamente
let tentativas = 1; // Contador de tentativas do jogador

// Função para exibir mensagens na tela e narrá-las (opcionalmente)
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Exibe a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Miau Secreto!');
    exibirTextoNaTela('p', 'Escolha um número de Miau entre 1 e 10.');
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão no início
}

// Inicializa o jogo exibindo a mensagem inicial
exibirMensagemInicial();

// Função chamada quando o jogador faz um chute
function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);

    // Se o chute não for um número válido, exibe um aviso e encerra a função
    if (isNaN(chute) || chute < 1 || chute > limiteMiau) {
        exibirTextoNaTela('p', 'Digite um número válido entre 1 e 10, humano! 🐾', false);
        return;
    }

    // Se o jogador acertou o Miau Secreto
    if (chute === miauSecreto) {
        let palavraTentativa = tentativas === 1 ? 'tentativa' : 'tentativas';
        let mensagemVitoria = `Miaaau! 🎉 Você encontrou o Miau Secreto em ${tentativas} ${palavraTentativa}! 🐱`;
        exibirTextoNaTela('h1', 'Acertou, humano! 🐾');
        exibirTextoNaTela('p', mensagemVitoria);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão "Novo Jogo"
    } else {
        // Dá uma dica se o Miau Secreto é maior ou menor
        let dica = chute > miauSecreto ? 'O Miau Secreto é menor! Tente novamente. 😼' : 'O Miau Secreto é maior! Tente novamente. 😼';
        exibirTextoNaTela('p', dica, false);
        tentativas++;
        limparCampo();
    }
}

// Função que gera um número aleatório sem repetir os já sorteados
function gerarMiauSecreto() {
    let numeroEscolhido;
    do {
        numeroEscolhido = parseInt(Math.random() * limiteMiau + 1);
    } while (listaDeMiausSorteados.includes(numeroEscolhido));

    listaDeMiausSorteados.push(numeroEscolhido);
    return numeroEscolhido;
}

// Função que limpa o campo de entrada
function limparCampo() {
    let campo = document.querySelector('input');
    campo.value = '';
}

// Função que reinicia o jogo
function reiniciarJogo() {
    miauSecreto = gerarMiauSecreto();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
}
