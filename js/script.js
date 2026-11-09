// ============================================================
// script.js — page logic & interactive effects
// All customization lives in config.js
// ============================================================

// Global burst particle emitter hook
let spawnBurstParticles = null;

// ============================================================
// INIT — runs once the HTML is ready
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  // -- Entry screen symbol --
  const entrySymbolEl = document.getElementById("entry-symbol");
  if (entrySymbolEl) {
    entrySymbolEl.textContent = CONFIG.entrySymbol;
  }

  // -- Name + interference effect --
  initNameEffect();

  // -- Badges --
  document.documentElement.style.setProperty("--badge-size",             CONFIG.badgeSize || "28px");
  document.documentElement.style.setProperty("--badge-container-bg",     CONFIG.badgeContainerBackground);
  document.documentElement.style.setProperty("--badge-container-border", CONFIG.badgeContainerBorder);

  const badgesContainer = document.getElementById("badges");
  if (badgesContainer) {
    (CONFIG.badges || []).forEach((badge) => {
      const item    = document.createElement("div");
      item.className = "badge-item";

      const tooltip = document.createElement("span");
      tooltip.className   = "badge-tooltip";
      tooltip.textContent = badge.label || "";

      const img = document.createElement("img");
      img.src = badge.icon;
      img.alt = badge.label || "";

      item.appendChild(tooltip);
      item.appendChild(img);
      badgesContainer.appendChild(item);
    });
  }

  // -- Avatar --
  const avatarEl = document.getElementById("avatar");
  if (avatarEl) avatarEl.src = CONFIG.avatar;
  document.documentElement.style.setProperty("--avatar-size", CONFIG.avatarSize);

  const decorationEl = document.getElementById("avatar-decoration");
  if (decorationEl) {
    if (CONFIG.avatarDecoration) {
      decorationEl.src = CONFIG.avatarDecoration;
    } else {
      decorationEl.style.display = "none";
    }
  }

  // -- Background video --
  const bgVideo = document.getElementById("bg-video");
  const bgVideoSource = document.getElementById("bg-video-source");
  if (bgVideoSource && bgVideo) {
    bgVideoSource.src = CONFIG.backgroundVideo;
    bgVideo.load();
  }

  // -- Card appearance --
  document.documentElement.style.setProperty("--card-max-width",        CONFIG.cardMaxWidth);
  document.documentElement.style.setProperty("--card-border-radius",    CONFIG.cardBorderRadius);
  document.documentElement.style.setProperty("--card-background",       CONFIG.cardBackground);
  document.documentElement.style.setProperty("--card-border",           CONFIG.cardBorder);
  document.documentElement.style.setProperty("--card-tilt-perspective", CONFIG.cardTiltPerspective);
  document.documentElement.style.setProperty("--username-glow",         CONFIG.usernameGlow);

  // -- Discord box --
  document.documentElement.style.setProperty("--discord-box-background", CONFIG.discordBoxBackground);
  document.documentElement.style.setProperty("--discord-box-radius",     CONFIG.discordBoxRadius);
  document.documentElement.style.setProperty("--discord-box-border",     CONFIG.discordBoxBorder);
  document.documentElement.style.setProperty("--discord-avatar-size",    CONFIG.discordAvatarSize);
  document.documentElement.style.setProperty("--discord-avatar-border",  CONFIG.discordAvatarBorder);

  // -- Social icons --
  document.documentElement.style.setProperty("--icon-size",          CONFIG.iconSize);
  document.documentElement.style.setProperty("--icon-border-radius", CONFIG.iconBorderRadius);
  document.documentElement.style.setProperty("--icon-glow-color",    CONFIG.iconGlowColor);

  const socialContainer = document.getElementById("social-links");
  if (socialContainer) {
    CONFIG.socialLinks.forEach((link) => {
      const a = document.createElement("a");
      a.href   = link.url;
      a.target = "_blank";
      a.rel    = "noopener noreferrer";
      a.title  = link.name;

      const icon = document.createElement("img");
      icon.className = "social-icon";
      icon.src = link.icon;
      icon.alt = link.name;

      a.appendChild(icon);
      socialContainer.appendChild(a);
    });
  }

  // -- Discord presence --
  const dUsername = document.getElementById("discord-username");
  const dActivity = document.getElementById("discord-activity");
  const dAvatar   = document.getElementById("discord-avatar");
  if (dUsername) dUsername.textContent = CONFIG.discordUsername;
  if (dActivity) dActivity.textContent = CONFIG.discordStatus;
  if (dAvatar)   dAvatar.src           = CONFIG.discordAvatar;

  const statusIconMap = {
    online:  "assets/icons/status/online.png",
    idle:    "assets/icons/status/inactive.png",
    dnd:     "assets/icons/status/busy.png",
    offline: "assets/icons/status/offline.png",
  };
  const dStatusIcon = document.getElementById("discord-status-icon");
  if (dStatusIcon) {
    dStatusIcon.src = statusIconMap[CONFIG.discordPresenceStatus] || statusIconMap.offline;
  }

  // Discord status pulse ring color
  const statusColorMap = {
    online:  "rgba(76, 255, 145, 0.45)",
    idle:    "rgba(255, 170, 0, 0.45)",
    dnd:     "rgba(240, 71, 71, 0.5)",
    offline: "rgba(116, 127, 141, 0.35)",
  };
  const statusRing = document.getElementById("discord-status-ring");
  if (statusRing) {
    statusRing.style.background = statusColorMap[CONFIG.discordPresenceStatus] || statusColorMap.offline;
  }

  // Click to copy Discord username
  const discordPresence = document.getElementById("discord-presence");
  if (discordPresence) {
    discordPresence.addEventListener("click", () => {
      const textToCopy = CONFIG.discordUsername || "Akuma";
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Discord username copied! 📋");
      }).catch(() => {
        showToast("Discord: " + textToCopy);
      });
    });
  }

  // Avatar click sparkle burst celebration
  const avatarWrapper = document.getElementById("avatar-wrapper");
  if (avatarWrapper) {
    avatarWrapper.addEventListener("click", (e) => {
      const rect = avatarWrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      if (typeof spawnBurstParticles === "function") {
        spawnBurstParticles(centerX, centerY, 24);
      }
      playCyberBeep(880, 0.08);
      showToast("✨ Emperor power activated!");
    });
  }

  // -- Custom cursor --
  if (CONFIG.customCursor) {
    const style = document.createElement("style");
    style.textContent = `* { cursor: url("${CONFIG.customCursor}") ${CONFIG.customCursorHotspot}, auto !important; }`;
    document.head.appendChild(style);
  }

  // -- Tab title typewriter --
  initTabTitle(CONFIG.tabTitle);

  // -- Cursor sparkle trail (active from page load) --
  initCursorTrail();

  // -- Visit counter & Live clock --
  initVisitCounter();
  initLiveClock();

  // --------------------------------------------------------
  // Entry screen handler (Click or Keypress)
  // --------------------------------------------------------
  const profileCard = document.getElementById("profile-card");
  const entryScreen = document.getElementById("entry-screen");
  let entered = false;

  function enterExperience() {
    if (entered) return;
    entered = true;

    // Cyber audio chime
    playCyberChime();

    if (entryScreen) {
      entryScreen.classList.add("hidden");
    }

    if (bgVideo) {
      bgVideo.muted = false;
      bgVideo.play().catch(() => {});
    }

    initParticles();

    // Show top info
    const topInfo = document.getElementById("top-info");
    if (topInfo) topInfo.classList.add("visible");

    setTimeout(() => {
      if (profileCard) {
        profileCard.classList.add("revealed");
      }

      // Cycle through multiple status texts if available
      const texts = CONFIG.statusTexts && CONFIG.statusTexts.length
        ? CONFIG.statusTexts
        : [CONFIG.statusText];
      initCyclingTypewriter(document.getElementById("profile-status"), texts, 60);
    }, CONFIG.cardRevealDelay || 300);
  }

  if (entryScreen) {
    entryScreen.addEventListener("click", enterExperience);
  }

  // Keyboard shortcut listener
  document.addEventListener("keydown", (e) => {
    // Space or Enter to enter
    if (!entered && (e.code === "Space" || e.code === "Enter")) {
      e.preventDefault();
      enterExperience();
      return;
    }

    // 'M' to toggle mute
    if (e.code === "KeyM" && entered && bgVideo) {
      bgVideo.muted = !bgVideo.muted;
      const volumeBtn = document.getElementById("volume-btn");
      if (volumeBtn) volumeBtn.textContent = bgVideo.muted ? "🔇" : "🔊";
      showToast(bgVideo.muted ? "Sound Muted 🔇" : "Sound Playing 🔊");
    }

    // 'F' to toggle fullscreen
    if (e.code === "KeyF") {
      toggleFullscreen();
    }
  });

  // --------------------------------------------------------
  // 3D card tilt & Specular Glare on mouse move
  // --------------------------------------------------------
  if (CONFIG.cardTiltIntensity > 0 && profileCard) {
    const tiltTransform = (x, y) =>
      `translate(-50%, -50%) perspective(${CONFIG.cardTiltPerspective}) rotateX(${x}deg) rotateY(${y}deg)`;

    const resetTransform = () => {
      profileCard.style.transform = tiltTransform(0, 0);
    };

    const applyTilt = (clientX, clientY) => {
      const rect    = profileCard.getBoundingClientRect();
      const offsetX = (clientX - rect.left)  / rect.width  - 0.5;
      const offsetY = (clientY - rect.top)   / rect.height - 0.5;

      profileCard.style.transform = tiltTransform(
        -offsetY * 2 * CONFIG.cardTiltIntensity,
         offsetX * 2 * CONFIG.cardTiltIntensity
      );

      // Update specular glare coordinates
      profileCard.style.setProperty("--mouse-x", `${clientX - rect.left}px`);
      profileCard.style.setProperty("--mouse-y", `${clientY - rect.top}px`);
    };

    // Mouse
    profileCard.addEventListener("mousemove", (e) => applyTilt(e.clientX, e.clientY));
    profileCard.addEventListener("mouseleave", resetTransform);

    // Touch (mobile)
    profileCard.addEventListener("touchmove", (e) => applyTilt(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    profileCard.addEventListener("touchend",  resetTransform);
  }

  // --------------------------------------------------------
  // Top controls: Volume & Fullscreen
  // --------------------------------------------------------
  const volumeBtn = document.getElementById("volume-btn");
  if (volumeBtn && bgVideo) {
    volumeBtn.addEventListener("click", () => {
      bgVideo.muted = !bgVideo.muted;
      volumeBtn.textContent = bgVideo.muted ? "🔇" : "🔊";
      showToast(bgVideo.muted ? "Sound Muted 🔇" : "Sound Playing 🔊");
    });
  }

  const fullscreenBtn = document.getElementById("fullscreen-btn");
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", toggleFullscreen);
  }

});


