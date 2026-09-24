# 🍍 SpongeBob Movie Birthday Experience (`birthday_template_2`) 🪼

A fully interactive, Bikini Bottom-themed birthday website crafted for your girlfriend with pure HTML5, CSS3, and modern vanilla JavaScript.

---

## 🌟 Features Included

1. **Ahhh, Ze Bikini Bottom... (Intro Gate)**:
   - Classic French Narrator underwater broadcast card.
   - SpongeBob *"I'm Ready!"* dive button with realistic foghorn nautical audio.
2. **3x3 Bikini Bottom Cast Wishes (Bamboo Grid)**:
   - Styled after the original SpongeBob character bamboo grid (`spongebob_grid.jpg`).
   - 9 interactive characters: **SpongeBob, Patrick, Mr. Krabs, Pearl, Mrs. Puff, Squidward, Sandy, Plankton & Karen, Gary the Snail**.
   - Clicking each character plays their signature sound effect (Gary meow, Krabs coin chime, Squidward honk, SpongeBob giggles) and opens a personal birthday greeting popup.
3. **Jellyfish Fields Catching Mini-Game**:
   - Swimming animated jellyfish across an underwater kelp meadow.
   - Click/tap to catch with SpongeBob's net, score counter, and zaps.
   - Special glowing **Queen Jellyfish** with a surprise royal decree!
4. **The Secret Love Formula (Krabby Patty Builder)**:
   - Interactive stacking burger: Toasted Buns, Soulmate Patty, Joy Cheese, Loyalty Lettuce, Hugs Tomato, Kisses Pickles, and Secret Love Formula.
   - "Auto Stack" and "Reset" buttons. Completion unlocks Mr. Krabs' Official Approval certificate!
5. **Message in a Nautical Bottle (Love Letter)**:
   - Floating glass bottle with animated cork.
   - Uncork to reveal a rolled aged parchment love letter with romantic SpongeBob quotes and heartfelt message.
6. **Bikini Bottom Memories Scrapbook**:
   - Polaroid photo cards with yellow tape and bamboo tilt.
   - Displays the movie crew artwork, original 3x3 cast photo, and slots for couple photos.
7. **Krusty Krab Birthday Cake & Candle Blowout**:
   - 3-tier colorful animated cake with 5 flickering candles.
   - Click *"BLOW OUT THE CANDLES"* -> candles extinguish with smoke puffs -> confetti cannon explodes -> celebratory Happy Birthday fanfare!
   - *"Light Candles Again"* button.
8. **Synthesized Web Audio API (Zero External MP3s Needed)**:
   - Built-in Hawaiian tropical ukulele chords BGM.
   - Bubble popping sounds (`bloop!`).
   - Gary's "Meow", Mr. Krabs' coins, foghorn, and birthday fanfare.
   - BGM, Sound FX, and Jelly Net toggles on the top HUD bar.

---

## 🚀 How to Open & Run

Simply double-click `index.html` or open it in any web browser (Chrome, Edge, Firefox, Safari).

To run a quick local server:
```bash
# In terminal:
cd "d:-Documents\PROJECT MEMOuirthdayirthday_template_3"
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

---

## 🛠️ How to Customize

Open `script.js` in any text editor. At the very top, edit `BIRTHDAY_CONFIG`:

```javascript
const BIRTHDAY_CONFIG = {
  girlfriendName: "My Sweet Queen", // Put her real name here!
  nickname: "Princess of Bikini Bottom",
  boyfriendName: "Your Loving Boyfriend ❤️", // Put your name here!
  birthdayDate: "Today",
  ...
};
```

### Adding Your Own Photos:
1. Place your pictures into `assets/images/` (e.g. `our_photo_1.jpg`).
2. Open `index.html` and look for the `<!-- SECTION 5: BIKINI BOTTOM MEMORIES -->`.
3. Replace the placeholder div with:
```html
<img src="assets/images/our_photo_1.jpg" alt="Our Memory" />
```
