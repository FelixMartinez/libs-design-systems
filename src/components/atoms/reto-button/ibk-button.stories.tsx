import { withA11y } from '@storybook/addon-a11y';
import { withActions } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/html';

// utils
import { backgrounds, buildComponent } from '../../story.utils';
import readme from './readme.md';

addDecorator(withA11y);
addDecorator(withKnobs);

const component = buildComponent('ibk-button', {
  text: (prop = 'Default') => text('text', prop),
  color: (prop = 'primary') =>
    select('color', ['primary', 'secondary', 'error', 'gray', 'none', 'white'], prop),
  size: (prop = 'md') => select('size', ['xl', 'lg', 'md', 'sm', 'smx', 'xs', 'xxs', 'xxxs'], prop),
  type: (prop = 'default') => select('type', ['default', 'full'], prop),
  disable: (prop = false) => boolean('disable', prop),
  spinner: (prop = false) => boolean('spinner', prop),
});

storiesOf('Atoms|Button', module)
  .addParameters({ jest: ['ibk-button', 'IbkButton'] })
  .addDecorator(withActions('click', 'button'))
  .addParameters({
    readme: {
      sidebar: readme,
    },
    backgrounds,
  })
  .add('Default', () => component({ text: 'default' }))
  .add('primary', () => component({ text: 'primary', color: 'primary' }))
  .add('secondary', () => component({ text: 'secondary', color: 'secondary' }))
  .add('error', () => component({ text: 'error', color: 'error' }))
  .add('gray', () => component({ text: 'gray', color: 'gray' }))
  .add('none', () => component({ text: 'none', color: 'none' }))
  .add('white', () => component({ text: 'white', color: 'white' }))
  .add('spinner', () => component({ spinner: true, color: 'secondary' }))

  .add('validar 1', () => component({ color: 'primary', size: 'md', spinner: 'true' }))
  .add('iniciar sesion o nada', () =>
    component({ color: 'secondary', size: 'sm', text: 'Iniciar Sesion ahora o nada' }),
  )
  .add('iniciar sesion 2', () =>
    component({ color: 'primary', size: 'sm', text: 'Iniciar Sesion', disable: 'true' }),
  )
  .add('iniciar sesion 3', () =>
    component({ color: 'primary', size: 'md', text: 'Iniciar Sesion' }),
  )
  .add('Validar 2', () =>
    component({ color: 'seconodary', text: 'Validar', spinner: 'true', size: 'sm' }),
  )
  .add('Iniciar Sesion 1', () => component({ color: 'secondary', size: 'sm', disable: 'true' }));
