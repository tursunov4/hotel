import React from "react";
import "./MyFileInput.scss";
function MyFileInput({}) {
  function getFileName(e) {
    const fileInput = e.target;
    const filelist = fileInput.files;
    if (filelist.length > 0) {
      if (filelist.length > 10) {
        fileInput.value = "";
        alert("Please enter only ten files");
      } else {
        const file = document.querySelector(".file-input-button");
        file.innerHTML = `выбраны ${filelist.length} - файла`;
      }
    }
  }
  return (
    <div className="file-input-wrap">
      <label className="file-input-label">
        <strong>Перетащи свои фотографии сюда или нажми на кнопку</strong>
        <span>Загрузите как минимум одну фотографию</span>
        <button className="file-input-button">Загрузить файл</button>

        <input
          onChange={getFileName}
          multiple
          accept="image/*"
          type="file"
          required
          placeholder="Загрузить файл"
        />
      </label>
    </div>
  );
}

export default MyFileInput;
