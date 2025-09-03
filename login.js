// login.js
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('form-login');
  const registerForm = document.getElementById('form-register');

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    try {
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const payload = { action: 'login', email, password };

      const res = await fetch('login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let resultado;
      try {
        resultado = JSON.parse(text);
      } catch (err) {
        console.error('Resposta do servidor não é JSON:', text);
        alert('Resposta do servidor inválida. Veja o console (F12).');
        return;
      }

      if (res.ok && resultado.status === 'success') {
        alert(resultado.message || 'Login realizado com sucesso!');
        window.location.href = 'index.html';
      } else {
        alert(resultado.message || 'Erro no login');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de rede. Verifique o console (F12) e a aba Network.');
    }
  });

  registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    try {
      const fullname = document.getElementById('fullname').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }

      const payload = { action: 'register', email, password, fullname };

      const res = await fetch('login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      let resultado;
      try {
        resultado = JSON.parse(text);
      } catch (err) {
        console.error('Resposta do servidor não é JSON:', text);
        alert('Resposta do servidor inválida. Veja o console (F12).');
        return;
      }

      if (res.ok && resultado.status === 'success') {
        alert(resultado.message || 'Registro realizado com sucesso!');
        showLogin();
      } else {
        alert(resultado.message || 'Erro no registro');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de rede. Verifique o console (F12) e a aba Network.');
    }
  });
});

function showRegister() {
  document.getElementById('form-login').style.display = 'none';
  document.getElementById('form-register').style.display = 'block';
}

function showLogin() {
  document.getElementById('form-register').style.display = 'none';
  document.getElementById('form-login').style.display = 'block';
}
