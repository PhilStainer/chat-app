import { gql, useQuery } from '@apollo/client';

export const CHATS = gql`
  query chats {
    chats {
      _id
      participants {
        _id
        username
        image
      }
      lastMessage {
        _id
        text
      }
    }
  }
`;

export const useChats = () => {
  const query = useQuery(CHATS);

  return query;
};
