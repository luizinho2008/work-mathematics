const gravar = () => {
    const solido = document.getElementById("solido").value;
    const orcamentos = document.querySelectorAll("#orcamentosContainer div");
    if (!orcamentos.length) return alert("Nenhum orçamento para enviar!");

    let melhor = { index: -1, custo: Infinity };
    const lista = [];

    orcamentos.forEach((div, i) => {
        let volume = 0;

        if (solido === "paralelepipedo") {
            const c = parseFloat(div.querySelector(".comp")?.value) || 0;
            const l = parseFloat(div.querySelector(".larg")?.value) || 0;
            const a = parseFloat(div.querySelector(".alt")?.value) || 0;
            volume = c * l * a;
        } else if (solido === "cilindro") {
            const r = parseFloat(div.querySelector(".raio")?.value) || 0;
            const a = parseFloat(div.querySelector(".alt")?.value) || 0;
            volume = Math.PI * r * r * a;
        } else if (solido === "esfera") {
            const r = parseFloat(div.querySelector(".raio")?.value) || 0;
            volume = (4/3) * Math.PI * r * r * r;
        }

        const preco = parseFloat(div.querySelector(".preco")?.value) || 0;
        const custo = volume * preco;

        lista.push({ numero: i+1, custo, precoPorM3: preco });

        if (custo < melhor.custo) melhor = { index: i+1, custo: custo };
    });

    const payload = {
        nomeSolido: solido,
        orcamentos: JSON.stringify(lista), // convertendo o array para string
        menorNumero: melhor.index,
        precoDoMenor: melhor.custo
    };

    fetch("http://localhost:5000/gravar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => console.log("Dados enviados:", data))
    .catch(err => console.error("Erro ao enviar:", err));
};