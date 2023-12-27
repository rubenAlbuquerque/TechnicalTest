import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderListUploadComponent } from './header-list-upload/header-list-upload.component';

// matIconModule
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { HomeComponent } from './home/home.component';
import { UploadsComponent } from './uploads/uploads.component';

import { ReactiveFormsModule } from '@angular/forms';

import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
// import localePt from '@angular/common/locales/pt';
// import { DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxChipsModule } from 'ngx-chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TagInputModule } from 'ngx-chips';
import { TagInputComponent } from './tag-input/tag-input.component';
import { MatInputModule } from '@angular/material/input';
import { DataSearchService } from './data-search.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderListUploadComponent,
    SearchBarComponent,
    ImageGalleryComponent,
    HomeComponent,
    UploadsComponent,
    TagInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TagInputModule,
    // NgxChipsModule,
  ],
  providers: [
    //  { provide: LOCALE_ID, useValue: 'pt' }
    DataSearchService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
