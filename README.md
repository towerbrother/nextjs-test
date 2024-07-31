### Task description:

There are already 4 pages created:

- `/csr` for Client Side Rendering
- `/isr` for Incremental Static Regeneration
- `/ssg` for Static Site Generation
- `/ssr` for Server Side Rendering

1. Fork from `main`
2. Fill these pages with the required logic to make them work in the mode corresponding to their name.
   - You can find some details (API URLs) commented in the code of each page.
3. Create a PR when it's finished.

### Comments

Few remarks:

- I did not focus too much on styling or components management.
- I wrote some comments and left behind some `console.log` to prove rendering logic after `build`.
- I worked within a predefined framework of requirements, not everything I implemented would be my initial choice when building an actual app.
- The code implementation of the different rendering logics can be tested by running `pnpm run build`. There it is possible to see whether a page is statically, dynamically or SSG rendered.
