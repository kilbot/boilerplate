import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
// import { ThemeProvider } from 'styled-components/native';
// import { defaultTheme } from '../src/lib/theme';

// import '../src/fonts/fonts.css';

const req = require.context('../stories', true, /\.stories\.(js|jsx|tsx)$/);

function loadStories() {
	// addDecorator(story => <ThemeProvider theme={defaultTheme}>{story()}</ThemeProvider>);
	addDecorator(withKnobs);
	addDecorator(withInfo);
	req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
