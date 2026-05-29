# Notes on Yocto layer organization at scale

Yocto's layer model is powerful and, by default, a quiet way to paint yourself into a corner. Once you have more than a couple of products sharing a BSP, the question of *what goes in which layer* becomes the single biggest determinant of how fast you can ship the next board.

## The layers I actually keep

I keep five categories, in this order of stability:

- `meta-bsp-<vendor>` — vendor BSP, untouched. Pinned to a known-good revision.
- `meta-bsp-<board>` — board-specific machine config, device tree fragments, U-Boot bits. Owned by hardware.
- `meta-platform` — everything common across our products: distro config, image features, systemd units, security hardening.
- `meta-app-<product>` — recipes for the actual application stack on a given product.
- `meta-local` — short-lived, never released. Used for bring-up and debugging only.

## Why this shape

The split mirrors who owns what and how often it changes. Vendor BSP changes rarely. Board layers change per hardware revision. Platform layers change when we make a fleet-wide decision. App layers change every sprint. Mixing these together is what makes Yocto trees impossible to maintain.

## One rule that pays off

No recipe in a higher-stability layer is ever allowed to bbappend a lower-stability one. If `meta-platform` needs to influence something in `meta-bsp-<board>`, that's a signal the abstraction is wrong — fix it at the source, don't paper over it.