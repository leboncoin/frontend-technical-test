const ActionButton = ({ className = '', htmlFor = '' }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className={`btn btn-primary drawer-button  btn-circle btn-lg ${className}`}
      >
        <svg
          className="h-7 w-7 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </label>
    </>
  )
}
export default ActionButton
