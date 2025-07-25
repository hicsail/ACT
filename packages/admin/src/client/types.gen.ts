// This file is auto-generated by @hey-api/openapi-ts

export type CreateTaskDto = {
    /**
     * Category the task falls under
     */
    category: string;
    /**
     * The set the task should belong to
     */
    taskSetId: string;
    /**
     * Title of the task
     */
    title: string;
    /**
     * Preview text describing the task
     */
    preview: string;
    /**
     * Preview image shown along with task
     */
    previewImage: string;
    /**
     * Duration of the task in seconds
     */
    timeSeconds: number;
    /**
     * Task description given to the user
     */
    description: string;
    /**
     * Problem overview for the user
     */
    problemDescription: string;
    /**
     * Additional details for the user to follow
     */
    taskDetails: string;
    /**
     * Prompts for the user to meet
     */
    prompts: Array<string>;
    /**
     * Order the tasks are presented to the user
     */
    order: number;
    /**
     * User provided ID for the task
     */
    descriptor: string;
    /**
     * Optional content image
     */
    contentImage: {
        [key: string]: unknown;
    };
};

export type TaskEntity = {
    /**
     * Unique ID of the task
     */
    id: string;
    /**
     * The ID of the set the task belongs to
     */
    taskSetId: string;
    /**
     * Category the task falls under
     */
    category: string;
    /**
     * Title of the task
     */
    title: string;
    /**
     * Preview text describing the task
     */
    preview: string;
    /**
     * Preview image shown along with the task
     */
    previewImage: string;
    /**
     * Duration of the task in seconds
     */
    timeSeconds: number;
    /**
     * Task description given to the user
     */
    description: string;
    /**
     * Problem overview for the user
     */
    problemDescription: string;
    /**
     * Additional details for the user to follow
     */
    taskDetails: string;
    /**
     * Prompts for the user to meet
     */
    prompts: {
        [key: string]: unknown;
    };
    /**
     * Order the tasks are presented to the user
     */
    order: number;
    /**
     * User provided ID for the task
     */
    descriptor: string;
    /**
     * Optional content image
     */
    contentImage: string | null;
};

export type UpdateTaskDto = {
    [key: string]: unknown;
};

export type CreateTaskSetDto = {
    /**
     * Name of the task set
     */
    name: string;
    /**
     * Description of the task set
     */
    description: string;
};

export type TaskSetEntity = {
    /**
     * Unique ID of the set
     */
    id: string;
    /**
     * If this is the current set being used
     */
    active: boolean;
    /**
     * The name of the set
     */
    name: string;
    /**
     * The description of the set
     */
    description: string;
};

export type UpdateTaskSetDto = {
    /**
     * Name of the task set
     */
    name?: string;
    /**
     * Description of the task set
     */
    description?: string;
};

export type CreateTaskCompletionDto = {
    /**
     * The ID of the task associated with the completion
     */
    taskId: string;
    /**
     * If the completion has been finished
     */
    complete: boolean;
    /**
     * The location of the video
     */
    video: string;
    /**
     * The ID of the user who made the completion
     */
    userId: string;
};

export type TaskCompletionEntity = {
    /**
     * Generated ID
     */
    id: string;
    /**
     * The ID of the task associated with the completion
     */
    taskId: string;
    /**
     * If the completion has been finished
     */
    complete: boolean;
    /**
     * The location of the video
     */
    video: string;
    /**
     * The ID of the user who made the completion
     */
    userId: string;
};

export type UpdateTaskCompletionDto = {
    /**
     * The ID of the task associated with the completion
     */
    taskId?: string;
    /**
     * If the completion has been finished
     */
    complete?: boolean;
    /**
     * The location of the video
     */
    video?: string;
    /**
     * The ID of the user who made the completion
     */
    userId?: string;
};

export type HasComplete = {
    complete: boolean;
};

export type WebhookPayload = {
    [key: string]: unknown;
};

export type StudyMappingEntity = {
    /**
     * Placeholder ID for the admin client
     */
    id: string;
    /**
     * Email of the user
     */
    email: string;
    /**
     * Unique study ID for the user
     */
    studyId: string;
    /**
     * Region the user is in
     */
    region: string;
};

