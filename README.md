# AI Literacy for Education

A guided learning experience for students and teachers navigating AI — honestly, practically, and together.

Built for **Art 477** at the **University of Wisconsin–Parkside**, Spring 2026.

---

## Overview

This project is an interactive web application that helps two audiences navigate artificial intelligence in higher education:

- **Students** — learn which tools to use, how to prompt effectively, where the ethical lines are, and what real students have done well (and badly)
- **Teachers** — find tools that save prep time, redesign assessments for the AI era, write a syllabus policy that holds up, and see what peer institutions have actually tried

All content is grounded in research from MIT, Harvard, Stanford, Cornell, UW–Madison, EDUCAUSE, and Wiley (May 2026). Sources are cited inline and link out to the originating institutions.

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — stats strip, AI literacy framework, What is AI section, persona picker |
| `/student` | Student persona — tools, prompting techniques, ethics, real examples, resources |
| `/teacher` | Teacher persona — tools, assignment design, classroom policy, real examples, resources |

---

## Features

- **Scroll-driven WhatIsAI section** — four tabs (LLMs, Generative AI, AI Agents, Limits & Hallucinations) that advance as you scroll, with smooth animation between sections
- **Animated stats strip** — four key statistics count up from 0 when scrolled into view (86% student AI use, 96% instructor concern about cheating, 39% institutions with policy, 42% students feel faculty are prepared)
- **Conversational chat UI** — content on persona pages is rendered as a dialogue between user questions and AI responses, with scroll-reveal animations on each bubble
- **Per-persona color theming** — student pages use warm beige (`#C9AD93`), teacher pages use slate blue (`#8BAFC2`), scoped via CSS custom properties
- **Clickable source rows** — resource blocks link directly to institutional pages; rows without verified URLs render as non-clickable but still visible
- **AI avatar tooltip** — pulsing ring affordance signals the sparkle icon is hoverable; tooltip reveals the model and mode ("Claude Sonnet 4.6 · Research mode")

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Routing | React Router v7 |
| Styling | CSS custom properties (no CSS framework) |
| Icons | React Icons |
| Fonts | Big Shoulders Display, Zain, Inter (Google Fonts) |

---

## CSS Animations

The project uses 8 named `@keyframes` animations:

| Animation | Applied to |
|---|---|
| `float` | SVG illustrations — gentle vertical bob |
| `heroReveal` | Hero section elements — staggered entrance |
| `panelReveal` | WhatIsAI tab content — fade + slide up on section change |
| `slideInRight` | Persona section articles — entrance on topic select |
| `avatarPulse` | AI avatar ring — expanding ring to signal hover affordance |
| `barSlideIn` | Sidebar active indicator — accent bar slides in |
| `blink` | Hero cursor — blinking text cursor |
| `fadeIn` | Welcome screen — fade in on load |

JavaScript-driven animation: stat numbers count up from 0 using `requestAnimationFrame` with an easeOutCubic curve and staggered start times.

---

## Project Structure

```
src/
├── components/
│   ├── landing/         # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── StatsStrip.tsx
│   │   ├── HowItWorks.tsx       # EDUCAUSE Four Pillars
│   │   ├── WhatIsAI.tsx         # Scroll-driven tab section
│   │   ├── PersonaPicker.tsx
│   │   └── Footer.tsx
│   ├── shared/          # Reusable components
│   │   ├── ContentBlock.tsx     # Block renderer (p, h, list, callout, etc.)
│   │   ├── Icon.tsx
│   │   └── TopNav.tsx
│   └── shell/           # Persona page layout
│       ├── PersonaShell.tsx     # Chat UI, sidebar, conversation grouping
│       └── PersonaShell.css
├── data/
│   └── content.ts       # All student + teacher content + type definitions
├── hooks/
│   └── useScrollReveal.ts
├── pages/
│   ├── Landing.tsx
│   ├── Student.tsx
│   └── Teacher.tsx
└── styles/
    └── tokens.css       # CSS custom property design tokens
```

---

## Content Sources

Content was researched and synthesized from the following institutions and publications:

- **MIT** — OpenCourseWare, Sloan EdTech prompt engineering research
- **Harvard** — Bok Center Teaching + AI oral assessment guides
- **Stanford** — CTL syllabus templates, AIMES program, AI Quests
- **Cornell** — Center for Teaching Innovation AI & academic integrity framework
- **UW–Madison** — IT Services Microsoft Copilot rollout, AI policy guidance
- **EDUCAUSE** — AI Literacy in Teaching and Learning (ALTL) framework, 2024 Action Plan
- **Wiley** — Academic Integrity in the Age of AI survey, 2024–2025
- **Ellucian / Thesify** — 2025 student AI usage survey data

---

## Running Locally

Follow these steps to run the project on your own computer. No prior experience required.

---

### Step 1 — Install Node.js

Node.js is the engine that runs the project. You only need to install it once.

**On Mac:**

1. Open your browser and go to [https://nodejs.org](https://nodejs.org)
2. Click the button labeled **"LTS"** (the recommended version)
3. Open the downloaded `.pkg` file and follow the installer steps
4. When it finishes, open the **Terminal** app (press `Cmd + Space`, type `Terminal`, press Enter)
5. Type the following and press Enter to confirm the install worked:
   ```
   node --version
   ```
   You should see a version number like `v20.x.x`.

**On Windows:**

1. Open your browser and go to [https://nodejs.org](https://nodejs.org)
2. Click the button labeled **"LTS"** (the recommended version)
3. Open the downloaded `.msi` file and follow the installer steps — accept all defaults
4. When it finishes, open **Command Prompt** (press `Windows key`, type `cmd`, press Enter)
5. Type the following and press Enter to confirm the install worked:
   ```
   node --version
   ```
   You should see a version number like `v20.x.x`.

---

### Step 2 — Download the project

If you haven't already downloaded the project files:

1. On this GitHub page, click the green **"Code"** button near the top right
2. Click **"Download ZIP"**
3. Unzip the downloaded file — you'll get a folder called `AI-Literacy-for-Education`

If you have Git installed, you can also clone it:
```
git clone https://github.com/YOUR_USERNAME/AI-Literacy-for-Education.git
```

---

### Step 3 — Open a terminal in the project folder

**On Mac:**

1. Open **Terminal**
2. Type `cd ` (with a space after it), then drag the project folder into the Terminal window — this fills in the path automatically
3. Press Enter

**On Windows:**

1. Open the project folder in File Explorer
2. Click the address bar at the top, type `cmd`, and press Enter — this opens Command Prompt already inside that folder

---

### Step 4 — Install dependencies

This downloads everything the project needs to run. Type the following and press Enter:

```
npm install
```

Wait for it to finish — it may take a minute. You'll see a lot of text scroll by; that's normal.

---

### Step 5 — Start the app

```
npm run dev
```

You'll see output that includes a line like:

```
  ➜  Local:   http://localhost:5173/
```

---

### Step 6 — Open it in your browser

Open your browser and go to:

**[http://localhost:5173](http://localhost:5173)**

The site will load. It automatically refreshes whenever you save a file.

---

### Stopping the app

Go back to your terminal and press **`Ctrl + C`** (on both Mac and Windows) to stop the server.

---

## Course Context

**Course:** Art 477 — Interactive Design  
**Institution:** University of Wisconsin–Parkside  
**Term:** Spring 2026  
**Student:** Jack Miller
