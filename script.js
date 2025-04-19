window.onload = function () {
  const botaoNao = document.getElementById("no");
  const botaoSim = document.getElementById("yes");
  const inputNome = document.getElementById("nome");

  // Faz o botão "não" fugir pela tela
  function fuga() {
    const maxX = window.innerWidth - botaoNao.offsetWidth;
    const maxY = window.innerHeight - botaoNao.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    botaoNao.style.position = "absolute";
    botaoNao.style.left = `${randomX}px`;
    botaoNao.style.top = `${randomY}px`;
  }

  
  window.fuga = fuga;

  // Clique no "Sim"
  botaoSim.addEventListener("click", () => {
    const nome = inputNome.value.trim();
    if (!nome) {
      alert("Digite seu nome primeiro!");
      return;
    }

    const data = {
      nome: nome,
      resposta: "sim",
      timestamp: new Date().toISOString()
    };

    if (typeof window.database === "undefined") {
      alert("Erro: conexão com o Firebase não encontrada.");
      return;
    }

    window.database.ref("respostas").push(data)
      .then(() => {
        const audio = document.querySelector("#audio");
        if (audio) {
          audio.currentTime = 0;
          audio.play();
        }
        alert("Ebaaa! Sua resposta foi registrada 😊");
      })
      .catch((error) => {
        alert("Erro ao registrar no Firebase.");
        console.error(error);
      });
  });

  // Clique no "Não"
  botaoNao.addEventListener("click", () => {
    const nome = inputNome.value.trim();
    if (!nome) {
      alert("Digite seu nome primeiro!");
      return;
    }

    const data = {
      nome: nome,
      resposta: "nao",
      timestamp: new Date().toISOString()
    };

    if (typeof window.database === "undefined") {
      alert("Erro: conexão com o Firebase não encontrada.");
      return;
    }

    window.database.ref("respostas").push(data)
      .then(() => {
        alert("Resposta registrada! 😉");
      })
      .catch((error) => {
        alert("Erro ao registrar no Firebase.");
        console.error(error);
      });
  });
};
