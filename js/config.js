// ============================================================
// config.js — the only file you need to edit
// ============================================================

const CONFIG = {

  // ----------------------------------------------------------
  // PROFILE
  // ----------------------------------------------------------
  profileName:   "𝓐𝓴𝓾𝓶𝓪 💢 - 恐 敬",      // name shown on the card
  nameTooltip:   "The Best Emperor",         // tooltip on hover over the name
  nameEffect:    "noise",         // "noise" = TV interference | "none" = plain text
  // Multiple status texts — will cycle through them one by one
  statusTexts: [
    "🧑‍💻 Software Engineer | Cybersecurity Expert",
    "🕵️ Detective Conan fan since forever",
    "🇲🇦 Proud Moroccan Emperor",
    "🔐 Breaking things to make them secure",
  ],
  statusText:    "🧑‍💻 Software Engineer | Cybersecurity Expert", // fallback (single)
  tabTitle:      "@𝓐𝓴𝓾𝓶𝓪 💢 - 恐 敬",      // animated browser tab title
  entrySymbol:   "👑 𝓣𝓱𝓮 𝓔𝓶𝓹𝓮𝓻𝓸𝓻 たカ援 ♔",            // symbol shown on the entry screen

  // ----------------------------------------------------------
  // FILES — place them in assets/ with these exact names
  // ----------------------------------------------------------
  avatar:              "assets/avatar.gif", // Supports animated GIFs too, e.g. "assets/avatar.gif"
  backgroundVideo:     "assets/background.mp4",
  customCursor:        "assets/cursor.png",
  customCursorHotspot: "0 0",    // "0 0" = tip of the cursor (top-left corner)

  // ----------------------------------------------------------
  // AVATAR
  // ----------------------------------------------------------
  avatarSize:       "118px",
  // animated Discord-style decoration — leave "" to disable
  avatarDecoration: "https://cdn.discordapp.com/avatar-decoration-presets/a_da532f804b47f1681006c2996eb07b2a.png",

  // ----------------------------------------------------------
  // BADGES / ROLES
  // Add, remove or reorder. "icon" = path inside assets/badges/
  // ----------------------------------------------------------
  badges: [
    { icon: "assets/badges/owner.png",    label: "Owner"    },
    { icon: "assets/badges/morocco.png", label: "Royal" },
    { icon: "assets/badges/police.png",  label: "Futur Job"  },
    { icon: "assets/badges/cia.png",     label: "CIA"     },
    { icon: "assets/badges/conan.png", label: "Best Anime"},
    { icon: "assets/badges/supervisor.png", label: "Supervisor"},
  ],
  badgeSize:                "22px",
  badgeContainerBackground: "rgba(172, 200, 255, 0.08)",
  badgeContainerBorder:     "2px solid rgba(172, 200, 255, 0.04)",

  // ----------------------------------------------------------
  // DISCORD (static — no API, edit manually)
  // ----------------------------------------------------------
  discordUsername: "𝓐𝓴𝓾𝓶𝓪 💢 - 恐 敬",
  discordStatus:   "No debate. Detective Conan stands above all. 🕵️‍♂️🔥",
  discordAvatar:   "assets/discord-avatar.jpg",
  discordAvatarSize:   "74px",
  discordAvatarBorder: "2px solid rgba(200, 27, 27, 0.15)",
  // status: "online" | "idle" | "dnd" | "offline"
  discordPresenceStatus: "dnd",

  // ----------------------------------------------------------
  // SOCIAL LINKS
  // Add, remove or reorder. "icon" = path inside assets/icons/
  // ----------------------------------------------------------
  socialLinks: [
    { name: "Instagram", url: "https://instagram.com/akuma.32__",         icon: "assets/icons/instagram.png" },
    { name: "Discord", url: "https://discord.gg/xd4hYQRzXb",     icon: "assets/icons/discord.png"},
    { name: "Spotify",   url: "https://open.spotify.com/user/31e2wvcsa45mf3phjwj3huplxyzu", icon: "assets/icons/spotify.png"   },
    { name: "TikTok",    url: "https://www.tiktok.com/@akuma.32__",           icon: "assets/icons/tiktok.png"    },
    { name: "Github",  url: "https://github.com/akuma3232",          icon: "assets/icons/github.png"  },
    { name: "Reddit", url: "https://www.reddit.com/user/AKUMA__32/",     icon: "assets/icons/reddit.png"},
    { name: "Youtube ", url: "https://www.youtube.com/@akuma3232",     icon: "assets/icons/youtube.png"},
    { name: "Pinterest", url: "https://www.pinterest.com/akuma32__/",     icon: "assets/icons/pinterest.png"},
  ],
  iconSize:         "36px",
  iconBorderRadius: "8px",
  iconGlowColor:    "#ffd1d1",

  // ----------------------------------------------------------
  // CARD
  // ----------------------------------------------------------
  cardMaxWidth:        "44rem",
  cardBorderRadius:    "85px",
  cardBackground:      "rgba(200, 27, 27, 0.03)",
  cardBorder:          "none",
  cardRevealDelay:     300,        // ms between entry click and card appearance
  cardTiltIntensity:   15,         // tilt degrees on mouse move (0 = disabled)
  cardTiltPerspective: "1000px",   // 3D perspective (lower = more dramatic)

  // ----------------------------------------------------------
  // DISCORD BOX (presence box inside the card)
  // ----------------------------------------------------------
  discordBoxBackground: "rgba(172, 200, 255, 0.07)",
  discordBoxRadius:     "14px",
  discordBoxBorder:     "2px solid rgba(172, 200, 255, 0.05)",

  // ----------------------------------------------------------
  // COLORS / STYLE
  // ----------------------------------------------------------
  usernameGlow: "0 0 16.5px #acc8ff", // name glow ("none" to disable)

  // ----------------------------------------------------------
  // BACKGROUND PARTICLES
  // ----------------------------------------------------------
  particleColor:            "#b31f1f",
  particleCount:            70,
  particleFallDuration:     10,    // seconds to cross the screen top to bottom
  particleSwayDuration:     3,     // seconds per horizontal sway cycle
  particleSwayAmount:       80,    // pixels of horizontal sway
  particleParallaxStrength: 0.08,  // mouse parallax strength (0 = disabled)

  // ----------------------------------------------------------
  // CURSOR TRAIL
  // ----------------------------------------------------------
  shootingStarColors:       ["#ffd87a", "#ffc847", "#fff4cc"],
  shootingStarSize:         3,
  shootingStarMaxParticles: 4,     // particles spawned per mouse movement
  shootingStarFadeFrames:   30,    // frames until each particle fades out
  shootingStarGlow:         8,     // glow intensity around each sparkle

};