const STARTING_TIME = 45;

const cards = [
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
    title: "Bug fantasma",
    scenario: "O app dá erro só no celular do seu amigo. No seu PC funciona perfeito.",
    options: [
      { text: "Culpa o celular dele", points: -10, risk: 10, vibe: "Clássico programador" },
      { text: "Pede print, navegador, console e tenta reproduzir", points: 25, risk: -10, vibe: "Investigador" },
      { text: "Reescreve o app inteiro", points: -15, risk: 20, vibe: "Exagerado" },
    ],
  },
  {
    title: "Oferta tentadora",
    scenario: "Uma ferramenta paga promete resolver tudo. Mas você quer manter o projeto 100% gratuito.",
    options: [
      { text: "Paga sem pensar", points: -15, risk: 10, vibe: "Cartão chorando" },
      { text: "Procura alternativa open-source/free tier", points: 25, risk: -5, vibe: "Economia ninja" },
      { text: "Abandona o projeto", points: -25, risk: 0, vibe: "Fim triste" },
    ],
  },
  {
    title: "Design travado",
    scenario: "O visual está genérico. Funciona, mas não dá vontade de usar.",
    options: [
      { text: "Coloca degradê, microanimações e cards melhores", points: 25, risk: 5, vibe: "Neon mode" },
      { text: "Deixa assim porque o importante é funcionar", points: 5, risk: 0, vibe: "Mínimo aceitável" },
      { text: "Copia inteiro de outro app", points: -20, risk: 20, vibe: "Perigo jurídico" },
    ],
  },
  {
    title: "Prazo cruel",
    scenario: "Você só tem uma noite para transformar uma ideia em algo apresentável.",
    options: [
      { text: "Faz uma landing page bonita com demo simples", points: 30, risk: -5, vibe: "Entrega inteligente" },
      { text: "Tenta fazer login, banco, IA e app mobile", points: -15, risk: 30, vibe: "Escopo monstro" },
      { text: "Faz só um PDF explicando", points: 0, risk: -5, vibe: "Sem emoção" },
    ],
  },
  {
    title: "Feedback sincero",
    scenario: "Alguém testou seu projeto e disse: 'legal, mas não entendi pra que serve'.",
    options: [
      { text: "Ignora, porque a pessoa não entendeu a visão", points: -15, risk: 10, vibe: "Ego ferido" },
      { text: "Melhora o texto inicial e simplifica o fluxo", points: 25, risk: -10, vibe: "Produto de verdade" },
      { text: "Adiciona mais 12 botões", points: -10, risk: 20, vibe: "Painel de avião" },
    ],
  },
];

const endings = [
  { min: 160, title: "Fundador Cyberpunk", text: "Você jogou no modo visão + execução. O protótipo sairia do papel." },
  { min: 100, title: "Criador Promissor", text: "Boas escolhas, alguns riscos, mas o projeto tem futuro." },
  { min: 40, title: "Aprendiz de Caos", text: "Você sobreviveu, mas ainda está gastando energia onde não precisa." },
  { min: -999, title: "Incêndio Gerenciado com Gasolina", text: "Foi bonito, foi intenso, mas o projeto sofreu bastante." },
];

let state = {
  started: false,
  finished: false,
  timeLeft: STARTING_TIME,
  score: 0,
  risk: 20,
  combo: 0,
  round: 1,
  cardIndex: 0,
  timer: null,
  best: Number(localStorage.getItem("neon-decision-best") || 0),
};

const els = {
  bestScore: document.querySelector("#bestScore"),
  introScreen: document.querySelector("#introScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  resultScreen: document.querySelector("#resultScreen"),
  startButton: document.querySelector("#startButton"),
  restartButton: document.querySelector("#restartButton"),
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
  els.bestScore.textContent = state.best;
  els.startButton.addEventListener("click", startGame);
  els.restartButton.addEventListener("click", startGame);
}

function startGame() {
  clearInterval(state.timer);

  state = {
    ...state,
    started: true,
    finished: false,
    timeLeft: STARTING_TIME,
    score: 0,
    risk: 20,
    combo: 0,
    round: 1,
    cardIndex: Math.floor(Math.random() * cards.length),
    timer: null,
  };

  els.introScreen.classList.add("hidden");
  els.resultScreen.classList.add("hidden");
  els.gameScreen.classList.remove("hidden");
  els.lastChoice.classList.add("hidden");

  render();

  state.timer = setInterval(() => {
    state.timeLeft -= 1;
    if (state.timeLeft <= 0) {
      finishGame();
      return;
    }
    renderStats();
  }, 1000);
}

function finishGame() {
  clearInterval(state.timer);
  state.started = false;
  state.finished = true;

  if (state.score > state.best) {
    state.best = state.score;
    localStorage.setItem("neon-decision-best", String(state.best));
  }

  const ending = endings.find((item) => state.score >= item.min);

  els.gameScreen.classList.add("hidden");
  els.resultScreen.classList.remove("hidden");
  els.endingTitle.textContent = ending.title;
  els.endingText.textContent = ending.text;
  els.finalScore.textContent = state.score;
  els.finalRisk.textContent = `${state.risk}%`;
  els.finalBest.textContent = state.best;
  els.bestScore.textContent = state.best;
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

  if (state.risk >= 100 || state.round >= 10) {
    finishGame();
    return;
  }

  state.round += 1;
  state.cardIndex = getRandomCardIndex(state.cardIndex);
  render();
}

function getRandomCardIndex(previous) {
  if (cards.length <= 1) return 0;

  let next = previous;
  while (next === previous) {
    next = Math.floor(Math.random() * cards.length);
  }
  return next;
}

function getRiskLabel() {
  if (state.risk >= 70) return "Crítico";
  if (state.risk >= 45) return "Instável";
  if (state.risk >= 20) return "Controlado";
  return "Gelado";
}

function renderStats() {
  els.timeLeft.textContent = `${state.timeLeft}s`;
  els.round.textContent = `${state.round}/10`;
  els.score.textContent = state.score;
  els.combo.textContent = `x${state.combo}`;
  els.riskLabel.textContent = getRiskLabel();
  els.riskBar.style.width = `${state.risk}%`;
  els.bestScore.textContent = state.best;
}

function renderCard() {
  const card = cards[state.cardIndex];
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
        <small>Escolha e veja o impacto.</small>
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
