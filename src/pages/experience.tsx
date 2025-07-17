import React from 'react'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO } from '../components'
import { list_item } from '../styles'

const Section = list_item.section
const Title = list_item.title
const UnderTitle = list_item.under_title
const Description = list_item.description

const CompanyTech = styled(list_item.flex_row_container)`
  width: 35em;
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
  top: 2em;
  right: 1em;
  float: right;
  background-color: #4c4;
  padding: 1em;
  border-radius: 0.5em;
  text-decoration: none;
  color: blue;
  font-weight: bold;
  &:hover {
    filter: brightness(90%);
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
      {experiences}
    </Layout>
  )
}

export default Experience

export const pageQuery = graphql`
  {
    experiences: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/experience/" } }
      sort: { fields: [frontmatter___order], order: ASC }
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
