# Launch Checklist

## Before launch

| Item | What is needed from the client | Flag or file to change |
|---|---|---|
| Statistics confirmed | Confirm the four experience and credibility figures and the country count. | Set `SHOW_STATS = true` in `assets/js/site-flags.js`. |
| ISO 9001:2026 publication confirmed | Confirm publication status and applicable transition dates. | Set `SHOW_ISO_2026 = true` in `assets/js/site-flags.js`. |
| Sustenance line approved | Approve the line `Available as a separate, structured engagement.` | `pages/consulting.html` sustenance section. |
| Consulting copy approved | Review the proposed ISO consulting introduction and certification-body clarification. | `pages/consulting.html` ISO roadmap intro. |
| Roadmap sequence confirmed | Confirm the revised ordering of the ISO 14001 and ISO 45001 roadmap content. | `pages/consulting.html` ISO roadmap sections. |
| Case studies and testimonials ready | Provide verified outcomes and approved customer quotes, names, companies and roles if these blocks are to return. | `index.html` client success blocks; remove `data-placeholder="true"` when approved. |
| Contact inbox confirmed | Confirm `info@marssigma.com` is active before launch. | Site contact copy and links; form currently composes to `srini@marssigma.com` in `pages/contact.html` (recipient wiring intentionally unchanged). |

## Removed HTML TODO comments

### `index.html`

- **Experience & Credibility** — `<!-- TODO(client): confirm all four statistics before launch; also reconcile "5+ Countries Served" with the site's "India | Bahrain" positioning -->`

- **Homepage content** — `<!-- TODO: create pages/about.html and update this link -->`

- **Homepage content** — `<!-- TODO: create pages/supplier-development.html and update this link -->`

- **ISO 9001:2026 Transition** — `<!-- TODO(client): confirm ISO 9001:2026 publication status and transition dates before launch -->`

- **Client Success & Experience** — `<!-- TODO(client): add verified outcomes supported by rejection % reduction, complaint reduction, audit NC closure, supplier delivery/quality, waste/cycle-time reduction, and training assessment scores; customer complaint reduction and supplier quality improvement are the priority. -->`

- **Client Success & Experience** — `<!-- TODO(client): replace each testimonial placeholder with a verified customer quote and obtain customer permission; confirm name, company and role. -->`

### `pages/consulting.html`

- **ISO Management System Consulting / ISO 9001** — `<!-- TODO(client): approve this proposed introduction before launch. -->`

- **ISO Management System Consulting / ISO 9001** — `<!-- TODO(client): approve this certification-body clarification before launch. -->`

- **ISO 14001 roadmap** — `<!-- TODO(client): the original order was EMS Implementation, Environmental Aspects, Compliance Management, Continuous Improvement. It is reordered here because aspects must be identified before implementation. Confirm with the client. -->`

- **ISO 45001 roadmap** — `<!-- TODO(client): original copy listed Incident Investigation as step 3. It is shown as a reactive branch because incidents are event-driven; confirm with the client. -->`

## Placeholder text found

- Homepage client success block: two `[Verified outcome to be added]` rows, hidden with the complete case-study and testimonial group.
- Homepage testimonials: three `[Verified customer testimonial to be added — requires customer permission]` texts and three each of `[Customer name]`, `[Company]`, and `[Role]`, all inside the hidden testimonial group.

