import React from 'react';
import { RealmProvider } from '@realm/react';
import { FullyDate, Goal, Phrase, Todo, User } from './realm/models';
import App from './App';

function AppWrapper(): React.JSX.Element {
  return (
    <RealmProvider
      schema={[Goal, Todo, User, FullyDate, Phrase]}
      deleteRealmIfMigrationNeeded={true}>
      <App />
    </RealmProvider>
  );
}

export default AppWrapper;