// ============================================================
// FULLSCREEN TOGGLE
// ============================================================
function toggleFullscreen() {
  const btn = document.getElementById("fullscreen-btn");
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      if (btn) btn.textContent = "🗗";
      showToast("Fullscreen Enabled ⛶");
    }).catch(() => {});
  } else {
    document.exitFullscreen().then(() => {
      if (btn) btn.textContent = "⛶";
      showToast("Fullscreen Exited");
    }).catch(() => {});
  }
}


// ============================================================
// TOAST NOTIFICATION
// ============================================================
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}


// ============================================================
// WEB AUDIO API CYBER CHIME & BEEP
// Synthesized futuristic audio — zero external file dependencies
// ============================================================
function playCyberChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    masterGain.connect(ctx.destination);

    // Dual resonant synth notes (E major chord vibe: 659.25Hz -> 987.77Hz)
    [659.25, 987.77].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      osc.connect(masterGain);
      osc.start(now + i * 0.08);
      osc.stop(now + 1.2);
    });
  } catch (err) {}
}

function playCyberBeep(freq = 800, duration = 0.08) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch (err) {}
}


// ============================================================
// LIVE CLOCK & VISIT COUNTER
// ============================================================
function initVisitCounter() {
  const key   = "funfolio_visits";
  const count = (parseInt(localStorage.getItem(key) || "0", 10)) + 1;
  localStorage.setItem(key, count);

  const text = document.getElementById("visit-count-text");
  if (text) {
    text.textContent = count === 1 ? "1st visit 👑" : `${count.toLocaleString()} visits`;
  }
}

