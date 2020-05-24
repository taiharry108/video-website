rm ../video-website-backend/app/frontend/static/frontend/*.js ../video-website-backend/app/frontend/static/frontend/*.css
cp dist/video-website/*.js dist/video-website/*.css ../video-website-backend/app/frontend/static/frontend/
cp dist/video-website/index.html ../video-website-backend/app/frontend/templates/frontend/