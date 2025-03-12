# CLAUDE.md - Development Guide for whatismcp

## Development Commands
- 🚀 Run dev server: `pnpm dev`
- 🏗️ Build project: `pnpm build`
- 🔎 Lint code: `pnpm lint`
- 🚀 Start production build: `pnpm start`

## Code Style Guidelines
- TypeScript with strict mode enabled
- React functional components with hooks
- Next.js App Router conventions
- Use path alias imports: `@/components`, `@/lib`, etc.
- Format with Prettier: single quotes, no semicolons, trailing commas
- Follow TailwindCSS best practices for styling
- Use MDX for content pages with front matter
- Component naming: PascalCase for components, camelCase for utilities
- Keep component files focused (one component per file)
- Group related functionality in directories
- Use TypeScript interfaces/types for all props and data structures
- Prefer async/await for asynchronous operations