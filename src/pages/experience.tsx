import React from 'react'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'
import Prose from '../styles/prose'
import { Layout, SEO } from '../components'
import { list_item } from '../styles'

const Section = styled(list_item.section)`
  margin-bottom: 1.5em;
  padding: 2em 2.5em 1em;
`
const Title = list_item.title
const UnderTitle = styled(list_item.under_title)`
  padding-bottom: 0em;
`
const Description = styled(Prose)`
  line-height: 1.65em;
`

const CompanyTech = styled(list_item.flex_row_container)`
  width: 30em;
`
const Company = list_item.left_item
const Tech = list_item.right_item
const Vert = list_item.vert_bar
const Range = styled.h3`
  font-weight: 100;
  font-size: 1rem;
  font-style: italic;
`

const Skills = styled.div`
  margin: 2em 1.5em;
  font-size: 1.25em;
  line-height: 1.5em;
`
const Languages = styled.p``
const Technologies = styled.p``

const Resume = styled.a`
  position: relative;
  top: 0em;
  right: 1em;
  float: right;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 0.5em;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
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
          languages: string
        }
        html: string
      }
    }[]
  }
}

const Experience = ({ data, location }: PageProps<Data>) => {
  const { edges } = data.experiences
  let skills: { tech: string; languages: string } = { tech: '', languages: '' }

  const experiences = edges!.map(({ node }, i) => {
    const { frontmatter, html } = node
    const { title, company, tech, range, languages } = frontmatter
    if (languages) {
      skills.tech = tech
      skills.languages = languages
      return
    }

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
  })

  return (
    <Layout location={location}>
      <SEO title='Hollis Ma | Experience' />
      <Resume
        href='/Resume.pdf'
        target='_blank'
        rel='nofollow noopener noreferrer'
      >
        Resume
      </Resume>
      {experiences}
      <Skills>
        <Languages>
          <b>Languages: </b>
          {skills.languages}
        </Languages>
        <Technologies>
          <b>Technologies: </b>
          {skills.tech}
        </Technologies>
      </Skills>
    </Layout>
  )
}

export default Experience

export const pageQuery = graphql`
  {
    experiences: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/experience/" } }
      sort: { fields: [frontmatter___order], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            company
            tech
            range
            languages
          }
          html
        }
      }
    }
  }
`