function initLiveClock() {
  const clockEl = document.getElementById("clock-text");
  if (!clockEl) return;

  const timezone = CONFIG.timezone || "Africa/Casablanca";
  const locName  = CONFIG.locationName || "🇲🇦 Casablanca";

  function update() {
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      clockEl.textContent = `${locName} • ${timeStr}`;
    } catch (e) {
      clockEl.textContent = `${locName}`;
    }
  }

  update();
  setInterval(update, 1000);
}


// ============================================================
// NAME INTERFERENCE EFFECT
// Applies SVG displacement filter with GPU seed jitter
// ============================================================
function initNameEffect() {
  const nameEl  = document.getElementById("name-text");
  const tooltip = document.getElementById("name-tooltip");
  if (!nameEl) return;

  nameEl.textContent  = CONFIG.profileName;
  if (tooltip) tooltip.textContent = CONFIG.nameTooltip || "";

  if (CONFIG.nameEffect !== "noise") {
    nameEl.style.filter = "none";
    return;
  }

  const turb = document.getElementById("name-turb");
  const disp = document.getElementById("name-disp");
  if (!turb || !disp) return;

  setInterval(() => {
    turb.setAttribute("seed", Math.floor(Math.random() * 9999));
    const scale = Math.random() < 0.8
      ? 4 + Math.random() * 8
      : 0.5 + Math.random() * 2;
    disp.setAttribute("scale", scale.toFixed(1));
  }, 40);
}


