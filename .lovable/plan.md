# Improve CMS editing on phones

## Changes
- Give open editor sections more horizontal room by reducing mobile outer and inner padding.
- Stack crowded two-, three-, and five-column field groups into full-width rows on phones.
- Reflow image, player, fixture, gallery, and news editors vertically so thumbnails and delete actions do not squeeze text fields.
- Keep inputs comfortably sized for touch and preserve the current desktop dashboard unchanged.
- Verify the main mobile tabs and representative editors at phone width.

## Technical details
- Apply mobile-only layout rules through a dedicated CMS editor wrapper, with existing `sm`/`md` desktop layouts left intact.
- Preserve all CMS data, publishing behavior, uploads, and database structure.
