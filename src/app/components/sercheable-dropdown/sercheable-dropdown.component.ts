

import { Component } from "@angular/core";

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

/** @title Form field with prefix & suffix */
@Component({
  selector: 'app-sercheable-component',
  templateUrl: './sercheable-dropdown.component.html',
  styleUrls: ['./sercheable-dropdown.component.scss']
})
export class SercheableComponent {
  areas: string[] = [
    "Tokyo",
    "NewYork",
    "Portland",
    "Robert",
    "Juan",
    "El Pepe"
  ];
  selectedAreas: string[] = this.areas;

  area = new FormControl("", [Validators.required]);

  myForm = this.builder.group({
    area: this.area
  });

  constructor(private builder: FormBuilder) {}

  search(query: string) {
    console.log("query", query);
    let result = this.select(query);
    this.selectedAreas = result;
  }

  select(query: string): string[] {
    let result: string[] = [];
    for (let a of this.areas) {
      if (a.toLowerCase().indexOf(query) > -1) {
        result.push(a);
      }
    }
    return result;
  }
}
