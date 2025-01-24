import { Routes ,RouterModule} from '@angular/router';
import { HomeComponent } from './Home/home/home.component';

import { NavbarComponent } from './navbar/navbar.component';




import { MainHomeComponent } from './main-home/main-home.component';



export const routes: Routes = [
    {
        path:'home',
        component:HomeComponent
    },
    
    {
        path:'',
        component:MainHomeComponent
    },
 
  
];
