import { IoSendSharp } from "react-icons/io5";
import { generateImageUrl } from "../helpers/url";

const QuestionsAnswer = (props) => {
  const { questions, className, ownerImage, ownerName } = props;

  return (
    <div className={className}>
      <h1 className="text-2xl text-gray-800 mb-4">Preguntale a: </h1>
      <div className="text-2xl text-gray-500 flex items-center mb-4">
        <img className="h-20 w-20 mr-2 rounded-xl" src={ownerImage} alt={ownerName} />
        {ownerName}
      </div>

      <div className="flex items-center">
        <input className="p-2 bg-gray-200 w-11/12 rounded-xl border-none focus:shadow-xl focus:ring-white focus:bg-white transition duration-500 transform" placeholder=" Escribe tu pregunta..." type="text" />
        <button className="ml-4 flex items-center font-bold bg-main px-8 py-2.5 text-white rounded-xl transition transform duration-500 hover:bg-gray-100 hover:text-main hover:scale-110 hover:shadow-xl">
          Enviar
          <IoSendSharp className="ml-2" />
        </button>
      </div>

      {questions.map(({id, answeredBy, question, createdAt, answer, answeredAt}) => <div key={id} className="my-8">
        <div className="flex items-center">
          <img className="h-[50px] w-[50px] rounded-full" src={generateImageUrl(answeredBy.imgPath)} alt={answeredBy.name} />
          <p className="ml-4 font-bold">{answeredBy.name}</p>
        </div>

        <p className="mt-2">{question} - <span className="font-bold">{createdAt}</span></p>

        {answer && <div className="text-gray-500 mt-2 ml-4">
          - {answer} <span className="font-bold">- {answeredAt}</span>
        </div>}
      </div>)}

      <button className="text-main mt-2">
        Ver mas preguntas
      </button>
    </div>
  )
}


export default QuestionsAnswer;