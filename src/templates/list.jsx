import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default function IndexPage({data}) {
    const { nodes, pageInfo } = data.allMarkdownRemark
    return (
      <Layout>
        <Link to="/">Go back to the homepage</Link>

        <SEO title="Blog Home" /> 
          <h1>List Posts</h1>
          {/* indication numero page */}
          <p style={{textAlign:"center"}}>Page {pageInfo.currentPage}</p>
          {/* pagination */}
          <div style={{
                  padding:"20px 0",
                  display: "flex",
                  justifyContent: 'space-between',
             }}>
             {pageInfo.hasPreviousPage ? (
                 <Link
                 to={`${pageInfo.currentPage === 2 ? "/blog" : `/blog/${pageInfo.currentPage - 1}`}`}
                 >
                 Previous
                 </Link>
             ) : (
               <div />
             )}
             {pageInfo.hasNextPage && (
             <Link to={`/blog/${pageInfo.currentPage + 1}`}>Next  </Link>
           )}
         </div> 

          {/* boucle element article */}
          {nodes.map((e) => (
          <div>
             <Link style={{color:'red'}} to={e.fields.slug}><h2>{e.frontmatter.title}</h2></Link>
             <p style={{textAlign:'justify'}}>{e.excerpt}</p>
             <p>{e.frontmatter.date}</p>
             <hr/>
          </div>
         ) )}
      </Layout>  
        
    )
}
//  requete affichage article et pagination
export const query = graphql`
query getPosts($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: ASC}
      limit:$limit
      skip: $skip
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "DD MM YYYY")
        }
        excerpt
        fields {
          slug
        }
      }
      
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        perPage
        
      }
    }
  }`
