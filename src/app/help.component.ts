import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-help',
  imports: [RouterLink],
  styleUrl: './app.css',
  template: `
    <div class="container">
      <h1>Help & Instructions</h1>
      
      <div class="add-meal-form">
        <h2>How to use?</h2>
        
        <div class="form-group">
          <strong>Add food, add calories, press button</strong>
          
        </div>
        
        
      
      <button class="btn-primary">
        <a [routerLink]="['/']">Back to Meal Tracker</a>
      </button>
  `
})
export class HelpComponent {}