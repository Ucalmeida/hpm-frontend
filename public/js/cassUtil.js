// CASS - FUNCOES UTEIS E GENERICAS

function alterarLocalTrabalho(id) {
	aguarde();
	$.ajax({
		async: false,
		cache: false,
		type: 'post',
		url: 'unidadeSetorLogadoAlterar',
		data: {'ltb.id': id},
		success: function(data, textStatus, XMLHttpRequest) {
			fecharAguarde();
			var interceptador = XMLHttpRequest.getResponseHeader('interceptador');
			if (interceptador === "erro") {
				logar(alterarLocalTrabalho, id);
			} else {
				window.location.reload();
			}
		},
		error: function(data) {
			fecharAguarde();
			switch (data.status) {
			case 409:
				exibaMensagem("", data.getResponseHeader('erro'));
				break;
			default:
				exibaMensagem("", "Ocorreu o seguinte erro: " + data.getResponseHeader('erro') + "<br/>Informe ao NTI.");
				break;
			}
		}
	});
}

function abrirUrl(url) {
	window.open(url, "_blank");
}

function resetarSenha(id) {
	bootbox.dialog({
		message: 'Tem certeza que deseja resetar a senha dessa pessoa?',
		title: 'Resetar senha',
		onEscape: true,
		buttons: {
			success: {
				label: "Sim",
				className: "btn-primary",
				callback: function() {
					aguarde();
					$.ajax({async: false, cache: false, type: 'post',
						url: 'senhaResetar',
						data: {'pessoa.id': id},
						success: function (data, textStatus, XMLHttpRequest) {
							fecharAguarde();
							exibaMensagem("", XMLHttpRequest.getResponseHeader('msg'));
						},
						error: function (data) {
							fecharAguarde();
							switch (data.status) {
							case 409:
								exibaMensagem("", data.getResponseHeader('erro'));
								break;
							default:
								exibaMensagem("", "Ocorreu o seguinte erro: "+data.getResponseHeader('erro')+". Favor informar ao NTI.");
								break;
							}
						}
					});
				}
			},
			danger: {
				label: "Fechar",
				className: "btn-default",
			}
		}
	});
}

function download(fileName) {
	$.ajax({async: false, cache: false, type: 'post',
		url: 'downloadFile',
		data: {'fileName': fileName},
		success: function(data) {
			var win = window.open("about:blank");
            with (win.document) {
                write(data);
                close();
            }
        },
		error: function(data) {
			exibaMensagem("", "Ocorreu o seguinte erro: " + data.getResponseHeader('erro') + "<br/>Informe ao NTI");
		}
	});
}

function downloadFileId(id) {
	window.open("downloadFile?id="+id,"_blank");
}

function downloadArquivo(idArquivoUpload) {
	$.ajax({
		async: false, cache: false, type: 'post',
		url: 'downloadFile',
		data: {'id': idArquivoUpload},
		success: function (data) {
			var win = window.open("about:blank");
			with (win.document) {
				write(data);
				close();
			}
		},
		error: function (data) {
			exibaMensagem("", "Ocorreu o seguinte erro: " + data.getResponseHeader('erro') + "<br/>Informe ao NTI");
		}
	});
}

function aguarde(mensagem) {
	if (mensagem == undefined) mensagem = "Aguarde...";

	$.blockUI({ message: '<div id="loader-wrapper"><div id="loader-logo"><div id="loader-engrenagem"></div><div id="loader-garrucha"></div><div id="loader"></div></div> &nbsp <p id="loader-text" class="text-center" id="msgAguarde">'+mensagem+'</p></div>' });
	// window.aguardeModal = bootbox.dialog({
	// 	closeButton: false,
	// 	size: "small",
	// 	className: "loader-modal",
	// 	message: '<div id="loader-wrapper"><div id="loader-logo"><div id="loader-engrenagem"></div><div id="loader-garrucha"></div><div id="loader"></div></div></div> &nbsp <p id="loader-text" class="text-center" id="msgAguarde">'+mensagem+'</p>',
	// });
	// return window.aguardeModal;
}

