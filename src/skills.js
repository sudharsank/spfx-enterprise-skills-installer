export const SOURCE_REPOSITORY = {
  owner: "sudharsank",
  repo: "spfx-enterprise-skills",
  ref: "e3e692f13fcfb7c749b25f5fbf3fcad34cbaf617"
};

export const SKILL_RECOMMENDATIONS = {
  foundation: {
    label: "Start here",
    description: "Recommended for most SPFx repos as an early install."
  },
  specialized: {
    label: "Install when needed",
    description: "Add this when your project has a clear matching need."
  },
  optional: {
    label: "Optional",
    description: "Useful for niche or stylistic scenarios, not every repo."
  }
};

export const SKILLS = [
  {
    id: "spfx-enterprise-ux-hub",
    title: "SPFx Enterprise UX Hub",
    description: "Global entry skill that routes AI to the right SPFx sub-skills.",
    whenToInstall: "Install first if you want one default SPFx entry point that can pull in more specific guidance later.",
    category: "Routing and defaults",
    recommendation: "foundation",
    goodWith: [
      "spfx-enterprise-design-core",
      "spfx-enterprise-code-and-performance",
      "spfx-enterprise-implementation-core"
    ],
    repoPath: "spfx-enterprise-ux-hub"
  },
  {
    id: "spfx-enterprise-design-core",
    title: "SPFx Enterprise Design Core",
    description: "Layout, hierarchy, empty states, commanding, and responsive SPFx design guidance.",
    whenToInstall: "Add this for most user-facing web parts, dashboards, forms, or portal pages that need stronger UX structure.",
    category: "UX and design",
    recommendation: "foundation",
    goodWith: [
      "spfx-accessibility-and-content-quality",
      "spfx-theme-and-brand-integration"
    ],
    repoPath: "spfx-enterprise-design-core"
  },
  {
    id: "spfx-accessibility-and-content-quality",
    title: "SPFx Accessibility and Content Quality",
    description: "Accessibility, focus behavior, screen-reader semantics, and UX copy guidance.",
    whenToInstall: "Add this when accessibility, semantic markup, keyboard flow, or content quality must be treated as first-class requirements.",
    category: "UX and design",
    recommendation: "foundation",
    goodWith: [
      "spfx-enterprise-design-core",
      "spfx-image-and-media-optimization"
    ],
    repoPath: "spfx-accessibility-and-content-quality"
  },
  {
    id: "spfx-theme-and-brand-integration",
    title: "SPFx Theme and Brand Integration",
    description: "Theme tokens, semantic slots, high-contrast support, and tenant-safe branding.",
    whenToInstall: "Install this when your component must align with tenant branding, theme tokens, dark mode, or high-contrast behavior.",
    category: "UX and design",
    recommendation: "specialized",
    goodWith: [
      "spfx-enterprise-design-core",
      "spfx-css-and-styling-governance"
    ],
    repoPath: "spfx-theme-and-brand-integration"
  },
  {
    id: "spfx-css-and-styling-governance",
    title: "SPFx CSS and Styling Governance",
    description: "SCSS structure, selector scoping, and maintainable styling rules.",
    whenToInstall: "Install this when your repo has growing styling debt or you want consistent SCSS and selector discipline across components.",
    category: "UX and design",
    recommendation: "specialized",
    goodWith: [
      "spfx-theme-and-brand-integration",
      "spfx-glassmorphism-ui"
    ],
    repoPath: "spfx-css-and-styling-governance"
  },
  {
    id: "spfx-glassmorphism-ui",
    title: "SPFx Glassmorphism UI",
    description: "Optional glassmorphism-inspired visual system for cards, headers, and metrics.",
    whenToInstall: "Use this only if your design language explicitly calls for a glassmorphism-style visual treatment.",
    category: "Optional visual styles",
    recommendation: "optional",
    goodWith: [
      "spfx-enterprise-design-core",
      "spfx-css-and-styling-governance"
    ],
    repoPath: "spfx-glassmorphism-ui"
  },
  {
    id: "spfx-enterprise-code-and-performance",
    title: "SPFx Enterprise Code and Performance",
    description: "Data access, PnPjs, service boundaries, bundle size, and rendering performance guidance.",
    whenToInstall: "Add this for most production SPFx repos that care about maintainability, data access patterns, or runtime performance.",
    category: "Engineering core",
    recommendation: "foundation",
    goodWith: [
      "spfx-enterprise-implementation-core",
      "spfx-release-and-package-quality"
    ],
    repoPath: "spfx-enterprise-code-and-performance"
  },
  {
    id: "spfx-enterprise-implementation-core",
    title: "SPFx Enterprise Implementation Core",
    description: "Implementation standards for typed contracts, services, and maintainability.",
    whenToInstall: "Install this when you want stronger implementation standards around service layers, contracts, and code organization.",
    category: "Engineering core",
    recommendation: "foundation",
    goodWith: [
      "spfx-enterprise-code-and-performance",
      "spfx-extensions-enterprise-patterns"
    ],
    repoPath: "spfx-enterprise-implementation-core"
  },
  {
    id: "spfx-property-pane-reactivity",
    title: "SPFx Property Pane Reactivity",
    description: "Guidance for reactive vs non-reactive property panes and editing UX.",
    whenToInstall: "Add this when your web part has a complex property pane and editing behavior is affecting usability or performance.",
    category: "Component scenarios",
    recommendation: "specialized",
    goodWith: [
      "spfx-enterprise-design-core",
      "spfx-enterprise-implementation-core"
    ],
    repoPath: "spfx-property-pane-reactivity"
  },
  {
    id: "spfx-extensions-enterprise-patterns",
    title: "SPFx Extensions Enterprise Patterns",
    description: "Patterns for Application Customizers, Field Customizers, and Command Sets.",
    whenToInstall: "Install this when you are building SPFx extensions rather than only standard web parts.",
    category: "Component scenarios",
    recommendation: "specialized",
    goodWith: [
      "spfx-enterprise-implementation-core",
      "spfx-release-and-package-quality"
    ],
    repoPath: "spfx-extensions-enterprise-patterns"
  },
  {
    id: "spfx-image-and-media-optimization",
    title: "SPFx Image and Media Optimization",
    description: "Responsive image handling, lazy loading, and accessibility metadata.",
    whenToInstall: "Add this when your experience relies on images, media-heavy cards, or performance-sensitive content surfaces.",
    category: "Component scenarios",
    recommendation: "specialized",
    goodWith: [
      "spfx-accessibility-and-content-quality",
      "spfx-enterprise-code-and-performance"
    ],
    repoPath: "spfx-image-and-media-optimization"
  },
  {
    id: "spfx-release-and-package-quality",
    title: "SPFx Release and Package Quality",
    description: "Release-readiness, package-solution guidance, and versioning checks.",
    whenToInstall: "Install this when packaging, release validation, or deployment confidence is part of the work.",
    category: "Build and release",
    recommendation: "specialized",
    goodWith: [
      "spfx-enterprise-code-and-performance",
      "spfx-heft-build-and-toolchain"
    ],
    repoPath: "spfx-release-and-package-quality"
  },
  {
    id: "spfx-heft-build-and-toolchain",
    title: "SPFx Heft Build and Toolchain",
    description: "Heft lifecycle guidance and minimal SPFx build customizations.",
    whenToInstall: "Add this when you are troubleshooting or extending the SPFx build pipeline and need safer toolchain guidance.",
    category: "Build and release",
    recommendation: "specialized",
    goodWith: [
      "spfx-heft-webpack-customization",
      "spfx-release-and-package-quality"
    ],
    repoPath: "spfx-heft-build-and-toolchain"
  },
  {
    id: "spfx-heft-webpack-customization",
    title: "SPFx Heft Webpack Customization",
    description: "Targeted SPFx webpack overrides with low upgrade risk.",
    whenToInstall: "Use this only when the default SPFx build is not enough and you need carefully scoped webpack customization.",
    category: "Build and release",
    recommendation: "optional",
    goodWith: [
      "spfx-heft-build-and-toolchain"
    ],
    repoPath: "spfx-heft-webpack-customization"
  }
];

export function findSkills(skillIds) {
  if (skillIds.includes("all")) {
    return SKILLS;
  }

  const requested = new Set(skillIds);
  const matches = SKILLS.filter((skill) => requested.has(skill.id));

  if (matches.length !== requested.size) {
    const found = new Set(matches.map((skill) => skill.id));
    const missing = [...requested].filter((skillId) => !found.has(skillId));
    throw new Error(`Unknown skill id(s): ${missing.join(", ")}`);
  }

  return matches;
}
