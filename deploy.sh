#!/bin/bash

# GitHub Pages Deployment Script for truck-duck-go

echo "🚀 Starting deployment to GitHub Pages..."

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Built files are in the 'dist' directory"
    echo ""
    echo "Next steps:"
    echo "1. Push your code to GitHub"
    echo "2. Go to your repository settings"
    echo "3. Navigate to Pages section"
    echo "4. Set source to 'GitHub Actions'"
    echo "5. The workflow will automatically deploy your site"
    echo ""
    echo "Your site will be available at:"
    echo "https://yourusername.github.io/front-end-template/"
else
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi