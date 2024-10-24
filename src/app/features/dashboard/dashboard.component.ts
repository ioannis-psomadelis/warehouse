import { Component, computed, inject, OnInit } from '@angular/core';

// Components
import { ProductListComponent } from '../../components/product-list/product-list.component';

// Services
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [ProductListComponent],
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);

  isAdmin = computed(() => this.authService.isAdmin());

  ngOnInit(): void {}
}
