from flask import Flask, request, Response, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/analyze": {"origins": "http://localhost:3000"}})

# Ensure output directory exists
os.makedirs('output_videos', exist_ok=True)

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    response.headers["Access-Control-Expose-Headers"] = "Content-Disposition"
    return response

@app.route('/')
def index():
    return jsonify({"status": "Server is running"})

@app.route('/analyze', methods=['POST'])
def analyze_video():
    """Handles video file uploads and returns the processed video URL."""
    if 'video' not in request.files:
        return jsonify({"error": "No video file uploaded"}), 400
    
    video_file = request.files['video']
    input_video_path = os.path.join("output_videos", "input_video.mp4")
    output_video_path = os.path.join("output_videos", "output_video.mp4")  # Convert to MP4

    # Save uploaded video
    video_file.save(input_video_path)

    # Convert AVI to MP4 for better streaming
    os.system(f"ffmpeg -i {input_video_path} -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k {output_video_path}")

    return jsonify({
        "success": True,
        "video_url": "http://localhost:5001/output_video"
    })

@app.route('/output_video')
def serve_video():
    """Serves the processed video using proper streaming."""
    video_path = os.path.join("output_videos", "output_video.mp4")  # MP4 format
    
    if not os.path.exists(video_path):
        return jsonify({"error": "Video file not found"}), 404

    return send_from_directory(directory="output_videos", path="output_video.mp4", mimetype="video/mp4")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