// ============================================================
// TAB TITLE TYPEWRITER
// ============================================================
function initTabTitle(text) {
  if (!text) return;
  let index    = 0;
  let isTyping = true;

  function tick() {
    if (isTyping) {
      document.title = text.substring(0, index + 1);
      index++;
      if (index === text.length) {
        isTyping = false;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      document.title = text.substring(0, index - 1);
      index--;
      if (index === 0) isTyping = true;
    }
    setTimeout(tick, 100);
  }

  tick();
}


// ============================================================
// CYCLING STATUS TYPEWRITER
// ============================================================
function initCyclingTypewriter(el, texts, speed = 70) {
  if (!el || !texts || !texts.length) return;
  let textIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function tick() {
    const current = texts[textIndex];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex >= current.length) {
        setTimeout(() => { isDeleting = true; tick(); }, 2200);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIndex);
      charIndex--;
      if (charIndex < 0) {
        charIndex  = 0;
        isDeleting = false;
        textIndex  = (textIndex + 1) % texts.length;
        setTimeout(tick, 350);
        return;
      }
    }
    setTimeout(tick, isDeleting ? speed * 0.45 : speed);
  }

  tick();
}


// ============================================================
// BACKGROUND PARTICLES & AMBIENT EMBERS
// ============================================================
function initParticles() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const { particleColor, particleCount, particleFallDuration,
          particleSwayDuration, particleSwayAmount, particleParallaxStrength } = CONFIG;

  let particles = [];
  let shootingStars = [];
  let mouseX = window.innerWidth / 2;

  document.addEventListener("mousemove", (e) => { mouseX = e.clientX; });

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        baseX:      Math.random() * canvas.width,
        y:          Math.random() * canvas.height * 1.5 - canvas.height * 0.5,
        r:          0.9 + Math.random() * 2.2,
        swayPhase:  Math.random() * Math.PI * 2,
        swaySpeed:  (Math.random() * 0.6 + 0.7) / particleSwayDuration,
        fallSpeed:  (canvas.height * 1.1) / (particleFallDuration * 60) * (0.7 + Math.random() * 0.6),
        opacity:    0.3 + Math.random() * 0.65,
      });
    }
  }

  function maybeSpawnShootingStar() {
    if (Math.random() < 0.008 && shootingStars.length < 2) {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.4,
        length: 80 + Math.random() * 100,
        speed: 7 + Math.random() * 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        life: 1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = particleColor;

    const parallaxOffset = -(mouseX - canvas.width / 2) * particleParallaxStrength;

    // Regular particles
    particles.forEach((p) => {
      p.y += p.fallSpeed;
      if (p.y > canvas.height + 10) {
        p.y     = -10;
        p.baseX = Math.random() * canvas.width;
      }

      const sway = Math.sin(performance.now() * 0.001 * p.swaySpeed + p.swayPhase) * particleSwayAmount;
      let x = p.baseX + sway + parallaxOffset;
      x = ((x % canvas.width) + canvas.width) % canvas.width;

      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Background shooting stars
    maybeSpawnShootingStar();
    shootingStars.forEach((star) => {
      ctx.save();
      ctx.globalAlpha = star.life * 0.7;
      ctx.strokeStyle = "rgba(172, 200, 255, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(
        star.x - Math.cos(star.angle) * star.length * star.life,
        star.y - Math.sin(star.angle) * star.length * star.life
      );
      ctx.stroke();
      ctx.restore();

      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      star.life -= 0.015;
    });
    shootingStars = shootingStars.filter((s) => s.life > 0);

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  window.addEventListener("resize", () => { resize(); createParticles(); });
  requestAnimationFrame(draw);
}


// ============================================================
// CURSOR SPARKLE TRAIL & BURST CELEBRATION
// ============================================================
function initCursorTrail() {
  const canvas = document.getElementById("cursor-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const { shootingStarColors, shootingStarSize,
          shootingStarMaxParticles, shootingStarFadeFrames,
          shootingStarGlow } = CONFIG;

  let particles = [];
  let mouseX = -999, mouseY = -999;
  let lastX  = -999, lastY  = -999;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Global emitter hook for avatar clicks or events
  spawnBurstParticles = function(x, y, count = 20) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 2.5 + Math.random() * 4.5;
      particles.push({
        x:             x,
        y:             y,
        vx:            Math.cos(angle) * speed,
        vy:            Math.sin(angle) * speed,
        life:          1,
        size:          shootingStarSize * (1 + Math.random() * 1.2),
        rotation:      Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
        twinklePhase:  Math.random() * Math.PI * 2,
        color:         shootingStarColors[Math.floor(Math.random() * shootingStarColors.length)],
      });
    }
  };

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawStar(x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo( size * 0.2, -size * 0.2,  size, 0);
    ctx.quadraticCurveTo( size * 0.2,  size * 0.2,  0,    size);
    ctx.quadraticCurveTo(-size * 0.2,  size * 0.2, -size, 0);
    ctx.quadraticCurveTo(-size * 0.2, -size * 0.2,  0,   -size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn new cursor trail particles when mouse moves
    if (mouseX !== lastX || mouseY !== lastY) {
      for (let i = 0; i < shootingStarMaxParticles; i++) {
        particles.push({
          x:             mouseX,
          y:             mouseY,
          vx:            (Math.random() - 0.5) * 1.4,
          vy:            (Math.random() - 0.5) * 1.4,
          life:          1,
          size:          shootingStarSize * (0.6 + Math.random() * 0.8),
          rotation:      Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.14,
          twinklePhase:  Math.random() * Math.PI * 2,
          color:         shootingStarColors[Math.floor(Math.random() * shootingStarColors.length)],
        });
      }
      lastX = mouseX;
      lastY = mouseY;
    }

    particles.forEach((p) => {
      p.x        += p.vx;
      p.y        += p.vy;
      p.vx       *= 0.95;
      p.vy       *= 0.95;
      p.rotation += p.rotationSpeed;
      p.life     -= 1 / shootingStarFadeFrames;

      const life    = Math.max(p.life, 0);
      const twinkle = 0.75 + 0.25 * Math.sin(performance.now() * 0.015 + p.twinklePhase);

      ctx.globalAlpha = life;
      ctx.fillStyle   = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur  = shootingStarGlow;
      drawStar(p.x, p.y, p.size * life * twinkle, p.rotation);
    });

    particles     = particles.filter((p) => p.life > 0);
    ctx.globalAlpha = 1;
    ctx.shadowBlur  = 0;
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}
