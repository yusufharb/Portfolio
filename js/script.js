/* =========================================================
   Yusuf Hamdy — AI Product Operations
   Vanilla JS — nav, reveal, hero flow, timeline, transformation
   tabs, deliverable tabs, deliverables grid + modal, case study
   modals, contact form (demo mode).
   ========================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Year
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
  }

  // Close mobile menu on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on outside click
  if (mobileMenu) {
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
      // Close mobile menu if open
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
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
    setInterval(tick, 480);
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
      timer = setInterval(next, 4300);
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
     Document content library
     ================================================================ */
  const DOCS = {
    case1: {
      title: "B2B Marketplace — Sample Artifact",
      body: `PRODUCT SNAPSHOT

Context:
A multi-sided B2B marketplace connecting merchants,
suppliers, and buyers, with administrative oversight
of purchasing, warehousing, payments, shipping, and
order management.

Role: Product Owner / Project Manager / Business Analyst

Sample User Story:
As a buyer, I want to submit a purchase request to
multiple suppliers so that I can compare offers before
committing to an order.

Sample Acceptance Criteria:
- Buyer can select multiple suppliers for one request.
- Each supplier receives an independent response window.
- Buyer can compare offers side by side.
- Request expires after a configurable time window.

Process shown:
Business Need → Requirements → User Stories →
Development → QA → Release → Stabilization

Note: client-identifying details are withheld.`,
    },
    case2: {
      title: "AI Requirements Transformation — Demonstration Project",
      body: `DEMONSTRATION PROJECT — fictional scenario

PRODUCT REQUIREMENT

Feature:
Team Invitations

Business Objective:
Allow administrators to invite employees to join a
workspace with an assigned role, so new team members
can access the product without manual account setup.

Actors:
Administrator, Invited User

Business Rules:
- An invitation is valid for 7 days by default.
- An invited user must accept before gaining access.
- Roles determine feature-level permissions.
- Expired invitations can be resent, not reused.

User Stories:
As an administrator, I want to invite a teammate by
email and assign a role, so they can access the
workspace with the right permissions.

Acceptance Criteria:
- Admin can enter an email and select a role.
- System sends an invitation email automatically.
- Invitation link expires after 7 days.
- Invited user sets a password on first login.
- Admin can revoke a pending invitation.

Edge Cases:
- Invitation sent to an existing member
- Expired invitation accepted
- Role changed after invite sent, before acceptance
- Duplicate invitations to the same email

Open Questions:
- Should expired invitations auto-delete or archive?
- Can a revoked invitation be un-revoked?`,
    },
    case3: {
      title: "Product Delivery Operations — Demonstration Project",
      body: `DEMONSTRATION PROJECT — fictional scenario

SPRINT PLAN (excerpt)
Sprint 12 · 2 weeks · Capacity: 34 points

Backlog:
- [8] Shipping allocation across warehouses
- [5] Merchant warehouse selection UI
- [3] Inventory validation service
- [5] QA: allocation edge cases
- [13] Buffer for change requests

DEPENDENCY MAP (excerpt)
Inventory Validation Service
  → blocks → Warehouse Selection UI
  → blocks → QA: allocation edge cases

RISK REGISTER (excerpt)
R1 — Inventory service latency under load
   Likelihood: Medium · Impact: High
   Mitigation: Add caching layer, load test pre-release

R2 — Ambiguous rule for partial allocations
   Likelihood: Medium · Impact: Medium
   Mitigation: Confirm rule with stakeholders in review

STATUS REPORT (excerpt)
Period: Sprint 12
Status: On track
Completed: 21 / 34 points
Blockers: None currently
Next: Finalize QA sign-off on allocation edge cases`,
    },
  };

  const DELIVERABLES = [
    {
      key: "brd",
      name: "Business Requirements",
      body: `BUSINESS REQUIREMENTS DOCUMENT (excerpt)

Project: Team Invitations Feature
Prepared for: Demonstration purposes

1. Business Objective
Allow administrators to invite employees into a
shared workspace with role-based access.

2. Scope
In scope: invitation creation, role assignment,
expiry, resend, revoke.
Out of scope: SSO-based invitations (future phase).

3. Stakeholders
Product Owner, Engineering Lead, QA Lead

4. Success Criteria
Administrators can onboard a new teammate in
under 2 minutes without engineering involvement.`,
    },
    {
      key: "srs",
      name: "Software Requirements Spec",
      body: `SOFTWARE REQUIREMENTS SPECIFICATION (excerpt)

3.1 Functional Requirements
FR-1: System shall allow an admin to create an
invitation with email and role.
FR-2: System shall send an invitation email within
60 seconds of creation.
FR-3: System shall expire unaccepted invitations
after 7 days.

3.2 Non-Functional Requirements
NFR-1: Invitation emails must be delivered via a
transactional email provider with delivery tracking.
NFR-2: Invitation tokens must be single-use and
cryptographically random.`,
    },
    {
      key: "spec",
      name: "Product Specification",
      body: `PRODUCT SPECIFICATION (excerpt)

Feature: Team Invitations
Summary: Administrators invite teammates by email
and assign a role at invite time.

User Flow:
1. Admin opens Team Settings → Invite Member
2. Admin enters email + selects role
3. System sends invitation email
4. Invited user accepts, sets password
5. User appears in team list as Active`,
    },
    {
      key: "epics",
      name: "Epics",
      body: `EPICS (excerpt)

EPIC: Shipping Management
Allow merchants to allocate orders across one or
more warehouses based on inventory availability.

EPIC: Team Access Management
Allow administrators to invite, manage roles for,
and remove members of a shared workspace.`,
    },
    {
      key: "stories",
      name: "User Stories",
      body: `USER STORIES (excerpt)

As a merchant, I want to select fulfillment locations
for an order so that purchased quantities can be
allocated across eligible warehouses.

As an administrator, I want to invite a teammate by
email and assign a role, so they can access the
workspace with the right permissions.

As an invited user, I want to accept an invitation
and set my password, so that I can join the workspace.`,
    },
    {
      key: "ac",
      name: "Acceptance Criteria",
      body: `ACCEPTANCE CRITERIA (excerpt)

Feature: Warehouse Allocation
- Merchant can select one or more eligible warehouses.
- Only active warehouses can be selected.
- Allocated quantity cannot exceed available inventory.
- Total allocated quantity must equal purchased quantity.
- Merchant must review allocation before confirming.`,
    },
    {
      key: "rules",
      name: "Business Rules",
      body: `BUSINESS RULES (excerpt)

BR-1: An invitation is valid for 7 days by default.
BR-2: Roles determine feature-level permissions.
BR-3: Total allocated quantity must equal the
purchased quantity — no partial-order shipping
without an explicit backorder rule.
BR-4: Inactive warehouses cannot receive allocations.`,
    },
    {
      key: "edge",
      name: "Edge Cases",
      body: `EDGE CASES (excerpt)

Shipping Allocation:
- Insufficient inventory at selected warehouse
- Inactive warehouse selected
- Allocated quantity mismatch
- Warehouse becomes unavailable mid-allocation
- Partial allocation left incomplete

Team Invitations:
- Invitation sent to an existing member
- Expired invitation accepted
- Role changed after invite sent`,
    },
    {
      key: "qa",
      name: "QA Test Scenarios",
      body: `QA TEST SCENARIOS (excerpt)

TS-01: Single warehouse allocation — happy path
TS-02: Multiple warehouse allocation — happy path
TS-03: Quantity mismatch — expect validation error
TS-04: Invalid/inactive warehouse — expect rejection
TS-05: Inventory shortage — expect partial-allocation
        prompt or blocked confirmation`,
    },
    {
      key: "backlog",
      name: "Product Backlog",
      body: `PRODUCT BACKLOG (excerpt)

[8]  Shipping allocation across warehouses
[5]  Merchant warehouse selection UI
[3]  Inventory validation service
[5]  QA: allocation edge cases
[5]  Team invitation flow
[3]  Role-based permission checks
[13] Buffer for change requests`,
    },
    {
      key: "sprint",
      name: "Sprint Plan",
      body: `SPRINT PLAN (excerpt)

Sprint 12 · 2 weeks · Capacity: 34 points

Goal: Ship warehouse allocation end-to-end,
including QA sign-off on edge cases.

Committed:
- Warehouse selection UI (5)
- Inventory validation service (3)
- Allocation API (8)
- QA: edge cases (5)`,
    },
    {
      key: "timeline",
      name: "Project Timeline",
      body: `PROJECT TIMELINE (excerpt)

Week 1–2: Requirements & structuring
Week 3–5: Core development (allocation engine)
Week 6: QA & edge case hardening
Week 7: Stakeholder review & UAT
Week 8: Release & stabilization`,
    },
    {
      key: "risk",
      name: "Risk Register",
      body: `RISK REGISTER (excerpt)

R1 — Inventory service latency under load
   Likelihood: Medium · Impact: High
   Mitigation: Add caching layer, load test pre-release

R2 — Ambiguous rule for partial allocations
   Likelihood: Medium · Impact: Medium
   Mitigation: Confirm rule with stakeholders in review`,
    },
    {
      key: "cr",
      name: "Change Request Analysis",
      body: `CHANGE REQUEST ANALYSIS (excerpt)

CR-014: Add support for backorder on partial
allocation shortages.

Affected requirements: BR-3, FR-2 (allocation API)
Affected user stories: Warehouse allocation story
Impact: Medium — requires new business rule and
one additional edge case in QA suite.
Recommendation: Approve for next sprint; does not
block current release.`,
    },
    {
      key: "status",
      name: "Project Status Report",
      body: `PROJECT STATUS REPORT (excerpt)

Period: Sprint 12
Status: On track
Completed: 21 / 34 points
Blockers: None currently
Risks flagged: 1 (see Risk Register R1)
Next: Finalize QA sign-off on allocation edge cases,
begin stakeholder review of invitation flow.`,
    },
  ];

  /* ================================================================
     Render deliverables grid
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
     Modal logic
     ================================================================ */
  const overlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");
  const modalCopy = document.getElementById("modal-copy");
  let lastFocused = null;

  function openModal(key) {
    let doc;
    if (key.startsWith("deliv:")) {
      const dk = key.split(":")[1];
      const d = DELIVERABLES.find((x) => x.key === dk);
      if (!d) return;
      doc = { title: d.name + " — Sample", body: d.body };
    } else {
      doc = DOCS[key];
    }
    if (!doc) return;

    modalTitle.textContent = doc.title;
    modalBody.textContent = doc.body;
    lastFocused = document.activeElement;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-modal]");
    if (trigger) {
      openModal(trigger.dataset.modal);
      return;
    }
    if (e.target === overlay) closeModal();
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (overlay && overlay.classList.contains("open")) closeModal();
      if (mobileMenu && mobileMenu.classList.contains("open")) closeMobileMenu();
    }
  });

  // Focus trap inside modal
  if (overlay) {
    overlay.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusable = overlay.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

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
        /* clipboard unavailable — silently ignore */
      }
    });
  }

  /* ================================================================
     Contact form validation (demo mode)
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
      const message = document.getElementById("f-message").value.trim();

      if (!name) {
        setError("f-name", "Please enter your name.");
        valid = false;
      } else setError("f-name", "");

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        setError("f-email", "Please enter a valid email.");
        valid = false;
      } else setError("f-email", "");

      if (!message || message.length < 10) {
        setError("f-message", "Please add a few details (10+ characters).");
        valid = false;
      } else setError("f-message", "");

      setError("f-company", "");
      setError("f-help", "");

      if (!valid) return;

      // DEMO MODE: No backend connected. Does NOT send data.
      // To connect: use Formspree, Getform, or a serverless endpoint.
      // See README for instructions.
      if (successBox) successBox.classList.add("show");
      form.reset();
    });
  }
})();
