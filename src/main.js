const STARTING_TIME = 45;
const MAX_ROUNDS = 10;

const STORAGE_KEYS = {
  records: "neon-decision-records-v2",
  achievements: "neon-decision-achievements-v1",
};

const modes = {
  chaos: {
    label: "Modo Caos",
    icon: "🧨",
    description: "Situações absurdas, bug, prazo, cliente e gambiarra.",
    cards: [
      {
        title: "Servidor pegando fogo",
        scenario: "Seu projeto saiu do ar 20 minutos antes da apresentação. O que você faz?",
        options: [
          { text: "Tenta arrumar tudo sem avisar ninguém", points: -15, risk: 20, vibe: "Caos silencioso" },
          { text: "Sobe uma versão estável antiga e avisa o time", points: 25, risk: -10, vibe: "Frio e calculista" },
          { text: "Finge que era manutenção programada", points: -5, risk: 15, vibe: "Malabarismo moral" },
        ],
      },
      {
        title: "Bug fantasma",
        scenario: "O app dá erro só no celular do seu amigo. No seu PC funciona perfeito.",
        options: [
          { text: "Culpa o celular dele", points: -10, risk: 10, vibe: "Clássico programador" },
          { text: "Pede print, navegador, console e tenta reproduzir", points: 25, risk: -10, vibe: "Investigador" },
          { text: "Reescreve o app inteiro", points: -15, risk: 20, vibe: "Exagerado" },
        ],
      },
      {
        title: "Design travado",
        scenario: "O visual funciona, mas está com cara de sistema antigo que ninguém quer abrir.",
        options: [
          { text: "Coloca hierarquia visual, contraste e microinterações", points: 25, risk: -5, vibe: "Neon mode" },
          { text: "Joga mais 9 cores na tela", points: -15, risk: 20, vibe: "Carnaval de botão" },
          { text: "Deixa para depois porque 'o importante é funcionar'", points: 0, risk: 5, vibe: "Mínimo aceitável" },
        ],
      },
      {
        title: "Escopo monstro",
        scenario: "Você queria um jogo simples, mas começou a pensar em login, ranking global, IA, loja e NFT.",
        options: [
          { text: "Corta tudo e entrega o loop principal", points: 30, risk: -15, vibe: "Produto de verdade" },
          { text: "Começa pelo NFT", points: -30, risk: 30, vibe: "Abismo criativo" },
          { text: "Cria 40 abas antes de validar o jogo", points: -10, risk: 20, vibe: "Painel de avião" },
        ],
      },
    ],
  },
  startup: {
    label: "Modo Startup",
    icon: "🚀",
    description: "Escolhas de produto, cliente, prazo, dinheiro e validação.",
    cards: [
      {
        title: "Ideia absurda",
        scenario: "Você pensou em lançar um app que mistura jogo, estudo e produtividade. Parece estranho, mas tem potencial.",
        options: [
          { text: "Descarta porque ninguém fez igual", points: -10, risk: 0, vibe: "Seguro demais" },
          { text: "Cria um protótipo feio hoje mesmo", points: 30, risk: 5, vibe: "Construtor raiz" },
          { text: "Pesquisa 3 meses antes de fazer", points: 5, risk: -5, vibe: "Acadêmico cauteloso" },
        ],
      },
      {
        title: "Cliente confuso",
        scenario: "Alguém pede algo impossível, barato e urgente. Você precisa responder agora.",
        options: [
          { text: "Aceita tudo para não perder o cliente", points: -20, risk: 25, vibe: "Modo sofrimento" },
          { text: "Quebra em etapas e entrega uma versão mínima", points: 25, risk: -5, vibe: "Profissional" },
          { text: "Recusa sem explicar", points: -5, risk: 0, vibe: "Seco demais" },
        ],
      },
      {
        title: "Oferta tentadora",
        scenario: "Uma ferramenta paga promete resolver tudo. Mas o projeto precisa continuar gratuito.",
        options: [
          { text: "Paga sem pensar", points: -15, risk: 10, vibe: "Cartão chorando" },
          { text: "Procura alternativa open-source/free tier", points: 25, risk: -5, vibe: "Economia ninja" },
          { text: "Abandona o projeto", points: -25, risk: 0, vibe: "Fim triste" },
        ],
      },
      {
        title: "Feedback sincero",
        scenario: "Alguém testou e disse: 'legal, mas não entendi pra que serve'.",
        options: [
          { text: "Ignora, porque a pessoa não entendeu a visão", points: -15, risk: 10, vibe: "Ego ferido" },
          { text: "Melhora o texto inicial e simplifica o fluxo", points: 25, risk: -10, vibe: "Clareza vende" },
          { text: "Adiciona mais 12 botões", points: -10, risk: 20, vibe: "Complexidade gratuita" },
        ],
      },
    ],
  },
  faculdade: {
    label: "Modo Faculdade",
    icon: "📚",
    description: "Prova, trabalho, apresentação, estudo de última hora e sobrevivência acadêmica.",
    cards: [
      {
        title: "Prova hoje",
        scenario: "Você descobriu que tem prova em poucas horas e o conteúdo é grande.",
        options: [
          { text: "Lê tudo sem critério até cansar", points: -5, risk: 15, vibe: "Desespero organizado" },
          { text: "Foca fórmulas, conceitos-chave e exercícios prováveis", points: 30, risk: -10, vibe: "Modo aprovação" },
          { text: "Aceita o destino e dorme", points: -20, risk: -5, vibe: "Paz questionável" },
        ],
      },
      {
        title: "Trabalho em grupo",
        scenario: "Faltam 2 dias e ninguém fez nada direito no trabalho em grupo.",
        options: [
          { text: "Divide tarefas pequenas e cobra entregas claras", points: 25, risk: -10, vibe: "Líder cansado" },
          { text: "Faz tudo sozinho e fica bravo depois", points: 0, risk: 20, vibe: "Herói estressado" },
          { text: "Espera alguém tomar atitude", points: -20, risk: 25, vibe: "Silêncio perigoso" },
        ],
      },
      {
        title: "Apresentação travada",
        scenario: "Você sabe o conteúdo, mas na hora de apresentar fica parecendo texto decorado.",
        options: [
          { text: "Treina explicando como conversa", points: 25, risk: -5, vibe: "Naturalidade" },
          { text: "Decora palavra por palavra", points: -5, risk: 10, vibe: "Robô nervoso" },
          { text: "Coloca tudo no slide e lê", points: -15, risk: 15, vibe: "Teleprompter humano" },
        ],
      },
      {
        title: "Resumo gigante",
        scenario: "O material tem 80 páginas e você precisa de uma cola mental para estudar.",
        options: [
          { text: "Transforma em mapa de conceitos e exemplos", points: 25, risk: -10, vibe: "Síntese braba" },
          { text: "Marca o PDF inteiro de amarelo", points: -10, risk: 10, vibe: "Marca-texto infinito" },
          { text: "Assiste resumo aleatório em 2x", points: 0, risk: 10, vibe: "Roleta acadêmica" },
        ],
      },
    ],
  },
  quiz: {
    label: "Modo Quiz",
    icon: "🧠",
    description: "Perguntas rápidas com resposta certa, erro custando risco e bônus por acerto.",
    cards: [
      {
        title: "MVP",
        scenario: "Em produto digital, o que significa começar por um MVP?",
        options: [
          { text: "Criar a menor versão capaz de testar a ideia", points: 30, risk: -10, vibe: "Resposta certa", correct: true },
          { text: "Criar o app completo antes de mostrar", points: -15, risk: 15, vibe: "Escopo pesado" },
          { text: "Fazer só uma logo e vender como produto", points: -10, risk: 10, vibe: "Fumaça sem motor" },
        ],
      },
      {
        title: "GitHub Pages",
        scenario: "Qual tipo de projeto combina mais com GitHub Pages?",
        options: [
          { text: "Site estático com HTML, CSS e JavaScript", points: 30, risk: -10, vibe: "Resposta certa", correct: true },
          { text: "Banco de dados PostgreSQL pesado", points: -15, risk: 20, vibe: "Lugar errado" },
          { text: "Servidor privado rodando 24h", points: -10, risk: 15, vibe: "Não é essa praia" },
        ],
      },
      {
        title: "LocalStorage",
        scenario: "Para que serve o localStorage neste jogo?",
        options: [
          { text: "Salvar dados simples no navegador", points: 30, risk: -10, vibe: "Resposta certa", correct: true },
          { text: "Substituir um backend completo com segurança", points: -20, risk: 20, vibe: "Exagerou" },
          { text: "Hospedar o site na internet", points: -15, risk: 15, vibe: "Confundiu as peças" },
        ],
      },
      {
        title: "PWA",
        scenario: "O que uma PWA tenta aproximar em um site?",
        options: [
          { text: "Uma experiência parecida com app instalável", points: 30, risk: -10, vibe: "Resposta certa", correct: true },
          { text: "Um arquivo PDF automático", points: -10, risk: 10, vibe: "Nada a ver" },
          { text: "Um antivírus do navegador", points: -15, risk: 15, vibe: "Viajou legal" },
        ],
      },
    ],
  },
};

const achievements = [
  { id: "first_run", icon: "🎮", title: "Primeiro mergulho", description: "Terminou sua primeira partida." },
  { id: "score_100", icon: "🔥", title: "Esquentou", description: "Fez 100 pontos ou mais." },
  { id: "score_160", icon: "⚡", title: "Alta voltagem", description: "Fez 160 pontos ou mais." },
  { id: "low_risk", icon: "🧊", title: "Cabeça fria", description: "Terminou com risco abaixo de 25%." },
  { id: "quiz_master", icon: "🧠", title: "Cérebro neon", description: "Fez 100+ no Modo Quiz." },
  { id: "all_modes", icon: "🏁", title: "Explorador", description: "Jogou em todos os modos." },
];

const endings = [
  { min: 170, title: "Fundador Cyberpunk", text: "Você jogou no modo visão + execução. O protótipo sairia do papel." },
  { min: 110, title: "Criador Promissor", text: "Boas escolhas, alguns riscos, mas o projeto tem futuro." },
  { min: 45, title: "Aprendiz de Caos", text: "Você sobreviveu, mas ainda gastou energia onde não precisava." },
  { min: -999, title: "Incêndio Gerenciado com Gasolina", text: "Foi bonito, foi intenso, mas o projeto sofreu bastante." },
];

