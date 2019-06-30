import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { JsonpInterceptor } from '@angular/common/http';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
	data = {
		pendings: [ 'İşe git', 'Alışveriş', 'Eve git', 'Uyku' ],
		inProgress: [ 'Uyan', 'Dişlerini Fırçala', 'Duş', 'Mailleri kontrol et', 'Köpeğini Gezdir' ],
		done: [ 'Testleri yaz', 'Angular öğren', 'Markete git' ]
	};

	constructor() {}

	ngOnInit() {
		this.setItems();
	}
	drop(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
			Object.keys(this.data).forEach((key) => {
				this.data[key] = JSON.parse(localStorage.getItem(key));
			});
		}
	}

	addTodo(todo) {
		//console.log(todo.value);
		this.data.pendings.push(todo.value);
		todo.value = '';
		localStorage.setItem('pendings', JSON.stringify(this.data.pendings));
	}
	setItems() {
		Object.keys(this.data).forEach((key) => {
			if (!localStorage.getItem(key)) {
				localStorage.setItem(key, JSON.stringify(this.data[key]));
			} else {
				this.data[key] = JSON.parse(localStorage.getItem(key));
			}
		});

		/*	localStorage.setItem('pendings', JSON.stringify(this.pendings));
		localStorage.setItem('inProgress', JSON.stringify(this.inProgress));
		localStorage.setItem('done', JSON.stringify(this.done));*/
	}
}
