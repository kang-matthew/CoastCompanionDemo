---
sidebar_position: 1
---

# Make Changes Locally

:::warning

There is a React Error sometimes when I do "previous page", and when I refresh the page it dissapears. It's not really affecting the build file so you can probably ignore it.

:::

If you are making big chagnes, you must clone and work on it locally, then push it to the GitHub Repository. Not sure if you want to create a new branch for this (ask Devam).

#### Clone the repository on your Terminal.
```bash
git clone https://github.com/TheD3vel0per/CoastCompanionDemo.git
```

#### Install Dependencies
```bash
cd backbenchers
npm install
```

### Start the site
```bash
npm run start
```

### Directory Structure
:::danger
Please do **not** edit certain files and push them.
- Please do **not** edit ``docusaurus.config.js``. They are configured to be deployed to Devam's GitHub Pages. If you make changes and deploy them, it will possibly fail.
- Do **not** edit any of the existing styles inside a ``.css`` file (you can add more styles, just don't change existing ones). This is because there's a lot of variables for configuring light/dark mode.
:::

```
backbenchers/
├── .docusaurus/
├── blog/
├── build/
├── dev/
│   ├── release-notes/
│   │   ├── 0.1.0.md
│   │   ├── 0.2.0.md
│   │   └── 0.3.0.md
│   └── roadmap.mdx
├── docs/
├── guide/
├── src/
│   ├── components/
│   ├── css/
│   ├── pages/
│   └── static/
│       ├── chatbot/
│       ├── embed/
│       └── fonts/
│           └── img/
└── docusaurus.config.js
```



- **build** is the build directory where things get built.
- **docs, dev, guide** are documentations.
- **blog** is *The Back Bench* blog.
- **src** is where the pages and react compoents are
  - **src/static** is where the static (non-buildable) things are.
    - **src/static/chatbot** is where the chatbot lives.
    - **src/static/embed** is where the pages to embed the chatbot lives.