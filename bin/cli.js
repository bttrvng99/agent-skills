#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// ── Helpers ──────────────────────────────────────────────────────────────────

const SKILLS_DIR = path.join(__dirname, "..", "skills");
const DEFAULT_DEST = ".agents/skills";

function log(msg) {
  console.log(`\x1b[36m[agent-skills]\x1b[0m ${msg}`);
}
function ok(msg) {
  console.log(`\x1b[32m✔\x1b[0m  ${msg}`);
}
function warn(msg) {
  console.warn(`\x1b[33m⚠\x1b[0m  ${msg}`);
}
function err(msg) {
  console.error(`\x1b[31m✖\x1b[0m  ${msg}`);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function availableSkills() {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  return fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

// ── Commands ──────────────────────────────────────────────────────────────────

function cmdList() {
  const skills = availableSkills();
  if (skills.length === 0) {
    warn("No skills found.");
    return;
  }
  log("Available skills:");
  for (const s of skills) {
    console.log(`  • ${s}`);
  }
}

function cmdAdd(skillName, dest) {
  const skills = availableSkills();

  if (!skillName) {
    err("Please specify a skill name.");
    cmdList();
    process.exit(1);
  }

  if (!skills.includes(skillName)) {
    err(`Unknown skill: "${skillName}"`);
    log(`Available: ${skills.join(", ")}`);
    process.exit(1);
  }

  const src = path.join(SKILLS_DIR, skillName);
  const targetDir = path.resolve(process.cwd(), dest, skillName);

  if (fs.existsSync(targetDir)) {
    warn(`Skill "${skillName}" already exists at ${targetDir} — overwriting.`);
  }

  copyDir(src, targetDir);
  ok(`Added skill "${skillName}" → ${targetDir}`);
}

function cmdHelp() {
  console.log(`
Usage:
  npx agent-skills <command> [options]

Commands:
  list                    List all available skills
  add <skill> [--dest]    Copy a skill into your project
                          (default destination: ${DEFAULT_DEST})

Options:
  --dest <path>           Override the destination directory
  --help, -h              Show this help message

Examples:
  npx agent-skills list
  npx agent-skills add auto-commit
  npx agent-skills add auto-commit --dest .cursor/skills
`);
}

// ── Entry point ───────────────────────────────────────────────────────────────

const [, , command, ...rest] = process.argv;

// Parse --dest flag from remaining args
let dest = DEFAULT_DEST;
const destIdx = rest.indexOf("--dest");
if (destIdx !== -1 && rest[destIdx + 1]) {
  dest = rest[destIdx + 1];
  rest.splice(destIdx, 2);
}

switch (command) {
  case "list":
    cmdList();
    break;
  case "add":
    cmdAdd(rest[0], dest);
    break;
  case "--help":
  case "-h":
  case undefined:
    cmdHelp();
    break;
  default:
    err(`Unknown command: "${command}"`);
    cmdHelp();
    process.exit(1);
}
