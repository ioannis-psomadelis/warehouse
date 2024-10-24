import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

//Primeng
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

//Services
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, AvatarModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  menuItems: MenuItem[] = [];

  //auth values
  isLoggedIn = computed(() => this.authService.isLoggedIn());
  isAdmin = computed(() => this.authService.isAdmin());
  currentUser = computed(() => this.authService.currentUser());

  constructor() {
    effect(() => {
      this.updateMenuItems();
    });
  }

  ngOnInit() {
    this.updateMenuItems();
  }

  updateMenuItems() {
    const items: MenuItem[] = [
      {
        label: 'Διαχείριση Προϊόντων',
        icon: 'pi pi-cog',
        routerLink: ['/admin-dashboard'],
        routerLinkActiveOptions: { exact: true },
        routerLinkActive: 'active',
        visible: this.isAdmin(),
      },
      {
        label: 'Προϊόντα',
        icon: 'pi pi-bars',
        routerLink: ['/user-dashboard'],
        routerLinkActiveOptions: { exact: true },
        routerLinkActive: 'active',
        visible: this.isLoggedIn() && !this.isAdmin(),
      },
    ];
    this.menuItems = [...items];
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }
}
