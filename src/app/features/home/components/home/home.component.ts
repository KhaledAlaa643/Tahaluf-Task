import { ButtonModule } from 'primeng/button';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe,ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private pizzaService = inject(PizzaService);

  private router = inject(Router);

  pizzas = this.pizzaService.pizzas$;

  constructor() {
    this.pizzaService.loadPizzas();
  }

  goToDetails(pizzaId: string): void {
    this.router.navigate(['/item-details', pizzaId]);
  }
}
