import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Issue} from '../models';
import {IssueRepository} from '../repositories';

export class IssueController {
  constructor(
    @repository(IssueRepository)
    public issueRepository : IssueRepository,
  ) {}

  @post('/issues')
  @response(200, {
    description: 'Issue model instance',
    content: {'application/json': {schema: getModelSchemaRef(Issue)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Issue, {
            title: 'NewIssue',
            exclude: ['id'],
          }),
        },
      },
    })
    issue: Omit<Issue, 'id'>,
  ): Promise<Issue> {
    return this.issueRepository.create(issue);
  }

  @get('/issues/count')
  @response(200, {
    description: 'Issue model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Issue) where?: Where<Issue>,
  ): Promise<Count> {
    return this.issueRepository.count(where);
  }

  @get('/issues')
  @response(200, {
    description: 'Array of Issue model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Issue, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Issue) filter?: Filter<Issue>,
  ): Promise<Issue[]> {
    return this.issueRepository.find(filter);
  }

  @patch('/issues')
  @response(200, {
    description: 'Issue PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Issue, {partial: true}),
        },
      },
    })
    issue: Issue,
    @param.where(Issue) where?: Where<Issue>,
  ): Promise<Count> {
    return this.issueRepository.updateAll(issue, where);
  }

  @get('/issues/{id}')
  @response(200, {
    description: 'Issue model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Issue, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Issue, {exclude: 'where'}) filter?: FilterExcludingWhere<Issue>
  ): Promise<Issue> {
    return this.issueRepository.findById(id, filter);
  }

  @patch('/issues/{id}')
  @response(204, {
    description: 'Issue PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Issue, {partial: true}),
        },
      },
    })
    issue: Issue,
  ): Promise<void> {
    await this.issueRepository.updateById(id, issue);
  }

  @put('/issues/{id}')
  @response(204, {
    description: 'Issue PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() issue: Issue,
  ): Promise<void> {
    await this.issueRepository.replaceById(id, issue);
  }

  @del('/issues/{id}')
  @response(204, {
    description: 'Issue DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.issueRepository.deleteById(id);
  }
}