function fecharAguarde() {
	$.unblockUI();
	//
	// setTimeout(function () {
	// 	if (window.aguardeModal != undefined) {
    //    		window.aguardeModal.modal('hide');
	// 		if ($('.modal').hasClass('bootbox')) {
	// 			$('body').addClass('modal-open');
	// 		}
	// 	}
    // }, 500);
}
function exibaMensagem(titulo, mensagem, limpar, reload, link) {
	fecharAguarde();
	bootbox.dialog({
		message: mensagem == undefined ? "Operação realizada com sucesso." : mensagem,
		title: titulo == "" ? "" : titulo,
		buttons: {
			success: {
				label: "OK",
				className: "btn-primary",
				callback: function() {
					fecharAguarde();
					if (limpar) {
						$('body form:first').each(function() {this.reset();$(':input:visible:enabled:first').focus();});}
					if (reload) window.location.reload();
					if (link != null && link !== undefined && link != "") window.location.href = link;
				}
			}
		}
	});
}

function exibaConfirmacao(titulo, mensagem, limpar, reload, fn, parametro) {
	bootbox.dialog({
		message: mensagem == "" ? "Operação realizada com sucesso." : mensagem,
		title: titulo == "" ? "" : titulo,
		buttons: {
			success: {
				label: "<i class='far fa-check-circle mr-1'></i>Sim",
				className: "btn-danger",
				callback: function() {
					if (limpar) {$('body form:first').each(function() {this.reset();$(':input:visible:enabled:first').focus();});}
					if (reload) window.location.reload();
					if (fn !== undefined) {
						fn(parametro);
					}
				}
			},
			danger: {
				label: "<i class='far fa-times-circle mr-1'></i>Não",
				className: "btn-default",
			}
		}
	});
}

function fecharModulo(idPessoa, modulo) {
	bootbox.confirm({
	    title: 'Fechar módulo '+modulo+' ?',
		message: 'Deseja fechar o módulo <b>'+ modulo +'</b> e voltar ao módulo Principal?',
	    buttons: {
	    	cancel: {
	    		label: '<i class="far fa-times-circle mr-1"></i>Não',
	    		className: 'btn btn-secondary',
	    	},
	        confirm: {
	            label: '<i class="far fa-check-circle mr-1"></i>Sim',
	            className: 'btn-danger',
	        },
	    },
	    callback: function (result) {
	    	if (result) {
	    		$.ajax({
	    			async: false,
	    			cache: false,
	    			type: 'post',
	    			url: 'fecharModulo',
	    			success: function(data, textStatus, XMLHttpRequest) {
	    				var url = XMLHttpRequest.getResponseHeader('cassURL');
	    				var site = XMLHttpRequest.getResponseHeader('siteURL');
	    				aguarde("Encerando o módulo");
	    				$.ajax({
	    					async: false,
	    					cache: false,
	    					type: 'post',
	    					url: site + 'principal',
	    					data: {'pessoa.id': idPessoa},
	    					success: function() {
	    						setTimeout(function(){window.location.href = url}, 1500);
	    					},
	    					error: function(data) {
	    						fecharAguarde();
	    						window.location.href = site;
	    					}
						});
						//'logarDeModulo'
	    			},
	    			error: function(data, textStatus, XMLHttpRequest) {
	    				switch (data.status) {
	    				case 409:
	    					exibaMensagem("", data.getResponseHeader('erro'));
	    					break;
	    				default:
	    					exibaMensagem("", "Ocorreu o seguinte erro: " + data.getResponseHeader('erro') + "<br/>Informe ao NTI");
	    				break;
	    				}
	    			}
	    		});
	    	}
	    }
	});
}

