const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 5000;

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, "input.png"),
});
const upload = multer({ storage });

async function generateImage(inputPath, outputPath) {
  try {
    const imageData = fs.readFileSync(inputPath);
    const base64Image = imageData.toString("base64");
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
      generationConfig: { responseModalities: ['Text', 'Image'] }
    });

    const contents = [
      { text: "Create a 3D animated avatar in a single image of the input image with a friendly and cheerful expression maintaining face shape. The avatar should have large expressive eyes, neatly styled dark hair, and a warm smile. The character should wear a simple, light-colored outfit, and the background should be a gradient of blue tones to give a soft and professional look. The style should resemble modern 3D Pixar-style animation with smooth shading, soft lighting, and a slightly glossy finish. Ensure the overall image maintains a polished and inviting aesthetic. The avatar should be enclosed within a circular frame and rendered at a resolution of 1024x1024 pixels." },
      { inlineData: { mimeType: "image/png", data: base64Image } }
    ];

    const response = await model.generateContent(contents);
    for (const part of response.response.candidates[0].content.parts) {
      if (part.inlineData) {
        fs.writeFileSync(outputPath, Buffer.from(part.inlineData.data, 'base64'));
        console.log('Avatar generated successfully');
      }
    }
  } catch (error) {
    console.error("Generation error:", error);
  }
}

// Routes
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("Image uploaded...");
    console.log("Avatar is being generated...........");
    
    await generateImage(req.file.path, "uploads/output.png");

    // Generate timestamped URL to prevent caching issues
    const avatarUrl = `http://localhost:5000/uploads/output.png?t=${Date.now()}`;
    
    // Send the latest avatar URL to the client
    res.status(200).json({ success: true, avatarUrl });
  } catch (error) {
    console.error("Error generating avatar:", error);
    res.status(500).json({ error: "Generation failed" });
  }
});

// Route to serve the latest avatar
app.get("/avatar", (req, res) => {
  const avatarPath = path.join(__dirname, "uploads/output.png");
  
  if (fs.existsSync(avatarPath)) {
    res.json({ avatarUrl: `http://localhost:5000/uploads/output.png?t=${Date.now()}` });
  } else {
    res.status(404).json({ error: "Avatar not found" });
  }
});


app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
