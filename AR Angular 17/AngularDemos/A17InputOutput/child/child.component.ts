import { Component, Input, Output, EventEmitter } from '@angular/core'; 

@Component({
  standalone: true,
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})

export class ChildComponent {
	
@Input() 
greeting = "" 

/*
@Input("greeting-text") 
greeting = ""
*/

@Input()
user = {name: "", email: ""}

//isValid = false //Internal variable not decorated


@Input() age = 0
@Output() ageChange = new EventEmitter()

enterAge(age:string) { this.ageChange.emit(parseInt(age))
}



}
