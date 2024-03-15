// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CoastCompanion',
  tagline: 'CPSC 319',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'BackBenchers', // Usually your GitHub org/user name.
  projectName: 'CoastCompanionDemo', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs',
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/kang-matthew/CoastCompanionDemo/tree/main/backbenchers/',
          //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/kang-matthew/CoastCompanionDemo/tree/main/backbenchers',
          //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'dev',
        path: 'dev',
        routeBasePath: 'dev',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'CoastCompanion',
        logo: {
          alt: 'CoastCompanion Logo',
          src: 'img/icon.png',
        },
        items: [
          // Uncomment this to add a link to the documentation
          // This should only be uncommented if the documentation is ready
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Documentation',
          // },
          {
            to: '/dev/roadmap',
            label: 'Development',
            position: 'left',
            activateBaseRegex: '/dev/',
          },
          { to: '/team', label: 'Team', position: 'left' },
          { to: '/blog', label: 'The Backbench', position: 'left' },
          {
            href: 'https://github.com/CPSC319-2023/Team-4-CCS-',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              // Uncomment this to add a link to the documentation
              // This should only be uncommented if the documentation is ready
              // {
              //   label: 'Documentation',
              //   to: '/docs/intro',
              // },
              {
                label: 'Development',
                to: '/dev/roadmap',
              },
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'Coast Capital Savings',
                href: 'https://www.coastcapitalsavings.com/',
              },
              {
                label: 'UBC Department of Computer Science',
                href: 'https://www.cs.ubc.ca/',
              },
              {
                label: 'CPSC 319 Course Website',
                href: 'https://www.students.cs.ubc.ca/~cs-319/index.html',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Team',
                to: '/team',
              },
              {
                label: 'The Backbench',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/CPSC319-2023/Team-4-CCS-',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BackBenchers. All rights reserved. CoastCompanion is not a product or service offered by Coast Capital Savings®.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
