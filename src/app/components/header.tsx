import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="xl:h-20">
    <nav className="max-w-screen-xl mx-auto flex gap-12 w-full h-full items-center">
      <div className="relative w-[120px] h-[32px]">
        <Image
          src="promogate.svg"
          alt="Logo Promogate"
          fill
        />
      </div>
      <div className="flex-1 flex gap-6">
        <Link href={"#"}>
          Para criadores
        </Link>
        <Link href={"#"}>
          Categorias
        </Link>
      </div>
      <div className="flex gap-4">
        <button className="border border-purple-800 rounded-lg rounded-tl-none py-3 px-4 text-purple-800">
          Login
        </button>
        <button className="border border-purple-800 rounded-lg rounded-tl-none py-3 px-4 bg-purple-800 text-white font-semibold">
          Criar conta
        </button>
      </div>
    </nav>
  </header>
  )
}