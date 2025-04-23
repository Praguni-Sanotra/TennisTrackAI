import gdown

# Download ball detection model
url = "https://drive.google.com/uc?id=1UZwiG1jkWgce9lNhxJ2L0NVjX1vGM05U"
output = "models/yolo5_last.pt"
gdown.download(url, output, quiet=False)

# Download court keypoint model
url = "https://drive.google.com/uc?id=1QrTOF1ToQ4plsSZbkBs3zOLkVt3MBlta"
output = "models/keypoints_model.pth"
gdown.download(url, output, quiet=False)
