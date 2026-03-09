#!/bin/bash

echo ""
echo "========================================"
echo "   Push Portfolio to GitHub"
echo "========================================"
echo ""

read -p "GitHub username: " GH_USER
read -s -p "GitHub Personal Access Token: " GH_TOKEN
echo ""

if [ -z "$GH_USER" ] || [ -z "$GH_TOKEN" ]; then
  echo "Error: username and token are required."
  exit 1
fi

REPO_URL="https://${GH_USER}:${GH_TOKEN}@github.com/BornilMahmud/BornilMahmud-Portfolio.git"

echo ""
echo "Preparing fresh git history..."

cd "$(dirname "$0")"

rm -rf .git
git init -q
git add .
git commit -q -m "Initial commit — Bornil Mahmud Portfolio"
git branch -M main

echo "Pushing to GitHub..."
git push "$REPO_URL" main --force 2>&1 | grep -v "${GH_TOKEN}"

if [ $? -eq 0 ]; then
  echo ""
  echo "Done! Code pushed to:"
  echo "https://github.com/BornilMahmud/BornilMahmud-Portfolio"
else
  echo ""
  echo "Push failed. Check your username and token, then try again."
fi
