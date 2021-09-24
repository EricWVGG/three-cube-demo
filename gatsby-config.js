require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Demo",
    description: ``,
    author: `@eric_wvgg`,
    siteUrl: `https://calicoc.at`,
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": `${__dirname}/src/components`,
          "@pages": `${__dirname}/src/pages`,
          "@utils": `${__dirname}/src/utils`,
        },
        extensions: [
          "js",
          "tsx",
          "svg",
        ],
      },
    },
    "gatsby-plugin-styled-components",
    `gatsby-plugin-sass`,
  ],
};
