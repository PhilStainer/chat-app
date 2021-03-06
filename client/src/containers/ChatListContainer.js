import { useEffect } from 'react';

import { activeChat } from '../cache';
import { ChatList } from '../components/ChatList';

import { useChats } from '../operations/queries/chats';
import {
  CHAT_CREATED,
  chatUpdateQuery,
} from '../operations/subscriptions/chatCreated';

const setActiveChat = chat => activeChat(chat);

export const ChatListContainer = () => {
  const { data, error, loading, subscribeToMore } = useChats();

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: CHAT_CREATED,
      updateQuery: chatUpdateQuery,
    });

    return () => unsubscribe();
  }, [data, subscribeToMore]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred {JSON.stringify(error)}</div>;

  return <ChatList chats={data.chats} setActiveChat={setActiveChat} />;
};
