// eslint-disable
// this is an auto generated file. This will be overwritten

export const getValue = `query GetValue($id: ID!) {
  getValue(id: $id) {
    id
    name
    description
  }
}
`;
export const listValues = `query ListValues(
  $filter: ModelValueFilterInput
  $limit: Int
  $nextToken: String
) {
  listValues(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
export const getProject = `query GetProject($id: ID!) {
  getProject(id: $id) {
    id
    name
    description
  }
}
`;
export const listProjects = `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
