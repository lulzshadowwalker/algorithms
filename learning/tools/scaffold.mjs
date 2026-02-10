import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const learningRoot = path.resolve(scriptDir, "..");
await ensureDir(learningRoot);

const rl = readline.createInterface({ input, output });
const rawName = (await rl.question("Subproject name: ")).trim();
const name = normalizeName(rawName);
if (!name) {
  rl.close();
  console.error("Invalid name.");
  process.exit(1);
}

const langInput = (await rl.question(
  "Languages (1=cpp, 2=typescript, comma separated): "
)).trim();
rl.close();

const languages = parseLanguages(langInput);
if (languages.length === 0) {
  console.error("No languages selected.");
  process.exit(1);
}

const projectRoot = path.join(learningRoot, name);
if (await exists(projectRoot)) {
  console.error(`Project already exists: ${projectRoot}`);
  process.exit(1);
}

for (const lang of languages) {
  if (lang === "cpp") {
    await createCpp(projectRoot, name);
  }
  if (lang === "ts") {
    await createTs(projectRoot, name);
  }
}

console.log(`Created ${name} with ${languages.join(", ")}.`);

function normalizeName(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function parseLanguages(value) {
  const items = value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  const result = new Set();
  for (const item of items) {
    if (item === "1" || item === "cpp" || item === "c++") {
      result.add("cpp");
    }
    if (item === "2" || item === "ts" || item === "typescript") {
      result.add("ts");
    }
  }
  return Array.from(result);
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(targetPath) {
  await fs.mkdir(targetPath, { recursive: true });
}

async function writeFile(filePath, content) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, "utf8");
}

async function createCpp(projectRoot, name) {
  const base = path.join(projectRoot, "cpp");
  await ensureDir(base);

  await writeFile(
    path.join(base, "main.cpp"),
    `#include <stdio>\n\nint main() {\n    printf("${name} cpp\n");\n    return 0;\n}\n`
  );

  await writeFile(
    path.join(base, "Makefile"),
    `CXX ?= c++\nCXXFLAGS ?= -std=c++20 -Wall -Wextra -Wpedantic -O0 -g\nFILE ?= main.cpp\nOUT := build/$(FILE:.cpp=)\n\n.PHONY: all build run clean\n\nall: run\n\nbuild:\n\tmkdir -p build\n\t$(CXX) $(CXXFLAGS) $(FILE) -o $(OUT)\n\nrun: build\n\t./$(OUT)\n\nclean:\n\trm -rf build\n`
  );
}

async function createTs(projectRoot, name) {
  const base = path.join(projectRoot, "typescript");
  await ensureDir(base);

  await writeFile(
    path.join(base, "package.json"),
    `{
  "name": "${name}-ts",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "vitest run --config vitest.config.ts",
    "test:watch": "vitest --config vitest.config.ts",
    "start": "node --experimental-strip-types src/main.ts"
  }
}
`
  );

  await writeFile(
    path.join(base, "tsconfig.json"),
    `{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*.ts"]
}
`
  );

  await writeFile(
    path.join(base, "vitest.config.ts"),
    `import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["src/**/*.test.ts"]
  }
});
`
  );

  await writeFile(
    path.join(base, "src", "example.ts"),
    `export function enqueue(items: number[], item: number): number[] {
  return [...items, item];
}
`
  );

  await writeFile(
    path.join(base, "src", "main.ts"),
    `import { enqueue } from "./example.ts";\n\nconst result = enqueue([1, 2], 3);\nconsole.log(result);\n`
  );

  await writeFile(
    path.join(base, "src", "example.test.ts"),
    `import { enqueue } from "./example.ts";

describe("enqueue", () => {
  it("adds an item", () => {
    expect(enqueue([1, 2], 3)).toEqual([1, 2, 3]);
  });
});
`
  );
}
