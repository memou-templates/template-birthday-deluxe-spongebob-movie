/**
 * ==========================================================
 * SPONGEBOB MOVIE BIRTHDAY EXPERIENCE - INTERACTIVE JAVASCRIPT
 * ==========================================================
 */

// --- USER CUSTOMIZATION CONFIG ---
const BIRTHDAY_CONFIG = {
  girlfriendName: "My Sweet Queen", // Change to girlfriend's real name!
  nickname: "Princess of Bikini Bottom",
  boyfriendName: "Your Loving Boyfriend ❤️",
  birthdayDate: "Today",
  
  // Custom dialog quotes for the 3x3 Bamboo Grid Cast
  castDialogues: {
    spongebob: {
      name: "SpongeBob SquarePants",
      emoji: "🧽",
      quote: "I'M READY! I'M READY! To wish the most wonderful, sweetest, and gorgeous girl in all of Bikini Bottom a HAPPY BIRTHDAY! You light up the entire ocean brighter than a fresh hot batch of Krabby Patties! Best girlfriend in the seven seas!",
      sound: "sponge"
    },
    patrick: {
      name: "Patrick Star",
      emoji: "⭐",
      quote: "Is mayonnaise an instrument? No, but you are instrumental in making his heart happy every single day! I baked you a cake... wait, I accidentally ate it, but I brought you infinite love instead! Happy Birthday, best friend!",
      sound: "boing"
    },
    krabs: {
      name: "Mr. Eugene H. Krabs",
      emoji: "🦀",
      quote: "Ag-ag-ag-ag! Me boy struck pure 24-karat gold with you, lassie! I've hoarded doubloons, pearls, and diamonds, but you are worth more than all the treasure in the Pacific Ocean! Have a rich and happy birthday!",
      sound: "coin"
    },
    squidward: {
      name: "Squidward Tentacles",
      emoji: "🐙",
      quote: "Normally, I despise everyone's presence... but your boyfriend talks about you so much that even I have to admit, you two are undeniably adorable. Today, I dedicate this clarinet solo just for you. Happy Birthday!",
      sound: "clarinet"
    },
    sandy: {
      name: "Sandy Cheeks",
      emoji: "🐿️",
      quote: "Yee-haw! Happy Birthday from Texas all the way down to Bikini Bottom! You're sharper, stronger, and sweeter than warm pecan pie on a Sunday afternoon! Keep being your awesome, incredible self!",
      sound: "karate"
    },
    gary: {
      name: "Gary the Snail",
      emoji: "🐌",
      quote: "Meow! (Translation: You give the best head pats, the warmest cuddles, and you have the purest, kindest heart in the universe! Gary approves 100%!)",
      sound: "meow"
    },
    plankton: {
      name: "Sheldon J. Plankton & Karen",
      emoji: "🔬",
      quote: "CURSE YOU! Even with my supreme diabolical genius, I could never steal a secret formula as powerful as your boyfriend's devotion to you! Karen ran the calculations: You two are 10,000% soulmates!",
      sound: "zap"
    },
    pearl: {
      name: "Pearl Krabs",
      emoji: "🐳",
      quote: "OMG, Coral! It's your birthday! You are literally the prettiest, most fashionable icon in all of Bikini Bottom! Daddy, hand over the credit card—this queen deserves the best gifts ever! Happy Birthday, gorgeous!",
      sound: "cheer"
    },
    puff: {
      name: "Mrs. Poppy Puff",
      emoji: "🐡",
      quote: "Oh Neptune! You passed the official test with flying colors: Grade A+ on being the sweetest, most loving girlfriend in existence! No boat crashes today, only pure joy and celebration! Happy Birthday!",
      sound: "honk"
    }
  }
};

// --- WEB AUDIO API SYNTHESIZER ENGINE ---
let audioCtx = null;
let soundEnabled = true;
let bgmPlaying = false;
let bgmTimer = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Water Bubble Pop Sound (Bloop!)
function playBubblePop() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const startFreq = 400 + Math.random() * 300;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  } catch (e) {}
}

// 2. Deep Nautical Foghorn Sound (Entrance Dive)
function playFoghorn() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const freqs = [65.4, 130.8, 196.0]; // Low C nautical chord
    freqs.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      gain.gain.setValueAtTime(0.0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.85);
    });
  } catch (e) {}
}

// 3. Gary's "Meow" Chime (Two-tone sweet meow)
function playGaryMeow() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';

    // Slide up then down like a cat meow
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(750, ctx.currentTime + 0.25);
    osc.frequency.linearRampToValueAtTime(450, ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.68);
  } catch (e) {}
}

