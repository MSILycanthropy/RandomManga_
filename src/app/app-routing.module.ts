import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { GeneratedListComponent } from './components/generated-list/generated-list.component';
import { LandingComponent } from './components/landing/landing.component';
import { MangaDisplayComponent } from './components/manga-display/manga-display.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReportErrorFormComponent } from './components/report-error-form/report-error-form.component';
import { RequestMangaComponent } from './components/request-manga/request-manga.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: LandingComponent },
  { path: 'list', component: GeneratedListComponent },
  { path: 'about/terms', component: TermsOfUseComponent },
  { path: 'about', component: AboutComponent },
  { path: 'manga', component: MangaDisplayComponent },
  { path: 'feedback', component: FeedbackFormComponent },
  { path: 'manga/report', component: ReportErrorFormComponent },
  { path: 'feedback/request-manga', component: RequestMangaComponent },
  { path: 'about/cookies', component: CookiesComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy', anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
