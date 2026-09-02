/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {ApplicationConfig} from '@angular/core';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      // Outlined fields with tight, content-driven hint/error spacing read as
      // cleaner and less "boxy" than Material's default filled appearance.
      useValue: {appearance: 'outline', subscriptSizing: 'dynamic'},
    },
  ],
};
