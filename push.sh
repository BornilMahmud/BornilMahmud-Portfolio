#!/bin/bash
read -p "GitHub username: " GH_USER
read -s -p "GitHub token: " GH_TOKEN
echo ""
git push https://${GH_USER}:${GH_TOKEN}@github.com/BornilMahmud/BornilMahmud-Portfolio.git main
