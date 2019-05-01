/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateValueInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type UpdateValueInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteValueInput = {
  id?: string | null,
};

export type CreateProjectInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type UpdateProjectInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteProjectInput = {
  id?: string | null,
};

export type ModelValueFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  description?: ModelStringFilterInput | null,
  and?: Array< ModelValueFilterInput | null > | null,
  or?: Array< ModelValueFilterInput | null > | null,
  not?: ModelValueFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  description?: ModelStringFilterInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type CreateValueMutationVariables = {
  input: CreateValueInput,
};

export type CreateValueMutation = {
  createValue:  {
    __typename: "Value",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type UpdateValueMutationVariables = {
  input: UpdateValueInput,
};

export type UpdateValueMutation = {
  updateValue:  {
    __typename: "Value",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type DeleteValueMutationVariables = {
  input: DeleteValueInput,
};

export type DeleteValueMutation = {
  deleteValue:  {
    __typename: "Value",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
};

export type CreateProjectMutation = {
  createProject:  {
    __typename: "Project",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
};

export type UpdateProjectMutation = {
  updateProject:  {
    __typename: "Project",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
};

export type DeleteProjectMutation = {
  deleteProject:  {
    __typename: "Project",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type GetValueQueryVariables = {
  id: string,
};

export type GetValueQuery = {
  getValue:  {
    __typename: "Value",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type ListValuesQueryVariables = {
  filter?: ModelValueFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListValuesQuery = {
  listValues:  {
    __typename: "ModelValueConnection",
    items:  Array< {
      __typename: "Value",
      id: string,
      name: string,
      description: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject:  {
    __typename: "Project",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      description: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateValueSubscription = {
  onCreateValue:  {
    __typename: "Value",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnUpdateValueSubscription = {
  onUpdateValue:  {
    __typename: "Value",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnDeleteValueSubscription = {
  onDeleteValue:  {
    __typename: "Value",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject:  {
    __typename: "Project",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject:  {
    __typename: "Project",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject:  {
    __typename: "Project",
    id: string,
    name: string,
    description: string | null,
  } | null,
};
