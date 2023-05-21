import Navigation from "@/components/UI/Navigation";
import { Outlet } from "react-router-dom";
import "@/scss/main.scss";

export default function Layout() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="text-center py-4 bg-black text-white">
        &copy; Jørn Lemika
      </footer>
    </>
  );
}