function popularSelect(select, url, dados, idSelected, mensagem) {
	aguarde(mensagem);
	$(select).empty();
	$.ajax({
		url: url,
		type: 'post',
		data: dados,
		success: function(data) {
			fecharAguarde();
			var objetos = data.objetos;
			if (objetos != undefined && Object.keys(objetos).length > 0) {
				$(select).append("<option></option>");
				$.each(data.objetos, function(key, o) {
					$(select).append('<option value="'+o.id+'">'+o.nome+'</option>');
				});
				if (idSelected !== undefined & idSelected != "") {
					if (idSelected > 0)
						$(select).val(idSelected);
					else
						$("#"+select.attr('id')+" option").filter(function() {return this.text == idSelected;}).attr('selected', true);
				}

			}
		},
		error: function(data) {
			fecharAguarde();
			exibaMensagem("", "Ocorreu o seguinte erro: " + data.getResponseHeader('erro'));
		}
	});
}

function popularSelect2(selectPai, select, url, dados, idSelected) {
	$(select).empty();
	if ($(selectPai).val() > 0) {
		aguarde();
		$.ajax({
			url: url,
			type: 'post',
			data: dados,
			success: function(data) {
				fecharAguarde();
				var objetos = data.objetos;
				if (objetos != undefined && Object.keys(objetos).length > 0) {
					$(select).append("<option></option>");
					$.each(data.objetos, function(key, o) {
						$(select).append('<option value="'+o.id+'">'+o.nome+'</option>');
					});
					if (idSelected !== undefined & idSelected != "") {
						if (idSelected > 0)
							$(select).val(idSelected);
						else
							$("#"+select.attr('id')+" option").filter(function() {return this.text == idSelected;}).attr('selected', true);
					}

				}
			},
			error: function(data) {
				fecharAguarde();
				exibaMensagem("", "Ocorreu o seguinte erro: " + data.getResponseHeader('erro'));
			}
		});
	}
}

function execute(parametro) {
	if (parametro == 'ultimoBGO') {
		downloadUltimoBgo();
	} else if (parametro == 'ultimoBOL') {
		verUltimoBol();
	} else if (typeof parametro === 'string') {
		clearInterval(timerContador);
		aguarde();
		$.ajax({
			url: parametro,
			success: function(data, textStatus, XMLHttpRequest) {
				fecharAguarde();
				var interceptador = XMLHttpRequest.getResponseHeader('interceptador');
				if (interceptador === "erro") {
					logar(parametro);
//					window.location.href = "formLogar"
				} else {
				    with (window.document) {open();write(data);history.pushState("", "", parametro);close();}
				}
			}
		});

	} else {
		fecharAguarde();
		exibaMensagem("Função Execute", "Parâmetro incorreto. Verifique o parâmetro passado.");
	}
}

function logar(parametro) {
	var param = parametro;
	var params = arguments;
	var nv = bootbox.dialog({
		message: 'Aguarde...',
		title: "Logar",
		size: "small",
		buttons: {
			danger: {
				label: "Cancelar",
				className: "btn-default",
			},
			success: {
				label: "Logar",
				className: "btn-primary",
				callback: function() {
					$("#formLogar").submit();
					return false;
				}
			}
		}
	});
	$(".bootbox-body").load('formLogar');
	nv.bind('shown.bs.modal', function(){nv.find("#login").focus();});
}

function logarModulo(modulo, idPessoa, idLocalTrabalho) {
	aguarde();
	$.ajax({
		async: false,
		cache: false,
		type: 'post',
		url: modulo+"/login",
		data: {'pessoa.id': idPessoa, 'ltb.id': idLocalTrabalho},
		success: function(data, textStatus, XMLHttpRequest) {
			var interceptador = XMLHttpRequest.getResponseHeader('interceptador');
			if (interceptador === "erro") {
				logar(parametro);
			} else {
				window.location.href = modulo + XMLHttpRequest.getResponseHeader('url');
			}
		},
		error: function(data) {
			fecharAguarde();
			switch (data.status) {
			case 409:
				exibaMensagem("", data.getResponseHeader('erro'));
				break;
			default:
				exibaMensagem("", "Ocorreu o seguinte erro: " + data.getResponseHeader('erro') + "<br/>Informe ao NTI.");
				break;
			}
		}
	});
}

