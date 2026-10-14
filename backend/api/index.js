// Vercel serverless entry. Vercel has no long-lived process, so instead of
// `listen()` (see src/index.ts) it invokes this exported Express app once per
// request. Imports the compiled output because `npm run build` runs first.
import app from "../dist/app.js";

export default app;
