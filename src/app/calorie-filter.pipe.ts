import { Pipe, PipeTransform } from '@angular/core';
import { Meal } from './meal';

export type CalorieLevel = 'all' | 'low' | 'medium' | 'high';

@Pipe({
  name: 'calorieFilter'
})
export class CalorieFilterPipe implements PipeTransform {
  transform(meals: Meal[], filter: CalorieLevel): Meal[] {
    if (!meals || filter === 'all') {
      return meals;
    }

    return meals.filter(meal => {
      switch (filter) {
        case 'low':
          return meal.calories < 200;
        case 'medium':
          return meal.calories >= 200 && meal.calories <= 400;
        case 'high':
          return meal.calories > 400;
        default:
          return true;
      }
    });
  }
}