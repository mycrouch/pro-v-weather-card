/*! PRO-V Weather Card v1.0.0
 *  A Lovelace card styled after PRO-V / Ecowitt weather-station consoles:
 *  clock, moon phase, forecast, pressure, UV, solar, indoor/outdoor
 *  temperature & humidity, wind compass and rain — every reading is a
 *  GUI-selectable entity, so any sensor source works.
 *  https://github.com/mycrouch/pro-v-weather-card
 *  MIT License
 */
(() => {
  "use strict";

  const VERSION = "1.0.0";

  // MDI weather icon paths (Material Design Icons, Apache 2.0)
  const WEATHER_ICONS = {
    "clear-night":
      "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z",
    cloudy:
      "M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17.5V12.5A5.5,5.5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z",
    fog:
      "M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17.5V10.5A5.5,5.5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z",
    hail:
      "M6,14A5,5 0 0,1 1,9A5,5 0 0,1 6,4C7,1.65 9.3,0 12,0C15.43,0 18.24,2.66 18.5,6.03L19,6A4,4 0 0,1 23,10A4,4 0 0,1 19,14H6M10,18A2,2 0 0,1 8,20A2,2 0 0,1 6,18A2,2 0 0,1 8,16A2,2 0 0,1 10,18M14.8,20.4A2,2 0 0,1 12.8,22.4A2,2 0 0,1 10.8,20.4A2,2 0 0,1 12.8,18.4A2,2 0 0,1 14.8,20.4M18,18A2,2 0 0,1 16,20A2,2 0 0,1 14,18A2,2 0 0,1 16,16A2,2 0 0,1 18,18Z",
    lightning:
      "M6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14H7A1,1 0 0,1 8,15A1,1 0 0,1 7,16H6M12,11H15L13,15H15L11.25,22L12,17H9.5L12,11Z",
    pouring:
      "M6,14A5,5 0 0,1 1,9A5,5 0 0,1 6,4C7,1.65 9.3,0 12,0C15.43,0 18.24,2.66 18.5,6.03L19,6A4,4 0 0,1 23,10A4,4 0 0,1 19,14H6M8,19.17L9.5,16.5C9.72,16.11 10.21,15.97 10.6,16.19C10.99,16.42 11.13,16.91 10.91,17.3L9.41,19.97C9.19,20.36 8.7,20.5 8.31,20.28C7.92,20.05 7.78,19.56 8,19.17M14.83,19.17L16.33,16.5C16.55,16.11 17.04,15.97 17.43,16.19C17.82,16.42 17.96,16.91 17.74,17.3L16.24,19.97C16.02,20.36 15.53,20.5 15.14,20.28C14.75,20.05 14.61,19.56 14.83,19.17M11.41,21.17L12.91,18.5C13.13,18.11 13.62,17.97 14.01,18.19C14.4,18.42 14.54,18.91 14.32,19.3L12.82,21.97C12.6,22.36 12.11,22.5 11.72,22.28C11.33,22.05 11.19,21.56 11.41,21.17Z",
    rainy:
      "M6,14A5,5 0 0,1 1,9A5,5 0 0,1 6,4C7,1.65 9.3,0 12,0C15.43,0 18.24,2.66 18.5,6.03L19,6A4,4 0 0,1 23,10A4,4 0 0,1 19,14H6M14.83,15.67C16.39,17.23 16.39,19.5 14.83,21.08C14.05,21.86 13,22.25 12,22.25C11,22.25 9.95,21.86 9.17,21.08C7.61,19.5 7.61,17.23 9.17,15.67L12,11L14.83,15.67Z",
    snowy:
      "M6,14A5,5 0 0,1 1,9A5,5 0 0,1 6,4C7,1.65 9.3,0 12,0C15.43,0 18.24,2.66 18.5,6.03L19,6A4,4 0 0,1 23,10A4,4 0 0,1 19,14H6M7.88,18.07L10.07,17.5L8.46,15.88C8.07,15.5 8.07,14.86 8.46,14.46C8.85,14.07 9.5,14.07 9.88,14.46L11.5,16.07L12.07,13.88C12.21,13.34 12.76,13.03 13.29,13.17C13.83,13.31 14.14,13.86 14,14.4L13.41,16.59L15.6,16C16.14,15.86 16.69,16.17 16.83,16.71C16.97,17.24 16.66,17.79 16.12,17.93L13.93,18.5L15.54,20.12C15.93,20.5 15.93,21.15 15.54,21.54C15.15,21.93 14.5,21.93 14.12,21.54L12.5,19.93L11.93,22.12C11.79,22.66 11.24,22.97 10.71,22.83C10.17,22.69 9.86,22.14 10,21.6L10.59,19.41L8.4,20C7.86,20.14 7.31,19.83 7.17,19.29C7.03,18.76 7.34,18.21 7.88,18.07Z",
    sunny:
      "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z",
    partlycloudy:
      "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z",
    windy:
      "M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z",
  };
  WEATHER_ICONS["snowy-rainy"] = WEATHER_ICONS.snowy;
  WEATHER_ICONS["lightning-rainy"] = WEATHER_ICONS.lightning;
  WEATHER_ICONS.exceptional = WEATHER_ICONS.sunny;
  WEATHER_ICONS["windy-variant"] = WEATHER_ICONS.windy;

  const mixHex = (a, b, t) => {
    const ah = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
    const bh = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
    return (
      "#" +
      ah
        .map((x, i) =>
          Math.round(x + (bh[i] - x) * t)
            .toString(16)
            .padStart(2, "0")
        )
        .join("")
    );
  };

  // Same style system as ecovacs-vacuum-card / airtouch-card:
  // default (follow theme) / theme (apply an installed theme to this card)
  // / manual (custom gradient pair).
  const stylePalette = (mode, pair) => {
    if (mode === "manual" && pair) {
      return {
        bg: `linear-gradient(145deg, ${pair[0]} 0%, ${pair[1]} 130%)`,
        text: "#fff",
        dim: "rgba(255,255,255,.72)",
        panel: "rgba(0,0,0,.28)",
        panelLine: "rgba(255,255,255,.12)",
        accent: "#fff",
      };
    }
    // default & theme: colours come from (applied) theme variables
    return {
      bg: null,
      text: "var(--primary-text-color)",
      dim: "var(--secondary-text-color)",
      panel: "var(--secondary-background-color, rgba(127,127,127,.14))",
      panelLine: "var(--divider-color, rgba(127,127,127,.2))",
      accent: "var(--primary-color)",
    };
  };

  const fmt = (v, dp = 1) => {
    const n = Number(v);
    return v === null || v === undefined || isNaN(n)
      ? "--"
      : n.toFixed(dp).replace(/\.0$/, "");
  };

  // Moon phase 0..1 (0 = new) computed from the date — no entity required.
  const moonPhase = (d = new Date()) => {
    const synodic = 29.53058867;
    const ref = Date.UTC(2000, 0, 6, 18, 14); // known new moon
    const days = (d.getTime() - ref) / 86400000;
    return ((days % synodic) + synodic) % synodic / synodic;
  };

  // Generate a moon glyph for one of 8 phases using two elliptical arcs.
  const moonGlyph = (idx, active) => {
    const r = 9;
    const cx = 12, cy = 12;
    // terminator x-radius per eighth: full circle at 4 (full moon)
    const k = Math.cos((idx / 8) * 2 * Math.PI); // 1=new, -1=full
    const rx = Math.abs(k) * r;
    const rightLit = idx > 0 && idx < 4; // waxing: right side lit
    let lit;
    if (idx === 0) lit = "";
    else if (idx === 4)
      lit = `M ${cx},${cy - r} A ${r},${r} 0 1 1 ${cx},${cy + r} A ${r},${r} 0 1 1 ${cx},${cy - r} Z`;
    else {
      const sweep1 = rightLit ? 1 : 0;
      const sweep2 = (idx < 2 || (idx > 4 && idx < 6)) === rightLit ? 0 : 1;
      lit =
        `M ${cx},${cy - r} A ${r},${r} 0 0 ${sweep1} ${cx},${cy + r} ` +
        `A ${rx},${r} 0 0 ${sweep2} ${cx},${cy - r} Z`;
    }
    return `<svg viewBox="0 0 24 24" class="moon ${active ? "on" : ""}">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.4"/>
      ${lit ? `<path d="${lit}" fill="currentColor"/>` : ""}
    </svg>`;
  };

  const SLOTS = [
    ["weather", "Forecast (weather entity)", "weather"],
    ["outdoor_temp", "Outdoor temperature", "sensor"],
    ["outdoor_humidity", "Outdoor humidity", "sensor"],
    ["indoor_temp", "Indoor temperature", "sensor"],
    ["indoor_humidity", "Indoor humidity", "sensor"],
    ["pressure", "Pressure", "sensor"],
    ["wind_speed", "Wind speed", "sensor"],
    ["wind_bearing", "Wind direction (degrees)", "sensor"],
    ["rain", "Rain", "sensor"],
    ["uv", "UV index", "sensor"],
    ["solar", "Solar radiation / light", "sensor"],
  ];

  class ProVWeatherCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._config = null;
      this._hass = null;
      this._renderedKey = null;
      this._trend = {}; // entity -> {v, t, dir}
      this._appliedThemeVars = null;
    }

    static getConfigElement() {
      return document.createElement("pro-v-weather-card-editor");
    }

    static getStubConfig(hass) {
      const ids = Object.keys(hass.states);
      const find = (re) => ids.find((e) => re.test(e)) || "";
      return {
        weather: find(/^weather\./),
        outdoor_temp: find(/outdoor_temperature$/),
        outdoor_humidity: find(/station_humidity$/) || find(/outdoor_humidity$/),
        indoor_temp: find(/indoor_temperature$/),
        pressure: find(/absolute_pressure$/) || find(/relative_pressure$/),
        wind_speed: find(/wind_speed$/),
        wind_bearing: find(/wind_direction$/),
        rain: find(/event_rain$/) || find(/rain_rate$/),
        uv: find(/uv_index$/),
        solar: find(/solar_radiation$/),
      };
    }

    setConfig(config) {
      this._config = { ...config };
      this._renderedKey = null;
      if (this._hass) this._render();
    }

    getCardSize() {
      return 6;
    }

    set hass(hass) {
      this._hass = hass;
      if (!this._config) return;
      const wantTheme =
        !this._config.gradient && this._config.theme ? this._config.theme : null;
      const dark = hass.themes && hass.themes.darkMode;
      if (this._themeName !== wantTheme || this._themeDark !== dark) {
        this._applyTheme(wantTheme);
        this._themeName = wantTheme;
        this._themeDark = dark;
        this._renderedKey = null;
      }
      const ids = SLOTS.map(([k]) => this._config[k]).filter(Boolean);
      const key = ids
        .map((id) => {
          const st = hass.states[id];
          return st ? `${id}:${st.state}` : `${id}:x`;
        })
        .join("|");
      if (key !== this._renderedKey) {
        this._renderedKey = key;
        this._updateTrends(ids);
        this._render();
      }
    }

    connectedCallback() {
      this._clockTimer = setInterval(() => this._tickClock(), 5000);
    }
    disconnectedCallback() {
      if (this._clockTimer) clearInterval(this._clockTimer);
    }

    _applyTheme(name) {
      if (this._appliedThemeVars) {
        for (const p of this._appliedThemeVars) this.style.removeProperty(p);
        this._appliedThemeVars = null;
      }
      if (!name || !this._hass || !this._hass.themes) return;
      const theme = this._hass.themes.themes && this._hass.themes.themes[name];
      if (!theme) return;
      let vars = { ...theme };
      if (vars.modes) {
        const m = this._hass.themes.darkMode ? vars.modes.dark : vars.modes.light;
        delete vars.modes;
        vars = { ...vars, ...(m || {}) };
      }
      this._appliedThemeVars = [];
      for (const [k, v] of Object.entries(vars)) {
        this.style.setProperty(`--${k}`, v);
        this._appliedThemeVars.push(`--${k}`);
      }
    }

    _updateTrends(ids) {
      const now = Date.now();
      const EPS = { default: 0.3 };
      for (const id of ids) {
        const st = this._hass.states[id];
        if (!st || isNaN(Number(st.state))) continue;
        const v = Number(st.state);
        const rec = this._trend[id];
        if (!rec) {
          this._trend[id] = { v, t: now, dir: 0 };
        } else if (now - rec.t > 20 * 60 * 1000) {
          const d = v - rec.v;
          rec.dir = Math.abs(d) < (EPS[id] || EPS.default) ? 0 : d > 0 ? 1 : -1;
          rec.v = v;
          rec.t = now;
        }
      }
    }

    _trendArrow(id) {
      const dir = this._trend[id] && this._trend[id].dir;
      if (!dir) return "";
      return `<span class="trend">${dir > 0 ? "&#9650;" : "&#9660;"}</span>`;
    }

    _val(key, dp = 1) {
      const id = this._config[key];
      if (!id) return null;
      const st = this._hass.states[id];
      if (!st) return { txt: "--", unit: "", id };
      return {
        txt: fmt(st.state, dp),
        unit: st.attributes.unit_of_measurement || "",
        raw: Number(st.state),
        id,
      };
    }

    _tickClock() {
      const el = this.shadowRoot && this.shadowRoot.querySelector("[data-clock]");
      if (!el) return;
      const { time, ampm, day, date } = this._now();
      el.querySelector(".t").innerHTML = time;
      el.querySelector(".ap").textContent = ampm;
      el.querySelector(".dd").textContent = `${day} ${date}`;
    }

    _now() {
      const d = new Date();
      let h = d.getHours();
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return {
        time: `${h}:${String(d.getMinutes()).padStart(2, "0")}`,
        ampm,
        day: d.toLocaleDateString("en-AU", { weekday: "short" }).toUpperCase(),
        date: `${d.getDate()}.${d.getMonth() + 1}`,
      };
    }

    _render() {
      const hass = this._hass;
      const cfg = this._config;
      const mode = cfg.gradient ? "manual" : cfg.theme ? "theme" : "default";
      const pair = Array.isArray(cfg.gradient) ? cfg.gradient : null;
      const pal = stylePalette(mode, pair);

      const panel = (cls, label, inner) =>
        `<div class="panel ${cls}">${label ? `<span class="tag">${label}</span>` : ""}${inner}</div>`;

      const big = (v, unitTop, extraId) =>
        v
          ? `<div class="reading">
              <span class="num">${v.txt}</span>
              <span class="unit">${unitTop || v.unit}</span>
              ${extraId ? this._trendArrow(extraId) : ""}
            </div>`
          : "";

      // clock
      const { time, ampm, day, date } = this._now();

      // moon strip (8 phases, current highlighted)
      const phaseIdx = Math.round(moonPhase() * 8) % 8;
      const moons = Array.from({ length: 8 }, (_, i) => moonGlyph(i, i === phaseIdx)).join("");

      // forecast
      const wst = cfg.weather && hass.states[cfg.weather];
      const wIcon = wst && (WEATHER_ICONS[wst.state] || WEATHER_ICONS.cloudy);
      const wLabel = wst ? wst.state.replace(/-/g, " ") : "";

      const inT = this._val("indoor_temp");
      const inH = this._val("indoor_humidity", 0);
      const outT = this._val("outdoor_temp");
      const outH = this._val("outdoor_humidity", 0);
      const press = this._val("pressure");
      const wind = this._val("wind_speed");
      const bearing = this._val("wind_bearing", 0);
      const rain = this._val("rain");
      const uv = this._val("uv", 0);
      const solar = this._val("solar", 0);

      const uvWord =
        uv && !isNaN(uv.raw)
          ? uv.raw >= 11
            ? "EXTREME"
            : uv.raw >= 8
            ? "VERY HIGH"
            : uv.raw >= 6
            ? "HIGH"
            : uv.raw >= 3
            ? "MODERATE"
            : "LOW"
          : "";

      const deg = bearing && !isNaN(bearing.raw) ? bearing.raw : null;
      const compass = `
        <svg viewBox="0 0 100 100" class="compass">
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="2"/>
          ${["N", "E", "S", "W"]
            .map((c, i) => {
              const a = (i * Math.PI) / 2;
              const x = 50 + 36 * Math.sin(a);
              const y = 50 - 36 * Math.cos(a) + 4;
              return `<text x="${x}" y="${y}" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity=".8">${c}</text>`;
            })
            .join("")}
          ${
            deg !== null
              ? `<polygon points="50,10 46,20 54,20" fill="currentColor" transform="rotate(${deg} 50 50)"/>`
              : ""
          }
          <text x="50" y="47" text-anchor="middle" font-size="9" fill="currentColor" fill-opacity=".7">${wind ? wind.unit : ""}</text>
          <text x="50" y="62" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">${wind ? wind.txt : "--"}</text>
        </svg>`;

      this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card {
          overflow: hidden;
          color: ${pal.text};
          ${pal.bg ? `background: ${pal.bg}; border: none;` : ""}
          font-variant-numeric: tabular-nums;
        }
        .wrap { padding: 12px; display: flex; gap: 10px; flex-wrap: wrap; }
        .col { flex: 1 1 260px; min-width: 240px; display: flex; flex-direction: column; gap: 10px; }
        .panel {
          position: relative; border-radius: 10px; padding: 10px 12px;
          background: ${pal.panel};
          border: 1px solid ${pal.panelLine};
        }
        .tag {
          position: absolute; top: 8px; right: 10px;
          font-size: .68em; letter-spacing: .08em; opacity: .75;
          text-transform: uppercase;
        }
        .row { display: flex; gap: 10px; }
        .row > .panel { flex: 1; }
        .reading { display: inline-flex; align-items: baseline; gap: 3px; }
        .num { font-size: 2.1em; font-weight: 700; line-height: 1.1; }
        .unit { font-size: .8em; opacity: .75; }
        .trend { font-size: .7em; opacity: .85; align-self: center; }
        .duo { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
        /* clock */
        .clock .t { font-size: 2.3em; font-weight: 700; }
        .clock .ap { font-size: .75em; opacity: .75; margin-right: 8px; }
        .clock .dd { font-size: .95em; opacity: .85; float: right; margin-top: 14px; }
        .moonstrip { display: flex; gap: 4px; justify-content: space-between; margin-top: 8px; }
        .moon { width: 20px; height: 20px; opacity: .4; }
        .moon.on { opacity: 1; }
        /* forecast */
        .fc { display: flex; align-items: center; gap: 10px; }
        .fc svg { width: 54px; height: 54px; fill: currentColor; flex: none; }
        .fc .cond { font-size: .95em; text-transform: capitalize; opacity: .9; }
        .compass { width: 110px; height: 110px; display: block; margin: 0 auto; }
        .small { font-size: .8em; opacity: .8; letter-spacing: .04em; }
        .uvword { font-size: .72em; opacity: .85; margin-left: 6px; letter-spacing: .05em; }
      </style>
      <ha-card>
        <div class="wrap">
          <div class="col">
            ${panel(
              "clock",
              "",
              `<div data-clock>
                 <span class="ap">${ampm}</span><span class="t">${time}</span>
                 <span class="dd">${day} ${date}</span>
                 <div class="moonstrip">${moons}</div>
               </div>`
            )}
            ${
              wst
                ? panel(
                    "",
                    "Forecast",
                    `<div class="fc"><svg viewBox="0 0 24 24"><path d="${wIcon}"/></svg>
                     <span class="cond">${wLabel}</span></div>`
                  )
                : ""
            }
            ${press ? panel("", "Pressure", big(press, null, press.id)) : ""}
            <div class="row">
              ${
                uv
                  ? panel("", "UVI", `${big(uv, "")}<span class="uvword">${uvWord}</span>`)
                  : ""
              }
              ${solar ? panel("", "Light", big(solar)) : ""}
            </div>
          </div>
          <div class="col">
            ${
              inT || inH
                ? panel(
                    "",
                    "Indoor",
                    `<div class="duo">${big(inT, null, inT && inT.id)}${big(inH, null, inH && inH.id)}</div>`
                  )
                : ""
            }
            ${
              outT || outH
                ? panel(
                    "",
                    "Outdoor",
                    `<div class="duo">${big(outT, null, outT && outT.id)}${big(outH, null, outH && outH.id)}</div>`
                  )
                : ""
            }
            <div class="row">
              ${wind ? panel("", "Wind", compass) : ""}
              ${
                rain
                  ? panel(
                      "",
                      "Rain",
                      `${big(rain)}<div class="small">${(cfg.rain_label || "Event").toUpperCase()}</div>`
                    )
                  : ""
              }
            </div>
          </div>
        </div>
      </ha-card>`;
    }
  }

  /* ------------------------------------------------------------------ *
   *  GUI editor                                                        *
   * ------------------------------------------------------------------ */
  class ProVWeatherCardEditor extends HTMLElement {
    constructor() {
      super();
      this._config = null;
      this._hass = null;
      this._form = null;
    }

    set hass(hass) {
      this._hass = hass;
      if (this._form) this._form.hass = hass;
    }

    setConfig(config) {
      this._config = { ...config };
      if (config.gradient) this._mode = "manual";
      else if (config.theme) this._mode = "theme";
      else this._mode = "default";
      this._render();
    }

    _emit(config) {
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config },
          bubbles: true,
          composed: true,
        })
      );
    }

    _build(v) {
      const config = {
        type: (this._config && this._config.type) || "custom:pro-v-weather-card",
      };
      for (const [k] of SLOTS) if (v[k]) config[k] = v[k];
      if (v.rain_label) config.rain_label = v.rain_label;
      if (v.mode === "theme" && v.theme) config.theme = v.theme;
      else if (v.mode === "manual" && v.gradient_from && v.gradient_to)
        config.gradient = [v.gradient_from, v.gradient_to];
      return config;
    }

    _render() {
      if (!this._config) return;
      if (!this._form) {
        this._form = document.createElement("ha-form");
        this._form.computeLabel = (s) => s.label || s.name;
        this._form.addEventListener("value-changed", (ev) => {
          ev.stopPropagation();
          const v = { ...ev.detail.value, ...(ev.detail.value.sensors || {}) };
          const modeChanged = v.mode !== this._mode;
          this._mode = v.mode;
          const config = this._build(v);
          this._config = config;
          this._emit(config);
          if (modeChanged) this._schema(v);
        });
        this.appendChild(this._form);
      }
      this._schema();
      if (this._hass) this._form.hass = this._hass;
    }

    _schema(current) {
      const schema = [
        {
          name: "mode",
          label: "Style",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "default", label: "Default (follow theme)" },
                { value: "theme", label: "Theme (apply an installed theme)" },
                { value: "manual", label: "Manual gradient colours" },
              ],
            },
          },
        },
      ];
      if (this._mode === "theme") {
        const names =
          this._hass && this._hass.themes && this._hass.themes.themes
            ? Object.keys(this._hass.themes.themes).sort()
            : [];
        schema.push({
          name: "theme",
          label: "Theme",
          selector: {
            select: {
              mode: "dropdown",
              options: names.map((t) => ({ value: t, label: t })),
            },
          },
        });
      }
      if (this._mode === "manual") {
        schema.push(
          { name: "gradient_from", label: "From colour (e.g. #0d2b45)", selector: { text: {} } },
          { name: "gradient_to", label: "To colour (e.g. #1565c0)", selector: { text: {} } }
        );
      }
      schema.push({
        name: "sensors",
        label: "Data sources",
        type: "expandable",
        flatten: true,
        expanded: true,
        schema: SLOTS.map(([k, label, domain]) => ({
          name: k,
          label,
          selector: { entity: { domain } },
        })).concat([
          { name: "rain_label", label: "Rain label (e.g. Event, Rate, Daily)", selector: { text: {} } },
        ]),
      });

      const g = this._config.gradient;
      const data = {
        mode: this._mode,
        theme: (current && current.theme) || this._config.theme || "",
        gradient_from: (current && current.gradient_from) || (Array.isArray(g) ? g[0] : ""),
        gradient_to: (current && current.gradient_to) || (Array.isArray(g) ? g[1] : ""),
        rain_label: this._config.rain_label || "",
      };
      for (const [k] of SLOTS) data[k] = this._config[k] || "";
      this._form.schema = schema;
      this._form.data = data;
    }
  }

  customElements.define("pro-v-weather-card", ProVWeatherCard);
  customElements.define("pro-v-weather-card-editor", ProVWeatherCardEditor);

  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "pro-v-weather-card",
    name: "PRO-V Weather Card",
    description:
      "Weather-station console card: clock, moon phase, forecast, pressure, UV, solar, indoor/outdoor readings, wind compass and rain — every reading is a GUI-selectable entity.",
    preview: true,
    documentationURL: "https://github.com/mycrouch/pro-v-weather-card",
  });

  console.info(
    `%c PRO-V-WEATHER-CARD %c v${VERSION} `,
    "color:#fff;background:#1565c0;font-weight:600;padding:2px 6px;border-radius:4px 0 0 4px",
    "color:#1565c0;background:#e3f2fd;font-weight:600;padding:2px 6px;border-radius:0 4px 4px 0"
  );
})();
