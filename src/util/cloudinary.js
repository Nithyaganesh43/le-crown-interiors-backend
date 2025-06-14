const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImg = async (path) => {
  const res = await cloudinary.uploader.upload(path, {
    folder: 'lecrowninteriors',
    resource_type: 'image',
    fetch_format: 'auto',
    format: 'avif',
    quality: 'auto:eco',
    transformation: [{ width: 1600, crop: 'limit' }],
  });
  return {
    public_id: res.public_id,
    url: res.secure_url,
    dimensions: {
      width: res.width,
      height: res.height,
    },
  };
};

const deleteImg = async (id) => {
  try {
    const data = await cloudinary.uploader.destroy(id);
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

module.exports = { uploadImg, deleteImg };
