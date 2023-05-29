import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { MainComponent } from './main/main.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DialogAddUserHolderComponent } from './dialog-add-user-holder/dialog-add-user-holder.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DialogAddStatusComponent } from './dialog-add-status/dialog-add-status.component';
import { MatSelectModule } from '@angular/material/select';
import { ChannelsComponent } from './channels/channels.component';
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InitialPageComponent,
    SidenavComponent,
    UserProfileComponent,
    DialogAddUserHolderComponent,
    DialogAddChannelComponent,
    PageNotFoundComponent,
    DialogAddStatusComponent,
    ChannelsComponent,
    DirectMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatBadgeModule,
    MatTooltipModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatProgressBarModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