function sair() {
	bootbox.confirm({
	    title: "Deseja sair do PORTAL?",
	    message: " Para sair completamente do sistema clique em \"Sair\".",
	    buttons: {
	        cancel: {
	            label: '<i class="fa fa-times"></i> Cancelar'
	        },
	        confirm: {
	            label: '<i class="fa fa-power-off"></i> Sair',
				className: 'btn-danger'
	        }
	    },
	    callback: function (result) {
	    	if (result) {
	    		location.href='logout'
			}
	    }
	});

}

// function enviar(form, limpar, exibirMensagem, reload, msgAguarde) {
// 	if (limpar !== false) limpar = true;
// 	if (exibirMensagem !== false) exibirMensagem = true;
// 	if (reload !== true) reload = false;
// 	var result = [false, "", ""];
// 	var dados = new FormData($(form)[0]);
// 	var url = $(form).attr("action");
// 	aguarde(msgAguarde);
// 	$.ajax({async: false, cache: false, type: 'post', contentType: false, processData: false,
// 		url: url,
// 		data: dados,
// 		success: function (data, textStatus, XMLHttpRequest) {
// 		fecharAguarde();
// 			var interceptador = XMLHttpRequest.getResponseHeader('interceptador');
// 			if (interceptador === "ok") {
// 				if (exibirMensagem == true) {
// 					exibaMensagem("", '<i class="text-success far fa-check-circle"></i> '+XMLHttpRequest.getResponseHeader('msg'), limpar, reload);
// 				}
// 				if (limpar) {
// 					$(form)[0].reset();
// 					$(':input:visible:enabled:first').focus();
// 				}
// 				result[0] = true;
// 				result[1] = XMLHttpRequest.getResponseHeader('id');
// 				result[2] = data.resposta;
// 			} else {
// 				exibaMensagem("", '<i class="text-warning fas fa-exclamation-circle"></i> '+XMLHttpRequest.getResponseHeader('erro'));
// 			}
// 		},
// 		error: function (data) {
// 			fecharAguarde();
// 			switch (data.status) {
// 			case 409:
// 				exibaMensagem("", '<i class="text-danger far fa-times-circle"></i> '+data.getResponseHeader('erro'));
// 				break;
// 			default:
// 				exibaMensagem("", '<i class="text-danger far fa-times-circle"></i> Ocorreu o seguinte erro: '+data.getResponseHeader('erro'));
// 				break;
// 			}
// 		},
// 		timeout: 15000
// 	});
// 	return result;
// }

function educacaoEnviar(form, limpar, exibirMensagem, reload) {
	if (limpar !== false) limpar = true;
	if (exibirMensagem !== false) exibirMensagem = true;
	if (reload !== true) reload = false;
	var result = [false, "", "", "", "", "", ""];
	var dados = new FormData($(form)[0]);
	var url = $(form).attr("action");
	$.ajax({async: false, cache: false, type: 'post', contentType: false, processData: false,
		url: url,
		data: dados,
		success: function (data, textStatus, XMLHttpRequest) {
			var interceptador = XMLHttpRequest.getResponseHeader('interceptador');
			if (interceptador === "ok") {
				if (exibirMensagem == true) {
					exibaMensagem("", '<i class="verde glyphicon glyphicon-ok"></i> '+XMLHttpRequest.getResponseHeader('msg'), limpar, reload);
				} else {
					if (limpar) {
						$(form)[0].reset();
						$(':input:visible:enabled:first').focus();
					}
				}
				result[0] = true;
				result[1] = XMLHttpRequest.getResponseHeader('id');
				result[2] = data.resposta;
				result[3] = data;
				result[4] = XMLHttpRequest.getResponseHeader('data');
				result[5] = XMLHttpRequest.getResponseHeader('numero');
				result[6] = XMLHttpRequest.getResponseHeader('nome');
			} else {
				exibaMensagem("", '<i class="vermelho glyphicon glyphicon-remove"></i> '+XMLHttpRequest.getResponseHeader('erro'));
			}
		},
		error: function (data) {
			switch (data.status) {
				case 409:
					exibaMensagem("", '<i class="vermelho glyphicon glyphicon-remove"></i> '+data.getResponseHeader('erro'));
					break;
				default:
					exibaMensagem("", '<i class="vermelho glyphicon glyphicon-remove"></i> Ocorreu o seguinte erro: '+data.getResponseHeader('erro')+". Favor informar ao NTI.", true, reload);
					break;
			}
		}
	});
	return result;
}

