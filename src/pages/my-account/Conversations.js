import MyAccountConversationsTable from '../../components/MyAccountCorvesationsTable';
import { conversations } from '../../util/conversations';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import Pagination from '../../components/Pagination';
import { useEffect, useState } from 'react';
import useQuestions from '../../hooks/useQuestions';


const MyAccountConversations = () => {

  const [filters, setFilters] = useState({ storeName: "", productName: "", question: "", page: 1 });

  const [{ questions, error: questionsError, loading: questionsLoading, total, numberOfPages }] = useQuestions({ axiosConfig: { params: { ...filters } } });

  useEffect(() => {
    console.log(questions);
  }, [questions])

  const handleChange = (e) => {
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <div className="px-8">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoChatboxEllipsesOutline className="text-4xl"></IoChatboxEllipsesOutline>
        <span className="ml-4">Preguntas</span>
      </h1>

      <MyAccountConversationsTable conversations={conversations} className="w-full my-12 text-gray-500 text-center" />

      {
        numberOfPages > 0 &&
        <Pagination
          pages={numberOfPages}
          activePage={filters.page}
          onChange={e => { handleChange({ target: { name: "page", value: e } }) }}
        />
      }
    </div>
  )
}

export default MyAccountConversations;