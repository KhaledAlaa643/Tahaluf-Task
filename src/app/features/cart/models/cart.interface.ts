import { SelectedTopping } from "../../home/models/pizza.interface";

export interface DiscountTier {
  discountPercentage: number;
  applyWhen: {
    minAmount?: number;    
    holidays?: string[];    
    daysOfWeek?: number[];  
  };  
}

export interface DiscountRules {
  isActive: boolean;
  applyOn: 'subtotal' | 'total';
  tiers: DiscountTier[];
}

export interface CartItem {
  pizzaId: string;
  pizzaName: string;
  restaurantId: string;
  restaurantName: string;
  basePrice: number;
  selectedToppings: SelectedTopping[];
  totalPrice: number;
  discountRules: DiscountRules;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}