# AI Collaboration Log

## Project

Task Tracker

## AI Tools Used

- ChatGPT
- GitHub Copilot in VS Code

## Conversation 1: Planning and Project Setup

I used ChatGPT to help me narrow my original ideas into a task and deadline tracker that was small enough to complete for Project Zed. I decided that the app would be designed for people managing multiple projects and deadlines.

We separated the MVP from the stretch goals so I would not try to build too much at once. I decided that my new technique would be using JavaScript dates to compare and organize deadlines.

ChatGPT also helped me organize the repository requirements and the first version of my agent.md file.

### What I learned

I learned that an MVP does not need to include every feature I eventually want. The most important part is getting one core feature completely working before adding extras.

## Conversation 2: Creating a Task

I used ChatGPT to help me connect my HTML form to JavaScript so a task appears on the page after the form is submitted.

### What I learned

I learned that `event.preventDefault()` stops the form from refreshing the page, and that JavaScript can create new HTML elements with `document.createElement()`.

## Conversation 3: Saving Tasks with localStorage

I used ChatGPT to help me change Task Tracker so tasks are saved in the browser instead of disappearing when the page refreshes.

### What I learned

I learned that localStorage stores information as text. `JSON.stringify()` changes my tasks array into text so it can be saved, and `JSON.parse()` changes the saved text back into a JavaScript array when the page loads.

I tested the feature by adding multiple tasks and refreshing the page. The tasks were still there after the refresh.

## Conversation 4: Comparing Deadlines with JavaScript Dates

I used ChatGPT to help me learn how JavaScript can compare a task due date with the current date.

### What I learned

I learned that the date from the form can be separated into year, month, and day and turned into a JavaScript Date object. I also learned that JavaScript months begin with 0, so the month has to be adjusted by subtracting 1.

The app sets the current time to midnight before comparing dates so the time of day does not accidentally make a task due today appear overdue.

I tested the feature with a past date, today's date, and a future date. The app correctly displayed Overdue, Due Today, and Upcoming.

## Debugging Session: Tasks Not Displaying

After adding the completed-task feature, new tasks stopped appearing on the page.

I used ChatGPT to help review my JavaScript. The problem was a missing closing curly brace at the end of the displayTasks() function. Because the function was not closed correctly, the browser stopped running the rest of the JavaScript.

### What I learned

I learned that one missing brace can stop an entire JavaScript file from working. I also learned to check the browser console and look closely at where functions begin and end when something suddenly stops working.