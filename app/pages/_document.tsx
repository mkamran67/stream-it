// Custom document allows us to inject styles
import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core';

// ctx -> Context

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Render the app and get the conext of the page with the collected side effects
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    // Collect original styles from the page
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    // Pass styles down to client side application
    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
