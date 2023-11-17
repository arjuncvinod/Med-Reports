import React,{useState} from "react";
// import AudioTimer from "./AudioTimer";
import { ReactMic } from "react-mic";

const ReactRecorder = () => {
  // const [isRunning, setIsRunning] = React.useState(false);
  // const [elapsedTime, setElapsedTime] = React.useState(0);
  const [img, setImg]=useState("off.gif")
  const [voice, setVoice] = React.useState(false);
  const [recordBlobLink, setRecordBlobLink] = React.useState(null);


  const onStop = async (recordedBlob) => {
    setRecordBlobLink(recordedBlob.blobURL);
    // setIsRunning(false);
    const mediaBlob = await fetch(recordBlobLink)
    .then(response => response.blob());

const myFile = new File(
    [mediaBlob],
    "demo.mp4",
    { type: 'video/mp4' }
);

  const startHandle = () => {
    // setElapsedTime(0);
    // setIsRunning(true);
    setVoice(true);
    setImg("loading.png")
  };
  const stopHandle = () => {
    // setIsRunning(false);
    setVoice(false);
    setImg("off.gif")

  };

  const clearHandle = () => {
    // setIsRunning(false);
    setVoice(false);
    setRecordBlobLink(false);
    // setElapsedTime(0);
  };

  return (
    <div className="micwave">
      {/* <div className="micwave"> */}
        {/* <h2>Audio Recorder</h2> */}
        {/* <AudioTimer
          isRunning={isRunning}
          elapsedTime={elapsedTime}
          setElapsedTime={setElapsedTime}
        /> */}
        <img src={`./images/${img}`} alt="" />

        <ReactMic
          record={voice}
          className="wave"
          onStop={onStop}
          // strokeColor="#000000"
          // backgroundColor="#FF4081"
        />
        <div className="btn-container">
          {recordBlobLink ? (
            <button 
              onClick={clearHandle}
              className="micbtn"
            >
              {" "}
              Clear{" "}
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="btn-container">
          {!voice ? (
            <button
              onClick={startHandle}
              className="micbtn"
            >
              Start
            </button>
          ) : (
            <button
              onClick={stopHandle}
              className="micbtn"
            >
              Stop
            </button>
          )}
        </div>
        <div className="">
          {/* {recordBlobLink ? (
            <audio controls src={recordBlobLink} className="mt-6" />
          ) : (
            ""
          )} */}
        </div>
      </div>
    // </div>
  );
  

    const submitData = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

      await axios
      .post("l/item", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(() => {
        enqueueSnackbar("Item Posted Successfully", { variant: "success" });
        navigate("/find");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error", { variant: "error" });
        setBtn(true);
        
      });
};

export default ReactRecorder;
