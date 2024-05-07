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
        console.log("이미지 업로드 완료");
        setImageSrc(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const removeBackground = () => {
    console.log("배경 제거 시도");
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

  const downloadResult = () => {
    if (resultSrc) {
      const a = document.createElement('a');
      a.href = resultSrc;
      a.download = 'result.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <>
      <p>테스트페이지</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={removeBackground}>배경 제거하기</button>
      <button onClick={downloadResult}>다운로드</button>
      {error && <p>Error: {error}</p>}
      {resultSrc && <img src={resultSrc} alt="Result" />}
    </>
  );
}

export default Test;
