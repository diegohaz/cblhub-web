import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

const Html = ({ assets, state, content }) => {
  let helmet = Helmet.rewind()
  const attrs = helmet.htmlAttributes.toComponent()

  return (
    <html { ...attrs }>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no' />
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}

        {Object.keys(assets.styles).map((style, key) =>
          <link
            href={assets.styles[style]}
            key={key}
            media='screen, projection'
            rel='stylesheet'
            type='text/css' />
        )}
      </head>
      <body>
        <div id='app' dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: state }} />
        <script src={assets.javascript.app} />
      </body>
    </html>
  )
}

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Html
