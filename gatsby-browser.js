const React = require('react')
const { ThemeProvider } = require('./src/contexts/ThemeContext')
const { SpeedInsights } = require('@vercel/speed-insights/react')

exports.wrapRootElement = ({ element }) => {
  return React.createElement(
    ThemeProvider,
    null,
    React.createElement(
      React.Fragment,
      null,
      element,
      React.createElement(SpeedInsights, null)
    )
  )
}
