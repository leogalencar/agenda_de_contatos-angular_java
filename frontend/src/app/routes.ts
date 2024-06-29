import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ContactDetailsComponent } from "./pages/contact-details/contact-details.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full'},
  { path: 'contacts', component: HomeComponent },
  { path: 'contacts/:id', component: ContactDetailsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
]
