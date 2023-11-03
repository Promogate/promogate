import { AiFillQuestionCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

export function Hero() {
  return (
    <section className="max-w-screen-xl mx-auto grid grid-cols-2 h-[calc(100vh-120px)] items-center">
      <div className="flex flex-col w-full h-full gap-6 justify-center">
        <h1 className="text-6xl font-semibold">
          Compartilhe seus produtos com o mundo!
        </h1>
        <p className="font-thin">
          Você é Youtuber, Blogueiro, Instagrammer, Streamer da Twitch ou tem uma audiência? Quer monetizar ainda mais? Então a Promogate é para você!
        </p>
        <div className="flex gap-4 w-full">
          <form className="flex-1 flex gap-2 w-full border border-gray-600 rounded-lg rounded-tl-none overflow-hidden">
            <fieldset className="flex-1">
              <input type="text" placeholder="Encontra um produto ou influencer..." className="w-full py-3 px-4 focus:outline-none" />
            </fieldset>
            <button className="bg-purple-800 text-white p-4">
              <FiSearch />
            </button>
          </form>
          <button className="flex gap-2 items-center border border-purple-800 rounded-lg rounded-tl-none py-3 px-4 text-purple-800 text-xs">
            <AiFillQuestionCircle size={21} className="text-purple-800" />
            Como functiona?
          </button>
        </div>
      </div>
      <div>
      </div>
    </section>
  );
}