export const SOURCE_REPOSITORY = {
  owner: "sudharsank",
  repo: "spfx-enterprise-skills",
  ref: "e3e692f13fcfb7c749b25f5fbf3fcad34cbaf617"
};

export const SKILLS = [
  {
    id: "spfx-enterprise-ux-hub",
    title: "SPFx Enterprise UX Hub",
    description: "Global entry skill that routes AI to the right SPFx sub-skills.",
    repoPath: "spfx-enterprise-ux-hub"
  },
  {
    id: "spfx-enterprise-design-core",
    title: "SPFx Enterprise Design Core",
    description: "Layout, hierarchy, empty states, commanding, and responsive SPFx design guidance.",
    repoPath: "spfx-enterprise-design-core"
  },
  {
    id: "spfx-accessibility-and-content-quality",
    title: "SPFx Accessibility and Content Quality",
    description: "Accessibility, focus behavior, screen-reader semantics, and UX copy guidance.",
    repoPath: "spfx-accessibility-and-content-quality"
  },
  {
    id: "spfx-theme-and-brand-integration",
    title: "SPFx Theme and Brand Integration",
    description: "Theme tokens, semantic slots, high-contrast support, and tenant-safe branding.",
    repoPath: "spfx-theme-and-brand-integration"
  },
  {
    id: "spfx-css-and-styling-governance",
    title: "SPFx CSS and Styling Governance",
    description: "SCSS structure, selector scoping, and maintainable styling rules.",
    repoPath: "spfx-css-and-styling-governance"
  },
  {
    id: "spfx-glassmorphism-ui",
    title: "SPFx Glassmorphism UI",
    description: "Optional glassmorphism-inspired visual system for cards, headers, and metrics.",
    repoPath: "spfx-glassmorphism-ui"
  },
  {
    id: "spfx-enterprise-code-and-performance",
    title: "SPFx Enterprise Code and Performance",
    description: "Data access, PnPjs, service boundaries, bundle size, and rendering performance guidance.",
    repoPath: "spfx-enterprise-code-and-performance"
  },
  {
    id: "spfx-enterprise-implementation-core",
    title: "SPFx Enterprise Implementation Core",
    description: "Implementation standards for typed contracts, services, and maintainability.",
    repoPath: "spfx-enterprise-implementation-core"
  },
  {
    id: "spfx-property-pane-reactivity",
    title: "SPFx Property Pane Reactivity",
    description: "Guidance for reactive vs non-reactive property panes and editing UX.",
    repoPath: "spfx-property-pane-reactivity"
  },
  {
    id: "spfx-extensions-enterprise-patterns",
    title: "SPFx Extensions Enterprise Patterns",
    description: "Patterns for Application Customizers, Field Customizers, and Command Sets.",
    repoPath: "spfx-extensions-enterprise-patterns"
  },
  {
    id: "spfx-image-and-media-optimization",
    title: "SPFx Image and Media Optimization",
    description: "Responsive image handling, lazy loading, and accessibility metadata.",
    repoPath: "spfx-image-and-media-optimization"
  },
  {
    id: "spfx-release-and-package-quality",
    title: "SPFx Release and Package Quality",
    description: "Release-readiness, package-solution guidance, and versioning checks.",
    repoPath: "spfx-release-and-package-quality"
  },
  {
    id: "spfx-heft-build-and-toolchain",
    title: "SPFx Heft Build and Toolchain",
    description: "Heft lifecycle guidance and minimal SPFx build customizations.",
    repoPath: "spfx-heft-build-and-toolchain"
  },
  {
    id: "spfx-heft-webpack-customization",
    title: "SPFx Heft Webpack Customization",
    description: "Targeted SPFx webpack overrides with low upgrade risk.",
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
