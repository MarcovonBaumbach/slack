import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { MainComponent } from './main/main.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChannelsComponent } from './channels/channels.component';
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { SearchUserProfileComponent } from './search-user-profile/search-user-profile.component';

const routes: Routes = [
  { path: '', component: InitialPageComponent },
  {
    path: 'main/:id', component: MainComponent,
    title: 'SlackClone',
    children: [
      { path: 'profil', component: UserProfileComponent, outlet: 'body' },
      { path: 'profil/:id', component: SearchUserProfileComponent, outlet: 'body' },
      { path: 'channels/:id', component: ChannelsComponent, outlet: 'body' },
      { path: 'direct_messages/:id', component: DirectMessagesComponent, outlet: 'body' },
      { path: '**', component: PageNotFoundComponent, outlet: 'body' }

    ]
  },
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
