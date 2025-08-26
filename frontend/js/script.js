const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch("http://localhost:5000/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();

        if(response.ok) {
            alert(data.mensagem);
            form.reset();
            location.href = "login.html"
        } else {
            alert(data.erro);
        }
    } catch (erro) {
        console.error("Erro ao enviar dados:", erro);
        alert("Erro ao enviar dados para o servidor.");
    }
});