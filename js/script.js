/* =========================================================
   Yusuf Hamdy — AI Product Operations
   Vanilla JS — Nav, Scroll Spy, Reveal, Hero Flow, Timeline,
   Transformation Tabs, Deliverable Tabs, Interactive Diagnostic,
   FAQ Accordion, Service Modals, Cal.com Modal, Form Validation.
   ========================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // CONFIGURATION POINT: If you have a live Cal.com or Calendly link, insert it here:
  // e.g. const CALCOM_URL = "https://cal.com/YOUR_USERNAME/20min";
  const CALCOM_URL = "";

  // Year injection
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ================================================================
     Sticky nav + scroll spy
     ================================================================ */
  const nav = document.getElementById("nav");
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
  const toTop = document.getElementById("to-top");

  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 12);
    if (toTop) toTop.classList.toggle("show", window.scrollY > 700);

    let currentId = sections[0] && sections[0].id;
    const y = window.scrollY + 140;
    for (const sec of sections) {
      if (sec.offsetTop <= y) currentId = sec.id;
    }
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
    });
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ================================================================
     Mobile menu
     ================================================================ */
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  function closeMobileMenu() {
    if (!navToggle || !mobileMenu) return;
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }
  function toggleMobileMenu() {
    if (!navToggle || !mobileMenu) return;
    const open = mobileMenu.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (navToggle) navToggle.addEventListener("click", toggleMobileMenu);
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", closeMobileMenu)
    );
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) closeMobileMenu();
    });
  }

  /* ================================================================
     Smooth scroll for in-page anchors
     ================================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      closeMobileMenu();
    });
  });

  /* ================================================================
     Scroll reveal
     ================================================================ */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ================================================================
     Hero workflow animation
     ================================================================ */
  (function heroFlow() {
    const inputChips = Array.from(document.querySelectorAll("#input-chips .chip"));
    const nodes = Array.from(document.querySelectorAll("#workflow-stack .flow-node"));
    const outputChips = Array.from(document.querySelectorAll("#output-chips .chip"));
    if (!inputChips.length) return;

    let step = 0;

    function clearAll() {
      inputChips.forEach((c) => c.classList.remove("lit"));
      nodes.forEach((n) => n.classList.remove("active"));
      outputChips.forEach((c) => c.classList.remove("lit"));
    }

    function tick() {
      const seq = [...inputChips, ...nodes, ...outputChips];
      if (step % seq.length === 0) clearAll();
      const el = seq[step % seq.length];
      el.classList.add(el.classList.contains("flow-node") ? "active" : "lit");
      step++;
    }

    if (reduceMotion) {
      inputChips.forEach((c) => c.classList.add("lit"));
      nodes.forEach((n) => n.classList.add("active"));
      outputChips.forEach((c) => c.classList.add("lit"));
      return;
    }
    tick();
    setInterval(tick, 500);
  })();

  /* ================================================================
     Timeline auto-advance
     ================================================================ */
  (function timeline() {
    const steps = Array.from(document.querySelectorAll(".tl-step"));
    if (!steps.length) return;
    let active = 0;
    let timer = null;

    function activate(i) {
      steps.forEach((s) => s.classList.remove("active"));
      steps[i].classList.add("active");
      active = i;
    }
    function next() {
      activate((active + 1) % steps.length);
    }
    function startAuto() {
      if (reduceMotion) { activate(0); return; }
      clearInterval(timer);
      timer = setInterval(next, 4400);
    }

    steps.forEach((s, i) => {
      s.addEventListener("click", () => {
        activate(i);
        startAuto();
      });
    });

    activate(0);
    startAuto();
  })();

  /* ================================================================
     Transformation tabs
     ================================================================ */
  (function transformTabs() {
    const tabs = document.querySelectorAll(".t-tab");
    const panels = document.querySelectorAll(".t-panel");
    if (!tabs.length) return;

    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabs.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        const key = btn.dataset.tab;
        panels.forEach((p) =>
          p.classList.toggle("active", p.dataset.panel === key)
        );
      });
    });
  })();

  /* ================================================================
     Deliverable showcase tabs
     ================================================================ */
  (function delivTabs() {
    const tabs = document.querySelectorAll(".d-tab");
    const panels = document.querySelectorAll(".d-panel");
    if (!tabs.length) return;

    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabs.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        const key = btn.dataset.dtab;
        panels.forEach((p) =>
          p.classList.toggle("active", p.dataset.dpanel === key)
        );
      });
    });
  })();

  /* ================================================================
     "Which Service Do I Need?" Interactive Diagnostic
     ================================================================ */
  (function diagnosticWizard() {
    const q1View = document.getElementById("diag-q1");
    const q2View = document.getElementById("diag-q2");
    const q3View = document.getElementById("diag-q3");
    const resView = document.getElementById("diag-result");
    const dots = document.querySelectorAll(".diag-step-dot");
    const restartBtn = document.getElementById("diag-restart");

    if (!q1View || !resView) return;

    let answers = { q1: "", q2: "", q3: "" };

    const SERVICES_DATA = {
      blueprint: {
        title: "Developer-Ready Feature Spec Blueprint",
        desc: "Ideal for scoping a single major feature or module. Turns raw meeting transcripts, briefs, or Figma designs into complete user stories, Gherkin acceptance criteria, edge cases, and QA scenarios.",
        price: "$540",
        time: "3–5 Days",
        deliv: "Markdown + PDF Spec",
        serviceCode: "blueprint",
      },
      audit: {
        title: "Sprint Readiness & Spec Audit",
        desc: "Ideal for reviewing existing requirements, PRDs, or draft tickets before engineers write code. Identifies missing edge cases, logic gaps, and developer ambiguities. (100% of the $240 fee is credited toward a Feature Blueprint if you upgrade).",
        price: "$240",
        time: "48 Hours",
        deliv: "Audit Report & Risk Scorecard",
        serviceCode: "audit",
      },
      mvp: {
        title: "MVP Product Discovery & Scope Blueprint",
        desc: "Ideal for founders turning a broad product vision into a structured, phased MVP scope with prioritized epics, user journeys, and a 15–25 story release backlog.",
        price: "$1,450",
        time: "10–14 Days",
        deliv: "Full MVP Backlog & Roadmap",
        serviceCode: "mvp",
      },
      retainer: {
        title: "Async Product Operations Retainer",
        desc: "Ideal for teams needing continuous bi-weekly sprint planning, ongoing ticket authoring (up to 8 stories/mo), and weekly executive status tracking on a dedicated asynchronous schedule.",
        price: "$950 / mo",
        time: "Monthly",
        deliv: "Continuous Sprint Management",
        serviceCode: "retainer",
      },
    };

    function updateDots(step) {
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === step - 1);
      });
    }

    function showStep(step) {
      q1View.classList.toggle("active", step === 1);
      q2View.classList.toggle("active", step === 2);
      q3View.classList.toggle("active", step === 3);
      resView.classList.toggle("active", step === 4);
      updateDots(step);
    }

    function calculateResult() {
      let recKey = "blueprint"; // Default Hero Offer

      if (answers.q1 === "audit" || answers.q2 === "mid-sprint" || answers.q3 === "rapid") {
        recKey = "audit";
      } else if (answers.q1 === "mvp" || answers.q3 === "discovery") {
        recKey = "mvp";
      } else if (answers.q1 === "retainer" || answers.q3 === "ongoing") {
        recKey = "retainer";
      } else {
        recKey = "blueprint";
      }

      const rec = SERVICES_DATA[recKey];
      document.getElementById("res-title").textContent = rec.title;
      document.getElementById("res-desc").textContent = rec.desc;
      document.getElementById("res-price").textContent = rec.price;
      document.getElementById("res-time").textContent = rec.time;
      document.getElementById("res-deliv").textContent = rec.deliv;

      const ctaBtn = document.getElementById("res-cta");
      ctaBtn.setAttribute("data-select-service", rec.serviceCode);

      showStep(4);
    }

    // Step 1 Options
    q1View.querySelectorAll("[data-q1]").forEach((btn) => {
      btn.addEventListener("click", () => {
        answers.q1 = btn.dataset.q1;
        showStep(2);
      });
    });

    // Step 2 Options
    q2View.querySelectorAll("[data-q2]").forEach((btn) => {
      btn.addEventListener("click", () => {
        answers.q2 = btn.dataset.q2;
        showStep(3);
      });
    });

    // Step 3 Options
    q3View.querySelectorAll("[data-q3]").forEach((btn) => {
      btn.addEventListener("click", () => {
        answers.q3 = btn.dataset.q3;
        calculateResult();
      });
    });

    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        answers = { q1: "", q2: "", q3: "" };
        showStep(1);
      });
    }
  })();

  /* ================================================================
     FAQ Accordion
     ================================================================ */
  (function faqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const trigger = item.querySelector(".faq-trigger");
      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        faqItems.forEach((other) => {
          other.classList.remove("open");
          other.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  })();

  /* ================================================================
     Auto-selecting service in contact form from buttons
     ================================================================ */
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-select-service]");
    if (trigger) {
      const serviceVal = trigger.getAttribute("data-select-service");
      const selectEl = document.getElementById("f-service");
      if (selectEl && serviceVal) {
        selectEl.value = serviceVal;
      }
    }
  });

  /* ================================================================
     Service Details Modal Content
     ================================================================ */
  const SERVICE_DETAILS = {
    blueprint: {
      title: "Developer-Ready Feature Spec Blueprint — Full Scope",
      body: `SERVICE OVERVIEW
Name: Developer-Ready Feature Spec Blueprint (HERO OFFER)
Starting Price: $540 (Fixed price per core module)
Turnaround: 3 to 5 business days
Primary Deliverable: Clean Markdown Spec + Executive PDF Summary

1. WHO IS IT FOR?
- Boutique software development agencies (5–25 people) who want senior engineers building code instead of writing Jira tickets.
- Seed-stage SaaS founders preparing to hand off a major feature release to their development squad.

2. WHAT PROBLEM DOES IT SOLVE?
- Eliminates mid-sprint stalls caused by unstated edge cases, ambiguous acceptance criteria, and missing database constraints.

3. INCLUDED DELIVERABLES:
- 1 Core Feature Module (typically 5 to 8 user stories)
- Business Rules & Logic Constraint Matrix
- Gherkin Acceptance Criteria (Given / When / Then)
- Boundary Edge Cases & Negative Paths Matrix
- Tabular QA Test Scenarios Suite
- Clean Markdown file (ready for direct Jira / Linear / ClickUp import)
- Executive PDF summary for stakeholders
- 1 structured revision round within 7 calendar days

4. EXCLUDED (OUT OF SCOPE):
- Writing frontend or backend code
- Creating visual Figma wireframes from scratch
- Direct developer performance management

5. PROCESS:
Kickoff & Input (Brief/Loom/Transcript) ➔ AI Ingestion & Synthesis ➔ Human CS Logic & Constraint Review ➔ Edge Case & QA Matrixing ➔ Delivery & Revision Window.`,
    },
    audit: {
      title: "Sprint Readiness & Spec Audit — Full Scope",
      body: `SERVICE OVERVIEW
Name: Sprint Readiness & Spec Audit (ENTRY DIAGNOSTIC)
Price: $240 (Fixed Diagnostic)
Turnaround: 48 Hours
Primary Deliverable: Diagnostic Risk Report & Developer-Readiness Scorecard

SPECIAL GUARANTEE:
100% of the $240 audit fee is credited toward a Feature Spec Blueprint if you hire me to scope the feature.

1. WHO IS IT FOR?
- Teams with existing rough PRDs, meeting notes, or draft Jira backlogs who want a professional review before committing dev budget.

2. WHAT PROBLEM DOES IT SOLVE?
- Identifies hidden ambiguities, unstated assumptions, missing error states, and security/permission oversights before development starts.

3. INCLUDED DELIVERABLES:
- Comprehensive Gap & Ambiguity Analysis
- Missing Edge Case & Error State Checklist
- Developer-Readiness Scorecard (scored on Clarity, Completeness, Testability)
- Actionable Remediation Steps
- Up to 10 existing user stories OR up to 10 documentation pages

4. EXCLUDED (OUT OF SCOPE):
- Re-writing the full specification from scratch (available via Feature Blueprint upgrade).`,
    },
    mvp: {
      title: "MVP Product Discovery & Scope Blueprint — Full Scope",
      body: `SERVICE OVERVIEW
Name: MVP Product Discovery & Scope Blueprint (PREMIUM PACKAGE)
Starting Price: $1,450 (Fixed package)
Turnaround: 10 to 14 business days
Primary Deliverable: Complete MVP Backlog, User Journeys, & Phased Delivery Roadmap

1. WHO IS IT FOR?
- Pre-seed and seed-stage founders turning a validated concept into an executable product scope before hiring development squads.

2. INCLUDED DELIVERABLES:
- Product Brief, User Personas, & Core User Journeys (max 3 journeys)
- MoSCoW MVP Boundary Matrix (Must-Have vs. Nice-to-Have)
- Complete Functional Requirements Document (BRD/FRD)
- Full MVP Backlog (15 to 25 structured user stories with acceptance criteria)
- High-level Phased Release Delivery Roadmap
- Two 45-minute structured alignment calls

3. EXCLUDED (OUT OF SCOPE):
- Ongoing daily sprint tracking (available via Retainer)
- Wireframe design from scratch.`,
    },
    retainer: {
      title: "Async Product Operations Retainer — Terms & Rules",
      body: `SERVICE OVERVIEW
Name: Async Product Operations Retainer (RECURRING PARTNERSHIP)
Price: $950 / month
Commitment: Month-to-month (By Application / Prior Engagement Only)
Capacity: 10 to 12 active consulting hours per month

1. STRICT BOUNDARIES (NOT A VIRTUAL EMPLOYEE):
This retainer is designed as an asynchronous agile partnership, NOT an on-call virtual employee or 9-to-5 full-time PM.

2. INCLUDED DELIVERABLES:
- 1 Bi-weekly sprint planning call (45 mins max, evenings/weekends)
- Authoring and refining up to 8 user stories per month (with full Gherkin AC and edge cases)
- 1 Weekly executive progress & risk summary report
- Asynchronous developer ticket Q&A via email/Notion/Linear (guaranteed 24-business-hour response SLA)

3. STRICTLY EXCLUDED:
- Attending daily 9-to-5 developer standups
- Real-time Slack/WhatsApp on-call chatter
- Direct HR or people management of client developers
- Live customer support calls.`,
    },
  };

  /* ================================================================
     Artifact Document Library (Case Studies & Deliverables)
     ================================================================ */
  const DOCS = {
    case1: {
      title: "B2B Marketplace — Sample Specification Artifact",
      body: `PROJECT SNAPSHOT: Multi-Sided B2B Marketplace (Sanitized Real Client Work)

Role: Product Owner / Project Manager / Business Analyst
System Scope: Merchants, Suppliers, Buyers, Warehouses, Shipping, Inventory Validation, Payments

SAMPLE BUSINESS RULE (BR-01 · Multi-Warehouse Allocation):
- Buyer purchase requests are split across eligible warehouses based on real-time stock levels.
- Total allocated quantity must equal purchased quantity.
- If a warehouse becomes unavailable mid-checkout, the inventory lock expires after 15 minutes and the order re-allocates to the secondary facility.

SAMPLE GHERKIN ACCEPTANCE CRITERIA:
Scenario: Merchant allocates order across multiple active warehouses
  Given a validated purchase order with 50 units of SKU-A
  When the merchant selects Warehouse 1 (30 units available) and Warehouse 2 (20 units available)
  Then the system reserves 30 units in Warehouse 1 and 20 units in Warehouse 2
  And generates separate dispatch manifests for each facility
  And updates the master order status to "Allocated - Pending Dispatch"`,
    },
    case2: {
      title: "AI Requirements Transformation — Demonstration Project",
      body: `DEMONSTRATION PROJECT: SaaS Team Invitations & Role Permissions

Objective: Allow administrators to invite teammates by email with role-based access control.

SAMPLE USER STORY:
As an administrator, I want to invite a teammate by email and assign a role, so that they can access the workspace with the correct feature-level permissions.

SAMPLE ACCEPTANCE CRITERIA (GHERKIN):
Scenario: Admin sends valid invitation token
  Given an authenticated administrator in Workspace Settings
  When they enter a valid email address and select role "Editor"
  Then the system creates an invitation record with status "Pending"
  And generates a cryptographic single-use token with a 7-day expiration timestamp
  And queues a transactional email with the redemption link via transactional email provider

EDGE CASES IDENTIFIED:
- EC-01: Admin sends invite to existing workspace member ➔ Block creation; show inline error.
- EC-02: User clicks expired token (>7 days) ➔ Display expiry screen with 1-click resend request.
- EC-03: Admin revokes invite before user accepts ➔ Immediately invalidate token in database.`,
    },
    case3: {
      title: "Product Delivery Operations — Demonstration Project",
      body: `DEMONSTRATION PROJECT: Agile Delivery & Risk Framework

SPRINT PLAN EXCERPT (Sprint 12 · 2-Week Cycle · 34 Points Committed):
- [8 pts] Multi-warehouse shipping allocation engine
- [5 pts] Merchant warehouse selection UI
- [3 pts] Inventory concurrency validation service
- [5 pts] QA Suite: Boundary & edge case verification
- [13 pts] Change request impact buffer

RISK REGISTER EXCERPT:
Risk ID: R-01 · Inventory service latency under peak load
Likelihood: Medium | Impact: High
Mitigation: Implement Redis caching layer on stock counts; load test prior to staging release.

EXECUTIVE STATUS REPORT EXCERPT:
Sprint 12 Status: ON TRACK (82% story points completed)
Critical Blockers: 0
Risks Flagged: 1 (Mitigation in progress)`,
    },
  };

  const DELIVERABLES = [
    {
      key: "brd",
      name: "Business Requirements",
      body: `BUSINESS REQUIREMENTS DOCUMENT (Sample Excerpt)
Project: Team Invitations Module

1. BUSINESS OBJECTIVE:
Enable team administrators to onboard employees without engineering or support intervention.

2. SUCCESS CRITERIA:
- Admin can invite a team member in <60 seconds.
- 100% of invited users set secure passwords on first redemption.

3. IN-SCOPE:
Email invitation, role assignment (Admin, Editor, Viewer), 7-day token expiry, admin revocation.`,
    },
    {
      key: "srs",
      name: "Software Requirements Spec",
      body: `SOFTWARE REQUIREMENTS SPECIFICATION (Sample Excerpt)
3.1 FUNCTIONAL REQUIREMENTS:
- FR-101: The system shall generate a 256-bit cryptographically secure invitation token.
- FR-102: The system shall validate token expiry on every redemption attempt.
- FR-103: The system shall enforce role-based route guards across all API endpoints.

3.2 NON-FUNCTIONAL REQUIREMENTS:
- NFR-201: Email dispatch latency must not exceed 60 seconds from trigger.
- NFR-202: API response time for token validation must remain <200ms under load.`,
    },
    {
      key: "spec",
      name: "Product Specification",
      body: `FEATURE SPECIFICATION: Team Invitations
Summary: Administrators invite teammates by email and assign role-based permissions at dispatch.

USER WORKFLOW:
1. Admin navigates to Settings ➔ Team ➔ "Invite Member"
2. Enters email address and selects Role dropdown (Admin / Editor / Viewer)
3. System sends tokenized invitation email
4. Recipient accepts, sets credentials, and enters the shared workspace.`,
    },
    {
      key: "stories",
      name: "User Stories (Gherkin)",
      body: `USER STORY SPECIFICATION:
Story: Admin Member Invitation (5 Story Points · High Priority)

Narrative:
As an administrator,
I want to invite team members by email with assigned roles,
So that they can access workspace tools with appropriate permissions.

Acceptance Criteria:
Scenario: Valid member invitation
  Given an admin on the workspace team settings screen
  When they enter a valid email and select role "Editor"
  Then the system dispatches an invitation link within 60s
  And records the invitation as "Pending" on the admin dashboard.`,
    },
    {
      key: "ac",
      name: "Acceptance Criteria",
      body: `ACCEPTANCE CRITERIA MATRIX (Sample Excerpt)
Feature: Warehouse Inventory Allocation

- AC-1: Merchant can allocate items across 1 to 5 active warehouses.
- AC-2: Only active, verified facilities can receive allocation splits.
- AC-3: Total allocated units must exactly match line item order quantity.
- AC-4: System blocks checkout if requested quantity exceeds cumulative stock.`,
    },
    {
      key: "rules",
      name: "Business Rules Matrix",
      body: `BUSINESS RULES (Sample Excerpt)
- BR-01: An invitation token is valid for 7 calendar days from timestamp of creation.
- BR-02: Expired tokens cannot be redeemed; they must be explicitly resent by an administrator.
- BR-03: Deleting a workspace immediately revokes all pending invitation tokens.
- BR-04: Only Workspace Owners and Admins can generate invitation tokens.`,
    },
    {
      key: "edge",
      name: "Edge Cases & Errors",
      body: `EDGE CASE MATRIX (Sample Excerpt)
EC-01: Invitation sent to an email already registered in the workspace.
  ➔ Expected: System rejects creation; shows "User is already an active member."

EC-02: User clicks invitation link after admin has revoked it.
  ➔ Expected: Display 403 Forbidden page with "This invitation has been cancelled."

EC-03: Admin changes user role while invitation is pending.
  ➔ Expected: Token maps dynamically to new role on redemption.`,
    },
    {
      key: "qa",
      name: "QA Test Scenarios",
      body: `QA TEST SCENARIOS (Sample Excerpt)
TS-01 [Happy Path]: Admin invites valid email ➔ Token generated, email queued, shows in pending list.
TS-02 [Negative]: Admin invites malformed email (e.g. user@) ➔ Inline regex validation error.
TS-03 [Negative]: User attempts to redeem token after 8 days ➔ Expiry screen shown.
TS-04 [Security]: Non-admin user attempts POST to /invitations ➔ 401 Unauthorized returned.`,
    },
    {
      key: "sprint",
      name: "Sprint Plan & Backlog",
      body: `SPRINT PLAN (Sprint 08 · Capacity: 34 Points):
[5 pts] Team Invitation Dispatch Flow
[3 pts] Role-Based Permission Middleware
[2 pts] Transactional Email Notification Webhook
[5 pts] QA Suite: Boundary & Expiry Tests
[19 pts] Buffer & Core Engine Execution`,
    },
    {
      key: "risk",
      name: "Risk Register",
      body: `RISK REGISTER (Sample Excerpt)
R-01: Email deliverability failure with corporate firewall filters
  Likelihood: Low | Impact: High
  Mitigation: Authenticate transactional email domain with strict DKIM/SPF/DMARC records.

R-02: Race condition during simultaneous multi-user token acceptance
  Likelihood: Low | Impact: Medium
  Mitigation: Enforce atomic database transactions on member creation.`,
    },
    {
      key: "status",
      name: "Status Report",
      body: `EXECUTIVE PROJECT STATUS REPORT
Sprint Cycle: Sprint 08
Overall Health: ON TRACK (82% completed)
Critical Blockers: 0
Open Risks: 1 Low (Monitored)
Next Milestone: Final QA sign-off on role permissions.`,
    },
    {
      key: "cr",
      name: "Change Request Analysis",
      body: `CHANGE REQUEST ANALYSIS (CR-014)
Requested Change: Support split warehouse fulfillment on stock shortages.
Affected Artifacts: BR-01 (Allocation rule), FR-102 (Checkout API).
Impact Assessment: +1 sprint cycle. Does not block current MVP release.
Recommendation: Approved for next sprint release.`,
    },
  ];

  /* ================================================================
     Render Deliverables Grid
     ================================================================ */
  const delivGrid = document.getElementById("deliv-grid");
  if (delivGrid) {
    DELIVERABLES.forEach((d) => {
      const btn = document.createElement("button");
      btn.className = "deliv-card";
      btn.type = "button";
      btn.dataset.modal = "deliv:" + d.key;
      btn.setAttribute("aria-label", "View " + d.name + " sample");
      btn.innerHTML =
        '<div class="d-lines"><i></i><i></i><i></i></div><span class="d-name">' +
        d.name +
        "</span>";
      delivGrid.appendChild(btn);
    });
  }

  /* ================================================================
     General Modal System
     ================================================================ */
  const overlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");
  const modalCopy = document.getElementById("modal-copy");
  let lastFocused = null;

  function openModal(doc) {
    if (!doc || !overlay) return;
    modalTitle.textContent = doc.title;
    modalBody.textContent = doc.body;
    lastFocused = document.activeElement;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  // Click triggers for document / deliverable modals
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-modal]");
    if (trigger) {
      const key = trigger.dataset.modal;
      let doc;
      if (key.startsWith("deliv:")) {
        const dk = key.split(":")[1];
        const d = DELIVERABLES.find((x) => x.key === dk);
        if (d) doc = { title: d.name + " — Demonstration Sample", body: d.body };
      } else {
        doc = DOCS[key];
      }
      if (doc) openModal(doc);
      return;
    }

    // Click triggers for service detail modals
    const serviceTrigger = e.target.closest("[data-service-modal]");
    if (serviceTrigger) {
      const sKey = serviceTrigger.dataset.serviceModal;
      const sDoc = SERVICE_DETAILS[sKey];
      if (sDoc) openModal(sDoc);
      return;
    }

    if (e.target === overlay) closeModal();
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);

  if (modalCopy) {
    modalCopy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(modalBody.textContent);
        const original = modalCopy.innerHTML;
        modalCopy.innerHTML = "✓ Copied";
        setTimeout(() => {
          modalCopy.innerHTML = original;
        }, 1600);
      } catch (err) {
        /* ignore */
      }
    });
  }

  /* ================================================================
     Cal.com Booking Modal System
     ================================================================ */
  const calOverlay = document.getElementById("cal-modal-overlay");
  const calClose = document.getElementById("cal-modal-close");
  const openCalBtn = document.getElementById("open-cal-btn");
  const calContainer = document.getElementById("cal-embed-container");

  function openCalModal() {
    if (!calOverlay) return;
    if (CALCOM_URL && calContainer) {
      calContainer.innerHTML = `<iframe src="${CALCOM_URL}" style="width:100%;height:540px;border:none;border-radius:10px;"></iframe>`;
    }
    calOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
    if (calClose) calClose.focus();
  }

  function closeCalModal() {
    if (!calOverlay) return;
    calOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (openCalBtn) openCalBtn.addEventListener("click", openCalModal);
  if (calClose) calClose.addEventListener("click", closeCalModal);
  if (calOverlay) {
    calOverlay.addEventListener("click", (e) => {
      if (e.target === calOverlay) closeCalModal();
    });
  }

  /* ================================================================
     Global Escape Key Handler & Focus Trapping
     ================================================================ */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (overlay && overlay.classList.contains("open")) closeModal();
      if (calOverlay && calOverlay.classList.contains("open")) closeCalModal();
      if (mobileMenu && mobileMenu.classList.contains("open")) closeMobileMenu();
    }
  });

  /* ================================================================
     Contact / Project Intake Form Validation (Demo Mode)
     ================================================================ */
  const form = document.getElementById("contact-form");
  const successBox = document.getElementById("form-success");

  function setError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    const group = el.closest(".form-group");
    const err = document.querySelector('[data-error-for="' + id + '"]');
    if (msg) {
      if (group) group.classList.add("error");
      if (err) err.textContent = msg;
    } else {
      if (group) group.classList.remove("error");
      if (err) err.textContent = "";
    }
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (successBox) successBox.classList.remove("show");
      let valid = true;

      const name = document.getElementById("f-name").value.trim();
      const email = document.getElementById("f-email").value.trim();
      const role = document.getElementById("f-role").value;
      const service = document.getElementById("f-service").value;
      const message = document.getElementById("f-message").value.trim();

      if (!name) {
        setError("f-name", "Please enter your name.");
        valid = false;
      } else setError("f-name", "");

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        setError("f-email", "Please enter a valid business email.");
        valid = false;
      } else setError("f-email", "");

      if (!role) {
        setError("f-role", "Please select your role.");
        valid = false;
      } else setError("f-role", "");

      if (!service) {
        setError("f-service", "Please select a service.");
        valid = false;
      } else setError("f-service", "");

      if (!message || message.length < 10) {
        setError("f-message", "Please provide a brief description of your feature/bottleneck (10+ characters).");
        valid = false;
      } else setError("f-message", "");

      if (!valid) return;

      // DEMO MODE: No backend connected. To connect, see README for Formspree / Tally instructions.
      if (successBox) successBox.classList.add("show");
      form.reset();
    });
  }
})();
