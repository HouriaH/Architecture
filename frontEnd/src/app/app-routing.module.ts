import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForumComponent } from './ForumApp/forum/forum.component';
import { SectionComponent } from './ForumApp/section/section.component';
import { TopicComponent } from './ForumApp/topic/topic.component';
import { AdminPanelComponent } from './AdminApp/admin-panel/admin-panel.component';
import { AdminGuard } from './Guards/admin.guard';
import { ConnectedGuard } from './Guards/connected.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'forum', component: ForumComponent, canActivate: [ConnectedGuard] },
  { path: 'forum/admin-panel', component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path: 'forum/:urlSection', component: SectionComponent, canActivate: [ConnectedGuard] },
  { path: 'forum/:urlSection/:idTopic', component: TopicComponent, canActivate: [ConnectedGuard] },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
