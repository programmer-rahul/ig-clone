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
      className={`home-icon flex cursor-pointer items-center gap-4 font-semibold transition-all hover:bg-stone-700 md:rounded-md md:p-1 xl:w-full  ${css}`}
      onClick={clickHandler}
    >
      <Icon icon={icon} />
      <p className="hidden capitalize xl:block">{text}</p>
    </div>
  );
};

export default IconLink;
