import { configure } from '@storybook/react'

const loadStories = () => {
  require('../src/stories')
}

configure(loadStories, module)
