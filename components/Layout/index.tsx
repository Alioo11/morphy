import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-[100vh]">
      <nav className={`p-4 border-b border-gray-600 fixed top-0 w-full bg-black z-30`}>
        <div className="text-xl font-semibold">Morphy</div>
      </nav>

      <div className="w-full flex justify-center">
        <main className="pt-[60px] max-w-[700px]">{children}</main>
      </div>

      <footer className="fixed w-full bottom-0 text-sm text-gray-500 h-[20px] flex justify-center">
        © {new Date().getFullYear()} Morphy. All rights reserved.
      </footer>
    </div>
  );
}
