// Design tokens — single source of truth for all visual values.
// Extended into tailwind.config.ts via the `tokens` key.

export const tokens = {
  colors: {
    // Brand backgrounds
    cream: "#FFFDF4",
    creamDark: "#FFF8E1",

    // Accent palette
    sky: {
      300: "#7DD3FC",
      400: "#38BDF8",
      600: "#0284C7",
    },
    sun: {
      300: "#FCD34D",
      400: "#FBBF24",
      600: "#D97706",
    },
    mint: {
      300: "#6EE7B7",
      400: "#34D399",
      600: "#059669",
    },
    coral: {
      300: "#FDA4AF",
      400: "#FB7185",
      600: "#E11D48",
    },
    lavender: {
      300: "#C4B5FD",
      400: "#A78BFA",
      600: "#7C3AED",
    },

    // Semantic
    success: "#059669",
    error: "#E11D48",
    neutral: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      700: "#374151",
      900: "#111827",
    },
  },

  // Font sizes per age group
  fontSize: {
    phaseA: { base: "1.25rem", heading: "2rem", button: "1.5rem" },   // Kelas 1-2
    phaseB: { base: "1.125rem", heading: "1.75rem", button: "1.25rem" }, // Kelas 3-4
    phaseC: { base: "1rem", heading: "1.5rem", button: "1.125rem" },   // Kelas 5-6
  },

  // Minimum touch target sizes
  touchTarget: {
    phaseA: "64px",
    phaseB: "56px",
    phaseC: "48px",
  },

  fonts: {
    display: "'Fredoka', 'Nunito', sans-serif",
    body: "'Nunito', 'Fredoka', sans-serif",
  },

  borderRadius: {
    card: "1.5rem",
    button: "9999px",
    chip: "0.75rem",
  },
};