// 4. Jellyfish Zap / Boing
function playJellyZap() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';

    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.21);
  } catch (e) {}
}

// 5. Celebration Fanfare (Happy Birthday Chords)
function playFanfare() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [
      { f: 261.63, t: 0.0, d: 0.18 }, // C4
      { f: 261.63, t: 0.2, d: 0.18 }, // C4
      { f: 293.66, t: 0.4, d: 0.35 }, // D4
      { f: 261.63, t: 0.8, d: 0.35 }, // C4
      { f: 349.23, t: 1.2, d: 0.35 }, // F4
      { f: 329.63, t: 1.6, d: 0.70 }, // E4
    ];

    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.f, ctx.currentTime + n.t);

      gain.gain.setValueAtTime(0.25, ctx.currentTime + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.t + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + n.t);
      osc.stop(ctx.currentTime + n.t + n.d + 0.05);
    });
  } catch (e) {}
}

// 6. Tropical Ukulele BGM Synthesizer (Loops authentic Hawaiian chords)
function playUkulelePluck(freq, startTime, duration = 0.4) {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  } catch (e) {}
}

function startTropicalBGM() {
  const ctx = getAudioContext();
  if (!ctx) return;
  bgmPlaying = true;

  // Ukulele Chord Progressions: C - Am - F - G
  const chordMap = {
    C:  [261.63, 329.63, 392.00, 523.25],
    Am: [220.00, 261.63, 329.63, 440.00],
    F:  [174.61, 261.63, 349.23, 440.00],
    G7: [196.00, 246.94, 293.66, 349.23]
  };

  const progression = ['C', 'Am', 'F', 'G7'];
  let chordIndex = 0;

  function scheduleMeasure() {
    if (!bgmPlaying) return;
    const now = ctx.currentTime;
    const currentChord = chordMap[progression[chordIndex]];

    // Strum pattern: down, down-up, up-down
    const strums = [0.0, 0.28, 0.42, 0.70, 0.85];
    strums.forEach(offset => {
      currentChord.forEach((noteFreq, stringIdx) => {
        playUkulelePluck(noteFreq, now + offset + (stringIdx * 0.012), 0.35);
      });
    });

    chordIndex = (chordIndex + 1) % progression.length;
    bgmTimer = setTimeout(scheduleMeasure, 1100);
  }

  scheduleMeasure();
}

function stopTropicalBGM() {
  bgmPlaying = false;
  if (bgmTimer) {
    clearTimeout(bgmTimer);
    bgmTimer = null;
  }
}

// 7. Character Specific Fun Reactions
function playCharacterSound(soundType) {
  const ctx = getAudioContext();
  if (!ctx) return;

  switch (soundType) {
    case 'sponge':
      // Giggles (staccato high notes)
      [523, 659, 784, 1046].forEach((f, i) => {
        setTimeout(() => playBubblePop(), i * 60);
      });
      break;
    case 'boing':
      playJellyZap();
      break;
    case 'coin':
      // Mr Krabs coin chime
      [880, 1318].forEach((f, i) => {
        setTimeout(() => {
          try {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.frequency.setValueAtTime(f, ctx.currentTime);
            g.gain.setValueAtTime(0.2, ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            osc.connect(g);
            g.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.32);
          } catch(e){}
        }, i * 100);
      });
      break;
    case 'meow':
      playGaryMeow();
      break;
    case 'clarinet':
      // Squidward honk
      try {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(245, ctx.currentTime + 0.2);
        g.gain.setValueAtTime(0.18, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.38);
      } catch(e){}
      break;
    default:
      playBubblePop();
  }
}

// --- DOM INITIALIZATION & EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
  initPersonalizedData();
  initBubblesCanvas();
  initHudControls();
  initEntranceGate();
  initCastGrid();
  initJellyfishGame();
  initKrabbyBuilder();
  initBottleLetter();
  initCakeCandles();
});

// 1. Populate Config
function initPersonalizedData() {
  const introQueenName = document.getElementById('introQueenName');
  const heroGirlName = document.getElementById('heroGirlName');
  const letterSignoffName = document.getElementById('letterSignoffName');

  if (introQueenName) introQueenName.textContent = BIRTHDAY_CONFIG.girlfriendName;
  if (heroGirlName) heroGirlName.textContent = BIRTHDAY_CONFIG.girlfriendName.toUpperCase();
  if (letterSignoffName) letterSignoffName.textContent = BIRTHDAY_CONFIG.boyfriendName;
}

