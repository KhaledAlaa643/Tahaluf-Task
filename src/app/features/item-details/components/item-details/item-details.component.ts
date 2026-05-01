import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaService } from '../../../home/services/pizza.service';
import { ButtonModule } from 'primeng/button';
import { PizzaState } from '../../../home/models/pizza.interface';
import { CurrencyPipe } from '@angular/common';
import { ToppingSelectedPipe } from '../../../../shared/pipes/topping-selected.pipe';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-item-details',
  imports: [ButtonModule,CurrencyPipe,ToppingSelectedPipe],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsComponent {
  
  private route = inject(ActivatedRoute);

  private pizzaService = inject(PizzaService);

  private cartService = inject(CartService);

  private router = inject(Router);

  pizzaId = this.route.snapshot.paramMap.get('id')!;

  pizza = computed(() => this.pizzaService.getPizzaById(this.pizzaId));

  onToppingClick(pizzaId: string, toppingId: string): void {
    this.pizzaService.selectTopping(pizzaId, toppingId);
  }

  onAddToCart(pizza: PizzaState): void {
    this.cartService.addToCart(pizza);
    this.router.navigate(['/cart']);
  }
}
