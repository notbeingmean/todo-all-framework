import Todos from "@/components/todo";

export default function Home() {
  return (
    <div className={` flex h-screen items-center justify-center bg-white`}>
      <Todos />
    </div>
  );
}