// 2. HUD Top Controls
function initHudControls() {
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const bgmToggleBtn = document.getElementById('bgmToggleBtn');
  const netModeBtn = document.getElementById('netModeBtn');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.querySelector('.hud-text').textContent = soundEnabled ? 'SOUND: ON' : 'SOUND: OFF';
      soundToggleBtn.querySelector('.hud-icon').textContent = soundEnabled ? '🔊' : '🔇';
      soundToggleBtn.classList.toggle('active', soundEnabled);
      if (soundEnabled) playBubblePop();
    });
  }

  if (bgmToggleBtn) {
    bgmToggleBtn.addEventListener('click', () => {
      getAudioContext();
      if (!bgmPlaying) {
        startTropicalBGM();
        bgmToggleBtn.classList.add('active');
        bgmToggleBtn.querySelector('.hud-text').textContent = 'BGM: PLAYING 🎶';
      } else {
        stopTropicalBGM();
        bgmToggleBtn.classList.remove('active');
        bgmToggleBtn.querySelector('.hud-text').textContent = 'TROPICAL BGM';
      }
    });
  }

  if (netModeBtn) {
    netModeBtn.addEventListener('click', () => {
      netModeBtn.classList.toggle('active');
      const isActive = netModeBtn.classList.contains('active');
      netModeBtn.querySelector('.hud-text').textContent = isActive ? 'JELLY NET: ON' : 'JELLY NET: OFF';
      playBubblePop();
    });
  }
}

// 3. Entrance Gate Modal
function initEntranceGate() {
  const diveInBtn = document.getElementById('diveInBtn');
  const narratorModal = document.getElementById('narratorModal');

  if (diveInBtn && narratorModal) {
    diveInBtn.addEventListener('click', () => {
      getAudioContext();
      playFoghorn();
      narratorModal.classList.remove('active');

      // Start tropical BGM on first dive
      setTimeout(() => {
        startTropicalBGM();
        const bgmBtn = document.getElementById('bgmToggleBtn');
        if (bgmBtn) {
          bgmBtn.classList.add('active');
          bgmBtn.querySelector('.hud-text').textContent = 'BGM: PLAYING 🎶';
        }
      }, 900);

      // Launch welcoming celebratory confetti
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    });
  }
}

