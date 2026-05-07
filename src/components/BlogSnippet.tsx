import React from 'react'
import { Link, navigate } from 'gatsby'
import styled from 'styled-components'
import { list_item } from '../styles'

const Section = styled(list_item.section)`
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1em;
`
const HeaderLeft = styled.div`
  flex: 1;
  min-width: 0;
`
const Title = styled.span`
  font-size: 2em;
  font-weight: bold;
  line-height: 1.5em;
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: 40em) {
    font-size: 1.5em;
  }
`
const DateRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5em;
  flex-wrap: wrap;
`
const DateStr = styled.span``
const ReadingTime = styled.span`
  color: ${({ theme }) => theme.colors.muted ?? theme.colors.text};
  font-size: 0.95em;
`
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
  flex-shrink: 1;
  max-width: 35%;
  min-width: 0;
  justify-content: flex-end;
  @media (max-width: 40em) {
    max-width: 100%;
    justify-content: flex-start;
  }
`
const tagBaseStyles = `
  font-size: 0.75em;
  padding: 0.1em 0.4em;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.15s ease, border-color 0.15s ease;
`
const TagLink = styled(Link)`
  ${tagBaseStyles}
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted ?? theme.colors.text};
  &:hover {
    background: ${({ theme }) => theme.colors.border};
    border-color: ${({ theme }) => theme.colors.text};
  }
`
const OverflowTag = styled.span`
  ${tagBaseStyles}
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted ?? theme.colors.text};
`
const Excerpt = styled.p`
  margin-top: 0.75em;
  line-height: 1.5em;
`

export interface BlogSnippetProps {
  slug: string
  title: string
  dateStr: string
  excerpt: string
  tags?: string[]
  /** Reading time in minutes; shown to the right of the date when set. */
  readingTimeMinutes?: number
  basePath?: string
  /** When set, show only this many tags + "+N" overflow. When undefined, show all tags. */
  maxVisibleTags?: number
}

function formatReadingTime(minutes: number): string {
  return `${minutes} min read`
}

export function BlogSnippet({
  slug,
  title,
  dateStr,
  excerpt,
  tags = [],
  readingTimeMinutes,
  basePath = '/blog',
  maxVisibleTags,
}: BlogSnippetProps) {
  const postUrl = `${basePath.replace(/\/$/, '')}${slug}`
  const showAllTags = maxVisibleTags == null
  const visibleTags = showAllTags ? tags : tags.slice(0, maxVisibleTags)
  const overflowCount = showAllTags ? 0 : Math.max(0, tags.length - maxVisibleTags!)

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return
    navigate(postUrl)
  }
  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).closest('a')) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigate(postUrl)
    }
  }

  return (
    <Section
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`Read ${title}`}
    >
      <CardHeader>
        <HeaderLeft>
          <Title>{title}</Title>
          <DateRow>
            <DateStr>{dateStr}</DateStr>
            {readingTimeMinutes != null && readingTimeMinutes > 0 && (
              <>
                <span aria-hidden>·</span>
                <ReadingTime>{formatReadingTime(readingTimeMinutes)}</ReadingTime>
              </>
            )}
          </DateRow>
        </HeaderLeft>
        {tags.length > 0 && (
          <TagList>
            {visibleTags.map((tagName, j) => (
              <TagLink key={j} to={`/blog/${tagName}`}>
                {tagName}
              </TagLink>
            ))}
            {overflowCount > 0 && <OverflowTag>+{overflowCount}</OverflowTag>}
          </TagList>
        )}
      </CardHeader>
      <Excerpt>{excerpt}</Excerpt>
    </Section>
  )
}
