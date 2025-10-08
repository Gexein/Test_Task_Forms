import { useState } from "react"
import { CodeInForm, SignInForm } from "./components"
import Title from "antd/es/typography/Title"


function App() {
  const [isSigned, setIsSigned] = useState(false)
  const [validated, setIsValidated] = useState(false)

  const sign = () => {
    setIsSigned(true)
  }

  const pass = () => {
    setIsValidated(true)
  }

  const getBack = () => {
    setIsSigned(false)
  }

  return (
      <div className="min-h-screen flex items-center justify-center p-[10px]">
        {validated
          ? <Title>Success!</Title>
          : isSigned
            ? <CodeInForm pass={pass} className="showForm" getBack={getBack} />
            : <SignInForm sign={sign} className="showForm" />}
      </div>
  )
}

export default App
