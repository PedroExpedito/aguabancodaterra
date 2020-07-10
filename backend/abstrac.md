Projeto para automatizar o calculo da agua da comunidade Banco da terra

1- O projeto devera receber o valor gasto pelos usuarios junto com o valor do gasto
eletrico da copel, e gerar uma tabela com o gasto de cada usuario somando a taxa.

em psudo código

function gerarTabela ( tabelaGastoAnterior, tabelaGasto Atual, GastoEltrico) {
  consumo = tabelaGastoAnterior - tabelaGastoAtual

  consumoTotal = consumo.todos

  valorDaUnidade = consumoTotal / GastoEltrico

  tabelaGastoIndividual = consumo.Individual * valorDaUnidade

  consumoIndividualComtaxa = tabelaGastoIndividual + taxa


}

TAREFAS,

Autenticar entrada com YUP

Remover informações inteis do result

