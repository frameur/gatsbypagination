import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/blog/">Blog Article</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>


    <Seo title="Home" />
    <h1>Bonjour Julie</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
   
  </Layout>
)

export default IndexPage
