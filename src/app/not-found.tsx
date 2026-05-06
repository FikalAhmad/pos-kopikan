import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, MoveLeft } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center justify-center min-h-[calc(100vh-4rem)] px-6 text-center animate-in fade-in duration-700 overflow-y-auto">
      <div className="relative w-full max-w-md aspect-square mb-8 rounded-2xl overflow-hidden shadow-2xl border border-border/50 group bg-muted">
        <Image
          src="/images/404.png"
          alt="404 - Coffee Spilled"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105 absolute"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70" />
        <div className="absolute bottom-8 left-8 right-8 text-white text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hijau mb-2 drop-shadow-md">
            Error Code 404
          </p>
          <h2 className="text-3xl font-bold leading-tight drop-shadow-lg">
            Oops! <br />
            Kopinya tumpah.
          </h2>
        </div>
      </div>

      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-hijaugelap sm:text-5xl">
            Halaman Hilang
          </h1>
          <div className="h-1 w-20 bg-hijau mx-auto rounded-full" />
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          Maaf, halaman yang Anda cari mungkin telah dipindahkan atau sudah
          tidak ada lagi. Mari kita kembali ke bar untuk memesan kopi baru!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            asChild
            variant="outline"
            className="h-12 px-8 rounded-xl border-2 hover:bg-muted transition-all"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <MoveLeft className="w-4 h-4" />
              <span>Kembali</span>
            </Link>
          </Button>
          <Button
            asChild
            className="h-12 px-8 rounded-xl bg-hijaugelap hover:bg-[#206400] transition-all shadow-xl shadow-hijaugelap/20 active:scale-95"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
