# PRO-V Weather Card

A Lovelace card styled after PRO-V / Ecowitt weather-station consoles: clock and date, moon phase strip, forecast, pressure, UV index, solar radiation, indoor and outdoor temperature/humidity, a wind compass, and rain — laid out like the display on your wall.

<p align="center">
  <img src="images/style-default.png" width="32%" alt="Default - follows your HA theme">
  <img src="images/style-theme.png" width="32%" alt="Theme - Gradient Blue applied to just this card">
  <img src="images/style-manual.png" width="32%" alt="Manual - custom gradient colours">
</p>
<p align="center"><sub>Default &middot; Theme (Gradient Blue) &middot; Manual gradient</sub></p>

**Every reading is a GUI-selectable entity.** Built for Ecowitt stations but source-agnostic: point the indoor temperature at any sensor, take the forecast from any `weather.*` entity, mix providers freely. Panels simply hide when their slot isn't configured.

## Features

- **Console layout** — clock with day/date, computed moon-phase strip (no entity needed), forecast glyph from any weather entity, pressure, UVI with severity word (LOW → EXTREME), solar W/m², indoor and outdoor temp + humidity, wind compass with live bearing pointer and speed, rain with a configurable label (Event / Rate / Daily — whatever sensor you feed it).
- **Trend arrows** — indoor/outdoor and pressure readings grow rise/fall arrows once the card has watched them for a while (20-minute windows, session-based).
- **Fully GUI-configured** — style and every data slot in the visual editor; sensible auto-discovery for Ecowitt entity naming in the card picker preview.
- **Three style modes** (same convention as the [AirTouch Card](https://github.com/mycrouch/airtouch-card) and [Ecovacs Vacuum Card](https://github.com/mycrouch/ecovacs-vacuum-card)): **Default** (follows your theme), **Theme** (apply any installed theme — e.g. [Gradient Themes](https://github.com/mycrouch/gradient-themes) — to just this card), or **Manual** gradient colours.
- **Single file, no assets** — all glyphs inline SVG, moon phases generated mathematically, responsive two-column layout that stacks in narrow columns.

## Installation

### HACS

1. HACS → menu (⋮) → **Custom repositories** → add `https://github.com/mycrouch/pro-v-weather-card`, category **Dashboard**.
2. Download **PRO-V Weather Card**. The Lovelace resource is registered automatically.

### Manual

Copy `pro-v-weather-card.js` to `config/www/` and add it as a dashboard resource (`/local/pro-v-weather-card.js`, type module).

## Configuration

Everything is in the GUI editor. YAML equivalent:

```yaml
type: custom:pro-v-weather-card
weather: weather.forecast_home
outdoor_temp: sensor.roof_weather_station_outdoor_temperature
outdoor_humidity: sensor.roof_weather_station_humidity
indoor_temp: sensor.roof_weather_station_indoor_temperature
indoor_humidity: sensor.bedroom_humidity        # any sensor, any source
pressure: sensor.roof_weather_station_absolute_pressure
wind_speed: sensor.roof_weather_station_wind_speed
wind_bearing: sensor.roof_weather_station_wind_direction
rain: sensor.roof_weather_station_event_rain
rain_label: Event
uv: sensor.roof_weather_station_uv_index
solar: sensor.roof_weather_station_solar_radiation
theme: Gradient Blue        # or gradient: ["#0d2b45", "#1565c0"], or omit
```

All slots are optional — configure what you have, the rest of the layout adapts.

## Related projects

| Repo | What it is |
|---|---|
| [hass-airtouch](https://github.com/mycrouch/hass-airtouch) | Polyaire AirTouch 4/5 integration (fork) with a direct-connection mode for consoles on a different subnet/VLAN |
| [airtouch-card](https://github.com/mycrouch/airtouch-card) | Lovelace card for AirTouch 4/5 - console-style zone control with GUI editor and auto-discovery |
| [gradient-themes](https://github.com/mycrouch/gradient-themes) | 40 gradient dashboard themes (20 colours, dark + pastel variants) |
| [ecovacs-vacuum-card](https://github.com/mycrouch/ecovacs-vacuum-card) | Ecovacs/Deebot vacuum card with per-card theming (default / installed theme / manual gradient) |

## License

MIT. Weather icon paths from [Material Design Icons](https://pictogrammers.com/library/mdi/) (Apache 2.0).
