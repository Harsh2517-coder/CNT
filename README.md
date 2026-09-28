<div align="center">
    <img src="public/images/logo.svg" width="72" alt="G4Meet logo">
</div>

<h1 align="center">G4Meet</h1>

<h3 align="center">Simple. Secure. Real-Time.</h3>

<p align="center">
A modern, self-hosted video conferencing platform for real-time communication — built on a scalable WebRTC/Mediasoup SFU architecture.
</p>

<br />

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/Harsh2517-coder/CNT?style=social)](https://github.com/Harsh2517-coder/CNT/stargazers)
<a href="https://choosealicense.com/licenses/agpl-3.0/">![License: AGPLv3](https://img.shields.io/badge/License-AGPLv3_Open_Source-blue.svg)</a>
<a href="https://github.com/Harsh2517-coder/CNT/commits/main">![Last Commit](https://img.shields.io/github/last-commit/Harsh2517-coder/CNT)</a>

</div>

<br />

<p align="center"><strong>G4Meet</strong> is a redesigned, rebranded frontend for a self-hosted video conferencing platform. It uses the same <a href="https://mediasoup.org" target="_blank">mediasoup</a> SFU / Socket.IO signaling backend as <a href="https://github.com/miroslavpejic85/mirotalksfu">MiroTalk SFU</a> (see <a href="#credits--attribution">Credits &amp; Attribution</a>), with a simpler, modern UI: a clean landing page, a streamlined create/join flow, a pre-join lobby, and a redesigned in-meeting experience with light/dark themes, tooltips, and a real (non-fabricated) network-status indicator.</p>

<hr />

## Features

- 🎥 Video conferencing, screen sharing, recording, picture-in-picture
- 💬 Chat (Markdown & emoji), collaborative whiteboard, file sharing
- ✋ Raise hand, reactions, participant list with mic/camera state
- 🔒 Room passwords, host controls, lobby/waiting room
- 🌗 Site-wide light/dark theme, responsive layout (desktop → mobile)
- 📶 Live connection-quality indicator wired to real WebRTC transport state
- 🔗 Shareable meeting links & QR codes that follow whatever host/domain you deploy on (never hardcoded)

## Quick Start

```bash
git clone https://github.com/Harsh2517-coder/CNT.git
cd CNT
cp app/src/config.template.js app/src/config.js
cp .env.template .env
npm install
npm start
```

Open [https://localhost:3010](https://localhost:3010) — done.

> The server listens on both HTTP and HTTPS on the same port (`3010` by default) using a bundled self-signed dev certificate (`app/ssl/`). Your browser will warn about it on first visit — that's expected for local/dev use; swap in a real certificate (e.g. Let's Encrypt) for a real deployment.

## Joining from Multiple Devices

**Same computer:** just open the app in two browser windows/tabs.

**Same Wi‑Fi / LAN (e.g. testing with a phone):**
1. Find the host machine's LAN IP — on macOS: `ipconfig getifaddr en0`.
2. Start the server on the host (`npm start`).
3. On the other device (same network), open `https://<host-LAN-IP>:3010` in a browser and accept the self-signed certificate warning once.
4. Create or join a room — meeting links/QR codes generated from there already point at that same LAN IP, so sharing them to other devices on the network works too.
5. If it doesn't connect, check the host's firewall allows inbound connections on port `3010` and the WebRTC media port range (`40000–40100` UDP by default, see `.env`).

**Different networks (over the internet):** the local server isn't reachable from outside your router by default. Either:
- Enable the built-in ngrok tunnel (`NGROK_ENABLED=true` + `NGROK_AUTH_TOKEN` in `.env`) for a quick public HTTPS URL, or
- Deploy to a server with a real domain + TLS certificate, forward port `3010` and the SFU media port range, and set `SERVER_HOST_URL` / `SFU_ANNOUNCED_IP` in `.env` to the server's real public address/IP.

## Docker

```bash
git clone https://github.com/Harsh2517-coder/CNT.git
cd CNT
cp app/src/config.template.js app/src/config.js
cp .env.template .env
cp docker-compose.template.yml docker-compose.yml
docker-compose up
```

Open [https://localhost:3010](https://localhost:3010) — done. Edit `app/src/config.js`, `.env`, and `docker-compose.yml` to customize your setup.

## Configuration

Branding, feature toggles, and server settings live in `app/src/config.js` (generated from `config.template.js`) and `.env` (generated from `.env.template`) — both are gitignored so local/deployment-specific values never get committed. Key network settings for multi-device/deployment use:

| Variable | Purpose |
| --- | --- |
| `SERVER_LISTEN_PORT` | Port the app listens on (default `3010`) |
| `SERVER_HOST_URL` | Public URL used to build meeting links (leave empty for local/LAN — it's inferred from the request) |
| `SFU_ANNOUNCED_IP` | Public/LAN IP announced for WebRTC media (leave empty to auto-detect) |
| `SFU_MIN_PORT` / `SFU_MAX_PORT` | UDP/TCP port range for WebRTC media traffic |
| `NGROK_ENABLED` / `NGROK_AUTH_TOKEN` | Quick public HTTPS tunnel for testing across networks |

## Credits & Attribution

G4Meet's frontend is a redesign/rebrand built on top of the excellent open-source [**MiroTalk SFU**](https://github.com/miroslavpejic85/mirotalksfu) project by [Miroslav Pejic](https://www.linkedin.com/in/miroslav-pejic-976a07101/), which provides the underlying mediasoup SFU, Socket.IO signaling, and WebRTC transport logic this project relies on. Additional credits from the upstream project:

- [Mediasoup](https://mediasoup.org) — SFU server
- [Dirk Vanbeveren](https://github.com/Dirvann) — SFU logic
- [Davide Pacilio](https://cruip.com/demos/solid/) — original HTML template
- [DiceBear](https://www.dicebear.com/) — avatar generation

## License

[![AGPLv3](public/images/AGPLv3.png)](LICENSE)

Licensed under AGPLv3 (GNU Affero General Public License v3.0), same as the upstream project. Modifications must remain open and available to the public under the same terms — see [LICENSE](LICENSE) and [choosealicense.com/licenses/agpl-3.0](https://choosealicense.com/licenses/agpl-3.0/) for details.
