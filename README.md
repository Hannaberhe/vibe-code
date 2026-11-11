# Wallet Check

**Live website:** [wallet-check-roast.vercel.app](https://wallet-check-roast.vercel.app)

**Code:** [github.com/Hannaberhe/vibe-code](https://github.com/Hannaberhe/vibe-code)

See how much work time a purchase costs. Get a short, funny joke about it. Build good coding habits while you work toward your goals.

## Team Members

- makbel727@gmail.com
- merhanberhe@gmail.com
- yeshiwasadam@gmail.com
- Abdulaziz Ayalew — abdulazizayalewmussa@gmail.con

## Why we built it

A price is easy to see. The time needed to earn that money is easy to forget.

Wallet Check makes that time clear. It helps young people think about purchases and plan meals. It also gives them simple daily coding tasks. Friendly jokes make it fun to use.

## How to use it

### Check a purchase

1. Choose **Buy something**.
2. Enter the item name and price.
3. Enter how much you earn in one hour.
4. Choose your currency. Use the same currency for both amounts.
5. Press **Calculate & roast me**.

Example: headphones cost **2,000 birr**. You earn **100 birr per hour**.

```text
2,000 ÷ 100 = 20 hours of work
20 ÷ 8 = 2.5 workdays
```

The answer shows your work hours, workdays, and a short joke. We use an 8-hour workday.

### Plan a meal

1. Choose **Plan a meal**.
2. Enter the food name and price.
3. Enter how much you earn in one day.
4. Press **Calculate & roast me**.

Example: tibs costs **650 birr**. You earn **300 birr per day**.

```text
650 ÷ 300 = about 2.17 days of pay
Round up = 3 full workdays
```

This estimate uses all your daily pay for that meal. Other costs are not included. If you need money for rent, transport, or other needs, saving for the meal will take longer. These are workdays, not calendar dates.

Example prices are for the demo. They are not live shop or restaurant prices.

### Build your coding habits

Your current item or meal also appears in the coding section as your goal.

| Daily task | Points |
| --- | ---: |
| Save one useful code change with Git | 25 XP |
| Solve one coding problem | 30 XP |
| Code for 25 focused minutes | 20 XP |

**XP means practice points.** A full day gives 75 XP. You tick the tasks yourself. The app does not check GitHub or LeetCode.

Finish all three tasks to earn a **15-minute game-break timer**. Play your own game during this time. The app does not include games or block other apps.

Your streak counts days in a row when you finished all three tasks. A free rest day keeps the streak safe but adds no extra points. A missed day without a rest pass breaks the streak. New tasks use the date on your device.

Points do not become money. Finishing tasks does not change your pay or meal estimate.

### Choose your roast level

Open **Make it yours**. Add your name, learning track, roast level, and daily life.

- **Gentle:** kind jokes and support.
- **Medium:** a little more teasing.
- **Strong:** stronger jokes, with simple words and no personal insults.

Young parents and caregivers always get kind coding feedback. Everyone can take a free rest day when life gets busy.

These settings control the coding coach. Shopping and food jokes stay short and friendly.

## Other features

- Birr, US dollars, euros, pounds, Kenyan shillings, naira, and rupees. These are currency labels; the app does not convert exchange rates.
- Example items and meals for a quick demo.
- A buy button that runs away from your mouse. After a few moves, you can catch it. Nothing is really bought.
- Result animations, a points bar, and confetti when you choose to save or plan a meal.
- Copy your result and share it, if your browser allows copying.
- Clear messages for missing names, zero pay, negative amounts, and other invalid inputs.
- Your inputs stay in place when you switch between shopping and food.
- Phone and computer layouts, keyboard support, and reduced motion support.

## Simple jokes

We use short sentences and familiar words. For example:

> Your stomach said yes. Your wallet asked, “How many days?”

> You checked the price five times. Have you checked your code once?

The jokes are for fun. They do not judge a person's worth or family duties.

## How it fits the judging criteria

This table explains our choices. It does not claim a judging score.

| Criterion | Points available | What we built |
| --- | ---: | --- |
| UI: visual look and polish | 12 | A clear calculator, a receipt-style result, a wallet drawing, and a dark coding section. |
| UI: motion and interaction | 11 | A moving buy button, result animation, confetti, a points bar, and a break timer. |
| UI: clear in the first 30 seconds | 12 | A short three-step guide, clear buttons, filled examples, and no sign-up. |
| Functionality: the main flow works | 15 | Enter a goal and pay, calculate the time, read a joke, and track coding tasks. |
| Functionality: real feature depth | 10 | Shopping, food plans, saved progress, points, streaks, roast levels, rest passes, and game breaks. |
| Functionality: handles odd clicks and small screens | 10 | Input checks, protection against repeated calculation clicks, safe progress loading, phone layouts, and keyboard controls. |
| Spirit: idea and originality | 10 | Everyday spending, food goals, jokes, and coding habits in one app. |
| Spirit: fun and humor | 10 | Simple jokes, local food examples, a moving button, and earned breaks. |
| Spirit: smart use of AI and ambition for 60 minutes | 10 | AI-assisted coding helped build the demo. Local joke templates keep the live app working without an AI key. |
| **Total** | **100** | **UI 35 + Functionality 35 + Spirit 30** |

## A 60-second demo

1. **0–10 seconds:** Say, “Prices tell us the money. Wallet Check tells us the work time.” Show the headphones example.
2. **10–25 seconds:** Choose **Plan a meal**. Use 650 birr and 300 birr per day. Show the 3-workday answer and its joke.
3. **25–35 seconds:** Try to catch **Buy it anyway**. Choose to save or plan the meal and show the confetti.
4. **35–50 seconds:** Open the coding section. Tick the three tasks. Show 75 XP and start the break timer.
5. **50–60 seconds:** Show a free rest day. Explain that family comes first. Share the Vercel link.

For a fresh demo, press **Reset progress**, then press it again to confirm. This clears coding history on that browser only.

## Run on your computer

You need Python 3. Open a terminal in this project folder and run:

```bash
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

There are no app packages to install. The ready-to-use browser file is included. Use the local server to preview the app.

After editing the JavaScript files or README, run `node build.mjs`. This updates the browser file and public README copy.

## Run the checks

You need Node.js 20 or newer. In the project folder, run:

```bash
node --test tests/core.test.mjs
node --check app.js
node --check grind-ui.js
node --check bundle.js
```

Tests cover shopping and food math, invalid inputs, decimal amounts, points, streaks, rest passes, date changes, and damaged saved data. Browser checks also cover the forms, phone and computer layouts, roast settings, saved progress after a reload, and the break timer.

## Deploy on Vercel

Use this project folder as the root. Choose **Other** as the framework. Leave the build and install commands empty. Set the output directory to `.`.

- Website: [wallet-check-roast.vercel.app](https://wallet-check-roast.vercel.app)
- README: [wallet-check-roast.vercel.app/README.md](https://wallet-check-roast.vercel.app/project-readme.txt)

## Tools and files

We use HTML, CSS, and JavaScript. Vercel hosts the website. The fonts are included with the website, so it does not wait for an external font service. Normal fonts are used as a backup. Font license files are in the assets folder.

| File | Purpose |
| --- | --- |
| `index.html` | Page content and forms. |
| `styles.css` | Colors, layout, phone support, and animations. |
| `app.js` | Calculator controls, shopping and food jokes, and result buttons. |
| `build.mjs` | Combines the code into one browser file and makes the public README copy. |
| `bundle.js` | The ready-to-use browser file. |
| `calculator.mjs` | Price, pay, and time calculations. |
| `grind-ui.js` | Coding tasks, coach feedback, settings, and timer controls. |
| `grind.mjs` | Saved progress, points, dates, and streak rules. |
| `tests/core.test.mjs` | Checks for the main calculations and progress rules. |
| `vercel.json` | Vercel settings. |

## Data and limits

- There is no account, server database, payment system, or live AI service.
- Prices and pay are calculated in the browser. They are not sent to an API.
- Coding progress and settings are saved in this browser. They are not shared between devices.
- If browser storage is blocked, progress lasts for the current visit.
- Roasts use local joke templates. No AI model runs in the live app.
- Currency selection changes the label. It does not change the amount.
- Estimates use 8-hour workdays. Taxes, other costs, and existing savings are not included.
- The app shows time costs. It does not decide whether someone can safely afford a purchase.
