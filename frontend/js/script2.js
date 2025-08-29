const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch("http://localhost:5000/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if(response.ok) {
            alert(data.nome);
            sessionStorage.setItem("ID", data.id)
            sessionStorage.setItem("nome", data.nome)
            sessionStorage.setItem("email", data.email)
            sessionStorage.setItem("imagem", data.imagem)
            location.href="inicio.html"
        } else {
            alert(data.erro);
        }
    } catch (erro) {
        console.error("Erro ao enviar dados:", erro);
        alert("Erro ao enviar dados para o servidor.");
    }
});