function enviar2(form, limpar, exibirMensagem, reload, msgAguarde) {
	if (limpar !== false) limpar = true;
	if (exibirMensagem !== false) exibirMensagem = true;
	if (reload !== true) reload = false;
	var result = new Array(false, "");
	var dados = new FormData($(form)[0]);
	var url = $(form).attr("action");
	//console.log('url que esta chegando no enviar() -->> ' + url);
	var ag = aguarde(msgAguarde);

	$.ajax({async: false, cache: false, type: 'post', contentType: false, processData: false,
		url: url,
		data: dados,
		success: function (data, textStatus, XMLHttpRequest) {
			ag.modal("hide");
			if (exibirMensagem == true) {
				exibaMensagem("", XMLHttpRequest.getResponseHeader('msg'), limpar, reload);
			}
			if (limpar) {
				console.log("passou pra limpar")
				$(form)[0].reset();
				$(':input:visible:enabled:first').focus();
			}
			if (reload) window.location.reload();
			result[0] = true;
			result[1] = XMLHttpRequest.getResponseHeader('id');
			result[2] = XMLHttpRequest.getResponseHeader('nome');
			result[3] = XMLHttpRequest.getResponseHeader('tipo');
			result[4] = data.resposta;
		},
		error: function (data) {
			ag.modal("hide");
			switch (data.status) {
			case 409:
				exibaMensagem("", data.getResponseHeader('erro'));
				break;
			default:
				exibaMensagem("", "Ocorreu o seguinte erro: "+data.getResponseHeader('erro')+". Favor informar ao NTI:<br/>Fone:(79)3226-7108 - 3226-7100 (ramal 208).", true, reload);
				break;
			}
		},
	});
	return result;
}

function enviarSemLogin(form, limpar, exibirMensagem, reload, linkPos) {
	if (limpar !== false) limpar = true;
	if (exibirMensagem !== false) exibirMensagem = true;
	if (reload !== true) reload = false;
	var result = [false, "", ""];
	var dados = new FormData($(form)[0]);
	var url = $(form).attr("action");
	aguarde();

	$.ajax({async: false, cache: false, type: 'post', contentType: false, processData: false,
		url: url,
		data: dados,
		success: function (data, textStatus, XMLHttpRequest) {
			fecharAguarde();
			if (exibirMensagem == true) {
				exibaMensagem("", '<i class="verde glyphicon glyphicon-ok"></i> '+XMLHttpRequest.getResponseHeader('msg'), limpar, reload, linkPos);
			} else {
				if (limpar) {
					$(form)[0].reset();
					$(':input:visible:enabled:first').focus();
				}
			}
			result[0] = true;
			result[1] = XMLHttpRequest.getResponseHeader('id');
			result[2] = data.resposta;
		},
		error: function (data) {
			fecharAguarde();
			switch (data.status) {
				case 409:
					exibaMensagem("", '<i class="vermelho glyphicon glyphicon-remove"></i> '+data.getResponseHeader('erro'));
					break;
				default:
					exibaMensagem("", '<i class="vermelho glyphicon glyphicon-remove"></i> Ocorreu o seguinte erro: '+data.getResponseHeader('erro'));
					break;
			}
		}
	});
	return result;
}


function removerLinhaDaTabela(id) {
	var trId = "#ln"+id;
	var oTable = $(trId).parents("table").DataTable();
	$(trId).addClass("selected");
	oTable.rows('.selected').remove().draw();
}

function tabelaAtualizarDadosDaLinha(id, celulas, dados) {
	var tr = "tr#ln"+id;
	for (var i = 0; i < celulas.length; i++) {
		$(tr).find("td").eq(celulas[i]).html(dados[i]);
	}
}

