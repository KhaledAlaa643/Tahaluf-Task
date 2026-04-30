import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFilterComponent } from '../task-filter/task-filter';
import { TaskService } from '../../services/task';

import { TaskFormComponent } from '../task-form/task-form';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFilterComponent, TaskFormComponent, DialogModule, ButtonModule, TableModule, TagModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent {
  private taskService = inject(TaskService);

  tasks = this.taskService.filteredTasks;

  displayDialog = signal(false);

  selectedTask = signal<Task | null>(null);

  openDialog(task?: Task) {
    this.selectedTask.set(task || null);
    this.displayDialog.set(true);
  }

  onDeleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }

  toggleTaskStatus(taskId: string) {
    this.taskService.toggleTaskStatus(taskId);
  }

  getPrioritySeverity(priority: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warn';
      case 'low': return 'info';
      default: return undefined;
    }
  }
}
