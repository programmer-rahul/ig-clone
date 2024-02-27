import { IconNames } from "../../utils/types";
import Icon from "./Icon";

type LinkProps = {
  icon: IconNames;
  text: string;
  css?: string;
  clickHandler?: () => void;
};

const IconLink = ({ icon, text, css, clickHandler }: LinkProps) => {
  return (
    <div
      className={`home-icon flex items-center gap-4 font-semibold transition-all hover:bg-stone-700 cursor-pointer md:p-1 md:rounded-md xl:w-full  ${css}`}
      onClick={clickHandler}
    >
      <Icon icon={icon} />
      <p className="hidden xl:block capitalize">{text}</p>
    </div>
  );
};

export default IconLink;
