// "use client";
// import axios from "axios";
// import Image from "next/image";
// import { useEffect, useState } from "react";

export default function Giphy() {

//   const [gifs, setGifs] = useState([]);
//   const [showGifs, setShowGifs] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const results = await axios("https://api.giphy.com/v1/gifs/trending", {
//         params: {
//           api_key : '7VGHs9vybY2b6EcUZtVi3ay9pVVlFOxu',
//           limit : 4,
//         }
//       });
//       console.log(results);
//       setGifs(results.data.data);
//     }
//     fetchData();
//   }, []);

//   const renderGifs = () => {
//     return gifs.map(giphy => {
//       return (
//         <div className="" key={giphy.id}>
//           <Image 
//             src={giphy.images.fixed_height.url}
//             width={0}
//             height={0}
//             sizes='100vw'
//             style={{ "width" : "100%" }}
//             alt='Gif'
//             className='rounded-lg'
//           />
//         </div>
//       )
//     });
//   }
  
//   return (
//     <div className="upload-container z-50 bg-black">
//       {showGifs && renderGifs()}
//     </div>
//   );
}