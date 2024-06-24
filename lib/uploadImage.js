const axios = require("axios");
const formdata = require("form-data");

async function uploadImage(buffer, contentType = "image/png", agent) {
    if (!Buffer.isBuffer(buffer)) return reject("Buffer is not a buffer");
    const formData = new formdata();
    formData.append("photo", Buffer.from(buffer), {
      filename: "blob",
      contentType,
      ...agent && { agent }
    });
    await axios({
      method: "POST",
      url: "https://telegra.ph/upload",
      data: formData.getBuffer(),
      headers: {
        ...formData.getHeaders()
      }
    }).then(({ data }) => {
      if (data.error) return reject(data.error);      
        return 'https://telegra.ph' + data[0].src
    })
}

module.exports = { uploadImage };