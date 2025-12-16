import React, { useRef, useState, useEffect } from "react";

interface CameraFeedProps {
  onCapture: (image: string) => void;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Start Camera Function
  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }

      setHasPermission(true);
    } catch (error) {
      console.error("Camera Permission Denied:", error);
      setHasPermission(false);
    }
  };

  // Stop Camera Function
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  // Run camera when component mounts + cleanup when unmounts
  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  // Capture image
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg");
    setPhoto(imageData);
    onCapture(imageData);

    // Stop camera when photo taken
    stopCamera();
  };

  // Retake image
  const retakePhoto = () => {
    setPhoto(null);
    onCapture("");

    stopCamera();     // stop old stream
    startCamera();    // start new camera
  };

  return (
    <div className="flex flex-col items-center gap-4">

      {!hasPermission && (
        <p className="text-red-600 text-center">
          Please allow camera access.
        </p>
      )}

      {/* Show Live Camera until photo captured */}
      {!photo ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-64 rounded-lg shadow"
          />

          <button
            onClick={capturePhoto}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Take Selfie
          </button>
        </>
      ) : (
        <>
          {/* Captured Image */}
          <img src={photo} className="w-64 rounded-lg shadow" alt="Captured" />

          <button
            onClick={retakePhoto}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Retake
          </button>
        </>
      )}

      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default CameraFeed;
    