/* ===========================
   CIVLEX - JavaScript Global
   =========================== */

/* -----------------------------------------------
   Função: mostrarErro
   Exibe a mensagem de erro embaixo do campo
----------------------------------------------- */
function mostrarErro(campo, mensagem) {
  campo.classList.add("erro");
  var span = campo.parentElement.querySelector(".mensagem-erro");
  if (span) {
    span.textContent = mensagem;
    span.style.display = "block";
  }
}

/* -----------------------------------------------
   Função: limparErro
   Remove a mensagem de erro do campo
----------------------------------------------- */
function limparErro(campo) {
  campo.classList.remove("erro");
  var span = campo.parentElement.querySelector(".mensagem-erro");
  if (span) {
    span.style.display = "none";
  }
}

/* -----------------------------------------------
   Função: validarEmail
   Verifica se o email tem formato válido
----------------------------------------------- */
function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}

/* -----------------------------------------------
   Função: validarSenha
   Verifica se a senha tem pelo menos 8 caracteres,
   letra maiúscula, minúscula, número e símbolo
----------------------------------------------- */
function validarSenha(senha) {
  if (senha.length < 8) return false;
  if (!/[A-Z]/.test(senha)) return false;
  if (!/[a-z]/.test(senha)) return false;
  if (!/[0-9]/.test(senha)) return false;
  if (!/[^A-Za-z0-9]/.test(senha)) return false;
  return true;
}

/* -----------------------------------------------
   Função: aplicarMascaraCPF
   Formata o CPF enquanto o usuário digita
   Ex: 12345678901 → 123.456.789-01
----------------------------------------------- */
function aplicarMascaraCPF(input) {
  input.addEventListener("input", function () {
    var v = this.value.replace(/\D/g, ""); // Remove tudo que não é número
    v = v.substring(0, 11);               // Limita a 11 dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    this.value = v;
  });
}

/* -----------------------------------------------
   Função: buscarCEP
   Busca o endereço pelo CEP usando a API ViaCEP
----------------------------------------------- */
function buscarCEP(campoCEP) {
  var cep = campoCEP.value.replace(/\D/g, "");
  if (cep.length !== 8) return;

  fetch("https://viacep.com.br/ws/" + cep + "/json/")
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (dados) {
      if (dados.erro) {
        alert("CEP não encontrado.");
        return;
      }
      // Preenche os campos automaticamente
      var logradouro = document.getElementById("logradouro");
      var bairro     = document.getElementById("bairro");
      var cidade     = document.getElementById("cidade");
      var estado     = document.getElementById("estado");

      if (logradouro) logradouro.value = dados.logradouro;
      if (bairro)     bairro.value     = dados.bairro;
      if (cidade)     cidade.value     = dados.localidade;
      if (estado)     estado.value     = dados.uf;
    })
    .catch(function () {
      alert("Erro ao buscar o CEP. Verifique sua conexão.");
    });
}

/* -----------------------------------------------
   Função: contarCaracteres
   Atualiza o contador de caracteres em tempo real
----------------------------------------------- */
function contarCaracteres(textarea, spanId, limite) {
  var span = document.getElementById(spanId);
  textarea.addEventListener("input", function () {
    var usados = this.value.length;
    if (span) span.textContent = usados + "/" + limite;
    if (usados > limite) {
      this.value = this.value.substring(0, limite);
    }
  });
}

/* -----------------------------------------------
   Função: mostrarSenha
   Alterna entre mostrar e ocultar a senha
----------------------------------------------- */
function mostrarSenha(inputId, botao) {
  var input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    botao.textContent = "Ocultar";
  } else {
    input.type = "password";
    botao.textContent = "Mostrar";
  }
}
