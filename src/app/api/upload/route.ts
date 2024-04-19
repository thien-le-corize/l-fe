import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dsxppktmg",
  api_key: "126759725425366",
  api_secret: "yH_Ur0bhKBFbHvLbOa1GJhLoAKs",
});

export async function POST(request: Request) {
  const { file, fileName } = await request.json();
  if (typeof file !== "string" || !fileName) {
    return new Response("Bad request", { status: 400 });
  }

  try {
    const url = await uploadToCloudinary(file, fileName);
    return Response.json({ message: "Ok", url });
  } catch (error) {
    throw error;
  }
}

const uploadToCloudinary = async (file: string, fileName: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { public_id: `${fileName}-${new Date().toISOString()}` },
      (err, result) => {
        if (result) {
          resolve(result.secure_url);
        }

        if (err) {
          reject();
        }
      }
    );
  });
};

// try {
//   const response = await axios.post(
//     `https://api.cloudflare.com/client/v4/accounts/${"mIKiQxPk8k05P-Md_cTYkD2CKyI1-1qejoazWlbb"}/images/v1`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${"Sp_HZJEckcKdDsMjFsYXPg"}`,
//       },
//     }
//   );

//   console.log(response);
//   Response.json(response);
// } catch (error) {
//   if (error.response && error.response.data && error.response.data.errors) {
//     const errors = error.response.data.errors;
//     console.error("Errors:", errors);
//     // Xử lý các lỗi ở đây
//   } else {
//     console.error("Error:", error.message);
//   }
// }
