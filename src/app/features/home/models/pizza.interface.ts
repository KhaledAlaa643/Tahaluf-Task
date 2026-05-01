import { DiscountRules } from "../../cart/models/cart.interface";

export interface AllowedTopping {
  id: string;
  label: string;
  price: number;
}

export interface ToppingRules {
  maxToppings: number;
  allowedToppings: AllowedTopping[];
}

export interface SelectedTopping extends AllowedTopping {
  selected: boolean;
}

export interface PizzaResponse {
  restaurantId: string;
  restaurantName: string;
  pizzaId: string;
  pizzaName: string;
  basePrice: number;
  estimatedDeliveryMinutes: number;
  toppingRules: ToppingRules;
  discountRules: DiscountRules;
}

export interface PizzaState extends PizzaResponse {
  selectedToppings: SelectedTopping[];
  totalPrice: number;
}

export interface MockPizza {
  restaurantId: string;
  pizzaId: string;
  pizzaName: string;
  restaurantName: string;
  basePrice: number;
  estimatedDeliveryMinutes: number;
  toppingRules: MockToppingRules;
  discountRules: MockDiscountRules;
}

export interface MockTopping {
  id: string;
  label: string;
  price: number;
}

export interface MockToppingRules {
  maxToppings: number;
  allowedToppings: MockTopping[];
}

export interface MockDiscountTier {
  applyWhen: {
    minAmount?: number;
    holidays?: string[];
    daysOfWeek?: number[];
  };
  discountPercentage: number;
}

export interface MockDiscountRules {
  isActive: boolean;
  applyOn: 'subtotal' | 'total';
  tiers: MockDiscountTier[];
}

export interface PizzaApiDTO {
  restaurantId?: string;
  restaurant_id?: string;
  id?:string;
  restaurantName?: string;
  restaurant_name?: string;
  pizzaId?: string;
  pizza_id?: string;
  pizzaName?: string;
  name?: string;
  basePrice?: number;
  price?: number;
  estimatedDeliveryMinutes?: number;
  deliveryTime?: number;
  toppingRules?: any; 
  discountRules?: any;
}