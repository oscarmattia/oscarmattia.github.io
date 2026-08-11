export const agenticAmsLearningPost = {
  published: true,
  title: "World Models for Silicon — Written, Not Learned",
  excerpt:
    "Agentic chip design needs more than a wrapper around a simulator. Using ams_platform and serial_link_tools, this post explains what an honest AMS learning environment looks like—and why the scarce asset is encoded design judgment, not a smarter proposer.",
  date: "Aug 10, 2026",
  readTime: "14 min read",
  slug: "world-models-for-silicon-written-not-learned",
  content: `# World Models for Silicon — Written, Not Learned

If you have watched agentic AI arrive in chip design, you have probably seen the same pitch more than once: wrap a simulator, let a language model propose changes, iterate until the numbers look good. That story is incomplete. Wrapping an incumbent EDA tool gives an agent an **API**. It does not give it a learning environment.

What an agent needs in analog and mixed-signal (AMS) silicon is narrower and harder: a way to act, a way to know whether the action was good, and a named definition of *done*. The scarce product is not a clever proposer. It is an executable **world model**—encoded AMS design judgment, written down so it runs.

This post uses two repositories I maintain to make that concrete:

- [\`ams_platform\`](https://github.com/oscarmattia/ams_platform) — the smallest honest demo of a closed design loop against a named target.
- [\`serial_link_tools\`](https://github.com/oscarmattia/serial_link_tools) — a structured domain library for electrical and optical serial links, with verification, maturity gates, and an optional agent-driven research loop.

(Both are private today; the claims below are about what the code does, not about open-source distribution.)

The audience is deliberately mixed: a general reader should leave with the shape of the argument; a technical reader or investor should leave with claim boundaries intact.

## World models for silicon — written, not learned

Three sentences, in order. Everything else is support.

**1. Simulators know physics. They don't know design.**

A circuit simulator will tell you the phase margin of a PLL you already built. It will not tell you that a 10 GS/s ADC clock's RMS jitter budget should be derived from the aperture-jitter / SNR relation at Nyquist, or that loop-filter capacitance scales as \`C ∝ Icp / (N · ωc²)\`, so the charge pump and divider have to move together or you double the capacitors and blow the area budget. That knowledge lives in senior engineers' heads, an unmaintained wiki, spreadsheets from 2011, and review decks—the most valuable and least durable asset on any AMS team—and it has rarely been written down in executable form.

**2. It cannot be learned from a public corpus, so it has to be written.**

Nobody publishes analog design data at the scale AI systems assume. A *learned* world model for AMS silicon is therefore not a realistic near-term path for anyone, including the very well funded. The asset is **encoded AMS design judgment**, shipped as an extensible, agent-legible Python library: executable, tested, composable, and versioned.

**3. Keep the asset narrow; allow the surface to be broad.**

PyTorch is one disciplined thing—a differentiable tensor library—with unlimited consumers, because consumers attach at a seam rather than being rebuilt from scratch. Same shape here. Agents, CI gates, verification exporters, and ingestion pipelines are attachment points. They are not four separate products under construction.

Two registers are intentional. A generalist hears *world model*. A semiconductor operator hears *encoded design judgment*. Both are true; neither should overclaim completeness. Today that writing covers four AMS domains as a beachhead—PDN / IR drop, data converters, PLL / clocking, and serial links—not every AMS block on a SoC.

## Why this matters now

Agentic systems can plan, call tools, and iterate. In digital design they already have RTL, testbenches, and text. In AMS they mostly have schematics, PDFs, and tribal knowledge. There is little machine-readable substrate to act on.

That gap is not academic. AI accelerators, co-packaged optics, and power delivery are gated by analog: clocks, links, converters, and power distribution. Digital scaling moved the constraint onto the domains with the worst tooling for automated loops.

Frontier talent *did* arrive in chip design—it routed to RTL, verification, and layout, the places that already hand a learning loop an automated oracle. Analog has no open corpus and no shared benchmark to climb, so it got skipped. Meanwhile every team rebuilds the same charge-pump math, the same eye-diagram scripts, the same IR-drop grids. None of it compounds. All of it dies with the project.

## Nobody owns the judgment

The 2026 map around AMS automation is crowded in four seats—and empty underneath them:

1. **Flow automation startups** — layout, RTL/verification agents, end-to-end design agents. Real problems; every one still needs an oracle for the analog answer.
2. **Academic synthesis and optimization** — decades of interesting work, historically weak commercial substrate.
3. **Big EDA signoff** — if you tape out next quarter, you sign off on the incumbent tool. That seat is not the attack surface; it is the interoperability surface.
4. **Wrappers and surrogates** — wrap a licensed simulator in an agent, or train a neural surrogate to approximate it. Both inherit someone else's license, API, and roadmap.

All four need something that knows whether an analog design is *good*. Approximating a simulator buys cheaper evaluations. Only encoded knowledge buys the verdict. Everyone funded is building an application that needs that layer. The interesting work is building the layer itself.

## Physics is not design

This is the load-bearing distinction.

A simulator reports. It does not judge. A surrogate can make physics cheaper; it still does not know that peaking at 1.2 dB forces phase margin well above a 50° floor, or how to trade charge-pump current against on-chip capacitor area under a named jitter budget. An agent with only fuzzy textbook recall has an API and a hope.

So: wrapping SPICE is not an AMS learning environment. A learning environment needs four pieces:

| Piece | Role |
| :--- | :--- |
| **API** | A way to propose or mutate a candidate |
| **Oracle** | \`evaluate(candidate) → metrics\` fast enough to iterate |
| **Named target** | Pass/fail specs with defensible origins |
| **Improve loop** | Use history to propose the next candidate |

The designer stays in control: the loop **proposes**; a human accepts. That is the counter-position to autonomous-design theatre—and it is what makes an analog designer champion the tool rather than quietly sabotage it.

\`\`\`mermaid
flowchart LR
  build[Build candidate] --> evaluate[Evaluate oracle]
  evaluate --> score[Score vs target]
  score --> improve[Propose next]
  improve --> build
\`\`\`

## What \`ams_platform\` proves

[\`ams_platform\`](https://github.com/oscarmattia/ams_platform) is a standalone demo of that loop for one problem: an integer-N charge-pump PLL generating a 10 GHz clock for a 10 GS/s ADC.

The target, \`adc_clock_10gsps\`, has five specs. The jitter limit is *derived* from aperture-jitter-limited SNR (50 dB SNDR at 5 GHz), not asserted as a round number. Phase margin, peaking, loop bandwidth, and loop-filter capacitance are engineering-plausible limits with named rationales. Each iteration:

1. **Build** — synthesize loop-filter passives from intent knobs \`(Icp, f_bw, PM, N)\`.
2. **Evaluate** — continuous-time loop dynamics plus a four-source phase-noise stack-up to RMS jitter (~0.4 ms per full evaluation).
3. **Score** — per-spec normalised margins; scalar loss is minimax on the worst margin, with a tiny mean-margin tie-break so you cannot trade a failing spec for margin on a passing one.
4. **Improve** — a policy proposes the next knobs and records a one-line rationale.

From a mediocre hand guess, the default policy first passes all five specs at **iteration 17** and delivers its best design (by loss, not last iterate) at iteration 23: jitter from 392.5 fs to 85.3 fs against a 100.7 fs limit, with the other four specs inside their windows.

The shipped policy is deliberately not the product. \`HeuristicPolicy\` analytic-seeds bandwidth and phase margin (searching closed-form quantities would be theatre), then runs a compass search on the remaining axes with area-preserving compound moves—because if you nudge crossover or \`N\` without moving \`Icp\` correctly, capacitance doubles and the move dies on area before its noise benefit is visible. That is encoded domain knowledge doing work.

\`RandomSearchPolicy\` is the honest baseline. On the same 24-iteration budget it does not clear the design. Give it 200 iterations and it reaches 4 of 5 specs—close, still not shippable. Read that correctly: **most of the credit belongs to the oracle and the parameterization, not the optimiser.** An LLM-backed policy is a drop-in on the same \`propose(history, space, target)\` interface. The claim under test is that the oracle is the hard part.

Maturity is scored honestly at **4.0 / 8.0**, author-assigned, not self-computed. Reproducibility scores a full point. Fidelity ladder and silicon correlation score **zero**: there is a behavioral rung and a clean \`oracle.evaluate\` seam for a higher-fidelity substitute, but no sampled twin, no SPICE cross-check, and no published error bound on any number. Nothing is learned across runs. Noise profiles are generic analytics, not PDK-extracted. Nominal only—no PVT, no Monte Carlo yield.

That is the point of the demo. A loop that converges is easy to fake. What matters for diligence is what converging proves.

## What \`serial_link_tools\` adds

[\`serial_link_tools\`](https://github.com/oscarmattia/serial_link_tools) is a different cut of the same thesis: not one PLL topology, but a **structured world-model library** for high-speed electrical and optical links—channels, DSP, FEC, eye/BER/COM metrics, standards-mapped scenarios—and the machinery to verify and improve that library over time.

It sits in a family with sibling AMS libraries. In my head the organization is architectural, not flat: \`ams_platform\` is the **platform** ceiling agents and designers attach to; \`serial_link_tools\` is the **primary pillar** that carries the link world model and its learning strategies; complementary libraries underneath supply clocks, converters, passives, and chip/package PDN approximations so the models can get more faithful—and, where useful, closer to real circuit subsystems. The near-term wedge is still SerDes and optics with agent-readable results. It is not positioned as a Cadence or Keysight replacement.

\`\`\`diagram
ams-library-stack
\`\`\`

### Three layers that should not be conflated

\`\`\`mermaid
flowchart TB
  subgraph classical [Classical learning inside a simulation]
    taps[LMS / NLMS / CMA tap updates]
  end
  subgraph autoloop [Autoloop skill environment]
    verify[build → verify → score]
    improve[heuristic improve params]
    verify --> improve --> verify
  end
  subgraph autoresearch [Autoresearch on the codebase]
    gate[nightly metric gate]
    plan[roadmap planner]
    agent[optional coding agent PR]
    gate --> plan --> agent
  end
  classical --> autoloop
  autoloop --> autoresearch
\`\`\`

**Layer 1 — Classical learning.** LMS, NLMS joint FFE/DFE, decision-directed tracking, CMA, and related adapters update equalizer taps from training or modulus error *inside one simulation*. That is real adaptive filtering. It does not rewrite the physics library, the standards thresholds, or the repository. Call it classical learning so it is not confused with “the model learned design.”

**Layer 2 — Autoloop.** Skills expose \`build → verify → improve\`. A verification report carries pass/fail, a scalar score, and diagnostics. Heuristic \`improve()\` policies retune simulation parameters (CTLE peaking, SNR, tap counts, and so on) until the skill is \`STABLE\` or the iteration budget is exhausted. Dependencies gate higher skills. Standards reference targets stay **frozen**; the loop is not allowed to soften a compliance mask to escape a failing BER.

**Layer 3 — Autoresearch.** A nightly gate compares a fresh autoloop run to a committed baseline on score *and* declared model maturity. Regressions fail CI. Clean improvements can update the baseline. A deterministic planner walks a roadmap: fix failures, then advance an existing skill one maturity tier, or add a missing capability. Optionally, a Cursor cloud agent implements the next task and opens a PR; required checks and auto-merge close the loop. Everything except codegen is deterministic and offline.

Maturity here is a 0..1 rubric on *model fidelity* (ideal physics → simple non-idealities → realistic → system-level compliance with empirical or standards-mask correlation). It is a **declared** class attribute next to the model—bumped when humans or agents improve the code—not inferred from lab data. Stretch targets that ratchet difficulty after consecutive clears exist in code, but they are **not** wired into the nightly gate today; do not claim a production difficulty ratchet yet. Lightweight Bayesian optimization and tabular RL utilities exist as tuning demos around a link environment. They are not the product claim.

## Same loop shape, different update scope

| Axis | \`ams_platform\` | \`serial_link_tools\` |
| :--- | :--- | :--- |
| Role | Minimal honest loop demo; oracle thesis | Domain library + Family member |
| World model | One topology; PLL dynamics + noise stack | Multi-skill SerDes / optical library |
| What the loop updates | Design knobs within one run | Skill params; then code / maturity via CI + agent |
| Oracle cost | ~ms, fixed analytic equations | Per-skill simulations; CI-gated |
| Cross-run memory | None, by design | Baseline metrics, skill state, merged PRs |
| Maturity | Static 4.0 / 8.0 rubric | Declared 0..1 tiers; planner-driven advances |
| Classical learning | Not applicable | LMS / NLMS / CMA inside sims |
| Default proposer | Deterministic compass search | Heuristic skill \`improve\` + optional coding agent |
| Honest non-claims | No silicon / SPICE twin; no LLM in the default loop | Stretch ratchet not in nightly gate; maturity not data-inferred |

Both instantiate an agentic learning environment. \`ams_platform\` proves that a fast oracle plus a named target can close a real multi-spec design without a glamorous optimiser. \`serial_link_tools\` proves that a library can be structured so verification, maturity, and roadmap planning make the *world model itself* improvable under regression discipline.

## What compounds—and what does not

The compounding asset is not “an AI that designs chips.” It is:

1. **Libraries fast enough to iterate** — evaluations cheap enough that thousands of proposals are affordable.
2. **Libraries realistic enough that pass/fail means something** — named targets with defensible origins; frozen standards where compliance matters.
3. **Libraries structured enough to raise fidelity without silent drift** — maturity rubrics, baseline gates, fidelity as a substitution seam rather than a rewrite.

The moat argument is the same sentence as the headline. Because a public AMS design corpus does not exist at scale, a learned world model is not the available road. Writing is. Writing has a knowable cost. Calibration to a team's own silicon, hub spokes that ingest proprietary artifacts and emit verified views, and higher rungs on a fidelity ladder are the compounding path—and they are **roadmap**, not shipping claims, until they exist with error bounds attached.

Open core is a recruiting and distribution choice for that writing; paid confidence is the commercial unit of sale when a number has to be trusted. The first buyers who feel this pain without a legacy methodology to defend tend to be vertically integrated hardware-systems companies. That is a beachhead observation, not a pivot.

## Proven vs not yet real

**Proven today (showable in the repos):**

- Closed unattended build → evaluate → score → improve loops with recorded rationales.
- Millisecond-scale behavioral evaluation on the PLL demo; multi-skill verification on the link library.
- Named targets with per-spec margins; minimax scoring that refuses to hide a failing spec.
- Author-honest maturity scores that refuse to inflate themselves.
- Regression gates and roadmap-directed tasks that raise *declared* model fidelity via code changes.
- Classical adaptive equalization inside link simulations.

**Not yet real — do not claim these:**

- Correlation to measured silicon, or published error bounds on behavioral answers.
- SPICE / Verilog-A / commercial-simulator twin rungs as shipping product.
- Cross-run learning or warm start in \`ams_platform\`.
- Stretch-target ratcheting in the \`serial_link_tools\` nightly path.
- An LLM as the default policy in either demo.
- Completeness beyond the four beachhead domains.

## Closing

Agentic AMS design does not fail for lack of proposers. It fails for lack of executable judgment—world models for silicon that were written because they could not be scraped.

\`ams_platform\` is the smallest honest proof that API + oracle + named target is enough to close a design loop when the oracle and parameterization carry the domain knowledge. \`serial_link_tools\` is the domain-scale version of the same idea: a library you can verify, gate, and deliberately mature, with classical adaptation where the physics calls for it and agent-assisted codegen where the roadmap calls for it.

The designer stays in control. The proposer is replaceable. The world model is the product.

Source lives at [ams_platform](https://github.com/oscarmattia/ams_platform) and [serial_link_tools](https://github.com/oscarmattia/serial_link_tools) (private today). If you work on AMS silicon and want to compare notes on oracles, targets, or library structure, find me on [LinkedIn](https://www.linkedin.com/in/oscar-mattia-7170b834/).
`,
};
