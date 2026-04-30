import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { TaskStatus, TaskPriority } from '../../models/task.model';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../models/task.constants';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css'
})
export class TaskFilterComponent {
  private taskService = inject(TaskService);

  statusOptions = STATUS_OPTIONS;
  priorityOptions = PRIORITY_OPTIONS;

  searchQuery = '';
  selectedStatuses: TaskStatus[] = [];
  selectedPriorities: TaskPriority[] = [];

  onFilterChange() {
    this.taskService.updateFilter({
      searchQuery: this.searchQuery,
      statuses: this.selectedStatuses,
      priorities: this.selectedPriorities,
    });
  }


}
