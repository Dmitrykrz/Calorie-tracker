import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MealService } from './mealservice';

@Component({
  selector: 'app-add-meal',
  styleUrl: './app.css',
  imports: [FormsModule],
  template: `
    <div class="add-meal-form">
      <div class="form-group">
        <label for="mealName">Meal:</label>
        <input 
          id="mealName"
          type="text" 
          [(ngModel)]="mealName" 
          placeholder="e.g., Cookie and tea"
          class="form-control">
      </div>
      
      <div class="form-group">
        <label for="mealCalories">Calories:</label>
        <input 
          id="mealCalories"
          type="number" 
          [(ngModel)]="mealCalories" 
          placeholder="e.g., 250"
          class="form-control">
      </div>
      
      <button (click)="addMeal()" class="btn-primary">Add Meal</button>
    </div>
  `
})
export class AddMealComponent {
  private mealService = inject(MealService);
  
  mealName = '';
  mealCalories: number | null = null;

  addMeal(): void {
    if (this.mealName && this.mealCalories && this.mealCalories > 0) {
      this.mealService.addMeal(this.mealName, this.mealCalories);
      
      // Clear form after adding
      this.mealName = '';
      this.mealCalories = null;
    }
  }
}