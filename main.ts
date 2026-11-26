// Funniest Forecast for a City That Isn't
// Writes the single-line forecast to /output/entry.txt (UTF-8).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const FORECAST = "In Atlantis: flooding continues, residents advised to evolve.";
const OUT_PATH = "/output/entry.txt";

function validateForecast(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 120) {
    throw new Error(`forecast must be 1-120 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("forecast must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("forecast must be a single line");
  }
}

function writeForecast(): void {
  validateForecast(FORECAST);
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, FORECAST, { encoding: "utf8" });
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== FORECAST) {
    throw new Error("read-back mismatch after writing entry.txt");
  }
  const chars = [...written].length;
  console.log(`entry.txt written: ${chars} characters, ${Buffer.byteLength(written, "utf8")} bytes`);
}

writeForecast();
