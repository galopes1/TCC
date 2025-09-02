document.getElementById("form-login").addEventListener("submit", async function(e){
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let dados = new FormData();
    dados.append("email", email);
    dados.append("password", password);

    let resposta = await fetch("login.php",{
        method: "POST",
        body: dados
    });

    let resultado = await resposta.json();

    if(resultado.status === "success"){
        alert("Login realizado com sucesso!");
        window.location.href = "index.html";
    }else{
        alert(resultado.message);
    }
    

});