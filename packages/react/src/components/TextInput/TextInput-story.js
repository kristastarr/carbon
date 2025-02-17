/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { TextInput } from '../../index';
import TextInputSkeleton from '../TextInput/TextInput.Skeleton';
import FluidForm from '../FluidForm/FluidForm';
import mdx from './TextInput.mdx';
import { FeatureFlags } from '../FeatureFlags';

const types = {
  None: '',
  'Text (text)': 'text',
  'For email (email)': 'email',
  'For password (password)': 'password',
};

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
  'Large  (lg)': 'lg',
};

const ControlledPasswordInputApp = React.forwardRef(
  function ControlledPasswordInputApp(props, ref) {
    const [type, setType] = useState('password');
    const togglePasswordVisibility = () => {
      setType(type === 'password' ? 'text' : 'password');
    };
    return (
      <>
        <TextInput.PasswordInput
          type={type}
          togglePasswordVisibility={togglePasswordVisibility}
          ref={ref}
          {...props}
        />
        <button type="button" onClick={() => setType('text')}>
          Show password
        </button>
        <button type="button" onClick={() => setType('password')}>
          Hide password
        </button>
      </>
    );
  }
);

const props = {
  SharedInputProps: () => ({
    className: 'some-class',
    id: 'test2',
    defaultValue: text(
      'Default value (defaultValue)',
      'This is not a default value'
    ),
    size: select('Field size (size)', sizes, undefined) || undefined,
    labelText: text('Label text (labelText)', 'Text input label'),
    placeholder: text('Placeholder text (placeholder)', 'Placeholder text'),
    light: boolean('Light variant (light)', false),
    disabled: boolean('Disabled (disabled)', false),
    hideLabel: boolean('No label (hideLabel)', false),
    invalid: boolean('Show form validation UI (invalid)', false),
    invalidText: text(
      'Form validation UI content (invalidText)',
      'A valid value is required'
    ),
    warn: boolean('Show warning state (warn)', false),
    warnText: text(
      'Warning state text (warnText)',
      'This will overwrite your current settings'
    ),
    helperText: text('Helper text (helperText)', 'Optional help text'),
    inline: boolean('Inline variant (inline)', false),
    onClick: action('onClick'),
    onChange: action('onChange'),
  }),
  TextInputProps: () => ({
    readOnly: boolean('Readonly variant (readOnly)', false),
  }),
  PasswordInputProps: () => ({
    tooltipPosition: select(
      'Tooltip position (tooltipPosition)',
      ['top', 'right', 'bottom', 'left'],
      'bottom'
    ),
    tooltipAlignment: select(
      'Tooltip alignment (tooltipAlignment)',
      ['start', 'center', 'end'],
      'center'
    ),
    hidePasswordLabel: text(
      '"Hide password" tooltip label for password visibility toggle (hidePasswordLabel)',
      'Hide password'
    ),
    showPasswordLabel: text(
      '"Show password" tooltip label for password visibility toggle (showPasswordLabel)',
      'Show password'
    ),
  }),
};

TextInput.displayName = 'TextInput';

export default {
  title: 'Components/TextInput',
  decorators: [withKnobs],

  parameters: {
    component: TextInput,
    docs: {
      page: mdx,
    },
    subcomponents: {
      TextInputSkeleton,
      'TextInput.PasswordInput': TextInput.PasswordInput,
    },
  },
};

export const classNameChangeTest = () => (
  <>
    <TextInput
      defaultValue="The class should be added to the label"
      labelText="Text input label"
      helperText="Optional help text"
      type={select('Form control type (type)', types, 'text')}
      {...props.TextInputProps()}
      className="TEST_CLASS"
    />
    <br />
    <FeatureFlags flags={{ 'enable-v11-release': true }}>
      <TextInput
        defaultValue="The class should be added to the wrapper"
        labelText="Text input label"
        helperText="Optional help text"
        type={select('Form control type (type)', types, 'text')}
        {...props.TextInputProps()}
        className="TEST_CLASS"
      />
    </FeatureFlags>
  </>
);

export const Default = () => (
  <TextInput
    type={select('Form control type (type)', types, 'text')}
    {...props.SharedInputProps()}
    {...props.TextInputProps()}
  />
);

Default.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const Fluid = () => (
  <FluidForm>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </FluidForm>
);

