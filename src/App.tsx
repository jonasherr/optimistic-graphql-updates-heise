import { useState } from "react";
import Mutation from "./pages/Mutation";
import OptimisticMutation from "./pages/OptimisticMutation";

const pages = [
  {
    name: "Mutation",
    page: <Mutation />
  },
  {
    name: "Optimistic Mutation",
    page: <OptimisticMutation />
  }
] as const

export default function App() {
  const [currentPage, setCurrentPage] = useState<{ name: string, page: JSX.Element }>(pages[0])

  return (
    <>
      <nav>
        {pages.map((page, index) => (
          <button key={page.name} onClick={() => setCurrentPage(pages[index])} >{page.name}</button>
        ))}
      </nav>

      {currentPage.page}
    </>
  )
}