export type DownloadEntity = {
    /**
     * Unique ID of the download
     */
    id: string;
    /**
     * The status of the download
     */
    status: 'STARTING' | 'IN_PROGRESS' | 'COMPLETE' | 'FAILED';
    /**
     * Where the download is located in the download bucket
     */
    location: string;
    /**
     * When the download request was made
     */
    createdAt: string;
};

export type AppControllerGetHelloData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/';
};

export type AppControllerGetHelloResponses = {
    200: unknown;
};

export type CasdoorControllerHandleRedirectData = {
    body?: never;
    path?: never;
    query: {
        origin: string;
    };
    url: '/casdoor/redirect';
};

export type CasdoorControllerHandleRedirectResponses = {
    200: unknown;
};

export type CasdoorControllerHandleSigninData = {
    body?: never;
    path?: never;
    query: {
        code: string;
    };
    url: '/casdoor/signin';
};

export type CasdoorControllerHandleSigninResponses = {
    201: unknown;
};

export type TasksControllerFindAllData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/tasks';
};

export type TasksControllerFindAllResponses = {
    default: Array<TaskEntity>;
};

export type TasksControllerFindAllResponse = TasksControllerFindAllResponses[keyof TasksControllerFindAllResponses];

export type TasksControllerCreateData = {
    body: CreateTaskDto;
    path?: never;
    query?: never;
    url: '/tasks';
};

export type TasksControllerCreateResponses = {
    default: TaskEntity;
};

export type TasksControllerCreateResponse = TasksControllerCreateResponses[keyof TasksControllerCreateResponses];

export type TasksControllerRemoveData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/tasks/{id}';
};

export type TasksControllerRemoveResponses = {
    200: unknown;
};

export type TasksControllerFindOneData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/tasks/{id}';
};

export type TasksControllerFindOneResponses = {
    default: TaskEntity;
};

export type TasksControllerFindOneResponse = TasksControllerFindOneResponses[keyof TasksControllerFindOneResponses];

export type TasksControllerUpdateData = {
    body: UpdateTaskDto;
    path: {
        id: string;
    };
    query?: never;
    url: '/tasks/{id}';
};

export type TasksControllerUpdateResponses = {
    default: TaskEntity;
};

export type TasksControllerUpdateResponse = TasksControllerUpdateResponses[keyof TasksControllerUpdateResponses];

export type TasksControllerGetActiveTasksData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/tasks/active/tasks';
};

export type TasksControllerGetActiveTasksResponses = {
    default: Array<TaskEntity>;
};

export type TasksControllerGetActiveTasksResponse = TasksControllerGetActiveTasksResponses[keyof TasksControllerGetActiveTasksResponses];

export type TaskSetControllerFindAllData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/sets';
};

export type TaskSetControllerFindAllResponses = {
    default: Array<TaskSetEntity>;
};

export type TaskSetControllerFindAllResponse = TaskSetControllerFindAllResponses[keyof TaskSetControllerFindAllResponses];

export type TaskSetControllerCreateData = {
    body: CreateTaskSetDto;
    path?: never;
    query?: never;
    url: '/sets';
};

export type TaskSetControllerCreateResponses = {
    default: TaskSetEntity;
};

export type TaskSetControllerCreateResponse = TaskSetControllerCreateResponses[keyof TaskSetControllerCreateResponses];

export type TaskSetControllerRemoveData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/sets/{id}';
};

export type TaskSetControllerRemoveResponses = {
    200: unknown;
};

export type TaskSetControllerFindOneData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/sets/{id}';
};

export type TaskSetControllerFindOneResponses = {
    default: TaskSetEntity;
};

export type TaskSetControllerFindOneResponse = TaskSetControllerFindOneResponses[keyof TaskSetControllerFindOneResponses];

export type TaskSetControllerUpdateData = {
    body: UpdateTaskSetDto;
    path: {
        id: string;
    };
    query?: never;
    url: '/sets/{id}';
};

export type TaskSetControllerUpdateResponses = {
    default: TaskSetEntity;
};

export type TaskSetControllerUpdateResponse = TaskSetControllerUpdateResponses[keyof TaskSetControllerUpdateResponses];

export type TaskSetControllerSetActiveData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/sets/active/{id}';
};

