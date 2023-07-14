import { withA11y } from '@storybook/addon-a11y';
import { withActions } from '@storybook/addon-actions';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/html';

import { backgrounds, buildComponent } from '../../story.utils';
import readme from './readme.md';

addDecorator(withA11y);
addDecorator(withKnobs);

const component = buildComponent('ibk-input', {
  placeholder: (prop = '') => text('placeholder', prop),
  regularexpression: (prop = '') => text('regularexpression', prop),
  type: (prop = 'text') =>
    select('type', ['text', 'number', 'password', 'email', 'date', 'icon'], prop),
  name: (prop = 'text') => text('name', prop),
  value: (prop = '') => text('value', prop),
  disable: (prop = false) => boolean('disable', prop),
  error: (prop = false) => boolean('error', prop),
  maxlenght: (prop = '') => text('maxlenght', prop),
  minlength: (prop = '') => text('minlength', prop),
  lowercase: (prop = false) => boolean('lowercase', prop),
  focusable: (prop = false) => boolean('focusable', prop),
  iseventemmiter: (prop = true) => boolean('iseventemmiter', prop),
  touched: (prop = false) => boolean('touched', prop),
  position: (prop = 0) => number('position', prop),
  copypaste: (prop = true) => boolean('copypaste', prop),

  positionicon: (prop = 'right') =>
    select('color', ['left', 'right', 'top', 'bottom', 'center'], prop),
});

storiesOf('Atoms|Input', module)
  .addDecorator(withActions('click', 'div > span'))
  .addParameters({ jest: ['ibk-button', 'IbkButton'] })
  .addParameters({
    readme: {
      sidebar: readme,
    },
    backgrounds,
  })
  .add('Default', () => component())
  .add('input1 ', () =>
    component({
      type: 'search',
      disable: 'true',
      placeholder: 'xxx',
      label: 'Text Field',
      value: 'Do',
      maxlenght: '2200',
      minlength: '1',
    }),
  )
  .add('input2', () =>
    component({
      placeholder: 'xxx',
      label: 'Text Field',
      value: 'Hola',
    }),
  )
  .add('input3', () =>
    component({
      placeholder: 'ICON',
      disable: 'true',
      positionicon: 'left',
      label: 'Text Field',
      type: 'icon',
      value: 'Hola',
    }),
  )
  .add('input4', () =>
    component({
      placeholder: 'xxx',
      label: 'Text Field',
      value: 'Hola',
      errro: ' true',
    }),
  );
