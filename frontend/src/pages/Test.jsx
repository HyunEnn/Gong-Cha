// function Test() {
//     return (
//         <>
//             <p>테스트페이지</p>
//         </>
//     );
// }

// export default Test;

import React, { useState } from 'react';
import imglyRemoveBackground from "@imgly/background-removal";

function Test() {
  const [imageSrc, setImageSrc] = useState(null);
  const [resultSrc, setResultSrc] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        console.log("단데기");
        setImageSrc(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const removeBackground = () => {
    imglyRemoveBackground(imageSrc)
      .then((resultBlob) => {
        setResultSrc(URL.createObjectURL(resultBlob));
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Error removing background');
        setResultSrc(null);
      });
  };

  return (
    <>
      <p>테스트페이지</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={removeBackground}>Remove Background</button>
      {error && <p>Error: {error}</p>}
      {resultSrc && <img src={resultSrc} alt="Result" />}
    </>
  );
}

export default Test;
