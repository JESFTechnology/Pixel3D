// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Initialize popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})();

// mostrar senha
function mostraSenha(idCampoSenha) {
    const senhaInput = document.getElementById(idCampoSenha);
    const olhoIcone = document.getElementById(`olhoIcone${idCampoSenha.charAt(idCampoSenha.length - 1)}`);

    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        olhoIcone.classList.remove('fa-eye-slash');
        olhoIcone.classList.add('fa-eye');
    } else {
        senhaInput.type = 'password';
        olhoIcone.classList.remove('fa-eye');
        olhoIcone.classList.add('fa-eye-slash');
    }
};


// valida senha
const comprimentoMinimo = 8; // Defina o comprimento mínimo desejado

        function validaSenha1() {
            const senha1 = document.getElementById('senha1').value;
            const resultadoSenha1 = document.getElementById('resultado2');

            if (senha1.length < comprimentoMinimo) {
                resultadoSenha1.innerHTML = "A senha deve ter pelo menos " + comprimentoMinimo + " caracteres.";
                resultadoSenha1.style.color = "red";
            } else {
                resultadoSenha1.innerHTML = "";
            }
        }

        function validaSenha2() {
            const senha1 = document.getElementById('senha1').value;
            const senha2 = document.getElementById('senha2').value;
            const resultadoSenha2 = document.getElementById('resultado3');
            const resultadoComparacao = document.getElementById('resultado3');

            if (senha2.length < comprimentoMinimo) {
                resultadoSenha2.innerHTML = "A senha deve ter pelo menos " + comprimentoMinimo + " caracteres.";
                resultadoSenha2.style.color = "red";
            } else {
                resultadoSenha2.innerHTML = "";

                if (senha1 === senha2) {
                    resultadoComparacao.innerHTML = "Senhas coincidem!";
                    resultadoComparacao.style.color = "green";
                } else {
                    resultadoComparacao.innerHTML = "Senhas não coincidem!";
                    resultadoComparacao.style.color = "red";
                }
            }
        };

// verifica email
function verificaEmail() {
    const emailInput = document.getElementById('email');
    const resultado = document.getElementById('resultado1');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailRegex.test(emailInput.value)) {
        resultado.innerHTML = "Email válido";
        resultado.style.color = "green";
    } else {
        resultado.innerHTML = "Email inválido";
        resultado.style.color = "red";
    }
};

// máscaras para os campos
$(document).ready(function() {
    $('#cpf').mask('000.000.000-00');
    $("#cep").mask("99.999-999");
    $("#tel").mask("(99) 9999-9999");
	$("#cel").mask("(99) 99999-9999");
});

function formatarTelefone(input) {
    // Remove todos os caracteres não numéricos
    var numero = input.value.replace(/\D/g, '');

    // Aplica a formatação (xx) xxxxx-xxxx
    if (numero.length === 10) {
        input.value = '(' + numero.substring(0, 2) + ') ' + numero.substring(2, 6) + '-' + numero.substring(6);
    } else {
        // Se não for um número de telefone completo, deixa como está
        input.value = numero;
    }
}

function formatarCelular(input) {
    // Remove todos os caracteres não numéricos
    var numero = input.value.replace(/\D/g, '');

    // Aplica a formatação (xx) xxxxx-xxxx
    if (numero.length === 11) {
        input.value = '(' + numero.substring(0, 2) + ') ' + numero.substring(2, 7) + '-' + numero.substring(7);
    } else {
        // Se não for um número de telefone completo, deixa como está
        input.value = numero;
    }
}

//Mascara 2 cpf
function formatarCPF(campo) {
    let valor = campo.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (valor.length > 3 && valor.length <= 6) {
      campo.value = valor.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (valor.length > 6 && valor.length <= 9) {
      campo.value = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (valor.length > 9) {
      campo.value = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else {
      campo.value = valor;
    }
  }

// valida cpf

function verificarCPF() {
    const cpfInput = document.getElementById('cpf');
    const resultado = document.getElementById('resultado4');
    const cpf = cpfInput.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (cpf.length !== 11 || !validarCPF(cpf)) {
        resultado.innerHTML = "CPF inválido";
        resultado.style.color = "red";
    } else {
        resultado.innerHTML = "CPF válido";
        resultado.style.color = "green";
    }
}

function validarCPF(cpf) {
    let soma = 0;
    let resto;

    if (cpf === '00000000000') return false;

    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
};

// consulta CEP
function consultarCEP() {
    const cepInput = document.getElementById('cep');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const mensagemErro = document.getElementById('mensagemErro');
    const complementoInput = document.getElementById('complemento');

    const cep = cepInput.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (cep.length !== 8) {
        // CEP inválido
        cidadeInput.value = '';
        estadoInput.value = '';
        logradouroInput.value = '';
        bairroInput.value = '';
        complementoInput.value = '';
        mensagemErro.textContent = 'CEP inválido';
        return;
    }

    // Limpa a mensagem de erro ao iniciar a consulta
    mensagemErro.textContent = '';

    // Faz a consulta na API (substitua pela sua própria API, se necessário)
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                cidadeInput.value = data.localidade;
                estadoInput.value = data.uf;
                logradouroInput.value = data.logradouro;
                complementoInput.value = data.complemento;
                bairroInput.value = data.bairro;
                mensagemErro.textContent = '';
            } else {
                cidadeInput.value = '';
                estadoInput.value = '';
                logradouroInput.value = '';
                bairroInput.value = '';
                complementoInput.value = '';
                mensagemErro.textContent = 'CEP não encontrado';
            }
        })
        .catch(error => {
            console.error('Erro na consulta de CEP:', error);
        });
};