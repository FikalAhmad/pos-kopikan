import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center justify-center min-h-[calc(100vh-4rem)] px-6 text-center animate-in fade-in duration-700 overflow-y-auto">
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
