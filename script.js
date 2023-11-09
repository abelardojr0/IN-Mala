const form = document.querySelector("[data-form]");
const lista = document.querySelector("[data-lista]");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((item) => {
  criaElemento(item);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nomeInput = e.target.elements.nome;
  const nome = nomeInput.value;
  const quantidadeInput = e.target.elements.quantidade;
  const quantidade = quantidadeInput.value;

  const existe = itens.find((item) => item.nome === nome);

  const itemAtual = {
    nome,
    quantidade,
  };

  if (existe) {
    itemAtual.id = existe.id;

    atualizaElemento(itemAtual);

    itens[itens.findIndex((item) => item.id === existe.id)] = itemAtual;
  } else {
    itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;

    criaElemento(itemAtual);

    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nomeInput.value = "";
  quantidadeInput.value = "";
});

function criaElemento(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("span");
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id;
  novoItem.appendChild(numeroItem);

  novoItem.innerHTML += item.nome;

  const botao_editar = document.createElement("img");
  botao_editar.src = "./edit.png";
  botao_editar.classList.add("button_icon");
  botao_editar.addEventListener("click", () => {
    atualizarQuantidade(item.id);
  });
  novoItem.appendChild(botao_editar);

  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem);
}

function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}

function editaElemento(id, novoValor) {
  document.querySelector("[data-id='" + id + "']").innerHTML = novoValor;
}

function atualizarQuantidade(id) {
  const novaNota = prompt(`Editar quantidade de produtos`);
  if (novaNota !== null) {
    const itens = JSON.parse(localStorage.getItem("itens")) || [];

    itens[id].quantidade = parseFloat(novaNota);

    // Salva as alterações de notas de volta no armazenamento local
    localStorage.setItem("itens", JSON.stringify(itens));

    editaElemento(id, novaNota);
  }
}
function botaoDeleta(id) {
  const elementoBotao = document.createElement("img");
  elementoBotao.src = "./remove.png";
  elementoBotao.classList.add("button_icon");
  elementoBotao.addEventListener("click", function () {
    deletaElemento(this.parentNode, id);
  });

  return elementoBotao;
}

function deletaElemento(tag, id) {
  tag.remove();
  itens.splice(
    itens.findIndex((element) => element.id === id),
    1
  );

  localStorage.setItem("itens", JSON.stringify(itens));
}
