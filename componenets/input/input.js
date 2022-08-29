

function Input({ type, id, inputTitle, placeHolder, useState, value, errMsg, name }) {

  return (
    <div className="inputComponent">
      <label htmlFor={id} className="inputTitle">
        {inputTitle}
      </label>
      <div className="inputBorder">
        <input
          className="input"
          id={id}
          type={type}
          placeholder={placeHolder}
          onChange={(e) => useState(e.target.value)}
          value={value}
          name={name}
        />
      </div>
      <p className="errorMsg">{errMsg}</p>
    </div>
  )
}

export default Input;