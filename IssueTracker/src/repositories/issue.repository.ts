import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Issue} from '../models';
import {inject} from '@loopback/core';
import {IssueTrackerDataSource} from '../datasources';

export class IssueRepository extends DefaultCrudRepository<
  Issue,
  typeof Issue.prototype.id
> {
  constructor(
    @inject('datasources.IssueTracker') dataSource: IssueTrackerDataSource,
  ) {
    super(Issue, dataSource);
  }
}
