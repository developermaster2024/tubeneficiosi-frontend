import MyAccountConversationsTable from '../../components/MyAccountCorvesationsTable';
import { conversations } from '../../util/conversations';
import { IoChatboxEllipsesOutline } from "react-icons/io5";


const MyAccountConversations = () => {
  return (
    <div className="px-8">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoChatboxEllipsesOutline className="text-4xl"></IoChatboxEllipsesOutline>
        <span className="ml-4">Mis Conversaciones</span>
      </h1>

      <MyAccountConversationsTable conversations={conversations} className="w-full my-12 text-gray-500 text-center" />

    </div>
  )
}

export default MyAccountConversations;