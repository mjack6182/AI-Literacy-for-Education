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

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Course Context

**Course:** Art 477 — Interactive Design  
**Institution:** University of Wisconsin–Parkside  
**Term:** Spring 2026  
**Student:** Jack Miller
