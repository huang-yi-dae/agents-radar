/**
 * Weekly rollup entry point.
 * Run with: pnpm weekly
 *
 * LEARNING NOTES:
 * - This is a thin entry point — it just imports and calls runWeeklyRollup().
 * - Separate entry points (weekly.ts, monthly.ts) allow running each independently
 *   via different npm scripts and GitHub Actions workflows.
 */
import { runWeeklyRollup } from "./rollup.ts";

runWeeklyRollup().catch((err) => {
  console.error(err);
  process.exit(1);
});
