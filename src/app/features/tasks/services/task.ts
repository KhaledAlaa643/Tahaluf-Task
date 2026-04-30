import { Injectable, signal, computed } from '@angular/core';
import { Task, TaskFilter } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = signal<Task[]>([
    {
      id: '1',
      title: 'Set up interview boilerplate',
      description: 'Create the folder structure and configure PrimeNG with Tailwind CSS.',
      status: 'completed',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Review Angular Signals',
      description: 'Practice using signals, computed properties, and effects for state management.',
      status: 'in-progress',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Implement Deep Search',
      description: 'Create a filtering mechanism that searches both title and description text.',
      status: 'pending',
      priority: 'high',
    },
    {
      id: '4',
      title: 'Style with Tailwind CSS',
      description: 'Make the UI look beautiful and modern using utility classes.',
      status: 'pending',
      priority: 'low',
    }
  ]);

  private filterState = signal<TaskFilter>({
    searchQuery: '',
    statuses: [],
    priorities: [],
  });

  filteredTasks = computed(() => {
    let filteredList = this.tasks();
    const filters = this.filterState();

    // 1. Apply Search Query Filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredList = filteredList.filter(task =>
        task.description.toLowerCase().includes(query) || task.title.toLowerCase().includes(query)
      )
    }

    // 2. Apply Status Filter
    if (filters.statuses.length > 0) {
      filteredList = filteredList.filter(task => filters.statuses.includes(task.status));
    }

    // 3. Apply Priority Filter
    if (filters.priorities.length > 0) {
      filteredList = filteredList.filter(task => filters.priorities.includes(task.priority));
    }

    return filteredList;
  });

  updateFilter(partialFilter: Partial<TaskFilter>) {
    this.filterState.update(state => ({ ...state, ...partialFilter }))
  }

  toggleTaskStatus(taskId: string) {
    this.tasks.update(tasks => tasks.map(task =>
      task.id === taskId ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
    ))
  }

  addTask(task: Task) {
    this.tasks.update(tasks => [...tasks, task]);
  }

  updateTask(updatedTask: Task) {
    this.tasks.update(tasks => tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  }

  deleteTask(taskId: string) {
    this.tasks.update(tasks => tasks.filter(t => t.id !== taskId));
  }
}
