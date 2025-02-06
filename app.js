// Array para armazenar os nomes dos amigos
const amigos = [];

/**
 * Função para adicionar um novo amigo à lista.
 */
function adicionarAmigo() {
  const input = document.getElementById('amigo');
  const nome = input.value.trim();

  if (nome === '') {
    alert('Por favor, digite um nome.');
    return;
  }

  amigos.push(nome);
  atualizarListaAmigos();
  
  // Limpa o campo de entrada e coloca o foco novamente nele
  input.value = '';
  input.focus();
}

/**
 * Atualiza a lista de amigos exibida na tela.
 */
function atualizarListaAmigos() {
  const listaAmigos = document.getElementById('listaAmigos');
  listaAmigos.innerHTML = '';

  amigos.forEach((amigo) => {
    const li = document.createElement('li');
    li.textContent = amigo;
    listaAmigos.appendChild(li);
  });
}

/**
 * Realiza o sorteio dos amigos, garantindo que ninguém tire a si mesmo.
 */
function sortearAmigo() {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';

  if (amigos.length < 2) {
    alert('Adicione pelo menos 2 amigos para realizar o sorteio.');
    return;
  }

  // Cria uma cópia dos amigos para realizar o sorteio (permuta)
  let sorteio = amigos.slice();

  // Função para embaralhar um array (algoritmo de Fisher-Yates)
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Embaralha até que nenhum amigo seja sorteado para si mesmo
  let valido = false;
  while (!valido) {
    shuffle(sorteio);
    valido = true;

    // Verifica se algum amigo tirou o próprio nome
    for (let i = 0; i < amigos.length; i++) {
      if (amigos[i] === sorteio[i]) {
        valido = false;
        break;
      }
    }
  }

  // Exibe os resultados do sorteio
  amigos.forEach((amigo, index) => {
    const li = document.createElement('li');
    li.textContent = `${amigo} tirou ${sorteio[index]}`;
    resultado.appendChild(li);
  });
}
