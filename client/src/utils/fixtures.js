import faker from 'faker';

export const FakeToken = () => faker.random.uuid();

export const FakeUser = extra => ({
  _id: faker.random.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  image: faker.image.image(),
  contacts: [],
  logs: {},
  state: {},
  verified: faker.random.boolean(),
  blocked: faker.random.boolean(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  ...extra,
});

export const FakeMessage = extra => ({
  _id: faker.random.uuid(),
  chatId: faker.random.uuid(),
  text: faker.lorem.sentence(5),
  sender: FakeUser(),
  deliveredTo: [],
  seenBy: [],
  active: faker.random.boolean(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  ...extra,
});

export const FakeChat = extra => ({
  _id: faker.random.uuid(),
  participants: [FakeUser(), FakeUser()],
  lastMessage: FakeMessage(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  ...extra,
});
