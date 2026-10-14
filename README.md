# Birthday Surprise 💗

A responsive React + Vite birthday gift website with a login screen, a countdown-only waiting screen, and a full birthday experience that unlocks automatically on the configured date.

## Run locally

Install Node.js (LTS), extract this project, open a terminal in the `birthday-surprise-full` folder, and run:

```bash
npm install
npm run dev
```

Open the local address Vite prints, usually `http://localhost:5173`.

For a production build:

```bash
npm run build
npm run preview
```

## Demo login

- Username: `myfavoriteperson`
- Password: `ourlittleworld`

Change these in `src/config/birthday.js`.

## Birthday unlock date

Edit `birthdayDate` in `src/config/birthday.js`. Format: `YYYY-MM-DD`.

The countdown is the only content shown after login until the configured date begins at midnight in the visitor's local timezone. At zero, the entire birthday landing page is rendered automatically. This project is currently configured for **October 20, 2026**.

## Personalize it

Open `src/config/birthday.js` and update:

- `recipientName`
- `birthdayDate`
- `loginUsername` and `loginPassword`
- `waitingMessage`
- `heroTitle`, `heroMessage`
- `letterMessage` and `finalMessage`
- `photos` and `musicSrc`

### Add real photos

Put your photos in `public/images/` and update the `photos` array in `src/config/birthday.js`. The project includes local SVG placeholders so the gallery works without external image links. Example:

```js
{ src: '/images/us-at-the-beach.jpg', caption: 'Our favorite day', date: 'Summer 2026' }
```

### Add music

Put a licensed audio file at `public/audio/our-song.mp3`. The floating player does not autoplay; the visitor must tap the play button. If the audio file is missing, the page shows a helpful hint instead of breaking.

## Android / mobile testing

The layout is responsive and controls support touch. To test on an Android phone on the same Wi-Fi network as your computer, run:

```bash
npm run dev -- --host 0.0.0.0
```

Then open `http://YOUR-COMPUTER-IP:5173` on the phone. Replace `YOUR-COMPUTER-IP` with your computer's local network IP address. Your firewall may need to allow port 5173.

## Security note

This is a personal frontend-only demo. The login credentials are stored in the client-side JavaScript and can be inspected by a technically capable visitor. It is a fun access gate, not secure authentication. Do not use it to protect private or sensitive information. For real authentication, add a backend or an authentication provider.
