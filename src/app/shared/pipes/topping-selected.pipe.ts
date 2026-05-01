import { Pipe, PipeTransform } from '@angular/core';
import { SelectedTopping } from '../../features/home/models/pizza.interface';

@Pipe({
  name: 'toppingSelected',
})
export class ToppingSelectedPipe implements PipeTransform {
  transform(selectedToppings: SelectedTopping[], toppingId: string): boolean {
    return selectedToppings.some(t => t.id === toppingId);
  }
}
