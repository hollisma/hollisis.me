import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
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
const Description = styled(Prose)`
  iframe {
    max-width: 100%;
    border-radius: 0.5rem;
    margin-top: 0.75rem;
  }
`

const ProjectGallery = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
  justify-content: safe center;
`

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

type ScreenshotNode = {
  node: {
    base: string
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

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
          images?: string[]
        }
        html: string
      }
    }[]
  }
  imageFiles: {
    edges: ScreenshotNode[]
  }
}

const Projects = ({ data, location }: PageProps<Data>) => {
  const { edges } = data.allMarkdownRemark
  const imageFiles = data.imageFiles?.edges ?? []

  return (
    <Layout location={location}>
      <SEO title='Hollis Ma | Projects' pathname={location.pathname} />
      {edges &&
        edges.map(({ node }, i) => {
          const { frontmatter, html } = node
          const { title, description, github, external, tech, date, images } = frontmatter

          const matchedImages = images
            ? images
                .map((filename: string) => imageFiles.find(({ node: f }: ScreenshotNode) => f.base === filename))
                .filter((f): f is ScreenshotNode => f !== undefined)
            : []

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
              {matchedImages.length > 0 && (
                <ProjectGallery>
                  {matchedImages.map(({ node: f }) => (
                    <div
                      key={f.base}
                      style={{ flex: '0 0 auto', height: 200, width: 320, borderRadius: '0.5rem', overflow: 'hidden' }}
                    >
                      <Img
                        fluid={f.childImageSharp.fluid}
                        alt={f.base.replace(/\.[^.]+$/, '').replace(/-/g, ' ')}
                        style={{ height: '100%' }}
                        imgStyle={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </ProjectGallery>
              )}
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
            images
          }
          html
        }
      }
    }
    imageFiles: allFile(
      filter: {
        relativeDirectory: { eq: "images" }
        extension: { regex: "/(jpg|jpeg|png|gif|webp)/" }
      }
    ) {
      edges {
        node {
          base
          childImageSharp {
            fluid(maxHeight: 320) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
