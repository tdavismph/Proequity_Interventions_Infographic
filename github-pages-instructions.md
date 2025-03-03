# Step-by-Step GitHub Pages Deployment Instructions

This guide will walk you through the process of deploying your visualization to GitHub Pages, even if you've never used GitHub before.

## 1. Create a GitHub Account

If you don't already have a GitHub account:

1. Go to [github.com](https://github.com)
2. Click "Sign up" in the top right corner
3. Follow the registration process

## 2. Create a New Repository

1. After logging in, click the "+" button in the top right corner
2. Select "New repository"
3. Fill in the repository details:
   - Name: `health-interventions-visualization` (or any name you prefer)
   - Description: (optional) "Interactive visualization of health intervention rankings"
   - Choose "Public" repository
   - Check the box "Add a README file"
4. Click "Create repository"

## 3. Upload Your Files

1. In your new repository, click "Add file" then "Upload files"
2. Drag and drop or select all these files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `sample_data.json`
3. **Optional**: If you have the Excel file `Final_Intervention_Rankings_by_Country.xlsx`, upload it too. If not, the visualization will still work using the sample data.
4. Add a commit message like "Initial upload of visualization files"
5. Click "Commit changes"

## 4. Enable GitHub Pages

1. In your repository, click the "Settings" tab (near the top)
2. Scroll down or look in the left sidebar for "Pages"
3. Under "Source", select "Deploy from a branch"
4. Under "Branch", select "main" from the dropdown
5. Make sure the folder is set to "/ (root)"
6. Click "Save"
7. Wait for GitHub to process your request (this may take a few minutes)
8. After processing, you'll see a message saying "Your site is live at [URL]"

## 5. Access Your Visualization

1. The URL will be in the format: `https://[your-username].github.io/[repository-name]/`
2. If GitHub doesn't show you the URL, you can construct it by replacing `[your-username]` with your GitHub username and `[repository-name]` with the name you gave your repository

## Important Notes

- It can take up to 10 minutes for your site to be deployed after enabling GitHub Pages
- If the site doesn't show up immediately, wait a few minutes and refresh
- The visualization will work with the sample data even if you don't upload the Excel file

## Troubleshooting Common Issues

1. **Files not showing up**:
   - Make sure filenames match exactly (case-sensitive): `index.html`, `styles.css`, `script.js`, `sample_data.json`
   - All files should be in the root of your repository, not in folders

2. **Blank page loads**:
   - Right-click on the page and select "Inspect" or "Inspect Element"
   - Click on the "Console" tab to see any error messages
   - The most common issue is path problems with the files

3. **GitHub Pages not activating**:
   - Make sure you selected "main" branch and "/ (root)" folder
   - Remember it can take several minutes for changes to deploy

4. **Other issues**:
   - Try opening the site in an incognito/private window
   - Clear your browser cache
   - Try a different browser

If you're still having issues, you can make a small change to any file and commit it, which will trigger a redeployment.
