import { IComment } from "@/models/i-comment";
import { IPrompt } from "@/models/i-prompt";
import { IUser } from "@/models/i-user";
import { faker } from '@faker-js/faker';

const generateMockUser = (): IUser => ({
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  email: faker.internet.email(),
  bio: faker.lorem.sentence(),
  profilePicUrl: faker.image.avatar(),
});

const generateMockComment = (): IComment => ({
  id: faker.string.uuid(),
  user: generateMockUser(),
  commentText: faker.lorem.paragraph(),
});

const generateMockPrompt = (): IPrompt => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(),
  description: faker.lorem.paragraph(),
  promptText: faker.lorem.paragraph(),
  inputs: Array.from({ length: 3 }, () => faker.lorem.word()),
  sampleOutput: faker.lorem.paragraph(),
  author: generateMockUser(),
  starUsers: Array.from({ length: 5 }, () => generateMockUser()),
  comments: Array.from({ length: 5 }, () => generateMockComment()),
});

export const mockUsers: IUser[] = Array.from({ length: 5 }, generateMockUser);
export const mockComments: IComment[] = Array.from({ length: 5 }, generateMockComment);
export const mockPrompts: IPrompt[] = Array.from({ length: 5 }, generateMockPrompt)