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