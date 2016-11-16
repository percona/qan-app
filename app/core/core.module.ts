import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { NavService } from './nav.service';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [NavComponent, PageNotFoundComponent],
    exports: [NavComponent, PageNotFoundComponent],
    providers: [NavService]
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}