# Wallet Check

**Live website:** [wallet-check-roast.vercel.app](https://wallet-check-roast.vercel.app)

**Code:** [github.com/Hannaberhe/vibe-code](https://github.com/Hannaberhe/vibe-code)

**Wallet Check turns prices into work time. It uses friendly humor and daily coding tasks to help young people think about money, time, and personal goals.**

## Project Description

Wallet Check is a web app for students, young workers, and people learning to code. It brings together three everyday questions: How much work does this purchase cost? How many days of pay would cover the meal I want? What small step can I take toward my coding goals today?

The app starts with a simple purchase calculator. You enter an item, its price, and your pay per hour. Wallet Check turns that price into work hours and 8-hour workdays. It shows the answer on a receipt-style card, so the cost is easy to understand. A pair of headphones priced at 2,000 birr becomes **20 hours of work** for someone earning 100 birr per hour.

The food planner uses the same idea with daily pay. You enter a meal and its price, then enter how much you earn each day. The app shows how many full workdays of pay would cover it. For example, a 650 birr meal at 300 birr per day needs about 2.17 days of pay, rounded up to **3 full workdays**. This assumes all daily pay goes toward the meal. It does not include other living costs.

After each calculation, the app adds a short roast: a playful joke about the purchase. Shopping jokes change based on how much work the item costs. Food jokes keep the mood light while you plan the meal. The words are simple, so people who do not speak English as their first language can enjoy them too. The jokes focus on choices and habits, rather than a person's value or family duties.

The coding section connects your current purchase or meal to a daily practice routine. Your goal stays visible while you work on three tasks: save a useful code change, solve a coding problem, and code for 25 focused minutes. You tick the tasks yourself and collect practice points called XP. Completing all three gives 75 XP and unlocks a 15-minute game-break timer. These points show effort; they do not become money or reduce the price of your goal.

You can add your name, choose what you are learning, and select a gentle, medium, or strong coding roast. Parents and caregivers always receive kind feedback. A free rest-day pass protects the daily streak when real responsibilities need attention. This makes room for both steady practice and real life.

The app works without sign-up. Calculations run in the browser, and coding progress is saved on the same device. It uses local joke templates, so the live demo does not need an AI key or a paid AI service. The interface includes example purchases, local food examples, animations, a moving buy button, and clear error messages. It works on phones and computers.

### How the three parts connect

| Part | What you enter or do | What you get |
| --- | --- | --- |
| Purchase check | Enter an item, price, and hourly pay. | The work time behind the price, plus a funny message. |
| Food plan | Enter a meal, price, and daily pay. | The full workdays of pay needed to cover the meal. |
| Coding habits | Keep your goal visible and tick completed tasks. | Practice points, a daily streak, coach feedback, and a game break. |

### Who can use it?

- **Students** who want to understand the time behind everyday spending.
- **Young workers** who want a quick way to think about purchases and meals.
- **New developers** who want a simple daily coding routine.
- **Busy parents and caregivers** who need flexible goals and supportive feedback.
- **Hackathon visitors** who want to try a working, funny demo without creating an account.

### A simple example

A user wants a new phone. They enter the price and their hourly pay, then see how many workdays it would take to pay for it. A joke makes the result memorable. They can decide to save their money, check a smaller purchase, or switch to planning a meal. Their current goal also appears in the coding section, where they can finish small tasks and track their practice.

The main goal is to make the link between time and money clear, while making daily progress feel encouraging and fun.

## Team Members

- Makbel Nega - makbel727@gmail.com
- Merhan Berhe - merhanberhe@gmail.com
- Yeshiwas Adam - yeshiwasadam@gmail.com
- Abdulaziz Ayalew - abdulazizayalewmussa@gmail.con

## Why we built it

A price is easy to see. The time needed to earn that money is easy to forget. A number such as 2,000 birr may feel different when it is shown as 20 hours of work.

We wanted to make that connection easy to understand. The app gives users a clear estimate before they decide what to buy or how to plan a meal. It does not make the decision for them.

Our team also wanted to connect personal goals with daily learning. A visible goal can remind someone why they want to keep practicing. Small coding tasks give them a clear place to start, while points and breaks make progress easy to notice.

Humor helps keep the experience friendly. Short jokes and playful interactions make the calculations more memorable. Free rest days and kind caregiver feedback keep the app flexible when life gets busy.

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
