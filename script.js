
function mostrarErro(campo, mensagem) {
  campo.classList.add("erro");
  var span = campo.parentElement.querySelector(".mensagem-erro");
  if (span) {
    span.textContent = mensagem;
    span.style.display = "block";
  }
}

function limparErro(campo) {
  campo.classList.remove("erro");
  var span = campo.parentElement.querySelector(".mensagem-erro");
  if (span) {
    span.style.display = "none";
  }
}

function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}

function validarSenha(senha) {
  if (senha.length < 8) return false;
  if (!/[A-Z]/.test(senha)) return false;
  if (!/[a-z]/.test(senha)) return false;
  if (!/[0-9]/.test(senha)) return false;
  if (!/[^A-Za-z0-9]/.test(senha)) return false;
  return true;
}

function aplicarMascaraCPF(input) {
  input.addEventListener("input", function () {
    var v = this.value.replace(/\D/g, "");
    v = v.substring(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    this.value = v;
  });
}

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
