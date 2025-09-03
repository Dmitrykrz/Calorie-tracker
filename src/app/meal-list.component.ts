import { Component, inject } from '@angular/core';
import { MealService } from './mealservice';

@Component({
  selector: 'app-meal-list',
  styleUrl: './app.css',
  template: `
    <div class="meals-table">
      @if (meals().length === 0) {
        <p>No meals added yet.</p>
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
  `
})
export class MealListComponent {
  private mealService = inject(MealService);
  
  meals = this.mealService.getMeals();

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}