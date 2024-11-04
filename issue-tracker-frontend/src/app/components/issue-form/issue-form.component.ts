import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue.model';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
})
export class IssueFormComponent implements OnInit {
  newIssue: Issue;

  constructor(private issueService: IssueService) {
    // Initialize the newIssue object with default values
    this.newIssue = {
      title: '',
      description: '',
      status: 'open',
      priority: 'low'
    };
  }

  ngOnInit(): void {
    // Optionally, you can initialize the form here if needed
  }

  createIssue() {
    this.issueService.createIssue(this.newIssue).subscribe(response => {
      console.log('Issue created:', response);
      this.resetForm(); // Optionally reset the form after creation
    }, error => {
      console.error('Error creating issue:', error);
    });
  }

  resetForm() {
    this.newIssue = {
      title: '',
      description: '',
      status: 'open',
      priority: 'low'
    };
  }
}