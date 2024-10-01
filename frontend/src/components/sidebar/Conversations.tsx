import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation.ts";
import { getRandomEmoji } from "../../utils/emojis.ts";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} emoji={getRandomEmoji()} />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};
export default Conversations;
