# agent-skills

Reusable AI agent skills shared across projects.

## Skills

- `auto-commit` — Validates branch state, creates/switches branches as needed, commits and pushes code, and opens a pull request.
- `quality-assurance` — Ensures generated code is bug-free, tests UI with browseruse, and triggers auto-commit on success.

## Usage in any project

### Option 1 — npx (recommended)

Add a skill directly into your project without installing anything:

```bash
# List all available skills
npx github:bttrvng99/agent-skills list

# Add a specific skill (copies into .agents/skills/<skill-name>/)
npx github:bttrvng99/agent-skills add auto-commit

# Add to a custom destination
npx github:bttrvng99/agent-skills add auto-commit --dest .cursor/skills
```

> Skills are copied into `.agents/skills/<skill-name>/` by default.
> Run the command again to pull the latest version of a skill.

### Option 2 — Git submodule

Add the whole repo as a submodule to get all skills at once:

```bash
git submodule add https://github.com/bttrvng99/agent-skills .agents/skills-shared
git submodule update --init --recursive
```

Update to latest at any time:

```bash
git submodule update --remote .agents/skills-shared
```
