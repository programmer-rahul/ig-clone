import useHome from "../../hooks/useHome";

const ClosePopupIcon = () => {
  const { setIsPopup } = useHome();

  return (
    <div
      className="cross-icon absolute right-5 top-5 grid h-8 w-8 place-content-center bg-orange-600"
      onClick={() => {
        setIsPopup(false);
      }}
    ></div>
  );
};
export default ClosePopupIcon;
