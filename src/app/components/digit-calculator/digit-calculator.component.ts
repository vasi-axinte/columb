import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-digit-calculator',
  templateUrl: './digit-calculator.component.html',
  styleUrls: ['./digit-calculator.component.scss']
})
export class DigitCalculatorComponent {
  input = new FormControl('');
  result = new FormControl('');

  calculate(){
     // Obține valorile introduse și completează cu zero dacă este cazul
     
    //  const inputValues = this.input.value + '000000000000000000000000000000'.toUpperCase().slice(0, 30);
     const inputValues = this.input.value!.toUpperCase().slice(0, 30);

     // Converteste literele in valori numerice conform regulilor date
     const values = Array.from(inputValues, char =>
         char >= 'A' && char <= 'Z' ? char.charCodeAt(0) - 'A'.charCodeAt(0) + 10 : parseInt(char)
     );

     // Defineste vectorul de ponderi
     const weights = [7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1];

     // Calculează suma produselor
     const sum = values.reduce((acc, value, index) => acc + value * weights[index], 0);

     // Calculează cifra de control
     const controlDigit = sum % 10;
     
     this.result.setValue(controlDigit.toString());
  }
}