export type TaskSetControllerSetActiveResponses = {
    default: TaskSetEntity;
};

export type TaskSetControllerSetActiveResponse = TaskSetControllerSetActiveResponses[keyof TaskSetControllerSetActiveResponses];

export type TaskCompletionsControllerRemoveData = {
    body?: never;
    path?: never;
    query: {
        /**
         * The task of the completion
         */
        taskId: string;
        /**
         * The user the completion is assocaited with
         */
        userId: string;
    };
    url: '/taskCompletions';
};

export type TaskCompletionsControllerRemoveResponses = {
    200: unknown;
};

export type TaskCompletionsControllerFindAllData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/taskCompletions';
};

export type TaskCompletionsControllerFindAllResponses = {
    default: Array<TaskCompletionEntity>;
};

export type TaskCompletionsControllerFindAllResponse = TaskCompletionsControllerFindAllResponses[keyof TaskCompletionsControllerFindAllResponses];

export type TaskCompletionsControllerUpdateData = {
    body: UpdateTaskCompletionDto;
    path?: never;
    query: {
        /**
         * The task of the completion
         */
        taskId: string;
        /**
         * The user the completion is assocaited with
         */
        userId: string;
    };
    url: '/taskCompletions';
};

export type TaskCompletionsControllerUpdateResponses = {
    default: TaskCompletionEntity;
};

export type TaskCompletionsControllerUpdateResponse = TaskCompletionsControllerUpdateResponses[keyof TaskCompletionsControllerUpdateResponses];

export type TaskCompletionsControllerCreateData = {
    body: CreateTaskCompletionDto;
    path?: never;
    query?: never;
    url: '/taskCompletions';
};

export type TaskCompletionsControllerCreateResponses = {
    default: TaskCompletionEntity;
};

export type TaskCompletionsControllerCreateResponse = TaskCompletionsControllerCreateResponses[keyof TaskCompletionsControllerCreateResponses];

export type TaskCompletionsControllerFindOneData = {
    body?: never;
    path?: never;
    query: {
        /**
         * The task of the completion
         */
        taskId: string;
        /**
         * The user the completion is assocaited with
         */
        userId: string;
    };
    url: '/taskCompletions/id';
};

export type TaskCompletionsControllerFindOneResponses = {
    default: TaskCompletionEntity;
};

export type TaskCompletionsControllerFindOneResponse = TaskCompletionsControllerFindOneResponses[keyof TaskCompletionsControllerFindOneResponses];

export type TaskCompletionsControllerFindOrCreateByUserTaskData = {
    body?: never;
    path?: never;
    query: {
        /**
         * The user to search by
         */
        user: string;
        /**
         * The task to search by
         */
        task: string;
    };
    url: '/taskCompletions/by-user/query';
};

export type TaskCompletionsControllerFindOrCreateByUserTaskResponses = {
    default: TaskCompletionEntity;
};

export type TaskCompletionsControllerFindOrCreateByUserTaskResponse = TaskCompletionsControllerFindOrCreateByUserTaskResponses[keyof TaskCompletionsControllerFindOrCreateByUserTaskResponses];

export type TaskCompletionsControllerFindOrCreateByTaskData = {
    body?: never;
    path?: never;
    query: {
        /**
         * The task to search by
         */
        task: string;
    };
    url: '/taskCompletions/by-user/header';
};

export type TaskCompletionsControllerFindOrCreateByTaskResponses = {
    default: TaskCompletionEntity;
};

export type TaskCompletionsControllerFindOrCreateByTaskResponse = TaskCompletionsControllerFindOrCreateByTaskResponses[keyof TaskCompletionsControllerFindOrCreateByTaskResponses];

export type TaskCompletionsControllerGetNextIncompleteData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/taskCompletions/next-incomplete';
};

export type TaskCompletionsControllerGetNextIncompleteResponses = {
    default: TaskCompletionEntity;
};

export type TaskCompletionsControllerGetNextIncompleteResponse = TaskCompletionsControllerGetNextIncompleteResponses[keyof TaskCompletionsControllerGetNextIncompleteResponses];

export type TaskCompletionsControllerGetVideoUploadUrlData = {
    body?: never;
    path?: never;
    query: {
        taskId: string;
    };
    url: '/taskCompletions/upload-url';
};

