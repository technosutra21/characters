#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npm run deploy

echo "Deployment completed!"