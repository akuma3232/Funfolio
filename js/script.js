// ============================================================
// script.js — page logic
// You don't need to edit this file. All customization lives in config.js
// ============================================================


// ============================================================
// INIT — runs once the HTML is ready
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  // -- Entry screen symbol --
  document.getElementById("entry-symbol").textContent = CONFIG.entrySymbol;

  // -- Name + interference effect --
  initNameEffect();

  // -- Badges --
  document.documentElement.style.setProperty("--badge-size",             CONFIG.badgeSize);
  document.documentElement.style.setProperty("--badge-container-bg",     CONFIG.badgeContainerBackground);
  document.documentElement.style.setProperty("--badge-container-border", CONFIG.badgeContainerBorder);

  const badgesContainer = document.getElementById("badges");
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

  // -- Avatar --
  document.getElementById("avatar").src = CONFIG.avatar;
  document.documentElement.style.setProperty("--avatar-size", CONFIG.avatarSize);

  const decorationEl = document.getElementById("avatar-decoration");
  if (CONFIG.avatarDecoration) {
    decorationEl.src = CONFIG.avatarDecoration;
  } else {
    decorationEl.style.display = "none";
  }

  // -- Background video --
  const bgVideo = document.getElementById("bg-video");
  document.getElementById("bg-video-source").src = CONFIG.backgroundVideo;
  bgVideo.load();

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

  // -- Discord presence --
  document.getElementById("discord-username").textContent = CONFIG.discordUsername;
  document.getElementById("discord-activity").textContent = CONFIG.discordStatus;
  document.getElementById("discord-avatar").src           = CONFIG.discordAvatar;

  const statusIconMap = {
    online:  "assets/icons/status/online.png",
    idle:    "assets/icons/status/inactive.png",
    dnd:     "assets/icons/status/busy.png",
    offline: "assets/icons/status/offline.png",
  };
  document.getElementById("discord-status-icon").src =
    statusIconMap[CONFIG.discordPresenceStatus] || statusIconMap.offline;

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

  // -- Visit counter --
  initVisitCounter();

  // --------------------------------------------------------
  // Entry screen click — starts everything
  // --------------------------------------------------------
  const profileCard = document.getElementById("profile-card");

  document.getElementById("entry-screen").addEventListener("click", (e) => {
    e.currentTarget.classList.add("hidden");

    bgVideo.muted = false;
    bgVideo.play();

    initParticles();

    setTimeout(() => {
      profileCard.classList.add("revealed");

      // Cycle through multiple status texts if available
      const texts = CONFIG.statusTexts && CONFIG.statusTexts.length
        ? CONFIG.statusTexts
        : [CONFIG.statusText];
      initCyclingTypewriter(document.getElementById("profile-status"), texts, 60);
    }, CONFIG.cardRevealDelay);
  });

  // --------------------------------------------------------
  // 3D card tilt on mouse move
  // --------------------------------------------------------
  if (CONFIG.cardTiltIntensity > 0) {
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
    };

    // Mouse
    profileCard.addEventListener("mousemove",  (e) => applyTilt(e.clientX, e.clientY));
    profileCard.addEventListener("mouseleave", resetTransform);

    // Touch (mobile)
    profileCard.addEventListener("touchmove", (e) => applyTilt(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    profileCard.addEventListener("touchend",  resetTransform);
  }

  // --------------------------------------------------------
  // Volume button
  // --------------------------------------------------------
  const volumeBtn = document.getElementById("volume-btn");
  volumeBtn.addEventListener("click", () => {
    bgVideo.muted = !bgVideo.muted;
    volumeBtn.textContent = bgVideo.muted ? "🔇" : "🔊";
  });

});


// ============================================================
// VISIT COUNTER
// Increments a localStorage counter and shows it after entry.
// ============================================================
function initVisitCounter() {
  const key   = "funfolio_visits";
  const count = (parseInt(localStorage.getItem(key) || "0", 10)) + 1;
  localStorage.setItem(key, count);

  const el   = document.getElementById("visit-counter");
  const text = document.getElementById("visit-count-text");
  text.textContent = count === 1 ? "1st visit 👑" : `${count.toLocaleString()} visits`;

  // Show after a brief delay
  setTimeout(() => el.classList.add("visible"), 1200);
}


// ============================================================
// NAME INTERFERENCE EFFECT
// Applies an SVG displacement filter to the name span.
// The filter seed changes every 40ms, making the letters
// "vibrate" like a bad TV signal — all done by the GPU.
// ============================================================
function initNameEffect() {
  const nameEl  = document.getElementById("name-text");
  const tooltip = document.getElementById("name-tooltip");

  nameEl.textContent  = CONFIG.profileName;
  tooltip.textContent = CONFIG.nameTooltip || "";

  if (CONFIG.nameEffect !== "noise") {
    nameEl.style.filter = "none";
    return;
  }

  const turb = document.getElementById("name-turb");
  const disp = document.getElementById("name-disp");

  setInterval(() => {
    turb.setAttribute("seed", Math.floor(Math.random() * 9999));
    // 80% of the time: heavy distortion / 20%: almost clean
    const scale = Math.random() < 0.8
      ? 4 + Math.random() * 8
      : 0.5 + Math.random() * 2;
    disp.setAttribute("scale", scale.toFixed(1));
  }, 40);
}


// ============================================================
// TAB TITLE TYPEWRITER
// Types the title in the browser tab, pauses, deletes, repeats.
// ============================================================
function initTabTitle(text) {
  let index     = 0;
  let isTyping  = true;

  function tick() {
    if (isTyping) {
      document.title = text.substring(0, index + 1);
      index++;
      if (index === text.length) {
        isTyping = false;
        setTimeout(tick, 1500);
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
// Types each status text, pauses, deletes, then moves to next.
// ============================================================
function initCyclingTypewriter(el, texts, speed = 70) {
  let textIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function tick() {
    const current = texts[textIndex];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex >= current.length) {
        setTimeout(() => { isDeleting = true; tick(); }, 2000);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIndex);
      charIndex--;
      if (charIndex < 0) {
        charIndex  = 0;
        isDeleting = false;
        textIndex  = (textIndex + 1) % texts.length;
        setTimeout(tick, 400);
        return;
      }
    }
    setTimeout(tick, isDeleting ? speed * 0.45 : speed);
  }

  tick();
}


// ============================================================
// BACKGROUND PARTICLES
// Dots that fall from top to bottom with a gentle horizontal
// sway. They also shift opposite to the mouse movement,
// creating a parallax depth effect.
// Starts only after the entry screen is clicked.
// ============================================================
function initParticles() {
  const canvas = document.getElementById("bg-canvas");
  const ctx    = canvas.getContext("2d");

  const { particleColor, particleCount, particleFallDuration,
          particleSwayDuration, particleSwayAmount, particleParallaxStrength } = CONFIG;

  let particles = [];
  let mouseX    = window.innerWidth / 2;

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
        r:          0.8 + Math.random() * 1.8,
        swayPhase:  Math.random() * Math.PI * 2,
        swaySpeed:  (Math.random() * 0.6 + 0.7) / particleSwayDuration,
        fallSpeed:  (canvas.height * 1.1) / (particleFallDuration * 60) * (0.7 + Math.random() * 0.6),
        opacity:    0.3 + Math.random() * 0.65,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = particleColor;

    const parallaxOffset = -(mouseX - canvas.width / 2) * particleParallaxStrength;

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

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  window.addEventListener("resize", () => { resize(); createParticles(); });
  requestAnimationFrame(draw);
}


// ============================================================
// CURSOR SPARKLE TRAIL
// 4-pointed star sparkles that appear at the cursor position
// and fade out while drifting. Spawning is done inside the
// requestAnimationFrame loop (not in mousemove) to avoid lag.
// ============================================================
function initCursorTrail() {
  const canvas = document.getElementById("cursor-canvas");
  const ctx    = canvas.getContext("2d");

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

    // Spawn new particles only when the mouse has moved
    if (mouseX !== lastX || mouseY !== lastY) {
      for (let i = 0; i < shootingStarMaxParticles; i++) {
        particles.push({
          x:             mouseX,
          y:             mouseY,
          vx:            (Math.random() - 0.5) * 1.4,
          vy:            (Math.random() - 0.5) * 1.4,
          life:          1,
          size:          shootingStarSize * (0.5 + Math.random() * 0.7),
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
      p.vx       *= 0.96;
      p.vy       *= 0.96;
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
