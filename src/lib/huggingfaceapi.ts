// const API_URL = 'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4';

// export const generateImageFromText = async (prompt: string): Promise<string> => {
//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`,
//     },
//     body: JSON.stringify({ inputs: prompt }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to generate image');
//   }

//   const data = await response.json();
//   return data.generated_image; // Assuming the response contains the generated image URL
// };
