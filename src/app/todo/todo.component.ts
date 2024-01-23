import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { itask } from '../module/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
task: itask[]=[]; 
inProgress: itask[]=[];
done: itask[]=[];

  todoform !: FormGroup;

  constructor(private fb:FormBuilder) { }

  
  ngOnInit(): void {
    this.todoform=this.fb.group({
      item:['',Validators.required]
    })
  }

  drop(event: CdkDragDrop<itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  addtask(item:string){
    this.task.push({
      description: item,
      done:false
    })
    console.log(this.task);
    this.todoform.reset();
  }
}
