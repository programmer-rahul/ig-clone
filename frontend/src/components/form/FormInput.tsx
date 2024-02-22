type FormInputProps = {
  type?: "text" | "password" | "number";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  loading = false,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={loading ? true : false}
      className="w-full bg-zinc-100 p-2 lg:px-3 lg:text-base lg:rounded-md outline-none rounded-sm text-black border border-zinc-300 text-xs"
      placeholder={placeholder}
    />
  );
};
export default FormInput;
