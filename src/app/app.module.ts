import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LogoComponent } from './components/logo/logo.component';
import { LandingComponent } from './components/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { HiddenDivComponent } from './components/hidden-div/hidden-div.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NfoldSelectorComponent } from './components/nfold-selector/nfold-selector.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { GeneratorFormComponent } from './components/generator-form/generator-form.component';
import { ExpandoCardComponent } from './components/expando-card/expando-card.component';
import { GeneratedListComponent } from './components/generated-list/generated-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { AboutComponent } from './components/about/about.component';
import { SiteCardComponent } from './components/site-card/site-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MangaDisplayComponent } from './components/manga-display/manga-display.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { MatInputModule } from '@angular/material/input';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { ReportErrorFormComponent } from './components/report-error-form/report-error-form.component';
import { RequestMangaComponent } from './components/request-manga/request-manga.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { CookiesComponent } from './components/cookies/cookies.component';
import { MatRippleModule } from '@angular/material/core';
import { SearchListComponent } from './components/search-list/search-list.component';
import { SearchPortionComponent } from './components/search-portion/search-portion.component';
import { MangaSearchFormComponent } from './components/manga-search-form/manga-search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    LandingComponent,
    HiddenDivComponent,
    DynamicTableComponent,
    NfoldSelectorComponent,
    GeneratorFormComponent,
    ExpandoCardComponent,
    GeneratedListComponent,
    MainFooterComponent,
    TermsOfUseComponent,
    AboutComponent,
    SiteCardComponent,
    NotFoundComponent,
    MainHeaderComponent,
    MangaDisplayComponent,
    FeedbackFormComponent,
    ModalPopupComponent,
    ReportErrorFormComponent,
    RequestMangaComponent,
    CookiesComponent,
    SearchListComponent,
    SearchPortionComponent,
    MangaSearchFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatGridListModule,
    FontAwesomeModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    InlineSVGModule.forRoot(),
    MatRippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
