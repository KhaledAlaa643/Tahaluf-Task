import { Component, input, output, OnInit, inject, computed, signal, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { TaskService } from '../../services/task';

import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../models/task.constants';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ChipModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskFormComponent implements OnInit {
  task = input<Task | null>(null);

  visibleChange = output<boolean>();

  visible = model(false);

  taskForm!: FormGroup;

  statusOptions = STATUS_OPTIONS;

  priorityOptions = PRIORITY_OPTIONS;

  private fb = inject(FormBuilder);

  private taskService = inject(TaskService);

  dialogHeader = computed(() => this.task() ? 'Edit Task' : 'Create New Task');

  ngOnInit() {
    const currentTask = this.task();
    this.taskForm = this.fb.group({
      title: [currentTask?.title || '', Validators.required],
      description: [currentTask?.description || '', Validators.required],
      status: [currentTask?.status || 'pending', Validators.required],
      priority: [currentTask?.priority || 'medium', Validators.required],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.task()) {
        this.taskService.updateTask({ ...this.task(), ...this.taskForm.value });
      } else {
        this.taskService.addTask(this.taskForm.value as Task);
      }
      this.close();
    }
  }

  close(): void {
    this.visible.set(false);
  }
}
