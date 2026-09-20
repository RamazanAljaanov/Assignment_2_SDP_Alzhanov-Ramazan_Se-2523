#!/usr/bin/env bash
set -e

# ==============================================================================
# GitHub Push Script for Assignment 2
# Repository: https://github.com/RamazanAljaanov/Assignment_2_SDP_Factory_method_and_Abstract_method
# ==============================================================================

echo "=================================================================="
echo "Pushing Assignment 2 to GitHub: RamazanAljaanov"
echo "=================================================================="

# Check if GitHub Personal Access Token (PAT) is provided as argument or environment variable
GITHUB_TOKEN="${1:-$GH_TOKEN}"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Usage: ./push_to_github.sh <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>"
    echo ""
    echo "Alternatively, export GH_TOKEN=<token> and run ./push_to_github.sh"
    echo ""
    echo "If you have SSH keys configured with GitHub, simply run:"
    echo "  git remote set-url origin git@github.com:RamazanAljaanov/Assignment_2_SDP_Factory_method_and_Abstract_method.git"
    echo "  git push -u origin main"
    echo "=================================================================="
    exit 1
fi

REMOTE_URL="https://RamazanAljaanov:${GITHUB_TOKEN}@github.com/RamazanAljaanov/Assignment_2_SDP_Factory_method_and_Abstract_method.git"

echo "Setting remote URL with token..."
git remote set-url origin "$REMOTE_URL"

echo "Pushing branch 'main' to GitHub..."
git push -u origin main

# Reset remote back to clean https URL without credentials
git remote set-url origin "https://github.com/RamazanAljaanov/Assignment_2_SDP_Factory_method_and_Abstract_method.git"

echo ""
echo " Successfully pushed commits to GitHub repository!"
echo "View your repo at: https://github.com/RamazanAljaanov/Assignment_2_SDP_Factory_method_and_Abstract_method"
