// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { FirebaseOptions } from 'firebase/app';

interface IEnvironment {
  production: boolean;
  firebase: FirebaseOptions;
}

export const environment: IEnvironment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDINsBpoElET62Am5cvJbohVbB8H2W8zIY',
    authDomain: 'jaco-udemy-project.firebaseapp.com',
    databaseURL:
      'https://jaco-udemy-project-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: 'jaco-udemy-project',
    storageBucket: 'jaco-udemy-project.appspot.com',
    messagingSenderId: '554140479530',
    appId: '1:554140479530:web:7eab3490d1c80c6e015353',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
