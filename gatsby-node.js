/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)
const { graphql } = require('gatsby')


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({node, getNode, basePath: "content",
  
    })
      createNodeField({
        node,
        name:'slug',
        value: `/blog${slug}`,
       })
    }
  }
// creation page
exports.createPages = async function ({ actions, graphql }) {
      const { data } = await graphql(` 
        query  {
          allMarkdownRemark {
            edges {
              node {
                fields {
                   slug
                }
              }
            }
            totalCount
          }
        }
    `)
// boucle page et pagination
    data.allMarkdownRemark.edges.forEach(edge =>{
        const {slug} = edge.node.fields
        actions.createPage({
            path: slug,
            component: require.resolve('./src/templates/posts.jsx'),
            context: { slug },
        })
    }) 
    const perPage = 2;
    const nbPage = Math.ceil(data.allMarkdownRemark.totalCount / perPage)

//creation index posts
for (let i = 0; i < nbPage; i++) {
   actions.createPage({
    path: i < 1 ? "/blog" : `/blog/${i + 1}`,
    // path: '/blog',
    component: require.resolve('./src/templates/list.jsx'),
    context: { 
      limit: perPage,
      skip: i * perPage,  
    },
    
  })

 } 
}