Fluid.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const TogglePasswordVisibility = () => {
  return (
    <TextInput.PasswordInput
      {...props.SharedInputProps()}
      {...props.PasswordInputProps()}
    />
  );
};

TogglePasswordVisibility.storyName = 'Toggle password visibility';

TogglePasswordVisibility.parameters = {
  info: {
    text: `
      Text field with password visibility toggle.
    `,
  },
};

export const FullyControlledTogglePasswordVisibility = () => {
  ControlledPasswordInputApp.__docgenInfo = {
    ...TextInput.PasswordInput.__docgenInfo,
    props: {
      ...TextInput.PasswordInput.__docgenInfo.props,
    },
  };

  return (
    <ControlledPasswordInputApp
      {...props.SharedInputProps()}
      {...props.PasswordInputProps()}
    />
  );
};

FullyControlledTogglePasswordVisibility.storyName =
  'Fully controlled toggle password visibility';

FullyControlledTogglePasswordVisibility.parameters = {
  info: {
    text: `
    Fully controlled text field with password visibility toggle.
  `,
  },
};

export const Skeleton = () => <TextInputSkeleton />;

Skeleton.storyName = 'skeleton';

Skeleton.parameters = {
  info: {
    text: `
        Placeholder skeleton state to use when content is loading.
        `,
  },
};

export const Animation1 = () => (
  <div className={'input-animation-one'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

Animation1.storyName = '1: Input Field Wiggles';
Animation1.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const Animation2 = () => (
  <div className={'input-animation-two'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

Animation2.storyName = '2: Helper Text Wiggles';
Animation2.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const Animation3 = () => (
  <div className={'input-animation-three'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

Animation3.storyName = '3: Underline/Opacity - simultaneous, from L to R';
Animation3.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const Animation4 = () => (
  <div className={'input-animation-four'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

Animation4.storyName = '4: Underline/Opacity - staggered, from L to R';
Animation4.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const Animation5 = () => (
  <div className={'input-animation-five'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

Animation5.storyName = '5: Underline/Opacity - staggered, from center';
Animation5.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const Animation6 = () => (
  <div className={'input-animation-six'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

Animation6.storyName = '6: Icon shakes L-R with full border';
Animation6.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const Animation7 = () => (
  <div className={'input-animation-seven'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

Animation7.storyName = '7: Icon shakes L-R; underline only';
Animation7.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const Animation8 = () => (
  <div className={'input-animation-eight'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

Animation8.storyName = '8: Rotate icon with full border';
Animation8.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const Animation9 = () => (
  <div className={'input-animation-nine'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

Animation9.storyName = '9: Rotate icon with underline only';
Animation9.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const AnimationZ = () => (
  <div className={'input-animation-ten'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

AnimationZ.storyName = '10: Underline and Icon shake';
AnimationZ.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const AnimationZ1 = () => (
  <div className={'input-animation-eleven'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

AnimationZ1.storyName =
  '11: Line draws and increases in height; snappy shake of icon';
AnimationZ1.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const AnimationZ2 = () => (
  <div className={'input-animation-twelve'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

AnimationZ2.storyName = '12: Line draws and increases in height; icon pops';
AnimationZ2.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

export const AnimationZ3 = () => (
  <div className={'input-animation-thirteen'}>
    <TextInput
      type={select('Form control type (type)', types, 'text')}
      {...props.SharedInputProps()}
      {...props.TextInputProps()}
    />
  </div>
);

AnimationZ3.storyName = '13: Line height increases; bounce icon vertically';
AnimationZ3.parameters = {
  info: {
    text: `
        Text fields enable the user to interact with and input data. A single line
        field is used when the input anticipated by the user is a single line of
        text as opposed to a paragraph.
        The default type is 'text' and its value can be either 'string' or 'number'.
      `,
  },
};

// export const Animation14 = () => (
//   <div className={'input-animation-fourteen'}>
//     <TextInput
//       type={select('Form control type (type)', types, 'text')}
//       {...props.SharedInputProps()}
//       {...props.TextInputProps()}
//     />
//   </div>
// );

// Animation14.storyName = '14: Animate placeholder text';
// Animation14.parameters = {
//   info: {
//     text: `
//         Text fields enable the user to interact with and input data. A single line
//         field is used when the input anticipated by the user is a single line of
//         text as opposed to a paragraph.
//         The default type is 'text' and its value can be either 'string' or 'number'.
//       `,
//   },
// };
