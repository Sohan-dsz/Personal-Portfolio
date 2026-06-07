# Certificate images

Drop your certificate images here (PNG or JPG — export a page from the PDF as an image).
Each card automatically shows its image; if a file is missing, the card falls back to a badge icon, so nothing breaks.

The filenames below are already wired up in `src/lib/data.ts` (the `image` field of each certification). Just add a file with the matching name:

| Certification | Expected file |
| --- | --- |
| OCI 2025 Certified Generative AI Professional | `oci-generative-ai-professional.png` |
| OCI 2025 Certified AI Foundations Associate | `oci-ai-foundations-associate.png` |
| OCI 2025 Certified Foundations Associate | `oci-foundations-associate.png` |
| Privacy and Security in Online Social Media | `nptel-privacy-security.png` |
| Applied Positive Psychology | `coursera-positive-psychology.png` |
| Salesforce Flow & Lightning Essentials | `salesforce-flow-lightning.png` |

## Adding a new certificate
1. Add the image file to this folder.
2. Add an entry to the `certifications` array in `src/lib/data.ts`, setting `image: "/certificates/<your-file>.png"`.
3. (Optional) set `credentialUrl: "https://…"` to show a "Verify credential" link in the preview.

Recommended: landscape images around 1200×750 (16:10) for the cleanest fit. JPGs also work — just change the extension in the `image` path.
