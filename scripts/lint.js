import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dirs = ["src", "test", "scripts"];
const problems = [];

for (const dir of dirs) {
   for (const file of readdirSync(dir).filter((f) => f.endsWith(".js"))) {
      const path = join(dir, file);
      const text = readFileSync(path, "utf8");

      text.split("\n").forEach((line, i) => {
         const where = `${path}:${i + 1}`;
         if (line.includes("\t")) problems.push(`${where} tab character`);
         if (/[ \t]+\r?$/.test(line))
            problems.push(`${where} trailing whitespace`);
         if (dir === "src" && line.includes("console.")) {
            problems.push(`${where} console call in src`);
         }
         const m = line.match(/^\s*import\s.*from\s+["']([^"']+)["']/);
         if (m && !m[1].startsWith("node:") && !m[1].startsWith(".")) {
            problems.push(`${where} non-builtin import "${m[1]}"`);
         }
      });

      if (!text.endsWith("\n")) problems.push(`${path} missing final newline`);
   }
}

if (problems.length > 0) {
   console.error(problems.join("\n"));
   process.exit(1);
}
console.log("lint: no problems found");
