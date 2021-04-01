# Cyphrpass

## Info

This is my password management project, used for password and totp.


### notes

#### npm install

I had to downgrade to `"@angular/fire": "^5.4.2"`, and `"firebase": "^5.11.1"`, in order to get things working correctly w/o errors.
Also, i for order for npm install to work correctly, i had to switch to `lts/dubnium` (v10.22.0) in order for the install to work correctly.



### _secrets

firebaseConfig.ts should be created in the `_secrets` folder, formated like so:

```ts
export const firebaseConfig = {
  apiKey: '<key>',
  authDomain: '<app>.firebaseapp.com',
  projectId: '<app>',
  storageBucket: '<app>.appspot.com',
  messagingSenderId: '<id>',
  appId: '<id>'
};
```

### pbkdf2

The following links are where i found info on how to use pbkdf2.
The npm module wasn't working, but thats ok, because there is built-in crypto in
the web browsers now, yay.

- https://stackoverflow.com/questions/40459020/angular-js-cryptography-pbkdf2-and-iteration
- https://medium.com/coinmonks/fun-times-with-webcrypto-part-1-pbkdf2-815b1c978c9d
- https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey
- https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String

### Other sources

When I couldn't figure out why decrypt was complaining that too little data, turns out
I was missing the auth part of GCM.
https://stackoverflow.com/questions/66155504/webcrypto-api-domexception-the-provided-data-is-too-small
---

## Angular CLI stuff

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.8.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
