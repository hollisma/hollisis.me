import React from 'react'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO, Icon } from '../components'
import list_item from '../styles/list-item'

const Section = list_item.section

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`
const Title = list_item.title

const UnderTitle = list_item.under_title
const Description = list_item.description

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
  padding: 5px;
  svg {
    width: 20px;
    height: 20px;
  }
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
        }
        html: string
      }
    }[]
  }
}

const Projects = ({ data }: PageProps<Data>) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO title='Projects' />
      {edges &&
        edges.map(({ node }, i) => {
          const { frontmatter, html } = node
          const { title, description, github, external, tech } = frontmatter

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
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            github
            external
            tech
          }
          html
        }
      }
    }
  }
`
