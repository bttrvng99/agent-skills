# agent-skills

Reusable AI agent skills shared across projects.

## Skills

- `auto-commit` — Validates branch state, creates/switches branches as needed, commits and pushes code, and opens a pull request.
- `quality-assurance` — Ensures generated code is bug-free, tests UI with browseruse, and triggers auto-commit on success.

## Usage in any project

Add as a git submodule:

```bash
git submodule add https://github.com/bttrvng99/agent-skills .agents/skills-shared
git submodule update --init --recursive
```

Update to latest at any time:

```bash
git submodule update --remote .agents/skills-shared
```
