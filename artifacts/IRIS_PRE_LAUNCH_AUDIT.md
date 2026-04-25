# Iris — Pre-Launch Audit Report
**Application:** BetterHealth Africa
**Auditor:** Iris (Gemini 3.1 Pro Preview via OpenRouter)
**Date:** 2026-04-15

## Executive Summary
The BetterHealth Africa frontend is coming together nicely with a solid foundation (React + Tailwind + Vite). It features high-quality assets and a modern aesthetic with clear responsiveness efforts. However, critical pre-launch blockers exist in areas of performance, SEO consistency, code-splitting, and potential hydration/route handling bugs. The current Javascript bundle size must be reduced, images converted to next-gen formats, and accessibility improved for a successful go-live.

Overall Score: 78/100

### Top 5 Critical Issues
1. **Large JS Bundle:** Code splitting needed.
2. **Heavy Images:** JPEG screenshots exist without WebP alternatives (convert to WebP to save ~330KB).
3. **Broken/Missing Routes:** The `/focus` route is undocumented/404.
4. **Missing Technical Tags/Metas:** Need proper PWA tags, `<meta name="theme-color">`, and comprehensive structured data (JSON-LD).
5. **A11y Gaps:** Form fields, empty alt tags, missing `aria-live` on carousel.

---

## 1. PERFORMANCE & SPEED — Score: 7/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| 569KB JS Bundle | 🔴 | Implement code splitting (`React.lazy`) for non-home pages (e.g., Blog, FAQ, Careers). |
| JPEG usage | 🟡 | Convert screenshots (`mobile-healthscore.jpg`, etc.) to WebP. Save ~40-50% on image payload. |
| Lazy loading | 🟡 | Add `loading="lazy"` attribute to below-the-fold images in ProductShowcase and Testimonials. |

## 2. SEO — Score: 8/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| robots.txt & sitemap.xml | 🟢 | Valid and present in public folder. |
| Canonical URLs | 🟡 | Missing canonical URL tags for individual routes. Manage them through `react-helmet-async` on a per-page basis. |
| Dynamic Meta Data | 🟡 | Currently using static root metadata in index.html. Ensure `react-helmet-async` updates metadata per subpage. |

## 3. GEO (Generative Engine Optimization) — Score: 6/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| JSON-LD Structured Data | 🔴 | Add Organization and MedicalWebPage JSON-LD schemas to help AI crawlers understand the medical nature of the site. |
| FAQ Schema | 🟡 | Wrap the FAQ component data in FAQPage JSON-LD. |

## 4. COPYWRITING & MESSAGING — Score: 9/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| Value Proposition | 🟢 | "Know your health before symptoms appear." - Clear, powerful, localized (GHS 8/day). |
| African Relevance | 🟢 | Copy correctly reflects context and addresses key localized pain points nicely. |

## 5. MOBILE FRIENDLINESS — Score: 9/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| Viewport & Scaling | 🟢 | `meta name="viewport"` is correctly configured. Flex wraps and stack queries are applied. |
| Touch Targets | 🟡 | Verify custom dot controls in mobile carousels meet minimum 44x44px touch-target heuristics. |

## 6. DESIGN & VISUAL POLISH — Score: 9/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| PhoneFrame Mockups | 🟢 | Beautifully updated with titanium multi-layer shadows and highlights. High-res inputs. |
| Over-Animation | 🟡 | Ensure `Reveal` elements respect `prefers-reduced-motion` for users who have this OS setting enabled. |

## 7. SECURITY — Score: 8/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| Environmental Vars | 🟢 | Using `import.meta.env.BASE_URL` properly. |
| Patient Interface Credentials | 🔴 | The CONTEXT.md file openly logs `app.betterhealth.africa` credentials (peter.dag@gmail.com). Remove/suppress in repo. |
| CSP Headers | 🟡 | No Content-Security-Policy headers explicitly defined in final deploy artifacts. |

## 8. ACCESSIBILITY (A11y) — Score: 6/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| Aria Labels | 🟡 | Some dynamic components (carousels) lack `aria-live` or indicator labelling. |
| Contrast | 🟢 | Using tailwind design tokens properly for most muted/primary text flows. |

## 9. CONVERSION RATE OPTIMIZATION (CRO) — Score: 9/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| Trust Signals | 🟢 | Excellent placement of TrustBar, AdvisoryTeam, and Testimonials. |
| CTA Contrast | 🟢 | Sticky final CTAs and bold Hero buttons work well. Valid WhatsApp fallback present. |

## 10. ANALYTICS & TRACKING — Score: 4/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| Event Tracking | 🔴 | No GA4, GTM, or Meta Pixel initialization logic detected in index.html or main.jsx. Must implement before launch. |

## 11. TECHNICAL STANDARDS — Score: 7/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| Missing Routes | 🔴 | Implement missing `/focus` route or remove stray references causing 404s. |
| PWA Manifest | 🟡 | Missing manifest.json and apple-touch-icons for native "Save to Homescreen" capabilities. |
| 404 Handling | 🟢 | React Router has a fallback route catching *. |

## 12. CODE QUALITY — Score: 8/10
| Finding | Severity | Recommended Action |
| --- | --- | --- |
| Dead Code / Logs | 🟡 | Search for any forgotten console.logs inside components before build. |
| Component Modularity | 🟢 | Well separated contexts, components, and ui primitives. |

---
## Final Verdict
BetterHealth Africa has a visually stunning and robust front-end prepared. Addressing the performance warnings (code-splitting, WebP images) and plugging the tracking/metadata gaps will shift this from a great prototype to an excellent production deployment. Launch Readiness Score: 78/100.

