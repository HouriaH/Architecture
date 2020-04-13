import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { HttpClientModule } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './Services/user.service';
import { ForumComponent } from './ForumApp/forum/forum.component';
import { SectionTemplateComponent } from './ForumApp/templates/section-template/section-template.component';
import { SectionComponent } from './ForumApp/section/section.component';
import { TopicTemplateComponent } from './ForumApp/templates/topic-template/topic-template.component';
import { TopicComponent } from './ForumApp/topic/topic.component';
import { MessageTemplateComponent } from './ForumApp/templates/message-template/message-template.component';
import { SafeHtmlPipe } from './Models/pipe.safehtml';
import { NgxPaginationModule } from 'ngx-pagination';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ForumService } from './Services/forum.service';
import { AdminPanelComponent } from './AdminApp/admin-panel/admin-panel.component';
import { CreationSectionComponent } from './AdminApp/creation-section/creation-section.component';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForumComponent,
    SectionTemplateComponent,
    SectionComponent,
    TopicTemplateComponent,
    TopicComponent,
    MessageTemplateComponent,
    SafeHtmlPipe,
    AdminPanelComponent,
    CreationSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EditorModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    UserService,
    ForumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
