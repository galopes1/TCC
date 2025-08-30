function adicionarAoCarrinho(nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push({ nome, preco });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert(nome + " adicionado ao carrinho!");
}

function exibirCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let container = document.getElementById("carrinho");
  let total = 0;

  if (carrinho.length === 0) {
    container.innerHTML = "<p style='color:white; font-size:1.6rem;'>Seu carrinho está vazio.</p>";
    document.getElementById("total").innerText = "0";
    return;
  }

  container.innerHTML = "";
  carrinho.forEach((item, index) => {
    total += item.preco;
    container.innerHTML += `
      <p style="color:white; font-size:1.6rem;">
        ${item.nome} - R$ ${item.preco}
        <button class="btn" style="padding:0.5rem 1rem; font-size:1.2rem;" onclick="removerItem(${index})">Remover</button>
      </p>
    `;
  });

  document.getElementById("total").innerText = total.toFixed(2);
}

function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  exibirCarrinho();
}
