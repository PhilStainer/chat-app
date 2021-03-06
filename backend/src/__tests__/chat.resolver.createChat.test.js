import { Chat } from '#graphql/chat/chat.model';
import { createChat } from '#graphql/chat/resolvers/createChat';
import { pubsub } from '#graphql/pubsub';
import { FakeChat, FakeObjectId } from '#utils/fixtures';
import { INVALID_PARTICIPANTS_ERROR, CHAT, MUTATION } from '#config/constants';

jest.mock('#utils/selectedFields.js');
jest.mock('#graphql/chat/chat.model.js');
jest.mock('#graphql/pubsub.js');

test('should filter out logged in userId', async () => {
  const createMock = jest.fn();
  Chat.create.mockImplementationOnce(createMock);

  const ctx = { userId: FakeObjectId() };
  const args = {
    input: { participants: [ctx.userId, FakeObjectId()] },
  };

  await createChat(null, args, ctx, null);

  expect(createMock).toHaveBeenCalledWith({
    participants: args.input.participants,
  });
});

test('should throw error when empty participants', async () => {
  const args = { input: { participants: [] } };
  const ctx = { userId: FakeObjectId() };

  await expect(() => createChat(null, args, ctx, null)).rejects.toThrow(
    INVALID_PARTICIPANTS_ERROR
  );
});

test('should create chat with participants and current user', async () => {
  const createMock = jest.fn();
  Chat.create.mockImplementationOnce(createMock);

  const args = { input: { participants: [FakeObjectId()] } };
  const ctx = { userId: FakeObjectId() };
  await createChat(null, args, ctx, null);

  expect(createMock).toHaveBeenCalled();
});

test('should publish created chat', async () => {
  const fakeChat = FakeChat();
  const createMock = jest.fn(() => fakeChat);
  Chat.create.mockImplementationOnce(createMock);

  const publishMock = jest.fn();
  pubsub.publish.mockImplementationOnce(publishMock);

  const args = { input: { participants: [FakeObjectId()] } };
  const ctx = { userId: FakeObjectId() };
  await createChat(null, args, ctx, null);

  expect(publishMock).toHaveBeenCalledWith(CHAT, {
    chat: {
      mutation: MUTATION.CREATE,
      data: fakeChat,
    },
  });
});

test('should return chat', async () => {
  const fakeChat = FakeChat();

  const createMock = () => fakeChat;
  Chat.create.mockImplementationOnce(createMock);

  const args = { input: { participants: [FakeObjectId()] } };
  const ctx = { userId: FakeObjectId() };
  const result = await createChat(null, args, ctx, null);

  expect(result).toBe(fakeChat);
});