export type TaskCompletionsControllerGetVideoUploadUrlResponses = {
    default: string;
};

export type TaskCompletionsControllerGetVideoUploadUrlResponse = TaskCompletionsControllerGetVideoUploadUrlResponses[keyof TaskCompletionsControllerGetVideoUploadUrlResponses];

export type TaskCompletionsControllerGetVideoDownloadUrlData = {
    body?: never;
    path?: never;
    query: {
        video: string;
    };
    url: '/taskCompletions/view-url';
};

export type TaskCompletionsControllerGetVideoDownloadUrlResponses = {
    default: string;
};

export type TaskCompletionsControllerGetVideoDownloadUrlResponse = TaskCompletionsControllerGetVideoDownloadUrlResponses[keyof TaskCompletionsControllerGetVideoDownloadUrlResponses];

export type TaskCompletionsControllerDeleteVideoData = {
    body?: never;
    path?: never;
    query: {
        video: string;
    };
    url: '/taskCompletions/video';
};

export type TaskCompletionsControllerDeleteVideoResponses = {
    200: unknown;
};

export type UsersControllerFindAllData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users';
};

export type UsersControllerFindAllResponses = {
    200: unknown;
};

export type UsersControllerFindOneData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/users/{id}';
};

export type UsersControllerFindOneResponses = {
    200: unknown;
};

export type UsersControllerIsTrainingCompleteData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/users/training-complete/{id}';
};

export type UsersControllerIsTrainingCompleteResponses = {
    default: HasComplete;
};

export type UsersControllerIsTrainingCompleteResponse = UsersControllerIsTrainingCompleteResponses[keyof UsersControllerIsTrainingCompleteResponses];

export type UsersControllerMarkTrainingCompleteData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/users/training-complete/{id}';
};

export type UsersControllerMarkTrainingCompleteResponses = {
    200: unknown;
};

export type StudymappingControllerFindAllData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/studymapping';
};

export type StudymappingControllerFindAllResponses = {
    default: StudyMappingEntity;
};

export type StudymappingControllerFindAllResponse = StudymappingControllerFindAllResponses[keyof StudymappingControllerFindAllResponses];

export type StudymappingControllerWebhookData = {
    body: WebhookPayload;
    path?: never;
    query?: never;
    url: '/studymapping';
};

export type StudymappingControllerWebhookResponses = {
    201: unknown;
};

export type StudymappingControllerUploadCsvData = {
    body: {
        file?: Blob | File;
    };
    path?: never;
    query?: never;
    url: '/studymapping/upload';
};

export type StudymappingControllerUploadCsvResponses = {
    201: unknown;
};

export type DownloadsControllerFindAllData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/downloads';
};

export type DownloadsControllerFindAllResponses = {
    default: Array<DownloadEntity>;
};

export type DownloadsControllerFindAllResponse = DownloadsControllerFindAllResponses[keyof DownloadsControllerFindAllResponses];

export type DownloadsControllerCreateData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/downloads';
};

export type DownloadsControllerCreateResponses = {
    default: DownloadEntity;
};

export type DownloadsControllerCreateResponse = DownloadsControllerCreateResponses[keyof DownloadsControllerCreateResponses];

export type DownloadsControllerRemoveData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/downloads/{id}';
};

export type DownloadsControllerRemoveResponses = {
    200: unknown;
};

export type DownloadsControllerFindOneData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/downloads/{id}';
};

export type DownloadsControllerFindOneResponses = {
    default: DownloadEntity;
};

export type DownloadsControllerFindOneResponse = DownloadsControllerFindOneResponses[keyof DownloadsControllerFindOneResponses];

export type DownloadsControllerGetDownloadUrlData = {
    body?: never;
    path?: never;
    query: {
        downloadLocation: string;
    };
    url: '/downloads/download/url';
};

export type DownloadsControllerGetDownloadUrlResponses = {
    default: string;
};

export type DownloadsControllerGetDownloadUrlResponse = DownloadsControllerGetDownloadUrlResponses[keyof DownloadsControllerGetDownloadUrlResponses];

export type ClientOptions = {
    baseUrl: string;
};