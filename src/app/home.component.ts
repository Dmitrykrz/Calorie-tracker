import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { MealService } from './mealservice';
import { AddMealComponent } from './add-meal.component';
import { MealListComponent } from './meal-list.component';
import { CalorieLevel } from './calorie-filter.pipe';

@Component({
  selector: 'app-home',
  imports: [AddMealComponent, MealListComponent, RouterLink, FormsModule], 
  styleUrl: './app.css',
  template: `
    <div class="container">
      <h1>Meal Tracker</h1>
      
      
      @if (!isLoggedIn()) {
        <div class="add-meal-form">
          <h2>Login to Continue</h2>
          <form #loginForm="ngForm" (ngSubmit)="fakeLogin()">
            <div class="form-group">
              <label for="username">Username:</label>
              <input 
                id="username"
                name="username"
                type="text" 
                [(ngModel)]="loginData.username" 
                placeholder="Enter username"
                class="form-control"
                required
                minlength="3">
            </div>
            
            <div class="form-group">
              <label for="password">Password:</label>
              <input 
                id="password"
                name="password"
                type="password" 
                [(ngModel)]="loginData.password" 
                placeholder="Enter password"
                class="form-control"
                required
                minlength="3">
            </div>


             <div class="form-group">
              <label for="age">Age:</label>
              <input 
                id="age"
                name="age"
                type="number" 
                [(ngModel)]="loginData.age" 
                placeholder="Enter age"
                class="form-control"
                required
                min="0.1"
                max="200"
                >
            </div>

            <div class="form-group">
              <label for="weight">Weight:</label>
              <input 
                id="weight"
                name="weight"
                type="number" 
                [(ngModel)]="loginData.weight" 
                placeholder="Enter weight"
                class="form-control"
                required
                min="0.1"
                max="500"
                >
            </div>


            <div class="form-group">
              <label for="height">height:</label>
              <input 
                id="height"
                name="height"
                type="number" 
                [(ngModel)]="loginData.height" 
                placeholder="Enter height"
                class="form-control"
                required
                min="0.1"
                max="200"
                >
            </div>



            <button 
              type="submit" 
              class="btn-primary"
              [disabled]="!loginForm.form.valid">
              Register
            </button>
          </form>
        </div>
      } @else {
        
        <div [style.opacity]="isLoggedIn() ? '1' : '0.3'" [style.pointer-events]="isLoggedIn() ? 'auto' : 'none'">
          
          <button class="btn-primary" [routerLink]="['/help']" style="margin-bottom: 20px;">
            Help
          </button>
          
          
          <button class="btn-primary" (click)="fakeLogout()" style="margin-bottom: 20px; margin-left: 10px; background-color: #dc3545;">
            Logout
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
      }
    </div>
  `
})
export class HomeComponent {
  private mealService = inject(MealService);
  

  isLoggedIn = signal<boolean>(false);
  loginData = {
    username: '',
    password: '',
    age: '',
    height: '',
    weight: ''
  };
  
  currentFilter = signal<CalorieLevel>('all');
  todayTotal = computed(() => this.mealService.getTodayTotal());


  fakeLogin(): void {    
    this.isLoggedIn.set(true);   
  }


  fakeLogout(): void {
       this.isLoggedIn.set(false);  }

  setFilter(filter: CalorieLevel): void {
    this.currentFilter.set(filter);
  }
}