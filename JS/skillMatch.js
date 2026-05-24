
    // ========================================
    // SkillMatch JS
    // ========================================

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

    class Vaga {
      constructor(id, empresa, cargo, requisitos, salario, modalidade) {
        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
      }

      exibirResumo() {
        return `${this.cargo} na empresa ${this.empresa}`;
      }
    }

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

    function criarContadorDeAnalises() {
      let total = 0;

      return function () {
        total++;
        return total;
      };
    }

    const contarAnalise = criarContadorDeAnalises();

    function classificarCompatibilidade(percentual) {
      if (percentual >= 80) {
        return "Alta compatibilidade";
      } else if (percentual >= 50) {
        return "Média compatibilidade";
      } else {
        return "Baixa compatibilidade";
      }
    }

    function analisarVaga(vaga, candidato) {

      const habilidadesEncontradas = vaga.requisitos.filter((habilidade) =>
        candidato.habilidades.includes(habilidade)
      );

      const habilidadesFaltantes = vaga.requisitos.filter(
        (habilidade) => !candidato.habilidades.includes(habilidade)
      );

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

    function buscarVagasSimuladas() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(vagas);
        }, 1000);
      });
    }

    function exibirPerfil() {
      document.getElementById("nome").textContent = candidato.nome;
      document.getElementById("area").textContent = candidato.area;
      document.getElementById("experiencia").textContent = candidato.experienciaMeses;

      const habilidadesContainer = document.getElementById("habilidades");

      candidato.habilidades.forEach((habilidade) => {
        const span = document.createElement("span");
        span.classList.add("tag");
        span.textContent = habilidade;
        habilidadesContainer.appendChild(span);
      });
    }

    async function iniciarSistema() {

      exibirPerfil();

      const vagasCarregadas = await buscarVagasSimuladas();

      const container = document.getElementById("vagasContainer");

      const resultados = vagasCarregadas.map((vaga) => {

        const resultado = analisarVaga(vaga, candidato);

        let classeCompatibilidade = "baixa";

        if (resultado.compatibilidade >= 80) {
          classeCompatibilidade = "alta";
        } else if (resultado.compatibilidade >= 50) {
          classeCompatibilidade = "media";
        }

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <div class="empresa">${resultado.empresa}</div>

          <div class="cargo">${resultado.cargo}</div>

          <p><strong>Modalidade:</strong> ${vaga.modalidade}</p>
          <p><strong>Salário:</strong> R$ ${vaga.salario}</p>
          <p><strong>${vaga.exibirNivel()}</strong></p>

          <div class="compatibilidade ${classeCompatibilidade}">
            Compatibilidade: ${resultado.compatibilidade}%
          </div>

          <p><strong>Classificação:</strong> ${resultado.classificacao}</p>

          <p><strong>Habilidades encontradas:</strong></p>
          <ul>
            ${resultado.habilidadesEncontradas
              .map((h) => `<li>${h}</li>`)
              .join("")}
          </ul>

          <p><strong>Habilidades faltantes:</strong></p>
          <ul>
            ${resultado.habilidadesFaltantes.length > 0
              ? resultado.habilidadesFaltantes
                  .map((h) => `<li>${h}</li>`)
                  .join("")
              : "<li>Nenhuma</li>"
            }
          </ul>

          <p><strong>Total de análises:</strong> ${contarAnalise()}</p>
        `;

        container.appendChild(card);

        return resultado;
      });

      const melhorVaga = resultados.reduce((melhor, atual) => {
        return atual.compatibilidade > melhor.compatibilidade
          ? atual
          : melhor;
      });

      document.getElementById("melhorVaga").innerHTML = `
        <h2>Vaga Mais Compatível</h2>

        <p>
          <strong>${melhorVaga.empresa}</strong> -
          ${melhorVaga.cargo}
        </p>

        <p>
          Compatibilidade:
          <strong>${melhorVaga.compatibilidade}%</strong>
        </p>
      `;

      const habilidadesParaEstudar = resultados
        .flatMap((resultado) => resultado.habilidadesFaltantes);

      const habilidadesUnicas = [...new Set(habilidadesParaEstudar)];

      document.getElementById("estudos").innerHTML = `
        <h2>Recomendação de Estudos</h2>

        <p>
          ${
            habilidadesUnicas.length > 0
              ? `Priorize estudar: ${habilidadesUnicas.join(", ")}`
              : "Você atende todos os requisitos das vagas!"
          }
        </p>
      `;
    }

    iniciarSistema();
