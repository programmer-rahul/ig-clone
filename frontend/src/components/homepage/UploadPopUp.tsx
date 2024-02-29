import { useEffect, useRef, useState } from "react";
import useAxios from "../../hooks/useAxios";

const UploadPopUp = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { callApi, response, apiProgress, cancelApi } = useAxios();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    if (isUploading && selectedFile) {
      const formData = new FormData();
      formData.append("post", selectedFile);
      formData.append("description", "This is description :)");

      callApi({
        url: "/post/new-post",
        method: "post",
        cred: true,
        data: formData,
      });
    }
  }, [isUploading]);

  return (
    <div className="upload-popup absolute left-1/2 top-1/2 h-[30rem] w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-lg text-white opacity-100 md:h-[600px] md:w-[600px] lg:h-[700px] lg:w-[800px] 2xl:h-[800px] 2xl:w-[1000px]">
      <div className="grid place-content-center border-b border-stone-400 bg-[#262626] py-2 text-center font-semibold md:text-xl">
        Create new post
      </div>
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
          console.log("drop");
          console.log(e.dataTransfer.files[0]);
          setSelectedFile(e.dataTransfer.files[0]);
        }}
        className={`flex h-[90%] flex-col items-center justify-center gap-4 text-xl font-semibold ${dragging ? "bg-[#211f1f]" : "bg-[#262626]"}`}
      >
        <svg height="77" viewBox="0 0 97.6 77.3" width="96">
          <path
            fill="#fff"
            d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
          ></path>
          <path
            fill="#fff"
            d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
          ></path>
          <path
            fill="#fff"
            d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
          ></path>
        </svg>
        {!selectedFile && (
          <>
            <p>Drag photos and videos here</p>

            <button
              className="rounded-lg bg-blue-600 px-4 py-1 text-base"
              onClick={() => {
                !selectedFile && inputRef.current?.click();
              }}
            >
              Select From Computer
            </button>
          </>
        )}

        {selectedFile && !isUploading && (
          <>
            <p className="text-center">{selectedFile?.name}</p>
            <button
              className="rounded-lg bg-blue-600 px-4 py-1 text-base"
              onClick={() => {
                setIsUploading(true);
              }}
            >
              Upload
            </button>
          </>
        )}

        {isUploading && (
          <>
            <p>
              {!response
                ? "Uploading..."
                : response.status
                  ? "Uploaded Successfully"
                  : "Uplaod Failed"}
            </p>
            <div className="flex h-20 w-full items-center justify-around px-5">
              <div className="h-4 w-[70%] rounded-full border">
                <p
                  className={`h-full rounded-full ${apiProgress === 100 ? "bg-green-500" : "bg-red-500"} transition-all`}
                  style={{
                    width: `${apiProgress}%`,
                  }}
                ></p>
              </div>
              {!response && (
                <button
                  className="rounded-md bg-sky-600 px-2 py-1 text-base"
                  onClick={() => {
                    cancelApi.cancel("Request Canceled");
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </>
        )}

        <input
          type="file"
          name=""
          id=""
          className="hidden"
          accept="video/*"
          ref={inputRef}
          onChange={inputChangeHandler}
        />
      </div>
    </div>
  );
};
export default UploadPopUp;
