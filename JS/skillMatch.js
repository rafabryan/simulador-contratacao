// 1. Dados do Candidato
        const candidato = {
            nome: "Desenvolvedor(a) Júnior",
            habilidades: ["HTML", "CSS", "JavaScript", "Git", "React"]
        };

        // 2. Banco de Vagas Fictícias (Requisitos)
        const vagas = [
            {
                id: 1,
                titulo: "Desenvolvedor(a) Front-End (Foco em React)",
                requisitos: ["HTML", "CSS", "JavaScript", "Git", "React", "TypeScript", "Redux"]
            },
            {
                id: 2,
                titulo: "Desenvolvedor(a) Front-End (Foco em UI/UX)",
                requisitos: ["HTML", "CSS", "JavaScript", "Figma", "Tailwind"]
            },
            {
                id: 3,
                titulo: "Desenvolvedor(a) Front-End (Iniciante)",
                requisitos: ["HTML", "CSS", "JavaScript", "Git"]
            }
        ];

        // Renderiza os dados do candidato na tela assim que abre
        document.getElementById("nomeCandidato").innerText = candidato.nome;
        const habContainer = document.getElementById("habilidadesCandidato");
        candidato.habilidades.forEach(hab => {
            habContainer.innerHTML += `<span class="tag">${hab}</span>`;
        });

        // 3. Motor de Análise (Engine) - Adaptado para o HTML
        function executarSimulador() {
            let melhorVaga = null;
            let maiorPercentual = -1;
            let recomendacaoEstudo = [];
            
            const vagasContainer = document.getElementById("vagasContainer");
            vagasContainer.innerHTML = ""; // Limpa a lista antes de rodar

            // Analisando cada vaga
            vagas.forEach(vaga => {
                // Verifica quais habilidades o candidato possui que a vaga exige
                const habilidadesPossuidas = vaga.requisitos.filter(req => 
                    candidato.habilidades.includes(req)
                );

                // Verifica quais habilidades faltam para a vaga
                const habilidadesFaltantes = vaga.requisitos.filter(req => 
                    !candidato.habilidades.includes(req)
                );

                // Calcula o percentual de compatibilidade
                const percentualCompatibilidade = (habilidadesPossuidas.length / vaga.requisitos.length) * 100;

                // Construindo o HTML visual para cada vaga
                let tagsRequisitos = vaga.requisitos.map(req => {
                    let className = candidato.habilidades.includes(req) ? "tag has" : "tag missing";
                    return `<span class="${className}">${req}</span>`;
                }).join("");

                // Definindo a cor do percentual
                let corPercentual = percentualCompatibilidade >= 70 ? 'var(--success)' : (percentualCompatibilidade >= 40 ? 'var(--warning)' : 'var(--danger)');

                vagasContainer.innerHTML += `
                    <div class="vaga-item">
                        <div class="vaga-header">
                            <h3>${vaga.titulo}</h3>
                            <span class="percentual" style="color: ${corPercentual}">${percentualCompatibilidade.toFixed(2)}% Match</span>
                        </div>
                        <p style="margin-bottom: 10px;"><strong>Requisitos:</strong></p>
                        <div>${tagsRequisitos}</div>
                        <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted);">
                            * Verde: Você possui | Vermelho: Falta no currículo
                        </p>
                    </div>
                `;

                // Atualizando a melhor vaga
                if (percentualCompatibilidade > maiorPercentual) {
                    maiorPercentual = percentualCompatibilidade;
                    melhorVaga = vaga.titulo;
                    recomendacaoEstudo = habilidadesFaltantes;
                }
            });

            // 4. Exibindo os Resultados Finais na Tela
            document.getElementById("listaVagas").style.display = "block";
            document.getElementById("resultadoFinal").style.display = "block";
            
            document.getElementById("melhorVagaNome").innerText = melhorVaga;
            document.getElementById("melhorVagaPercentual").innerText = maiorPercentual.toFixed(2);

            let txtRecomendacao = "";
            if (recomendacaoEstudo.length > 0) {
                txtRecomendacao = `Para alcançar 100% de aderência na melhor vaga, foque em estudar: <strong>${recomendacaoEstudo.join(" e ")}</strong>.`;
            } else {
                txtRecomendacao = `Você já possui todos os requisitos para a melhor vaga! Excelente momento para focar em projetos práticos e soft skills para a entrevista.`;
            }
            document.getElementById("recomendacaoTexto").innerHTML = txtRecomendacao;
        }
