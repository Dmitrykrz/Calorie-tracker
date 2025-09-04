import { Component, inject, computed,signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MealService } from './mealservice';
import { AddMealComponent } from './add-meal.component';
import { MealListComponent } from './meal-list.component';
import { CalorieLevel } from './calorie-filter.pipe';
@Component({
  selector: 'app-home',
  imports: [AddMealComponent, MealListComponent, RouterLink],
  styleUrl: './app.css',
  template: `
    <div class="container">
      <h1>Meal Tracker</h1>
      
      <button class="btn-primary" [routerLink]="['/help']" style="margin-bottom: 20px;">
        Help
      </button>
      
      <app-add-meal></app-add-meal>
      
      <div class="total-section">
        <h2>Today's Total: {{ todayTotal() }} calories</h2>
      </div>
      
      <div class="filter-buttons">
        
        <button 
          class="filter-btn" 
          [class.active]="currentFilter() === 'all'"
          (click)="setFilter('all')">
          Show All
        </button>
        <button 
          class="filter-btn" 
          [class.active]="currentFilter() === 'low'"
          (click)="setFilter('low')">
          Show Low (&lt;200)
        </button>
        <button 
          class="filter-btn" 
          [class.active]="currentFilter() === 'medium'"
          (click)="setFilter('medium')">
          Show Medium (200-400)
        </button>
        <button 
          class="filter-btn" 
          [class.active]="currentFilter() === 'high'"
          (click)="setFilter('high')">
          Show High (&gt;400)
        </button>
      </div>
      
      <app-meal-list [filter]="currentFilter()"></app-meal-list>
    </div>
  `
})
export class HomeComponent {
  private mealService = inject(MealService);
  
  currentFilter = signal<CalorieLevel>('all');
  todayTotal = computed(() => this.mealService.getTodayTotal());

  setFilter(filter: CalorieLevel): void {
    this.currentFilter.set(filter);
  }
}