import React from 'react'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO } from '../components'
import { list_item } from '../styles'

const Subject = styled.div`
  margin-bottom: 3.5em;
  &:last-child {
    margin-bottom: 0.5em;
  }
`
const Section = styled(list_item.section)`
  margin-bottom: 1.5em;
  padding: 1.5em 2.5em;
`
const Title = list_item.title
const SecondTitle = styled(Title)`
  font-size: 1.5em;
`
const UnderTitle = styled(list_item.under_title)`
  padding-bottom: 0.5em;
`

interface Course {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    term: string
  }
  html: string
}

type Data = {
  blurb: {
    blurb_edges: {
      node: {
        html: string
      }
    }[]
  }
  courses: {
    course_edges: {
      node: Course
    }[]
  }
}

const Education = ({ data }: PageProps<Data>) => {
  const { blurb, courses } = data
  const { blurb_edges } = blurb
  const { course_edges } = courses

  interface SectionObject {
    [section: string]: Course[]
  }

  // section_to_courses maps a section name (math, cs, humanities)
  // to the courses associated with the secctino in graphql form
  let section_to_courses: SectionObject = {}
  for (let i in course_edges) {
    const course = course_edges[i].node
    const section = course.fields.slug.split('/')[2] // folder name
    if (!Object.keys(section_to_courses).includes(section)) {
      section_to_courses[section] = []
    }
    section_to_courses[section].push(course)
  }

  const sectionElems =
    Object.keys(section_to_courses).length !== 0 &&
    Object.keys(section_to_courses).map((section, i) => {
      let courseElems: React.ReactNode = section_to_courses[section].map(
        (sec, j) => {
          const { frontmatter, html } = sec
          const { title, term } = frontmatter

          return (
            <Section key={j}>
              <SecondTitle>{title}</SecondTitle>
              <UnderTitle>{term}</UnderTitle>
              <p dangerouslySetInnerHTML={{ __html: html }} />
            </Section>
          )
        }
      )

      return (
        <Subject key={i}>
          <Title>{section}</Title>
          {courseElems}
        </Subject>
      )
    })

  // Hard coding the order to be CS, math, humanities
  if (sectionElems) {
    const temp = sectionElems[1]
    sectionElems[1] = sectionElems[2]
    sectionElems[2] = temp
  }

  return (
    <Layout>
      <SEO title='Education' />
      {blurb_edges && (
        <div dangerouslySetInnerHTML={{ __html: blurb_edges[0].node.html }} />
      )}
      {sectionElems}
    </Layout>
  )
}

export default Education

export const pageQuery = graphql`
  {
    blurb: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/education/blurb/" } }
    ) {
      blurb_edges: edges {
        node {
          html
        }
      }
    }
    courses: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/education/courses/" } }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      course_edges: edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            term
          }
          html
        }
      }
    }
  }
`
