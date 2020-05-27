import React from 'react'
import { Github, External } from '.'

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case 'github':
      return <Github />
    default:
      return <External />
  }
}

export default Icon
