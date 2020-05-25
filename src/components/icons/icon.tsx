import React from 'react'
import { Github, External } from '.'

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case 'github':
      console.log('github')
      return <Github />
    default:
      console.log('external')
      return <External />
  }
}

export default Icon