// 4. Interactive Rising Bubbles Canvas
function initBubblesCanvas() {
  const canvas = document.getElementById('bubbleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const bubbles = [];
  const maxBubbles = 35;

  for (let i = 0; i < maxBubbles; i++) {
    bubbles.push(createBubble(true));
  }

  function createBubble(initial = false) {
    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + Math.random() * 50,
      radius: 6 + Math.random() * 18,
      speedY: 0.8 + Math.random() * 1.6,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      wobbleAmp: 1 + Math.random() * 2,
      wobbleAngle: Math.random() * Math.PI * 2,
      opacity: 0.2 + Math.random() * 0.4
    };
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      b.y -= b.speedY;
      b.wobbleAngle += b.wobbleSpeed;
      const currentX = b.x + Math.sin(b.wobbleAngle) * b.wobbleAmp;

      // Draw Bubble
      ctx.beginPath();
      ctx.arc(currentX, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.35})`;
      ctx.fill();

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity * 0.8})`;
      ctx.stroke();

      // Specular highlight dot
      ctx.beginPath();
      ctx.arc(currentX - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.9})`;
      ctx.fill();

      // Reset when bubble floats off screen
      if (b.y < -30) {
        bubbles[i] = createBubble();
      }
    }

    requestAnimationFrame(render);
  }

  render();

  // Click canvas to pop bubbles
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      const dist = Math.hypot(clickX - b.x, clickY - b.y);
      if (dist < b.radius + 15) {
        playBubblePop();
        bubbles[i] = createBubble(); // respawn
        break;
      }
    }
  });
}

// 5. 3x3 Bamboo Cast Grid & Modal Dialogue
function initCastGrid() {
  const cells = document.querySelectorAll('.character-cell');
  const charModal = document.getElementById('charModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalCharEmoji = document.getElementById('modalCharEmoji');
  const modalCharName = document.getElementById('modalCharName');
  const modalCharQuote = document.getElementById('modalCharQuote');
  const charReactionBtn = document.getElementById('charReactionBtn');

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const charKey = cell.getAttribute('data-char');
      const charData = BIRTHDAY_CONFIG.castDialogues[charKey];
      if (!charData) return;

      playCharacterSound(charData.sound);

      if (modalCharEmoji) modalCharEmoji.textContent = charData.emoji;
      if (modalCharName) modalCharName.textContent = charData.name;
      if (modalCharQuote) modalCharQuote.textContent = `"${charData.quote}"`;

      if (charModal) {
        charModal.classList.remove('hidden');
      }
    });
  });

  function closeModal() {
    if (charModal) charModal.classList.add('hidden');
    playBubblePop();
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (charModal) {
    charModal.addEventListener('click', (e) => {
      if (e.target === charModal) closeModal();
    });
  }

  if (charReactionBtn) {
    charReactionBtn.addEventListener('click', () => {
      playBubblePop();
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
      charReactionBtn.textContent = '💖 Hug Sent!';
      setTimeout(() => {
        charReactionBtn.textContent = '✨ Send Love Back!';
        closeModal();
      }, 900);
    });
  }
}

// 6. Jellyfish Fields Catching Mini-Game
function initJellyfishGame() {
  const jellyZone = document.getElementById('jellyZone');
  const jellyScore = document.getElementById('jellyScore');
  const arenaScore = document.getElementById('arenaScore');
  const spawnJellyBtn = document.getElementById('spawnJellyBtn');
  const queenFoundText = document.getElementById('queenFoundText');

  let caughtCount = 0;
  let queenSpawned = false;

  function updateScores() {
    if (jellyScore) jellyScore.textContent = caughtCount;
    if (arenaScore) arenaScore.textContent = caughtCount;
  }

  function spawnJelly(isQueen = false) {
    if (!jellyZone) return;

    const jellyEl = document.createElement('div');
    jellyEl.className = 'floating-jelly' + (isQueen ? ' queen-jelly' : '');

    jellyEl.innerHTML = `
      <div class="jelly-body">
        <div class="jelly-spots"></div>
      </div>
      <div class="jelly-tentacles">
        <div class="tentacle"></div>
        <div class="tentacle"></div>
        <div class="tentacle"></div>
      </div>
    `;

    const startX = 20 + Math.random() * (jellyZone.clientWidth - 90);
    const startY = 40 + Math.random() * (jellyZone.clientHeight - 120);
    jellyEl.style.left = `${startX}px`;
    jellyEl.style.top = `${startY}px`;

    // Movement animation
    let vx = (Math.random() - 0.5) * 1.5;
    let vy = (Math.random() - 0.5) * 1.2;
    let currX = startX;
    let currY = startY;

    const moveInterval = setInterval(() => {
      currX += vx;
      currY += vy;

      if (currX < 10 || currX > jellyZone.clientWidth - 70) vx *= -1;
      if (currY < 10 || currY > jellyZone.clientHeight - 80) vy *= -1;

      jellyEl.style.left = `${currX}px`;
      jellyEl.style.top = `${currY}px`;
    }, 40);

    // Catch handler
    jellyEl.addEventListener('click', () => {
      clearInterval(moveInterval);
      playJellyZap();
      caughtCount++;
      updateScores();

      // Catch burst effect
      jellyEl.style.transform = 'scale(1.4)';
      jellyEl.style.opacity = '0';
      jellyEl.style.transition = 'all 0.3s ease';

      setTimeout(() => {
        if (jellyEl.parentNode) jellyEl.parentNode.removeChild(jellyEl);
      }, 300);

      if (isQueen) {
        if (queenFoundText) queenFoundText.textContent = '🎉 QUEEN CAUGHT!';
        playFanfare();
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.5 }
          });
        }
        alert("👑 You caught the Royal Queen Jellyfish! But remember: You will ALWAYS be the true Queen of his heart! 💖");
      }

      // If caught 3 and no queen yet, spawn the Queen!
      if (caughtCount >= 3 && !queenSpawned) {
        queenSpawned = true;
        setTimeout(() => spawnJelly(true), 800);
      }
    });

    jellyZone.appendChild(jellyEl);
  }

  // Initial jellies
  for (let i = 0; i < 5; i++) {
    spawnJelly(false);
  }

  if (spawnJellyBtn) {
    spawnJellyBtn.addEventListener('click', () => {
      playBubblePop();
      spawnJelly(false);
      spawnJelly(false);
    });
  }
}

// 7. Krabby Patty Secret Formula Builder
function initKrabbyBuilder() {
  const ingButtons = document.querySelectorAll('.ing-btn');
  const burgerStack = document.getElementById('burgerStack');
  const stackPlaceholder = document.getElementById('stackPlaceholder');
  const resetBurgerBtn = document.getElementById('resetBurgerBtn');
  const autoStackBtn = document.getElementById('autoStackBtn');
  const formulaBox = document.getElementById('formulaBox');

  const addedIngredients = [];

  const ingClassMap = {
    'bottom-bun': { name: '🍞 Toasted Bottom Bun', cls: 'layer-bottom-bun' },
    'patty':      { name: '🥩 Soulmate Patty', cls: 'layer-patty' },
    'cheese':     { name: '🧀 Melted Joy Cheese', cls: 'layer-cheese' },
    'lettuce':    { name: '🥬 Crispy Loyalty Lettuce', cls: 'layer-lettuce' },
    'tomato':     { name: '🍅 Sweet Hugs Tomato', cls: 'layer-tomato' },
    'pickles':    { name: '🥒 Extra Kisses Pickles', cls: 'layer-pickles' },
    'love-sauce': { name: '💖 Secret Love Formula', cls: 'layer-love-sauce' },
    'top-bun':    { name: '🍔 Sesame Top Bun', cls: 'layer-top-bun' }
  };

  function addIngredient(ingKey) {
    const data = ingClassMap[ingKey];
    if (!data) return;

    if (stackPlaceholder) stackPlaceholder.style.display = 'none';

    const layerDiv = document.createElement('div');
    layerDiv.className = `burger-layer ${data.cls}`;
    layerDiv.textContent = data.name;

    burgerStack.appendChild(layerDiv);
    addedIngredients.push(ingKey);
    playBubblePop();

    // Check completion condition
    if (addedIngredients.includes('bottom-bun') && 
        addedIngredients.includes('patty') && 
        addedIngredients.includes('top-bun')) {
      if (formulaBox) formulaBox.classList.remove('hidden');
      playFanfare();
    }
  }

  ingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const ing = btn.getAttribute('data-ing');
      addIngredient(ing);
    });
  });

  if (resetBurgerBtn) {
    resetBurgerBtn.addEventListener('click', () => {
      burgerStack.innerHTML = '';
      if (stackPlaceholder) {
        stackPlaceholder.style.display = 'block';
        burgerStack.appendChild(stackPlaceholder);
      }
      addedIngredients.length = 0;
      if (formulaBox) formulaBox.classList.add('hidden');
      playBubblePop();
    });
  }

  if (autoStackBtn) {
    autoStackBtn.addEventListener('click', () => {
      burgerStack.innerHTML = '';
      addedIngredients.length = 0;
      const order = ['bottom-bun', 'patty', 'cheese', 'lettuce', 'tomato', 'pickles', 'love-sauce', 'top-bun'];
      order.forEach((ing, index) => {
        setTimeout(() => addIngredient(ing), index * 180);
      });
    });
  }
}

// 8. Message in a Nautical Bottle
function initBottleLetter() {
  const bottleTrigger = document.getElementById('bottleTrigger');
  const parchmentWrapper = document.getElementById('parchmentWrapper');

  if (bottleTrigger && parchmentWrapper) {
    bottleTrigger.addEventListener('click', () => {
      playBubblePop();
      bottleTrigger.style.transform = 'scale(0.95)';
      setTimeout(() => {
        bottleTrigger.style.transform = 'scale(1)';
      }, 150);

      // Scroll smoothly into view of letter
      parchmentWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      parchmentWrapper.style.boxShadow = '0 0 40px rgba(254, 212, 57, 0.9)';
      setTimeout(() => {
        parchmentWrapper.style.boxShadow = '';
      }, 1500);
    });
  }
}

// 9. Krusty Krab Birthday Cake & Make a Wish
function initCakeCandles() {
  const blowCandlesBtn = document.getElementById('blowCandlesBtn');
  const reigniteBtn = document.getElementById('reigniteBtn');
  const candles = document.querySelectorAll('.candle');
  const wishGrantedCard = document.getElementById('wishGrantedCard');

  if (blowCandlesBtn) {
    blowCandlesBtn.addEventListener('click', () => {
      playBubblePop();

      // Blow out candles sequentially
      candles.forEach((c, idx) => {
        setTimeout(() => {
          c.classList.add('blown');
          playBubblePop();
        }, idx * 120);
      });

      // After all blown, trigger celebration
      setTimeout(() => {
        playFanfare();
        if (wishGrantedCard) wishGrantedCard.classList.remove('hidden');

        // Confetti burst
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.6 }
          });
          setTimeout(() => {
            confetti({
              particleCount: 80,
              angle: 60,
              spread: 55,
              origin: { x: 0 }
            });
            confetti({
              particleCount: 80,
              angle: 120,
              spread: 55,
              origin: { x: 1 }
            });
          }, 350);
        }
      }, candles.length * 120 + 200);
    });
  }

  if (reigniteBtn) {
    reigniteBtn.addEventListener('click', () => {
      playBubblePop();
      candles.forEach(c => c.classList.remove('blown'));
      if (wishGrantedCard) wishGrantedCard.classList.add('hidden');
    });
  }
}
