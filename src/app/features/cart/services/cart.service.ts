import { computed, Injectable, signal } from '@angular/core';
import { PizzaState } from '../../home/models/pizza.interface';
import { CartItem } from '../models/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<CartItem[]>([]);

  readonly items$ = this.items.asReadonly();

  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.totalPrice, 0)
  );

  readonly discount = computed(() =>
    this.items().reduce((sum, item) => sum + this.calculateDiscount(item), 0)
  );

  readonly total = computed(() => this.subtotal() - this.discount());

  addToCart(pizza: PizzaState): void {
    const cartItem: CartItem = {
      pizzaId: pizza.pizzaId,
      pizzaName: pizza.pizzaName,
      restaurantId: pizza.restaurantId,
      restaurantName: pizza.restaurantName,
      basePrice: pizza.basePrice,
      selectedToppings: pizza.selectedToppings,
      totalPrice: pizza.totalPrice,
      discountRules: pizza.discountRules,
    };
    this.items.update(items => [...items, cartItem]);
  }

  removeFromCart(index: number): void {
    this.items.update(items => items.filter((_, i) => i !== index));
  }

private calculateDiscount(item: CartItem): number {
  if (!item.discountRules?.isActive) return 0;

  const amount = item.totalPrice;
  const today = new Date();

  const tier = item.discountRules.tiers.find(t => {
    const amountOk = t.applyWhen.minAmount ? amount >= t.applyWhen.minAmount : true;
    const holidayOk = t.applyWhen.holidays ? t.applyWhen.holidays.includes(today.toISOString().split('T')[0]) : true;
    const dayOk = t.applyWhen.daysOfWeek ? t.applyWhen.daysOfWeek.includes(today.getDay()) : true;
    return amountOk && holidayOk && dayOk;
  });

  return tier ? (amount * tier.discountPercentage) / 100 : 0;
}
}
