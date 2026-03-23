# Design System — KeralaStory Card Generator
**Version:** 3.0 (Claymorphic Navy Integration) | **Status:** Active | **Last Updated:** March 2026

---

## Table of Contents
1. [Design Philosophy](#1-design-philosophy)
2. [Colour System](#2-colour-system)
3. [The Clay Shadow Stack](#3-the-clay-shadow-stack)
4. [Typography](#4-typography)
5. [Component Library](#5-component-library)
6. [Responsive Layout Strategy](#6-responsive-layout-strategy)
7. [The Share Card Spec](#7-the-share-card-spec)

---

## 1. Design Philosophy

**Aesthetic: Tactile Civic Tech**
This UI merges the authoritative branding of the main KeralaStory portal with the playful, engaging mechanics of Claymorphism. 

* **The Canvas:** A breathable, light off-white page background.
* **The Vessel:** The form lives inside a massive, soft 3D Deep Navy card.
* **The Interactions:** Buttons and pills are physical objects. Unselected items bulge outward. Selected items (in Brand Yellow) physically press *into* the interface.

---

## 2. Colour System

We map the exact `keralastory.online` palette to a claymorphic environment.

```css
:root {
  /* Page Background */
  --bg-canvas: #F8F9FA;      /* Soft Off-White to match the homepage scroll */
  
  /* Primary Clay Surfaces */
  --surface-navy: #111827;   /* Deep Navy for the main card container */
  --surface-slate: #1F2937;  /* Slightly lighter navy for unselected pills */
  
  /* Brand Accents */
  --brand-yellow: #FACC15;   /* The KeralaStory speech bubble yellow */
  --brand-yellow-dim: #EAB308; /* For pressed/hover states */
  
  /* Ink / Text */
  --ink-white: #FFFFFF;      /* Primary headings on navy */
  --ink-muted: #9CA3AF;      /* Secondary text on navy */
  --ink-navy: #111827;       /* Text on yellow buttons */
}
3. The Clay Shadow Stack
Claymorphism on dark surfaces (like our Deep Navy) requires very specific shadow tuning. Light mode clay uses white/grey shadows; our dark clay uses translucent white for highlights and deep black for depth.
/* 1. Base Dark Clay (The Main Form Card) */
.shadow-clay-dark {
  box-shadow: 
    /* Soft outer drop shadow */
    0 20px 40px rgba(0, 0, 0, 0.2),
    /* Top-left light reflection */
    inset 2px 2px 8px rgba(255, 255, 255, 0.08),
    /* Bottom-right deep shadow */
    inset -4px -4px 12px rgba(0, 0, 0, 0.6);
}

/* 2. Floating Pill (Unselected, pops out) */
.shadow-clay-pill {
  box-shadow: 
    4px 4px 10px rgba(0, 0, 0, 0.3),
    inset 1px 1px 4px rgba(255, 255, 255, 0.1),
    inset -2px -2px 6px rgba(0, 0, 0, 0.4);
}

/* 3. Pressed Yellow Pill/Track (Selected, pushes in) */
.shadow-clay-pressed-yellow {
  box-shadow: 
    inset 4px 4px 8px rgba(180, 130, 0, 0.4),
    inset -4px -4px 8px rgba(255, 255, 255, 0.6);
}
Gemini said
I can’t directly generate and download a .docx file to your machine, but I can give you the cleanest possible version to grab.

Since Google Docs and Microsoft Word both natively support pasting Markdown now, the fastest path forward is to click "Copy code" on the block below and paste it directly into a blank document. It will automatically format all the headings, bullet points, and code snippets for you.

Here is the complete, finalized V3 document ready for export:

Markdown
# Design System — KeralaStory Card Generator
**Version:** 3.0 (Claymorphic Navy Integration) | **Status:** Active | **Last Updated:** March 2026

---

## Table of Contents
1. [Design Philosophy](#1-design-philosophy)
2. [Colour System](#2-colour-system)
3. [The Clay Shadow Stack](#3-the-clay-shadow-stack)
4. [Typography](#4-typography)
5. [Component Library](#5-component-library)
6. [Responsive Layout Strategy](#6-responsive-layout-strategy)
7. [The Share Card Spec](#7-the-share-card-spec)

---

## 1. Design Philosophy

**Aesthetic: Tactile Civic Tech**
This UI merges the authoritative branding of the main KeralaStory portal with the playful, engaging mechanics of Claymorphism. 

* **The Canvas:** A breathable, light off-white page background.
* **The Vessel:** The form lives inside a massive, soft 3D Deep Navy card.
* **The Interactions:** Buttons and pills are physical objects. Unselected items bulge outward. Selected items (in Brand Yellow) physically press *into* the interface.

---

## 2. Colour System

We map the exact `keralastory.online` palette to a claymorphic environment.

```css
:root {
  /* Page Background */
  --bg-canvas: #F8F9FA;      /* Soft Off-White to match the homepage scroll */
  
  /* Primary Clay Surfaces */
  --surface-navy: #111827;   /* Deep Navy for the main card container */
  --surface-slate: #1F2937;  /* Slightly lighter navy for unselected pills */
  
  /* Brand Accents */
  --brand-yellow: #FACC15;   /* The KeralaStory speech bubble yellow */
  --brand-yellow-dim: #EAB308; /* For pressed/hover states */
  
  /* Ink / Text */
  --ink-white: #FFFFFF;      /* Primary headings on navy */
  --ink-muted: #9CA3AF;      /* Secondary text on navy */
  --ink-navy: #111827;       /* Text on yellow buttons */
}
3. The Clay Shadow Stack
Claymorphism on dark surfaces (like our Deep Navy) requires very specific shadow tuning. Light mode clay uses white/grey shadows; our dark clay uses translucent white for highlights and deep black for depth.

CSS
/* 1. Base Dark Clay (The Main Form Card) */
.shadow-clay-dark {
  box-shadow: 
    /* Soft outer drop shadow */
    0 20px 40px rgba(0, 0, 0, 0.2),
    /* Top-left light reflection */
    inset 2px 2px 8px rgba(255, 255, 255, 0.08),
    /* Bottom-right deep shadow */
    inset -4px -4px 12px rgba(0, 0, 0, 0.6);
}

/* 2. Floating Pill (Unselected, pops out) */
.shadow-clay-pill {
  box-shadow: 
    4px 4px 10px rgba(0, 0, 0, 0.3),
    inset 1px 1px 4px rgba(255, 255, 255, 0.1),
    inset -2px -2px 6px rgba(0, 0, 0, 0.4);
}

/* 3. Pressed Yellow Pill/Track (Selected, pushes in) */
.shadow-clay-pressed-yellow {
  box-shadow: 
    inset 4px 4px 8px rgba(180, 130, 0, 0.4),
    inset -4px -4px 8px rgba(255, 255, 255, 0.6);
}
4. Typography
Aligning entirely with the homepage for a seamless transition. Emojis are stripped out to maintain authoritative credibility.

Font Family: Inter, DM Sans, or Poppins (matching the main site).

Headlines: Bold (700), highly legible.

Form Labels: Medium (500), muted grey.
body {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
5. Component Library
5.1 The Form Container
A soft, heavy, floating object holding the inputs.

CSS
.story-form-container {
  background-color: var(--surface-navy);
  border-radius: 32px;
  padding: 40px; /* Adjust to 24px on mobile */
  color: var(--ink-white);
  border: none;
  /* Applies the Dark Clay shadow stack */
  @extend .shadow-clay-dark; 
}
5.2 Tactile Age Slider
The track is cut into the navy card. The thumb is a bright yellow clay bead sitting inside it.

CSS
.clay-slider-track {
  height: 16px;
  border-radius: 999px;
  background: #0F172A; /* Darker than the card */
  box-shadow: inset 2px 2px 6px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(255,255,255,0.05);
  position: relative;
}

.clay-slider-thumb {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--brand-yellow);
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.3),
    inset 2px 2px 4px rgba(255,255,255,0.8),
    inset -2px -2px 4px rgba(180, 130, 0, 0.3);
  cursor: grab;
}
5.3 Identity & Priority Pills
These replace the flat outline buttons from V1.

CSS
.clay-pill {
  padding: 12px 24px;
  border-radius: 20px; /* Soft, pill-shape */
  background: var(--surface-slate);
  color: var(--ink-muted);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); /* Springy bounce */
  @extend .shadow-clay-pill;
}

.clay-pill.active {
  background: var(--brand-yellow);
  color: var(--ink-navy);
  font-weight: 700;
  transform: scale(0.96); /* Physically compresses */
  @extend .shadow-clay-pressed-yellow;
}
5.4 Primary CTA Button
Mimics the "YES" button on the homepage poll, but with soft 3D volume.

CSS
.btn-clay-submit {
  width: 100%;
  padding: 20px;
  border-radius: 24px;
  background: var(--brand-yellow);
  color: var(--ink-navy);
  font-size: 1.25rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  box-shadow: 
    0 8px 16px rgba(250, 204, 21, 0.2),
    inset 2px 2px 6px rgba(255, 255, 255, 0.8),
    inset -4px -4px 8px rgba(180, 130, 0, 0.4);
  transition: all 0.15s ease;
}

.btn-clay-submit:active {
  transform: translateY(4px) scale(0.98);
  box-shadow: @extend .shadow-clay-pressed-yellow;
}
6. Responsive Layout Strategy
Desktop View (≥ 1024px)
A two-column layout that clearly separates the "Input" from the "Output".

Container: max-width: 1280px, margin: 0 auto, padding: 64px 32px.

Grid: display: grid; grid-template-columns: 1fr 1fr; gap: 64px;

Left Column: Sticky positioning. Holds the Deep Navy clay form.

Right Column: Displays the generated "Share Card" preview on the soft off-white canvas, alongside claymorphic social share buttons.

Mobile View (< 1024px)
A stacked, highly tactile scrolling experience optimized for thumb reach.

Container: padding: 24px 16px.

Flow: The Deep Navy clay form takes up 100% of the viewport width (minus padding).

Pill Grids: Change from flex-wrap to a side-scrolling drag carousel (overflow-x: auto; scroll-snap-type: x mandatory;) or a tight grid (grid-template-columns: repeat(2, 1fr)) to save vertical space.

Upon Generation: The page smoothly scrolls down to reveal the generated Share Card, bringing the "Share" buttons directly under the user's thumb.