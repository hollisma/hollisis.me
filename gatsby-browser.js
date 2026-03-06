const React = require('react')
const { ThemeProvider } = require('./src/contexts/ThemeContext')

exports.wrapRootElement = ({ element }) => {
  return React.createElement(ThemeProvider, null, element)
}
