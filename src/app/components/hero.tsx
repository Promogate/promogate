import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="max-w-screen-xl mx-auto grid grid-cols-1 h-screen place-items-center">
      <div className="text-center flex flex-col align-middle gap-6">
        <div className="relative w-[150px] h-[50px] mx-auto">
          <Image src={"/promogate.svg"} alt="Logo Promogate" fill />
        </div>
        <h1 className="text-2xl font-bold">
          A Promogate está mudando.
        </h1>
        <p>
          Estamos criando um ambiente ainda melhor para nossos usuários. Se você já possui uma conta conosco pode entrar normalmente com o seu <Link className="text-purple-600 font-semibold" href="/login">login</Link>.
        </p>
      </div>
    </section>
  );
}