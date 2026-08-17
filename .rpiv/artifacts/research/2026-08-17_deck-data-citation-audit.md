# Deck Data Citation Audit

**Date:** 2026-08-17  
**Scope:** Every visible empirical number in `slides.md`, checked against the seven links already collected on the Resources slide.

## Claim-to-source audit

| Ref | Slide | Claim in the deck | Source support | Required presentation wording |
| --- | ---: | --- | --- | --- |
| [1] | 10 | 16% of time; derived 84%; 16% in 2024 vs 15% previously | **Partially supported.** The 16% and 15% values are reported in the InfoWorld coverage of IDC. The measure is self-reported time **developing applications across a typical month**, not directly observed “writing code” during an engineer-day. The 84% is arithmetic. | Say “developing applications” and “self-reported typical month”; cite both 16% and the derived 84% to [1]. |
| [2] | 17 | 55% faster | **Supported with scope.** GitHub reports 55% faster completion for 95 developers performing one JavaScript HTTP-server task with Copilot versus control. It is not a general measure of all coding speed. | Label the metric “JS task completion” and avoid generalising it to organisation-wide output. |
| [3] | 17 | Code churn ×2; 153M changed lines; 2021 baseline | **Overstated in the original deck.** GitClear analysed 153M changed lines but **projected** that 2024 code churn would double versus 2021; it did not report the doubling as an already observed final result. | Label it “Projected code churn” and say “projected to double vs 2021.” |
| [4] | 17 | Per +25% AI adoption: throughput −1.5%, stability −7.2% | **Supported as association.** DORA reports estimated relationships per 25% higher AI adoption. These are associations in its analysis, not proof that adoption caused the declines. | Say “associated with” and explicitly mark the figures as non-causal estimates. |
| [5] | 18 | 19% slower while estimating 20% faster | **Supported with historical qualification.** METR’s RCT covered 16 experienced open-source developers and 246 tasks. METR now labels the result out of date and says it should not be treated as representative of current models. | Present it as one historical 2025 RCT, not a current universal result. |

## Unsupported synthesis found

Two slide headlines combined results from separate studies and populations more strongly than the sources support:

- “Output went up. Throughput did not”
- “You produced more code and shipped less software”

Neither statement is directly established by any one of the seven sources. The deck should instead present the studies side by side and preserve their different scopes.

## Illustrative numbers

Slide 24’s `100% / 35% / 0%` context-decay timeline is a narrative illustration, not measured data. It should be labeled **“Illustrative timeline — not measured data.”** It must not inherit any of refs [1]–[5]. Talk duration, CSS coordinates, animation speeds, `1:1`, and numbered steps are structural or illustrative rather than empirical claims.

## Sources

### [1] IDC / InfoWorld

- <https://www.idc.com/getdoc.jsp?containerId=US53204725>
- <https://www.infoworld.com/article/3831759/developers-spend-most-of-their-time-not-coding-idc-report.html>

### [2] GitHub Copilot research

- <https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/>

### [3] GitClear 2024

- <https://www.gitclear.com/coding_on_copilot_data_shows_ais_downward_pressure_on_code_quality>

### [4] DORA 2024

- <https://dora.dev/research/2024/dora-report/>

### [5] METR / paper

- <https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/>
- <https://arxiv.org/abs/2507.09089>
