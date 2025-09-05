
let produtos = [];
const catalogoContainer = document.getElementById('grid-catalog');

fetch('catalogo.php')
 .then(response =>{
    if(!response.ok){
        throw new Error('Erro ao carregar o catálogo');
    }
    return response.json();
    }) 

    .then(data =>{
        produtos = data;
        produtos.forEach(produto =>{
            const produtoElement = document.createElement('div');
            produtoElement.classList.add('box');
            produtoElement.innerHTML = `
                <img src="${produto.imagem}" alt="Tijolo">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco}</p>
                <button class="btn" onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco}, '${produto.imagem}')">Adicionar</button>
            `;
            catalogoContainer.appendChild(produtoElement);
        });
    })
    .catch(error =>{
        console.error(error);
    });