function tabelaAtualizarNotas(id, celulas, dados) {
	let tr = "tr#ln"+id;
	let input;
	for (let i = 0; i < celulas.length; i++) {
		if(celulas[i] !== 13) {
			input = $(tr).find("td").eq(celulas[i]).find("input");
			input.val(dados[i]);
		} else {
			$(tr).find("td").eq(celulas[i]).html(dados[i]);
		}
	}
}

function localizarEnderecoPorCEP(cep) {
	cep = removerMascara(cep);
	if (cep != "" && cep.length == 8) {
		$.ajax({
			async: false,
			type: 'post',
			url: "http://cep.republicavirtual.com.br/web_cep.php",
			data: {'cep': cep, 'formato': 'jsonp', 'callback': "cep"},
			success: function(data) {
				if (data.resultado == '0')
					exibaMensagem("", "CEP n&atilde;o encontrado.");
				else {
					$("#idUF option").filter(function() {return this.text == data.uf;}).attr('selected', true);
					popularSelect($("#idCidade"), "ufGetCidades", {"uf.idUF": $("#idUF").val()}, data.cidade);
					$("#bairro").val(data.bairro);
					$("#logradouro").val(data.tipo_logradouro + " " + data.logradouro);
				}
			}
		});
	}
}

function validarCPF(cpf) {
	var digitsString = cpf.replace(/[^0-9]/g, '');
	var digits;
	var a,b,c,d,e,f,g,h,i,j,k;
	var dv1, dv2;
	var soma, resto;

	if (digitsString.length == 11) {
		digits = digitsString.split('');
		a = parseInt(digits[ 0 ]);
		b = parseInt(digits[ 1 ]);
		c = parseInt(digits[ 2 ]);
		d = parseInt(digits[ 3 ]);
		e = parseInt(digits[ 4 ]);
		f = parseInt(digits[ 5 ]);
		g = parseInt(digits[ 6 ]);
		h = parseInt(digits[ 7 ]);
		i = parseInt(digits[ 8 ]);
		j = parseInt(digits[ 9 ]);
		k = parseInt(digits[ 10 ]);
		soma = a*10 + b*9 + c*8 + d*7 + e*6 + f*5 + g*4 + h*3 + i*2;
		resto = soma % 11;
		dv1 = (11 - resto < 10 ? 11 - resto : 0);
		soma = a*11 + b*10 + c*9 + d*8 + e*7 + f*6 + g*5 + h*4 + i*3 + dv1*2;
		resto = soma % 11;
		dv2 = (11 - resto < 10 ? 11 - resto : 0);
		return dv1 == j && dv2 == k;
	}
	return false;
}

//function validarEmail(email) {
//	return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
//}

function horaAtual() {
	return new Date().toLocaleString().split(" ")[1];
}

function dataAtual() {
	return new Date().toLocaleString().split(" ")[0];
}

function dataHoraAtual() {
	var agora = new Date();
	var options = {year: "numeric", month: "numeric", day: "numeric",
	           hour: "numeric", minute: "numeric", hour12: false};
	return agora.toLocaleString("pt-BR", options);
}

function validarData(value) {
	//contando chars
	if(value.length != 10) return false;
	// verificando data
	var data        = value;
	var dia         = data.substr(0,2);
	var barra1      = data.substr(2,1);
	var mes         = data.substr(3,2);
	var barra2      = data.substr(5,1);
	var ano         = data.substr(6,4);
	if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12) return false;
	if((mes==4||mes==6||mes==9||mes==11) & dia==31)return false;
	if(mes==2 & (dia>29||(dia==29 & ano%4!=0))) return false;
	if(ano < 1900) return false;

	return true;
}

function validarHora(value) {
	//contando chars
	if(value.length!=5) return false;
	var horario     = value;
	var hora        = horario.substr(0,2);
	var doispontos  = horario.substr(2,1);
	var minuto      = horario.substr(3,2);
	if(horario.length!=5||isNaN(hora)||isNaN(minuto)||hora>23||minuto>59||doispontos!=":") return false;

	return true;
}

function removerMascara(valor) {
	if (valor == "") return "";
	var tokens = [".", "/", "-", "(", ")"];
	for ( var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		while (valor.indexOf(token) != -1) {
	 		valor = valor.replace(token, "");
		}
	}
	return valor;
}

