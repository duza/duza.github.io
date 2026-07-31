import "./App.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import WebGLBackground from "./components/WebGLBackground";

function App() {
  return (
    <div class="min-h-screen text-slate-100">
      <WebGLBackground />
      <div class="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-4 lg:flex-row lg:items-start lg:gap-24 lg:py-16">
        <Header />

        <MainContent />
      </div>
    </div>
  );
}

export default App;
