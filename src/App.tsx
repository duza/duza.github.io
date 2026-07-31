import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

function App() {
  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div class="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-start lg:gap-24">
        <Header />

        <MainContent />
      </div>
    </div>
  );
}

export default App;
