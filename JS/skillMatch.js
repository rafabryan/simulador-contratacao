/**
 * SkillMatch JS: Simulador de Compatibilidade com Vaga Front-End Júnior
 * Engine de análise para triagem de currículos
 */

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

// 3. Motor de Análise (Engine)
function analisarCompatibilidade(perfilCandidato, listaDeVagas) {
    console.log(`=================================================`);
    console.log(`🤖 START: SkillMatch JS - Relatório de Triagem`);
    console.log(`=================================================\n`);
    
    console.log(`👤 Candidato: ${perfilCandidato.nome}`);
    console.log(`🛠️  Habilidades Atuais: ${perfilCandidato.habilidades.join(", ")}\n`);

    let melhorVaga = null;
    let maiorPercentual = -1;
    let recomendacaoEstudo = [];

    // Analisando cada vaga
    listaDeVagas.forEach(vaga => {
        // Verifica quais habilidades o candidato possui que a vaga exige
        const habilidadesPossuidas = vaga.requisitos.filter(req => 
            perfilCandidato.habilidades.includes(req)
        );

        // Verifica quais habilidades faltam para a vaga
        const habilidadesFaltantes = vaga.requisitos.filter(req => 
            !perfilCandidato.habilidades.includes(req)
        );

        // Calcula o percentual de compatibilidade
        const percentualCompatibilidade = (habilidadesPossuidas.length / vaga.requisitos.length) * 100;

        // Exibindo a análise individual da vaga
        console.log(`🏢 Vaga: ${vaga.titulo}`);
        console.log(`   - Exige: ${vaga.requisitos.join(", ")}`);
        console.log(`   - Faltam: ${habilidadesFaltantes.length > 0 ? habilidadesFaltantes.join(", ") : "Nenhuma!"}`);
        console.log(`   - Compatibilidade: ${percentualCompatibilidade.toFixed(2)}%\n`);

        // Atualizando a melhor vaga caso o percentual atual seja maior
        if (percentualCompatibilidade > maiorPercentual) {
            maiorPercentual = percentualCompatibilidade;
            melhorVaga = vaga.titulo;
            recomendacaoEstudo = habilidadesFaltantes;
        }
    });

    // 4. Resultados Finais e Recomendações
    console.log(`=================================================`);
    console.log(`🏆 RESULTADO E RECOMENDAÇÕES`);
    console.log(`=================================================`);
    console.log(`👉 Maior Compatibilidade: ${melhorVaga} (${maiorPercentual.toFixed(2)}%)`);
    
    if (recomendacaoEstudo.length > 0) {
        console.log(`📚 Recomendação de Estudo: Para alcançar 100% de aderência na melhor vaga, foque em estudar: ${recomendacaoEstudo.join(" e ")}.`);
    } else {
        console.log(`🚀 Recomendação de Estudo: Você já possui todos os requisitos para a melhor vaga! Excelente momento para focar em projetos práticos e soft skills para a entrevista.`);
    }
}

// 5. Executar a aplicação
analisarCompatibilidade(candidato, vagas);