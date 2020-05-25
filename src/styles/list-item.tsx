import styled from 'styled-components'

const list_item = {
  section: styled.div`
    display: flex;
    flex-direction: column;
    width: 87.5%;
    background-color: #fea;
    padding: 2em 3em;
    margin-bottom: 5vh;
    border-radius: 2em;
    &:last-of-type {
      margin-bottom: 0;
    }
    & * {
      margin: 0;
      padding: 0;
    }
  `,
  title: styled.h1`
    font-size: 2rem;
  `,
  under_title: styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.15rem 0 0.75rem;
    align-items: center;
    justify-content: space-between;
  `,
  description: styled.p`
    list-style-position: inside;
    & li {
      margin-bottom: 0.4rem;
      font-size: 1.1rem;
    }
    & li:last-child {
      margin-bottom: 0;
    }
  `,
  flex_row_container: styled.div`
    flex-direction: row;
  `,
  left_item: styled.h2`
    display: inline-block;
    font-size: 1.2rem;
  `,
  right_item: styled.h3`
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 100;
  `,
  vert_bar: styled.span`
    font-size: 1.5rem;
    margin: 0 0.35rem;
    font-weight: 100;
  `,
}

export default list_item
