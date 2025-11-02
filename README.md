Victor Acosta — Portfolio & CV

Local development

- Install dependencies: npm install
- Run the dev server: npm run dev
- Open http://localhost:3000

Structure

- src/app/layout.tsx — App layout, navigation, theme toggle, accessibility helpers.
- src/app/page.tsx — Resume content (Summary, Experience, Skills, Education, Contact).
- src/components/Canvas.tsx — Hero background canvas (respects reduced motion).
- public/victor-acosta-cv.pdf — Downloadable PDF.

Styling

- Dark/Light theme via CSS variables and a theme toggle. Variables live in src/app/globals.css.

Notes

- To update contact links (LinkedIn/GitHub), edit src/app/layout.tsx.
