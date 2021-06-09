import React from 'react'
import {  graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"


const Posts = ({data}) => {
    const post = data.markdownRemark
    return (
        <Layout>
          <Link to="/blog">Homepage Posts</Link>

            <SEO title={post.frontmatter.title} />

            {/* affiche image */}
            {post.frontmatter.img && (
                <Img 
                placeholderStyle={{ backgroundColor: 'grey'}}
                fluid={post.frontmatter.img.childImageSharp.fluid}
                />
            )}
             {/* affiche titre et texte */}
            <div>
                <h1>{post.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                
            </div>
        </Layout>
        
    )
}

export default Posts

// requete texte et image
export const query = graphql`
    query ($slug: String!){
    markdownRemark(fields: {slug: {eq: $slug} }) {
        html
        frontmatter {
          title
          img {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
    }
  }
` 
