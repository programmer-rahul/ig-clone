type FormInputProps = {
  type?: "text" | "password";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput: React.FC<FormInputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full bg-zinc-100 p-2 lg:px-3 lg:text-base lg:rounded-md outline-none rounded-sm text-black border border-zinc-300 text-xs"
      placeholder={placeholder}
    />
  );
};
export default FormInput;
