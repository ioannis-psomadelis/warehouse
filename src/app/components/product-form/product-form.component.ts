import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

//Models
import { Mode, Product } from '@models/product.model';

//Primeng
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ButtonModule,
  ],
  providers: [],
  templateUrl: './product-form.component.html',
  styles: [],
})
export class ProductFormComponent {
  ref = inject(DynamicDialogRef);
  config = inject(DynamicDialogConfig);

  newProductForm!: FormGroup;
  product!: Product;
  mode!: Mode;
  MODE = Mode;

  ngOnInit(): void {
    this.initForm();

    this.product = this.config.data?.product;
    this.mode = this.config.data?.mode;
    if (this.mode === Mode.EDIT && this.product) {
      this.newProductForm.patchValue(this.product);
    }
  }

  initForm() {
    this.newProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  addProduct() {
    const newProduct = this.newProductForm.value;
    if (this.mode === Mode.EDIT) {
      newProduct.id = this.product?.id;
    }
    this.ref.close({ product: newProduct, mode: this.config.data?.mode });
  }
}
