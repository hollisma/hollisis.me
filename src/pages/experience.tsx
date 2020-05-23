import React from 'react'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO } from '../components'

const Section = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fea;
  padding: 5vh 4vw;
  margin-bottom: 5vh;
  border-radius: 5vh;
  &:last-of-type {
    margin-bottom: 0;
  }
  & * {
    margin: 0;
    padding: 0;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  margin-top: 0.75rem;
`

const UnderTitle = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.15rem 0 0.75rem;
  align-items: center;
  justify-content: space-between;
`

const CompanyTech = styled.div`
  flex-direction: row;
`
const Company = styled.h2`
  display: inline-block;
  font-size: 1.2rem;
`
const Tech = styled.h3`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 100;
`
const Vert = styled.span`
  font-size: 1.5rem;
  margin: 0 0.35rem;
  font-weight: 100;
`
const Range = styled.h3`
  font-weight: 100;
  font-size: 1rem;
  font-style: italic;
`

const Description = styled.p`
  list-style-position: inside;
  & li {
    margin-bottom: 0.4rem;
    font-size: 1.1rem;
  }
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
