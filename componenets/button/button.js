import { useState } from "react";

function Button({ text }) {
  const [disabled, setDisabled] = useState(true)

  return (
    <button className="button" type="submit">
      {text}
    </button>
  )
}

export default Button;