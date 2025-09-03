import { Component, inject, computed } from '@angular/core';
import { MealService } from './mealservice';
import { AddMealComponent } from './add-meal.component';
import { MealListComponent } from './meal-list.component';

@Component({
  selector: 'app-root',
  imports: [AddMealComponent, MealListComponent],
  styleUrl: './app.css',
  template: `
    <div class="container">
     
      
      <app-add-meal></app-add-meal>
      
      <div class="total-section">
        <h2>Today's Total: {{ todayTotal() }} calories</h2>
      </div>
      
      <app-meal-list></app-meal-list>
    </div>
  `
})
export class AppComponent {
  private mealService = inject(MealService);
  
  todayTotal = computed(() => this.mealService.getTodayTotal());
}