import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Layout, SEO } from '../components'

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
  let section_to_course: SectionObject = {}
  for (let i in course_edges) {
    const course = course_edges[i].node
    const section = course.fields.slug.split('/')[2]
    if (!Object.keys(section_to_course).includes(section)) {
      section_to_course[section] = []
    }
    section_to_course[section].push(course)
  }
  console.log(section_to_course)

  const sectionElems =
    Object.keys(section_to_course).length !== 0 &&
    Object.keys(section_to_course).map((section, i) => {
      // let CourseElems: React.ReactNode[] = []
      let courseElems: React.ReactNode = section_to_course[section].map(
        (sec, j) => {
          const { frontmatter, html } = sec
          const { title, term } = frontmatter

          return (
            <div key={j}>
              <h2>{title}</h2>
              <h3>{term}</h3>
              <p dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          )
        }
      )

      return (
        <div key={i}>
          <h1>{section}</h1>
          {courseElems}
        </div>
      )
    })

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
