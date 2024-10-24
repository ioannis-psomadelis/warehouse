import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

//Primeng
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

//Services
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-page-wrapper',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule],
  template: `
    <p-menubar [model]="menuItems"></p-menubar>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class PageWrapperComponent {
  private authService = inject(AuthService);

  menuItems: MenuItem[] = [
    {
      label: 'Products',
      icon: 'pi pi-fw pi-box',
      items: [
        {
          label: 'List Products',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/products'],
        },
        {
          label: 'Add Product',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['/add-product'],
          visible: this.authService.isAdmin(),
        },
      ],
    },
    {
      label: 'Admin',
      icon: 'pi pi-fw pi-cog',
      routerLink: ['/admin'],
      visible: this.authService.isAdmin(),
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
      command: () => this.authService.logout(),
    },
  ];
}
