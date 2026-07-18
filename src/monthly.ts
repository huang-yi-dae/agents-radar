/**
 * Monthly rollup entry point.
 * Run with: pnpm monthly
 */
import { runMonthlyRollup } from "./rollup.ts";

runMonthlyRollup().catch((err) => {
  console.error(err);
  process.exit(1);
});
