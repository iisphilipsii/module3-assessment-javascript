# Monthly Expense Tracker

Hourly workers' pay changes from week to week depending on how many shifts they work, so entering each weekly payslip as it arrives gives a more accurate, up-to-date picture of the month than a single fixed salary figure.

A one-page expense tracker for hourly workers, built with HTML, CSS and JavaScript, where you enter your weekly take-home pay and your expenses to see your monthly balance update in real time.

**Live site:** https://iisphilipsii.github.io/module3-assessment-javascript/

## Concept

Hourly workers' pay changes from week to week depending on how many shifts they work, so a single monthly salary figure doesn't reflect their real income. This app lets you enter the take-home pay from each weekly payslip as it arrives, so your balance is useful part way through the month, not just once every payslip is in.

Alongside your income and spending, the app shows the Irish public holidays in the current month, since public holidays can affect shift patterns and pay.

## Features

- **Monthly summary:** your balance, total income and total expenses at the top of the page. The balance turns red if you've spent more than you've earned.
- **Add expenses:** enter a description and an amount. The form checks what you've entered without reloading the page and tells you exactly what to fix, such as an empty description or an amount of €0.
- **Transactions list:** each expense appears in a list built by JavaScript, with a delete (×) button on every row. The totals update straight away.
- **Weekly income:** enter your take-home pay for Weeks 1 to 4. Empty weeks count as €0, so you can set your income part way through the month. For months with five paydays, "+ Add week 5" adds a fifth week.
- **Public holidays this month:** loaded live from the Nager.Date API. If the holidays can't be loaded, a message explains this and the rest of the app keeps working.
- **Saved automatically:** your expenses, income and week boxes are saved in your browser, so they're still there after a refresh. "Start new month" clears everything for a fresh month.
- **Works on any screen:** the layout adapts for phones, tablets and desktops.
- **Accessible:** semantic HTML, a label for every form field, buttons and links that work with the keyboard, visible focus outlines, and messages that screen readers read out.

## Accessing the hosted project

1. Open https://iisphilipsii.github.io/module3-assessment-javascript/ in an up-to-date browser such as Chrome, Edge, Firefox or Safari, on a computer, tablet or phone.
2. There's nothing to install and no account to create.
3. The public holidays section needs an internet connection. Everything else keeps working once the page has loaded.

## How to use it

1. Under **Monthly income**, enter your take-home pay for each week you've been paid so far, then select **Set income**.
2. Under **Add expense**, enter a description and an amount, then select **Add expense**.
3. To remove an expense, select the **×** at the end of its row.
4. If the month has five paydays, select **+ Add week 5**.
5. At the start of the next month, select **Start new month** in the summary card.

## Running it locally

1. Clone the repository:

   ```
   git clone https://github.com/iisphilipsii/module3-assessment-javascript.git
   ```

2. Open `index.html` in your browser, or open the folder in VS Code and use the Live Server extension.

## Assumptions

- You're paid weekly by one employer, and you enter the take-home (net) pay from each payslip.
- A month has four or five paydays: a weekly payday can fall at most five times in any month.
- The app tracks one month at a time; "Start new month" resets it.
- All amounts are in euro (€) and shown to two decimal places.

## Privacy

Your data is stored only in your browser's local storage on your own device. Nothing is sent to a server, and it isn't shared between browsers or devices. Selecting "Start new month" or clearing your browser data deletes it. The only outside request is to the Nager.Date API, which receives just the year and the country code (IE).

## Built with

- HTML, CSS and plain JavaScript, with no frameworks or libraries
- The [Nager.Date](https://date.nager.at) public holidays API
- Git and GitHub, hosted on GitHub Pages

## Project structure

```
index.html         Page structure
style.css          Styles and responsive layout
script.js          All of the app's interactivity
images/logo.svg    App logo
README.md          This file
```

## Credits and acknowledgements

- **Layout inspiration:** Inspired by personal past work experiences.
- **Holiday data:** [Nager.Date](https://date.nager.at).
