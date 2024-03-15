# CoastCompanionDemo

### How to use this
Please refer to https://thed3vel0per.github.io/CoastCompanionDemo/guide for a detailed instruction on how to use this.

### GitHub Pages Deployment Config
Because of Docusaurus, it's easier to deploy using a script to the branch ``gh-pages``. To make that possible...
1. pull
2. Go to the correct directory ``cd backbenchers`` then ``npm install``
3. Build by ``npm run build`` (ignore broken link warnings)
4. Deploy by ``USE_SSH=true npm run deploy``. This should automatically create a gh-pages branch and deploy changes there.
5. Go to GitHub Repo settings -> Pages and make sure it's "deploy from a branch" and the branch is set to "gh-pages" deploying from "root". If not, change it.
6. Visit the page to see if it worked.

### ChatBot and Embed Directories
1. Chatbot and Embed Directories in the root folder are **not** being used by the deployment
2. The Chatbot directory is in backbenchers/static/chatbot
3. The Embed directory is in backbenchers/static/embed
4. You can use the root folder to do experiments, or delete it.
