import React from 'react'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'
import Prose from '../styles/prose'
import { Layout, SEO, Icon } from '../components'
import list_item from '../styles/list-item'

const Section = styled(list_item.section)`
  margin-bottom: 3em;
  padding: 2em 2.5em 1em;
  @media (max-width: 40em) {
    padding: 1.25em 1rem 1rem;
  }
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`
const Title = list_item.title

const UnderTitle = styled(list_item.under_title)`
  padding-bottom: 0em;
`
const Description = styled(Prose)``

const QuickInfo = list_item.flex_row_container
const MiniDescription = list_item.left_item
const Tech = list_item.right_item
const Vert = list_item.vert_bar
const Links = styled.div`
  display: flex;
  flex-direction: row;
  svg: {
    height: 50px;
    width: 50px;
  }
`
const IconLink = styled.a`
  padding: 0px 5px;
  color: ${({ theme }) => theme.colors.text};
  svg {
    width: 20px;
    height: 20px;
  }
`
const Date = styled.h3`
  font-weight: 100;
  font-size: 1rem;
  font-style: italic;
  padding-bottom: 20px;
`

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
          date: string
        }
        html: string
      }
    }[]
  }
}

const Projects = ({ data, location }: PageProps<Data>) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout location={location}>
      <SEO title='Hollis Ma | Projects' />
      {edges &&
        edges.map(({ node }, i) => {
          const { frontmatter, html } = node
          const { title, description, github, external, tech, date } = frontmatter

          return (
            <Section key={i}>
              <TitleSection>
                <Title>{title}</Title>
                <Links>
                  {github && (
                    <IconLink
                      href={github}
                      target='_blank'
                      rel='nofollow noopener noreferrer'
                    >
                      <Icon name='github' />
                    </IconLink>
                  )}
                  {external && (
                    <IconLink
                      href={external}
                      target='_blank'
                      rel='nofollow noopener noreferrer'
                    >
                      <Icon name='external' />
                    </IconLink>
                  )}
                </Links>
              </TitleSection>
              <UnderTitle>
                <QuickInfo>
                  <MiniDescription>{description}</MiniDescription>
                  <Vert>|</Vert>
                  <Tech>{tech}</Tech>
                </QuickInfo>
                <Date>{date}</Date>
              </UnderTitle>
              <Description dangerouslySetInnerHTML={{ __html: html }} />
            </Section>
          )
        })}
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___order], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            github
            external
            tech
            date
          }
          html
        }
      }
    }
  }
`
