# Weekly Timetable Web App

A clean, responsive weekly timetable/schedule manager built with vanilla HTML, CSS, and JavaScript.

## Features

- **Weekly grid view** — 7-day timetable from 7 AM to 9 PM
- **Add entries** — Click any cell or use the "Add Entry" button
- **Edit & delete** — Click an existing entry to modify or remove it
- **Color coding** — 8 color options to categorize entries
- **Overlap detection** — Prevents scheduling conflicts
- **Local storage** — Data persists across browser sessions
- **Responsive design** — Works on desktop, tablet, and mobile

## Getting Started

1. Open `index.html` in a web browser
2. Click **+ Add Entry** or click any time slot to create an entry
3. Fill in the title, day, start/end times, location, and choose a color
4. Click **Save** to add it to the timetable

## Project Structure

```
├── index.html          # Main HTML page
├── css/
│   └── style.css       # Styles
├── js/
│   └── app.js          # Application logic
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## Usage Tips

- **Quick add**: Click directly on a time slot cell to pre-fill the day and time
- **Edit**: Click on any colored entry block to open the edit form
- **Delete**: Open an entry for editing and click the red Delete button
- **Keyboard**: Press `Escape` to close the modal
