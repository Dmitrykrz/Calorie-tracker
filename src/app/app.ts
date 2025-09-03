import { Component, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MealService } from './mealservice';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  styleUrl: './app.css',
  template: `
    <div class="container">
      
      
    
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

   
      <div class="total-section">
        <h2>Today's Total: {{ todayTotal() }} calories</h2>
      </div>

   
      <div class="meals-table">
        
        
        @if (meals().length === 0) {
          
          
        } @else {
          <h2>My Meals</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Meal</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              @for (meal of meals(); track meal.id) {
                <tr>
                  <td>{{ formatTime(meal.timestamp) }}</td>
                  <td>{{ meal.name }}</td>
                  <td>{{ meal.calories }}</td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  `
})
export class AppComponent {
  private mealService = inject(MealService);
  
  mealName = '';
  mealCalories: number | null = null;
  
  meals = this.mealService.getMeals();
  todayTotal = computed(() => this.mealService.getTodayTotal());

  addMeal(): void {
    if (this.mealName && this.mealCalories && this.mealCalories > 0) {
      this.mealService.addMeal(this.mealName, this.mealCalories);
      
      // Clear the form
      this.mealName = '';
      this.mealCalories = null;
    }
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}