---
name: auto-commit
description: Commits code, creates a new branch if on develop/main/master, and pushes to GitHub (amending if the branch exists).
---

# Auto Commit Workflow

When quality assurance of the generated code succeeds, the agent MUST execute the following git workflow:

1. **Check Current Branch:**
   Run `git branch --show-current` to determine the active branch.

2. **Branching Logic:**
   - If the current branch IS `develop`, `main`, or `master`:
     - Create a new branch logically named based on the feature or bugfix.
     - Example: `git checkout -b feat/add-new-feature` or `git checkout -b fix/issue-description`
   - If the current branch IS NOT `develop`, `main`, or `master`, check whether it has already been merged using **two methods** (either one being true counts as merged):
     - **Method 1 — Git merge check** (catches traditional merge commits):
       Run `git branch -r --merged origin/develop 2>/dev/null || git branch -r --merged origin/main 2>/dev/null || git branch -r --merged origin/master 2>/dev/null` and check if the current branch name appears in the output.
     - **Method 2 — GitHub PR check** (catches squash & rebase merges that Method 1 misses):
       Run `gh pr view --json state,headRefName 2>/dev/null` and check if `"state": "MERGED"` is present for the current branch. If `gh` is not authenticated or unavailable, skip this method.
     - **If EITHER method indicates the branch is already merged:**
       - Determine the best base branch to branch from (prefer `develop` if it exists, otherwise `main`, otherwise `master`).
       - Switch to the base branch and pull latest: `git checkout <base-branch> && git pull origin <base-branch>`
       - Create a new branch logically named based on the feature or bugfix: `git checkout -b feat/add-new-feature`
     - **If NEITHER method indicates a merge** (i.e., it is an active feature/bugfix branch):
       - Do not create a new branch. Stay on the current branch.

3. **Commit and Push Logic:**
   - Stage all changes: `git add .`
   - **If a NEW branch was created in step 2:**
     - Commit normally: `git commit -m "<type>: <description>"`
     - Push to the remote repository: `git push -u origin <branch-name>`
   - **If you stayed on an EXISTING feature branch:**
     - Amend the commit instead of creating a new one: `git commit --amend --no-edit` (if the editor opens, use `:wq`)
     - Force push the changes: `git push --force-with-lease origin <branch-name>`

4. **Pull Request:**
   - After successfully pushing, create a pull request (e.g., via `gh pr create` if authenticated) or provide the user with the URL to create it manually.
