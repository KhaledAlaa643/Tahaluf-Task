import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,ButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private cartService = inject(CartService);

  private router = inject(Router);

  items$ = this.cartService.items$;

  subtotal = this.cartService.subtotal;

  discount = this.cartService.discount;

  total = this.cartService.total;

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
  }

  placeOrder(): void {
    console.log('Order placed!');
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
