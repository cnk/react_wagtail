import React from 'react';

import { Header } from './Header';

export default {
  title: 'Example/Header',
  component: Header,
  onLogin: { action: 'Logged In!' },
  onLogout: { action: 'Bye Bye' },
  onCreateAccount: { action: 'Welcome' },
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
