# Yusuf Hamdy — AI Product Operations

A premium, commercial service and portfolio website for Yusuf Hamdy's AI-Assisted, Human-Engineered Product Operations business. Built with plain HTML5, CSS3, and vanilla JavaScript — zero external frameworks, zero runtime dependencies, blazing fast performance.

---

## 📁 File Structure

```text
/
├── index.html               # Main landing page with Hero Offer, Diagnostic Wizard, Services, Transformation Demo, & Lead Intake
├── css/
│   └── style.css            # Dark obsidian design system, responsive breakpoints, layout tokens & animations
├── js/
│   └── script.js            # Interactive diagnostic, FAQ accordion, Cal.com modal, deliverable tabs, & form validation
├── assets/
│   └── images/
│       └── og-cover.svg     # 1200×630 Open Graph social media image
├── .gitignore               # Ignores OS, temporary, and editor files
└── README.md                # Documentation, configuration points, and launch checklist
```

---

## 🚀 Running Locally

No build step or Node.js required. Either:

1. Double-click `index.html` to open directly in any browser, or
2. Serve locally with Python:

   ```bash
   py -m http.server 8080
   # then open http://localhost:8080
   ```

---

## 💼 Core Commercial Offers Configured

| Service Name | Category | Starting Price | Turnaround | Scope Boundary |
|---|---|---|---|---|
| **Developer-Ready Feature Spec Blueprint** | **HERO OFFER** | **Starting from $540** | 3–5 Business Days | 1 Core Feature Module (typically 5–8 stories), Business Rules, Gherkin AC, Edge Cases, QA Scenarios, Markdown & PDF. Includes 1 revision within 7 days. |
| **Sprint Readiness & Spec Audit** | Entry Diagnostic | **Starting from $240** | 48 Hours | Up to 10 stories / 10 pages. Comprehensive gap & risk report. **100% credited** toward a Feature Blueprint upgrade. |
| **MVP Product Discovery & Scope Blueprint** | Premium Package | **Starting from $1,450** | 10–14 Business Days | Product Brief, Personas, MoSCoW boundary, full 15–25 story backlog, phased release roadmap, two 45-min alignment calls. |
| **Async Product Operations Retainer** | Recurring | **Starting from $950 / month** | Monthly | 10–12 hrs/mo active PM support; bi-weekly 45-min planning call; up to 8 stories/mo; weekly status report; 24h async dev Q&A SLA. (By Application Only). |

### Add-ons Configured
* **Jira / Linear / ClickUp Backlog Setup:** +$350 (Workspace configuration, fields, and direct ticket import)
* **Additional Story Pack (up to 4 stories):** +$200

---

## ⚙️ Configuration Points (Before Launch)

### 1. Cal.com / Calendly Integration (Booking Discovery Calls)
In `js/script.js` on line 12:
```javascript
// CONFIGURATION POINT: If you have a live Cal.com or Calendly link, insert it here:
const CALCOM_URL = "https://cal.com/YOUR_USERNAME/20min";
```
* If left empty (`""`), clicking "Book 20-Min Discovery Call" opens a clean modal with your email address.
* If a URL is inserted, clicking the button automatically embeds your live interactive calendar iframe inside the modal.

### 2. Contact / Project Intake Form Backend
The form in `index.html` is currently in **Demo Mode** (validates client-side and confirms receipt without sending data). To receive live emails from prospective clients:

**Using Formspree (Recommended, Free tier available):**
1. Create a free form at [formspree.io](https://formspree.io).
2. In `index.html`, add `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` to `<form id="contact-form">`.
3. In `js/script.js`, update the submit handler to `fetch()` POST the form data directly.

### 3. Contact & Social Links
In `index.html`:
* **Email:** `Yu.Hamdy@nu.edu.eg` (Configured)
* **GitHub:** `https://github.com/yusufharb` (Configured)
* **LinkedIn:** Search for `linkedin.com/in/yusuf-hamdy-placeholder` in `index.html` and replace with your real profile URL.

---

## 📋 30-Day Launch Checklist

- [ ] Add your live Cal.com or Calendly link to `js/script.js` (or leave as email fallback).
- [ ] Connect the project intake form to Formspree or your preferred email webhook.
- [ ] Update your LinkedIn URL in `index.html`.
- [ ] Deploy to GitHub Pages, Netlify, or Vercel (point to `main` branch).
- [ ] Test the 3-question diagnostic wizard on desktop and mobile.
- [ ] Send 10 personalized agency outreach messages per week on LinkedIn/Clutch.
- [ ] Submit 3–4 tailored Upwork proposals per week referencing the live Transformation Demo.

---

## 🛡️ Credibility & Integrity Guarantee

* **No Fabricated Metrics:** Zero claims of fake percentages (e.g. "3.5x faster", "saves $15k") or fake client revenue stats.
* **No Fabricated Logos/Testimonials:** All sample outputs and mockups are explicitly labeled **"Demonstration Output"** or **"Sample Output"**.
* **Sanitized Client Work:** Real project work (such as the B2B Marketplace) is clearly labeled as real experience with client confidentiality protected.
