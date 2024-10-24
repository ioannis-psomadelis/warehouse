import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { ProductService } from '@services/product.service';
import { MessagingService } from '@services/messaging.service';

// Components
import { ProductFormComponent } from '../product-form/product-form.component';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

// Models
import { Mode, Product } from '@models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ConfirmDialogModule],
  providers: [
    ConfirmationService,
    MessagingService,
    DialogService,
    DynamicDialogRef,
  ],
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent {
  dialogService = inject(DialogService);
  productService = inject(ProductService);
  confirmationService = inject(ConfirmationService);
  messagingService = inject(MessagingService);
  ref = inject(DynamicDialogRef);

  products = this.productService.getProducts();

  // Input
  isAdmin = input.required<boolean>();

  deleteProduct(id: number) {
    this.confirmationService.confirm({
      message: 'Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το προϊόν;',
      header: 'Διαγραφή προϊόντος',
      acceptLabel: 'Διαγραφή',
      rejectLabel: 'Άκυρο',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.productService.deleteProduct(id);
        this.messagingService.showSuccess('το προϊόν διαγράφηκε');
      },
    });
  }

  editProduct(product: Product) {
    this.ref = this.dialogService.open(ProductFormComponent, {
      header: 'Επεξεργασία προϊόντος',
      width: '50vw',
      data: { product, mode: Mode.EDIT },
    });

    this.ref.onClose.subscribe((data: { product: Product; mode: Mode }) => {
      if (data && data.mode === Mode.EDIT) {
        this.productService.editProduct(data.product);
        this.messagingService.showInfo('το προϊόν επεξεργάστηκε');
      }
    });
  }

  addProduct() {
    this.ref = this.dialogService.open(ProductFormComponent, {
      header: 'Προσθέσε νέο προϊόν',
      width: '50vw',
      data: { mode: Mode.ADD },
    });

    this.ref.onClose.subscribe((data: { product: Product; mode: Mode }) => {
      if (data && data.mode === Mode.ADD) {
        this.productService.addProduct(data.product);
        this.messagingService.showSuccess('το προϊόν προστέθηκε');
      }
    });
  }
}
