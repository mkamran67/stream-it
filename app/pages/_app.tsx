import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { themeDark, themeLight } from '../lib/theme';

export default function MyApp({ Component, pageProps }) {
  // useEffect used to remove default styles -> Server side CSS
  useEffect(() => {
    // Remove server side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={false ? themeDark : themeLight}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// CssBaseline -> A reset for CSS. i.e : boxsizing, font size
