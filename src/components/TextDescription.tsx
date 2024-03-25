function TextDescription({ className = "", title, defaultValue = "", onChange, readOnly, placeholder = "" }) {
  return (
    <div className={`py-2 px-6 border rounded-md min-h-[150px] border-input ${className}`}>
      {title && <p className=" mb-1 text-sm text-title font-medium">{title}</p>}
      <textarea
        className={`text-base font-semibold text-black min-h-[100px] dark:bg-bgDark dark:text-textDark w-full focus:outline-none`}
        onChange={onChange}
        defaultValue={defaultValue}
        readOnly={readOnly}
        placeholder={placeholder}
        style={{ resize: "none" }}
      />
    </div>
  );
}

export default TextDescription;
