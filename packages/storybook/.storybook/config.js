import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

const stories = require.context('../stories', true, /\.stories\.(js|jsx|tsx)$/);
const common = require.context('../../common/src/', true, /\.stories\.(js|jsx|tsx)$/);

function loadStories() {
	addDecorator(withKnobs);
	addDecorator(withInfo);
	stories.keys().forEach(filename => stories(filename));
	common.keys().forEach(filename => common(filename));
}

configure(loadStories, module);
