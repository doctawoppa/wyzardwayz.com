# Wizardwayz: The Mundi-Magi Architecture

This project operates across two distinct but interconnected domains, representing a dual-layered reality framework: **Mundi** and **Magi**.

## The Two Layers

| Layer | Domain | Perspective | Role |
| :--- | :--- | :--- | :--- |
| **Mundi** | `wizardwayz.com` | Mundane / Business | Practical operations, revenue, and deliverables. |
| **Magi** | `wyzardwayz.com` | Narrative / Mystical | Mythological framework, storytelling, and worldbuilding. |

## The "Layer-Shift" Mechanic

The two sites are designed to be nearly identical in visual style, creating a seamless but subtle transition for visitors. This is known as the **Layer-Shift**:

1.  **Navigation via Pillars**: Both sites feature an interactive tagline where the letters **M-E-M-E** serve as navigation points to various "Pillars" (e.g., Memetics, Mysticism, Evolve, Enlighten).
2.  **Cross-Domain Routing**: 
    *   When a visitor is on the **Mundi** site (`wizardwayz.com`) and clicks a pillar, they are often routed to the corresponding pillar page.
    *   From any pillar page on the **Mundi** site, clicking **"Back to Source"** will navigate them to the **Magi** site (`wyzardwayz.com`).
    *   Conversely, from the **Magi** site, clicking **"Back to Source"** returns them to the **Mundi** site.
3.  **The Illusion**: To a casual visitor, it may feel like they are on the same website, but the subtle shift in domain and content perspective (Mundi vs. Magi) represents a transition between different planes of reality.

## Visual Distinctions

While the layouts are identical, two key elements distinguish the layers:

*   **Logo Text**: The Mundi site uses the **WIZARDWAYZ** logo, while the Magi site uses the **WYZARDWAYZ** logo.
*   **Browser Titles**:
    *   **Mundi**: *Wizardwayz - The MEME is the Magic*
    *   **Magi**: *Wyzardwayz - The MAGIC is the MEME*

## Technical Implementation

*   **Routing**: Handled via `window.location.href` in the `handleBackClick` function within each pillar file to ensure hard navigation between domains.
*   **Assets**: Each repository contains its specific logo in the `client/public/` folder (`logo.png` for Mundi, `logo-magi.png` for Magi).
*   **Shared Logic**: Both sites share the same pillar definitions and randomization logic, ensuring the "M-E-M-E" interactive elements behave consistently across both layers.
