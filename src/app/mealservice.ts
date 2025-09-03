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
    
    this.meals.update(currentMeals => [...currentMeals, newMeal]);
  }

  getTodayTotal(): number {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    return this.meals()
      .filter(meal => meal.timestamp >= todayStart && meal.timestamp <= todayEnd)
      .reduce((total, meal) => total + meal.calories, 0);
  }
}