import React, {FunctionComponent, useEffect, useState} from 'react';

// components
import {Spinner} from '../components';

import {Channel as ChannelType, StreamChat} from 'stream-chat';
import {
  Channel,
  Chat,
  MessageList,
  MessageInput,
  MessageType,
  Thread,
} from 'stream-chat-react-native';

// api
import {AppState} from '../models';
import {useTypedSelector} from '../hooks/useTypeSelector';
import {clientIdForChat} from '../services';

interface Props {
  route?: any;
  navigation?: any;
}

export const StreamChatScreen: FunctionComponent<Props> = props => {
  const {currentAccount, userData} = useTypedSelector(
    (state: AppState) => state.user,
  );
  const [channel, setChannel] = useState<ChannelType>();
  const [thread, setThread] = useState<MessageType | null>();

  const client = StreamChat.getInstance(clientIdForChat);

  const initChat = async (order: any) => {
    const chat_user_id = userData.chat_user_id;
    const user_name = order.user.name;
    const chat_token = userData.chat_token;

    await client.connectUser(
      {
        id: chat_user_id,
        name: user_name,
        image: `https://getstream.io/random_png/?id=${chat_user_id}&name=${user_name}`,
      },
      chat_token,
    );

    const channelId = client.channel('messaging', order.chat);
    await channelId.watch();
    setChannel(channelId);
  };

  useEffect(() => {
    initChat(props.route.params.order);
  }, []);

  useEffect(() => {
    let title =
      currentAccount.role === 'user'
        ? props.route.params.order.provider.name
        : userData.name;

    props.navigation.setOptions({title: title});
  }, [props.navigation]);

  if (!channel && currentAccount) {
    return <Spinner />;
  }

  return (
    <Chat client={client}>
      <Channel channel={channel} keyboardVerticalOffset={0}>
        {thread ? (
          <Thread />
        ) : (
          <>
            <MessageList onThreadSelect={setThread} />
            <MessageInput />
          </>
        )}
      </Channel>
    </Chat>
  );
};
