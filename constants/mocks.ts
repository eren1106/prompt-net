import { IDropdownItem } from "@/models/dropdown-item.model";
import { faker } from '@faker-js/faker';
import { Comment, Prompt, User } from "@prisma/client";

const generateMockUser = (): User => ({
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  email: faker.internet.email(),
  bio: faker.lorem.sentence(),
  profilePicUrl: faker.image.avatar(),
});

const generateMockComment = (): Comment => ({
  id: faker.string.uuid(),
  user: generateMockUser(),
  commentText: faker.lorem.paragraph(),
});

const generateMockPrompt = (): Prompt => ({
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

export const mockUsers: User[] = Array.from({ length: 10 }, generateMockUser);
export const mockComments: Comment[] = Array.from({ length: 10 }, generateMockComment);
export const mockPrompts: Prompt[] = Array.from({ length: 10 }, generateMockPrompt);

export const mockDropdownItems: IDropdownItem[] = [
  {
    label: "Software Engineer",
    key: "software-engineer"
  },
  {
    label: "Cyber Security",
    key: "cyber-security"
  },
  {
    label: "AI",
    key: "ai"
  }
] 