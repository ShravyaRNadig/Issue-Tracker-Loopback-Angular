import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue.model';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  selectedIssue: Issue | null = null;

  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.loadIssues();
    this.issueService.issueCreated$.subscribe(() => {
      this.loadIssues(); // Reload issues when notified
    });
  }

  loadIssues() {
    this.issueService.getIssues().subscribe(data => {
      this.issues = data;
    });
  }

  deleteIssue(id: string) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.loadIssues(); // Refresh the list
    });
  }

  editIssue(issue: Issue) {
    this.selectedIssue = { ...issue }; // Create a copy to edit
  }

  updateIssue() {
    if (this.selectedIssue) {
      this.issueService.updateIssue(this.selectedIssue).subscribe(() => {
        this.selectedIssue = null; // Clear the selected issue after update
        this.loadIssues(); // Refresh the list
      });
    }
  }
}
