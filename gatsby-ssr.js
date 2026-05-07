const React = require('react')
const { ThemeProvider } = require('./src/contexts/ThemeContext')
const { SpeedInsights } = require('@vercel/speed-insights/react')

const THEME_STORAGE_KEY = 'hollisis-theme'
const DARK_BG = '#0f172a'
const DARK_TEXT = '#f1f5f9'

const antiFlickerScript = `
(function() {
  try {
    var theme = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.colorScheme = 'dark';
      var s = document.createElement('style');
      s.id = 'gatsby-anti-flicker';
      s.textContent = 'html{background:${DARK_BG}!important;}body{background:${DARK_BG}!important;color:${DARK_TEXT}!important;}';
      if (document.documentElement.firstChild) {
        document.documentElement.firstChild.appendChild(s);
      }
    }
  } catch (e) {}
})();
`

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('script', {
      key: 'theme-anti-flicker',
      dangerouslySetInnerHTML: { __html: antiFlickerScript },
    }),
  ])
}

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