function getIndexNo(oTable, id) {
	var idx = oTable.fnGetPosition($("#"+id)[0]);
	return idx === undefined ? -1 : idx;
}

function capitalize(texto) {
	return texto.charAt(0).toUpperCase() + texto.slice(1);
}

$.fn.extend({limiter: function(limit, elem) {
	$(this).on("keyup focus", function() {setCount(this, elem);});
	function setCount(src, elem) {
		var chars = src.value.length;
		if (chars > limit) {
			src.value = src.value.substr(0, limit);
			chars = limit;
		}
		elem.html( limit - chars );
	}
	setCount($(this)[0], elem);}
});

$.fn.extend({maiusculo: function() {
	$(this).css("text-transform", "uppercase");
	$(this).keyup(function() {this.value = this.value.toUpperCase();});}
});

$.fn.extend({minusculo: function() {
	$(this).css("text-transform", "lowercase");
	$(this).keyup(function() {this.value = this.value.toLowerCase();});}
});

$.fn.extend({soLetra: function() {
	$(this).keyup(function() {this.value = this.value.replace(/[^A-z\.]/g,'');});}
});

$.fn.extend({soNumero: function() {
	$(this).keyup(function() {this.value = this.value.replace(/[^0-9\.]/g,'');});}
});

$.fn.extend({alfanumerico: function() {
	$(this).keyup(function() {this.value = this.value.replace(/[^a-zA-Z0-9]/g,'');});}
});

$.fn.extend({textopadrao: function(texto) {
	if ($(this).val() == "") $(this).val(texto);
	$(this).focus(function() {if ($(this).val() == texto) {$(this).val("");}});
	$(this).blur(function() {if ($(this).val().trim().length == 0) {$(this).val(texto);}});}
});

Array.prototype.consta = function (valor) {
	for (i in this) {
		if (this[i] == valor) return true;
	}
	return false;
};

Number.prototype.formatarNumero = function(numDecimais, numInteiros, separadorMilhar, separadorDecimal) {
	var n = numDecimais, x = numInteiros, s = separadorMilhar, c = separadorDecimal;
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};
String.prototype.formatarCPF = function ()	{
	var data = this;
	if (data == "") return;
	data = data.substring(0,3)+"."+data.substring(3,6)+"."+data.substring(6,9)+"-"+data.substring(9,11);
	return data;

}
String.prototype.formateDataBR = function () {
	var data = this;
	if (data == "") return;
	data = data.substring(8,10)+"/"+data.substring(5,7)+"/"+data.substring(0,4);
	return data;
};

String.prototype.formateDataHoraBR = function () {
	var dataHora = this;
	if (dataHora == "") return;
	if (dataHora.includes("T")) {
		dataHora = dataHora.replace("T", " ");
	}
	var dataHora = dataHora.substring(8,10)+"/"+dataHora.substring(5,7)+"/"+dataHora.substring(0,4)+" "+dataHora.substring(11);
	return dataHora;
};

String.prototype.totalLinhas = function () {
	return this.split(/\r*\n/).length;
};

String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g,"");
};

function semFuncaoNoModulo() {
	bootbox.alert({
		message: "Só é possivel executar esta ação no módulo principal.\n Encerre este módulo e no módulo principal execute novamente esta ação.",
		// size: 'small',
		backdrop: true
	});

}

//Saudação de acordo com o horário
function saudacao() {
	var data = new Date();
	var hora = data.getHours();
	if(hora >= 0 && hora < 4){
		var texto = "Boa Madrugada";
	}
	if(hora >= 4 && hora < 12){
		var texto = "Bom Dia";
	}
	if(hora >= 12 && hora < 18){
		var texto = "Boa Tarde";
	}
	if(hora >= 18 && hora <= 23){
		var texto = "Boa Noite";
	}
	document.getElementById("idSaudacao").innerHTML = texto; // insere em uma div
}

// //botao scroll ao topo
$(document).ready(function(){
	$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		// scroll body to 0px on click
		$('#back-to-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
		});
});

