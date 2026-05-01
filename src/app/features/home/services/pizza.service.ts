import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { map, of } from 'rxjs';
import { MockPizza, PizzaApiDTO, PizzaState } from '../models/pizza.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  private pizzas = signal<PizzaState[]>([]);
  
  readonly pizzas$ = this.pizzas.asReadonly();

  private destroyRef = inject(DestroyRef)

  private readonly MOCK_DATA: PizzaApiDTO[] = [
    {
      restaurantName: 'Pizza Roma',
      restaurantId: 'pizza-roma',
      pizzaId: 'pepperoni-feast',
      pizzaName: 'Pepperoni Feast',
      basePrice: 45.00,
      estimatedDeliveryMinutes: 35,
      toppingRules: {
        maxToppings: 2,
        allowedToppings: [
          { id: 'extra-cheese', label: 'Extra Cheese', price: 5.00 },
          { id: 'mushrooms', label: 'Mushrooms', price: 3.00 },
          { id: 'olives', label: 'Olives', price: 4.00 },
          { id: 'barbique', label: 'barbique', price: 6.00 },
        ]
      },
      discountRules: {
        isActive: true,
        applyOn: 'subtotal',
        tiers: [
          { applyWhen: { minAmount: 10 }, discountPercentage: 5 },
          { applyWhen: { minAmount: 5 }, discountPercentage: 10 },
        ]
      }
    },
    {
      restaurant_name: 'Pizza Roma',
      restaurantId: 'pizza-roma',
      pizzaId: 'pepperoni-feast',
      pizzaName: 'Pepperoni Feast',
      basePrice: 45.00,
      estimatedDeliveryMinutes: 35,
      toppingRules: {
        maxToppings: 4,
        allowedToppings: [
          { id: 'extra-cheese', label: 'Extra Cheese', price: 5.00 },
          { id: 'mushrooms', label: 'Mushrooms', price: 3.00 },
          { id: 'olives', label: 'Olives', price: 4.00 },
          { id: 'barbique', label: 'barbique', price: 6.00 },
        ]
      },
      discountRules: {
        isActive: true,
        applyOn: 'subtotal',
        tiers: [
          { applyWhen: { minAmount: 50 }, discountPercentage: 5 },
          { applyWhen: { minAmount: 100 }, discountPercentage: 10 },
        ]
      }
    },
  ];

  loadPizzas(): void {
    of(this.MOCK_DATA).pipe(
      map(response => response.map(pizza => this.mapToPizzaState(pizza))),
    takeUntilDestroyed(this.destroyRef)
    ).subscribe(pizzas => this.pizzas.set(pizzas));
  }

  private mapToPizzaState(response: PizzaApiDTO): PizzaState {
    return {
      restaurantId: response.restaurantId ?? response.restaurant_id ?? response.id ??  '',
      restaurantName: response.restaurantName ?? response.restaurant_name ?? '',
      pizzaId: response.pizzaId ?? response.pizza_id ?? '',
      pizzaName: response.pizzaName ?? response.name ?? '',
      basePrice: response.basePrice ?? response.price ?? 0,
      estimatedDeliveryMinutes: response.estimatedDeliveryMinutes ?? response.deliveryTime ?? 0,
      toppingRules: {
        maxToppings: response.toppingRules?.maxToppings ?? 0,
        allowedToppings: (response.toppingRules?.allowedToppings ?? []).map((t: any) => ({
          id: t.id,
          label: t.label ?? t.name,
          price: t.price ?? 0,
          selected: false,
        })),
      },
      selectedToppings: [],
      totalPrice: response.basePrice ?? 0,
      discountRules: {
      isActive: response.discountRules?.isActive ?? false,
      applyOn: response.discountRules?.applyOn ?? 'subtotal',
      tiers: (response.discountRules?.tiers ?? []).map((t: any) => ({
        applyWhen: {
          minAmount: t.applyWhen?.minAmount ?? t.applyWhen ?? 0,
          holidays: t.applyWhen?.holidays ?? [],
          daysOfWeek: t.applyWhen?.daysOfWeek ?? [],
        },
        discountPercentage: t.discountPercentage ?? 0,
        })),
      },
    };
  }

  getPizzaById(id: string): PizzaState | undefined {
    return this.pizzas$().find(pizza => pizza.pizzaId === id);
  }

  selectTopping(pizzaId: string, toppingId: string): void {
  this.pizzas.update(pizzas =>
    pizzas.map(pizza => {
      if (pizza.pizzaId !== pizzaId) return pizza;

      const alreadySelected = pizza.selectedToppings.length >= pizza.toppingRules.maxToppings;
      const isSelected = pizza.selectedToppings.find(t => t.id === toppingId);

      if (!isSelected && alreadySelected) return pizza;
      
      const updatedToppings = isSelected
        ? pizza.selectedToppings.filter(t => t.id !== toppingId)
        : [...pizza.selectedToppings, { 
            ...pizza.toppingRules.allowedToppings.find(t => t.id === toppingId)!, 
            selected: true
          }];

      return {
        ...pizza,
        selectedToppings: updatedToppings,
        totalPrice: pizza.basePrice + updatedToppings.reduce((sum, t) => sum + t.price, 0),
      };
    })
  );
}
}