let state = {
  timeLeft: STARTING_TIME,
  score: 0,
  risk: 20,
  combo: 0,
  round: 1,
  cardIndex: 0,
  mode: "chaos",
  timer: null,
  records: readJson(STORAGE_KEYS.records, {}),
  unlocked: readJson(STORAGE_KEYS.achievements, []),
};

const els = {
  bestScore: document.querySelector("#bestScore"),
  introScreen: document.querySelector("#introScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  resultScreen: document.querySelector("#resultScreen"),
  modeGrid: document.querySelector("#modeGrid"),
  modeRecords: document.querySelector("#modeRecords"),
  achievementPreview: document.querySelector("#achievementPreview"),
  unlockedAchievements: document.querySelector("#unlockedAchievements"),
  startButton: document.querySelector("#startButton"),
  restartButton: document.querySelector("#restartButton"),
  backButton: document.querySelector("#backButton"),
  activeModeLabel: document.querySelector("#activeModeLabel"),
  timeLeft: document.querySelector("#timeLeft"),
  round: document.querySelector("#round"),
  score: document.querySelector("#score"),
  combo: document.querySelector("#combo"),
  riskLabel: document.querySelector("#riskLabel"),
  riskBar: document.querySelector("#riskBar"),
  lastChoice: document.querySelector("#lastChoice"),
  cardTitle: document.querySelector("#cardTitle"),
  cardScenario: document.querySelector("#cardScenario"),
  options: document.querySelector("#options"),
  endingTitle: document.querySelector("#endingTitle"),
  endingText: document.querySelector("#endingText"),
  finalScore: document.querySelector("#finalScore"),
  finalRisk: document.querySelector("#finalRisk"),
  finalBest: document.querySelector("#finalBest"),
};

function init() {
  renderDashboard();
  renderModes();
  els.startButton.addEventListener("click", startGame);
  els.restartButton.addEventListener("click", startGame);
  els.backButton.addEventListener("click", backToIntro);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getGlobalBest() {
  return Math.max(0, ...Object.values(state.records).map((value) => Number(value) || 0));
}

function renderDashboard() {
  els.bestScore.textContent = getGlobalBest();
  els.modeRecords.innerHTML = Object.entries(modes)
    .map(([key, mode]) => `<div><span>${mode.icon} ${mode.label}</span><strong>${state.records[key] || 0}</strong></div>`)
    .join("");

  els.achievementPreview.innerHTML = achievements
    .map((item) => {
      const unlocked = state.unlocked.includes(item.id);
      return `<div class="achievement ${unlocked ? "unlocked" : "locked"}"><span>${unlocked ? item.icon : "🔒"}</span><div><strong>${item.title}</strong><small>${item.description}</small></div></div>`;
    })
    .join("");
}

function renderModes() {
  els.modeGrid.innerHTML = "";
  Object.entries(modes).forEach(([key, mode]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `mode-card ${state.mode === key ? "selected" : ""}`;
    button.innerHTML = `
      <span class="mode-icon">${mode.icon}</span>
      <strong>${mode.label}</strong>
      <small>${mode.description}</small>
      <em>Recorde: ${state.records[key] || 0}</em>
    `;
    button.addEventListener("click", () => {
      state.mode = key;
      renderModes();
    });
    els.modeGrid.appendChild(button);
  });
}

function startGame() {
  clearInterval(state.timer);
  state = {
    ...state,
    timeLeft: STARTING_TIME,
    score: 0,
    risk: 20,
    combo: 0,
    round: 1,
    cardIndex: Math.floor(Math.random() * getCards().length),
    timer: null,
  };

  els.introScreen.classList.add("hidden");
  els.resultScreen.classList.add("hidden");
  els.gameScreen.classList.remove("hidden");
  els.lastChoice.classList.add("hidden");
  render();

  state.timer = setInterval(() => {
    state.timeLeft -= 1;
    if (state.timeLeft <= 0) return finishGame();
    renderStats();
  }, 1000);
}

function backToIntro() {
  clearInterval(state.timer);
  els.resultScreen.classList.add("hidden");
  els.gameScreen.classList.add("hidden");
  els.introScreen.classList.remove("hidden");
  renderDashboard();
  renderModes();
}

function finishGame() {
  clearInterval(state.timer);
  const currentBest = state.records[state.mode] || 0;
  if (state.score > currentBest) {
    state.records[state.mode] = state.score;
    saveJson(STORAGE_KEYS.records, state.records);
  }

  const newlyUnlocked = unlockAchievements();
  const ending = endings.find((item) => state.score >= item.min);

  els.gameScreen.classList.add("hidden");
  els.resultScreen.classList.remove("hidden");
  els.endingTitle.textContent = ending.title;
  els.endingText.textContent = ending.text;
  els.finalScore.textContent = state.score;
  els.finalRisk.textContent = `${state.risk}%`;
  els.finalBest.textContent = state.records[state.mode] || state.score;
  els.bestScore.textContent = getGlobalBest();
  renderUnlocked(newlyUnlocked);
}

function unlockAchievements() {
  const playedModes = Object.keys(state.records);
  const candidates = [
    "first_run",
    state.score >= 100 && "score_100",
    state.score >= 160 && "score_160",
    state.risk < 25 && "low_risk",
    state.mode === "quiz" && state.score >= 100 && "quiz_master",
    playedModes.length >= Object.keys(modes).length && "all_modes",
  ].filter(Boolean);

  const before = new Set(state.unlocked);
  candidates.forEach((id) => before.add(id));
  const next = [...before];
  const newlyUnlocked = next.filter((id) => !state.unlocked.includes(id));
  state.unlocked = next;
  saveJson(STORAGE_KEYS.achievements, state.unlocked);
  return newlyUnlocked;
}

function renderUnlocked(ids) {
  if (!ids.length) {
    els.unlockedAchievements.innerHTML = `<div class="achievement locked"><span>✨</span><div><strong>Nenhuma conquista nova</strong><small>Jogue melhor ou teste outro modo.</small></div></div>`;
    return;
  }

  els.unlockedAchievements.innerHTML = ids
    .map((id) => achievements.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => `<div class="achievement unlocked"><span>${item.icon}</span><div><strong>${item.title}</strong><small>${item.description}</small></div></div>`)
    .join("");
}

function choose(option) {
  const nextCombo = option.points > 0 ? state.combo + 1 : 0;
  const comboBonus = nextCombo >= 3 ? 10 : nextCombo >= 2 ? 5 : 0;
  const riskPenalty = state.risk >= 75 ? -10 : 0;

  state.score += option.points + comboBonus + riskPenalty;
  state.risk = Math.max(0, Math.min(100, state.risk + option.risk));
  state.combo = nextCombo;

  els.lastChoice.innerHTML = `
    <span>Última escolha</span><br />
    <strong>${option.vibe}</strong>
    <p>${option.points > 0 ? "+" : ""}${option.points} pontos${comboBonus ? ` • +${comboBonus} combo` : ""}${riskPenalty ? ` • ${riskPenalty} risco alto` : ""}</p>
  `;
  els.lastChoice.classList.remove("hidden");

  if (state.risk >= 100 || state.round >= MAX_ROUNDS) return finishGame();

  state.round += 1;
  state.cardIndex = getRandomCardIndex(state.cardIndex);
  render();
}

function getCards() {
  return modes[state.mode].cards;
}

function getRandomCardIndex(previous) {
  const cards = getCards();
  if (cards.length <= 1) return 0;
  let next = previous;
  while (next === previous) next = Math.floor(Math.random() * cards.length);
  return next;
}

function getRiskLabel() {
  if (state.risk >= 70) return "Crítico";
  if (state.risk >= 45) return "Instável";
  if (state.risk >= 20) return "Controlado";
  return "Gelado";
}

function renderStats() {
  els.activeModeLabel.textContent = `${modes[state.mode].icon} ${modes[state.mode].label}`;
  els.timeLeft.textContent = `${state.timeLeft}s`;
  els.round.textContent = `${state.round}/${MAX_ROUNDS}`;
  els.score.textContent = state.score;
  els.combo.textContent = `x${state.combo}`;
  els.riskLabel.textContent = getRiskLabel();
  els.riskBar.style.width = `${state.risk}%`;
}

function renderCard() {
  const card = getCards()[state.cardIndex];
  els.cardTitle.textContent = card.title;
  els.cardScenario.textContent = card.scenario;
  els.options.innerHTML = "";

  card.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.innerHTML = `
      <span class="option-number">${index + 1}</span>
      <span>
        <strong>${option.text}</strong>
        <small>${option.correct ? "Resposta potencialmente certa." : "Escolha e veja o impacto."}</small>
      </span>
    `;
    button.addEventListener("click", () => choose(option));
    els.options.appendChild(button);
  });
}

function render() {
  renderStats();
  renderCard();
}

init();
