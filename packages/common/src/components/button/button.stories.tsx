import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';

import Button from './button';

storiesOf('React Native Button', module)
	.add('with text', () => (
		<Button title={text('title', 'Hello Button')} onPress={action('pressed')} />
	))
	.add('with emoji', () => (
		<Button title="😀 😎 👍 💯" onPress={action('pressed')} disabled={boolean('disabled', false)} />
	));
