import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraComponent = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-full aspect-square overflow-hidden rounded-[2rem] border-8 border-white/10 shadow-2xl group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 z-10 mix-blend-overlay" />
        <Webcam 
          ref={webcamRef} 
          screenshotFormat="image/png" 
          className="absolute h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 border-4 border-white/20 rounded-[1.5rem] pointer-events-none" />
      </div>
      <button 
        onClick={capture} 
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold
                 shadow-2xl hover:scale-105 transform transition-all duration-300 hover:shadow-blue-500/40
                 flex items-center gap-3 relative overflow-hidden"
      >
        <span className="relative z-10">✨ Capture Magic</span>
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay animate-pulse" />
      </button>
    </div>
  );
};

const App = () => {
  const [photo, setPhoto] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  // ... (keep the existing handleCapture logic the same)
  const handleCapture = async (image) => {
    setPhoto(image);
    setLoading(true);
    
    const blob = await fetch(image).then(res => res.blob());
    const formData = new FormData();
    formData.append("image", blob, "photo.png");
    
    try {
      // Upload the image
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("Image uploaded successfully!");
  
        // Fetch the latest avatar from /avatar after successful upload
        const avatarResponse = await fetch(`http://localhost:5000/avatar?t=${new Date().getTime()}`);
        
        if (avatarResponse.ok) {
          const avatarData = await avatarResponse.json();
          setAvatar(avatarData.avatarUrl); // Ensure updated avatar is set
        } else {
          console.error("Failed to fetch latest avatar.");
        }
      } else {
        console.error("Avatar generation failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 animate-float">
          AI Avatar Studio
        </h1>
        <p className="text-xl text-white/80 font-light">Transform your selfie into magical art</p>
        <div className="mt-4 animate-spin-slow">✨</div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Camera Section */}
        <div className="col-span-2 bg-gray-800/30 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">📸</span>
            Your Creative Studio
          </h2>
          <CameraComponent onCapture={handleCapture} />
        </div>

        {/* Previews Section */}
        <div className="space-y-8">
          <div className="bg-gray-800/30 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-blue-400">◉</span> Original Shot
            </h2>
            <div className="aspect-square bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-2xl overflow-hidden border-2 border-dashed border-white/20 relative">
              {photo ? (
                <img src={photo} alt="Captured" className="w-full h-full object-cover animate-fade-in" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 space-y-3">
                  <div className="text-4xl">🌌</div>
                  <p className="text-center px-4">Your photo will<br />appear here</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-lg p-8 rounded-[2.5rem] shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-purple-400">✦</span> AI Masterpiece
            </h2>
            <div className="aspect-square bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-2xl overflow-hidden border-2 border-dashed border-white/20 relative">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover animate-fade-in" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 space-y-3">
                  <div className="text-4xl animate-pulse">🪄</div>
                  <p className="text-center px-4">Your magical avatar<br />awaits creation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-96 bg-gray-800/80 backdrop-blur-lg rounded-full p-3 shadow-2xl border border-white/10">
          <div className="flex items-center justify-center space-x-3">
            <div className="h-4 w-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce" />
            <div className="h-4 w-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce delay-100" />
            <div className="h-4 w-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce delay-200" />
            <span className="text-white/90 font-medium">Crafting your masterpiece...</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full -z-10" />
        </div>
      )}

      {/* Footer */}
<footer className="text-center mt-16 text-white/70 text-sm">
  Made with ❤️ by Prakashita Singh.
</footer>

    </div>
  );
};

export default App;