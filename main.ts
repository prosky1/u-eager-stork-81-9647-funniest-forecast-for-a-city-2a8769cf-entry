import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const BULLETIN = "In Atlantis: flooding continues, residents advised to evolve.";
const DESTINATION = "/output/entry.txt";

const openOutputFolder = (filePath: string): void => {
  mkdirSync(dirname(filePath), { recursive: true });
};

const SHORTEST_ALLOWED = 1;
const LONGEST_ALLOWED = 120;

const guardBulletin = (line: string): void => {
  const glyphCount = [...line].length;
  if (glyphCount < SHORTEST_ALLOWED || glyphCount > LONGEST_ALLOWED) {
    throw new Error(
      `bulletin has ${glyphCount} characters, outside ${SHORTEST_ALLOWED}-${LONGEST_ALLOWED}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("bulletin must not be only whitespace");
  }
};

const emitBulletin = (filePath: string, line: string): void => {
  guardBulletin(line);
  openOutputFolder(filePath);
  writeFileSync(filePath, line, "utf8");
};

const runForecastDesk = (): void => {
  emitBulletin(DESTINATION, BULLETIN);
};

runForecastDesk();
