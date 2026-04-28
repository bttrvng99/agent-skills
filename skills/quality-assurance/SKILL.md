---
name: quality-assurance
description: Ensures generated code functions correctly, is bug-free, and tests UI using browseruse.
---

# Code Quality Assurance Workflow

When tasked with writing or modifying code, or when explicitly asked to run QA, the agent MUST follow these guidelines:

1. **Bug-Free Requirement:**
   - All generated code MUST function correctly and be bug-free before being considered complete.
   - Do not output non-functional "placeholder" logic unless explicitly requested.
   - Prioritize robustness, handling edge cases, loading states, and error handling appropriately.

2. **Proactive Testing:**
   - Agents must proactively test their changes before declaring a task complete.
   - If dealing with UI or Web app interactions, the agent must utilize or download the `browseruse` skill to run browser-based tests to ensure the implementation is fully functional.

3. **Bug Resolution:**
   - If a bug is detected during the agent's self-check or via `browseruse`, fix it immediately without prompting the user, unless further context is required.

4. **Next Steps:**
   - Once quality assurance is successful and the code is verified, automatically proceed to use the `auto-commit` skill to branch, commit, and push the verified code.