function manterSessao(tempoEmSegundos) {

	setInterval(function(){
		$.get('gestao');

	}, tempoEmSegundos* 1000);
}


$(function() {
	//The passed argument has to be at least a empty object or a object with your desired options
	//$('body').overlayScrollbars({ });
});

/**Contador regressivo
 * @param data em milissegundos
 * @param idTimer id do objeto a ser impresso o contador
 * @param tipo do contador
  			undefield ou 0  - retorna  Dias, horas, minutos e segundos
 			1 - retorna  horas, minutos e segundos
 			2 - retorna  minutos e segundos
 			3 - retorna  segundos
 * @param msgExpirado - Mensagem a imprimir quando o contador expirar.
 * @param aviso - booleano para exibir aviso quando estiver acabando o tempo
 * @param avisoMsg - Mensagem que será exibita quando estiver acabando o tempo
 * @param avisoTempo - tempo restante em que será exibito o aviso
 * */
function timerRegressivo(data, idTimer, tipo, msgExpirado, aviso, avisoTitulo, avisoMsg, avisoTempo, avisoIdTimer) {

	var countDownDate = data;
	if (tipo == undefined) tipo = 0;
	if (msgExpirado == undefined) msgExpirado = "Encerrado";
	if (avisoMsg == undefined) msgExpirado = "O tempo está se esgotando";
	if (aviso == undefined) aviso = false;
	if (avisoMsg == undefined) avisoMsg = "O tempo está acabando!";
	if (avisoTempo == undefined) avisoTempo = 300000;

	var timerPopup = false;
	// var url = window.location.href;
	// Atualiza o contador a cada 1 segundo
	timerContador = setInterval(function() {

		// if (url != window.location.href) {
		// 	clearInterval(timerContador)
		// };

		// Captura o tempo atual.
		var now = new Date().getTime();

		// Calcula o tempo entre a data passada e a atual.
		var distance = countDownDate - now;

		// Cálculo dos dias, horas minutos e segundos
		var dias = Math.floor(distance / (1000 * 60 * 60 * 24));
		var horas = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutos = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var segundos = Math.floor((distance % (1000 * 60)) / 1000);

		if (distance < avisoTempo && aviso) {
			timerPopup = true;
			bootbox.alert({
				title: avisoTitulo,
				message: '<p>' + avisoMsg + '</p><p> Tempo restante: ' + '<span id='+ avisoIdTimer +'></span></p>',
				callback: function (result) {
					timerPopup = false
				}
			});
			aviso = false;
		}
		// Imprime o resultado no elmento com o ID passado @idTimer"
		switch (tipo) {
			case 1:
				document.getElementById(idTimer).innerHTML = horas + "h "+ minutos + "m " + segundos + "s ";
				break;
			case 2:
				document.getElementById(idTimer).innerHTML = minutos + "m " + segundos + "s ";
				if (timerPopup) document.getElementById(avisoIdTimer).innerHTML = minutos + "m " + segundos + "s ";
				break;
			case 3:
				document.getElementById(idTimer).innerHTML = segundos + "s ";
				break;
			default:
				document.getElementById(idTimer).innerHTML = dias + "dias " + horas + "h "+ minutos + "m " + segundos + "s ";
				break;
		}
		// Quando o contador zera, ele encerra e imprime o texto
		if (distance < 0) {
			clearInterval(timerContador);
			document.getElementById(idTimer).innerHTML = msgExpirado;
			if (timerPopup) document.getElementById(avisoIdTimer).innerHTML = msgExpirado;
		}
	}, 1000);
}

function arquivo(path) {
	var nome = extraindoNomeArquivo(path);
	document.getElementById('nomeArquivo').textContent = " " + nome;
}

function extraindoNomeArquivo(path) {
	if (path.substr(0, 11) == "C:\\fakepath\\") {
		return path.substr(11);
	}

	var x = path.lastIndexOf('\\');

	if (x >= 0) {
		return path.substr(x + 1); // Windows- Caminho base
	}

	return path;
}

function downloadArquivo(idArquivoUpload) {
	window.open('downloadFile?id='+idArquivoUpload);
}