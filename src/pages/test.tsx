import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Layout } from '../components'
import Test from '../components/test'

type Data = {
  allMarkdownRemark: {
    edges: {
      node: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          description: string
          github: string
          external: string
          tech: string
        }
        html: string
      }
    }[]
  }
}

const TestPage: React.FC = () => {
  return (
    <Layout>
      <Test />
    </Layout>
  )
}

export default TestPage
