// ========================================
// SkillMatch JS
// Simulador de Compatibilidade com Vagas
// ========================================

// RF01 - Perfil do candidato
const candidato = {
  nome: "Ana Souza",
  area: "Front-End",
  habilidades: [
    "JavaScript",
    "GitHub",
    "Lógica de Programação",
    "Kanban"
  ],
  experienciaMeses: 3
};

// RF09 - Classe principal
class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  // RF11 - Uso do this
  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

// RF10 - Herança
class VagaFrontEnd extends Vaga {
  constructor(
    id,
    empresa,
    cargo,
    requisitos,
    salario,
    modalidade,
    nivel
  ) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirNivel() {
    return `Nível da vaga: ${this.nivel}`;
  }
}

// RF02 - Lista de vagas
const vagas = [
  new VagaFrontEnd(
    1,
    "TechStart",
    "Desenvolvedor Front-End Júnior",
    ["JavaScript", "GitHub", "Lógica de Programação"],
    2800,
    "Remoto",
    "Júnior"
  ),

  new VagaFrontEnd(
    2,
    "CodeLab",
    "Estágio Front-End",
    ["JavaScript", "Kanban", "GitHub"],
    1800,
    "Híbrido",
    "Estágio"
  ),

  new VagaFrontEnd(
    3,
    "WebSolutions",
    "Programador JavaScript Júnior",
    ["JavaScript", "Arrays", "Objetos", "Funções"],
    3000,
    "Presencial",
    "Júnior"
  )
];

// RF13 - Closure
function criarContadorDeAnalises() {
  let total = 0;

  return function () {
    total++;
    return total;
  };
}

const contarAnalise = criarContadorDeAnalises();

// RF04 - Classificação da compatibilidade
function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  } else if (percentual >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
}

// RF03 + RF05 + RF08
function analisarVaga(vaga, candidato) {

  // filter -> habilidades encontradas
  const habilidadesEncontradas = vaga.requisitos.filter((habilidade) =>
    candidato.habilidades.includes(habilidade)
  );

  // filter -> habilidades faltantes
  const habilidadesFaltantes = vaga.requisitos.filter(
    (habilidade) => !candidato.habilidades.includes(habilidade)
  );

  // cálculo da compatibilidade
  const compatibilidade =
    (habilidadesEncontradas.length / vaga.requisitos.length) * 100;

  return {
    empresa: vaga.empresa,
    cargo: vaga.cargo,
    compatibilidade: compatibilidade.toFixed(0),
    habilidadesEncontradas,
    habilidadesFaltantes,
    classificacao: classificarCompatibilidade(compatibilidade)
  };
}

// RF12 - Callback
function finalizarAnalise(nomeCandidato, callback) {
  console.log("\nAnálise finalizada.");
  callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {
  console.log(
    `${nome}, revise suas habilidades faltantes e atualize seu plano de estudos.`
  );
}

// RF14 - Promise
function buscarVagasSimuladas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vagas);
    }, 1000);
  });
}

// Async/Await
async function iniciarSistema() {

  console.log("Carregando vagas...\n");

  const vagasCarregadas = await buscarVagasSimuladas();

  console.log("Vagas carregadas com sucesso!\n");

  // RF08 - map
  const resultados = vagasCarregadas.map((vaga) => {
    const resultado = analisarVaga(vaga, candidato);

    console.log("==================================");
    console.log(`Empresa: ${resultado.empresa}`);
    console.log(`Cargo: ${resultado.cargo}`);
    console.log(`Compatibilidade: ${resultado.compatibilidade}%`);
    console.log(
      `Habilidades encontradas: ${resultado.habilidadesEncontradas.join(", ")}`
    );
    console.log(
      `Habilidades faltantes: ${resultado.habilidadesFaltantes.join(", ")}`
    );
    console.log(`Classificação: ${resultado.classificacao}`);
    console.log("==================================\n");

    console.log(`Resumo: ${vaga.exibirResumo()}`);
    console.log(vaga.exibirNivel());

    console.log(
      `Total de análises realizadas: ${contarAnalise()}\n`
    );

    return resultado;
  });

  // RF06 - reduce
  const melhorVaga = resultados.reduce((melhor, atual) => {
    return atual.compatibilidade > melhor.compatibilidade
      ? atual
      : melhor;
  });

  console.log("\n******** VAGA MAIS COMPATÍVEL ********");
  console.log(`${melhorVaga.empresa} - ${melhorVaga.cargo}`);
  console.log(`Compatibilidade: ${melhorVaga.compatibilidade}%`);

  // RF07 - Recomendação de estudo
  const habilidadesParaEstudar = resultados
    .flatMap((resultado) => resultado.habilidadesFaltantes);

  // remove duplicadas
  const habilidadesUnicas = [...new Set(habilidadesParaEstudar)];

  console.log("\n******** RECOMENDAÇÃO DE ESTUDO ********");

  if (habilidadesUnicas.length > 0) {
    console.log(
      `Priorize estudar: ${habilidadesUnicas.join(", ")}`
    );
  } else {
    console.log("Você atende todos os requisitos das vagas!");
  }

  // RF08 - find
  const vagaCodeLab = vagasCarregadas.find(
    (vaga) => vaga.empresa === "CodeLab"
  );

  console.log("\nBusca utilizando find:");
  console.log(vagaCodeLab.exibirResumo());

  // RF08 - every
  const atendeTodosRequisitos = vagasCarregadas.every((vaga) =>
    vaga.requisitos.every((requisito) =>
      candidato.habilidades.includes(requisito)
    )
  );

  console.log("\nAtende todas as vagas?");
  console.log(atendeTodosRequisitos ? "Sim" : "Não");

  finalizarAnalise(candidato.nome, exibirMensagemFinal);
}

// Inicialização do sistema
iniciarSistema();
