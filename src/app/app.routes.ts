import { Routes } from '@angular/router';

export const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },

        {
        path: 'home',
        loadComponent: () => import('./features/home/components/home/home.component').then(m => m.HomeComponent),
    },
        {
        path: 'item-details/:id',
        loadComponent: () => import('./features/item-details/components/item-details/item-details.component').then(m => m.ItemDetailsComponent),
    },
            {
        path: 'cart',
        loadComponent: () => import('./features/cart/components/cart/cart.component').then(m => m.CartComponent),
    },
];
