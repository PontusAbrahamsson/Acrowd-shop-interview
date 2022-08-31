

function Button({ text, disabled }) {

  return (
    <button className={disabled === false ? 'button' : 'disabledButton'} type="submit" disabled={disabled}>
      {disabled === false ? text : 'Adding to cart...'}
    </button>
  )
}

export default Button;