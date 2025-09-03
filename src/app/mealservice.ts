import { Injectable, signal } from '@angular/core';
import { Meal } from './meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private meals = signal<Meal[]>([]);
  private nextId = 1;

  getMeals() {
    return this.meals.asReadonly();
  }

  addMeal(name: string, calories: number): void {
    const newMeal: Meal = {
      id: this.nextId++,
      name: name,
      calories,
      timestamp: new Date()
    };
    
    const oldMeals = this.meals();        
    const newMeals = [...oldMeals, newMeal]; 
    this.meals.set(newMeals);
  }

  getTodayTotal(): number {
    const today = new Date();
const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

let total = 0;
for (const meal of this.meals()) {
  if (meal.timestamp >= todayStart && meal.timestamp <= todayEnd) {
    total += meal.calories;
  }
}

return total;
  }
}