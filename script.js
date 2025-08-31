function adicionarAoCarrinho(nome, preco, imagem) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push({ nome, preco, imagem });
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
    document.getElementById("precoFinal").innerHTML = ""; // Limpa o preço final
    return;
  }

  container.innerHTML = "";
  carrinho.forEach((item, index) => {
    total += item.preco;
    container.innerHTML += `
      <div style="display:flex; align-items:center; margin-bottom:1rem; background:#333; padding:1rem; border-radius:8px;">
        <img src="${item.imagem}" alt="${item.nome}" style="width:80px; height:80px; object-fit:cover; border-radius:8px; margin-right:1rem;">
        <div style="flex-grow:1;">
          <p style="color:white; font-size:1.4rem; margin:0;">${item.nome}</p>
          <p style="color:#ccc; font-size:1.2rem; margin:0;">R$ ${item.preco.toFixed(2)}</p>
        </div>
        <button class="btn" style="padding:0.5rem 1rem; font-size:1.2rem; background:#ff4d4d; color:white; border:none; border-radius:4px;" onclick="removerItem(${index})">Remover</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total.toFixed(2);

  // Exibe o preço final com destaque
  document.getElementById("precoFinal").innerHTML = `
    <div style="margin-top:2rem; padding:1rem; background:#222; border-radius:8px;">
      <h3 style="color:#00ff99; font-size:1.8rem; margin:0;">Preço Final: R$ ${total.toFixed(2)}</h3>
    </div>
  `;
}



function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  exibirCarrinho();
}
