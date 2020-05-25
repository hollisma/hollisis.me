import React from 'react'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO } from '../components'
import { list_item } from '../styles'

const Section = list_item.section
const Title = list_item.title
const UnderTitle = list_item.under_title
const Description = list_item.description

const CompanyTech = list_item.flex_row_container
const Company = list_item.left_item
const Tech = list_item.right_item
const Vert = list_item.vert_bar
const Range = styled.h3`
  font-weight: 100;
  font-size: 1rem;
  font-style: italic;
`

type Data = {
  experiences: {
    edges: {
      node: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          company: string
          tech: string
          range: string
          order: number
        }
        html: string
      }
    }[]
  }
}

const Experience = ({ data }: PageProps<Data>) => {
  const { edges } = data.experiences

  return (
    <Layout>
      <SEO title='Experience' />
      {edges &&
        edges.map(({ node }, i) => {
          const { frontmatter, html } = node
          const { title, company, tech, range } = frontmatter

          return (
            <Section key={i}>
              <Title>{title}</Title>
              <UnderTitle>
                <CompanyTech>
                  <Company>{company}</Company>
                  <Vert>|</Vert>
                  <Tech>{tech}</Tech>
                </CompanyTech>
                <Range>{range}</Range>
              </UnderTitle>
              <Description dangerouslySetInnerHTML={{ __html: html }} />
            </Section>
          )
        })}
    </Layout>
  )
}

export default Experience

export const pageQuery = graphql`
  {
    experiences: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/experience/" } }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            company
            tech
            range
          }
          html
        }
      }
    }
  }
`
