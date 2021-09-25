import { useRef, useState } from "react";
import { handleFileSelected } from "../../helpers/encodeFile";
import "./styles/styles.css";

const UploadArea = ({label, onFileSelect}) => {
  const fileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectFile = () => {
    fileRef.current.click();
  };

  const onFileSelected = (element) => {
    console.log(element.target);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setSelectedFile(e.dataTransfer.files[0]);

    var fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64
      onFileSelect(srcData)
    };

    fileReader.readAsDataURL(e.dataTransfer.files[0]);
  };

  const handleDragOver = (element) => {
    element.preventDefault();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null)
    onFileSelect("")
  }

  const encodeImageFileAsURL = () => {
    var filesSelected = fileRef.current.files;

    console.log(filesSelected);

    if (filesSelected.length === 1) {
      var fileToLoad = filesSelected[0];
      setSelectedFile(filesSelected[0]);

      var fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64
        onFileSelect(srcData)
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };

  return (
    <div className="uploadArea">
      <label className="oxfordText weight600 font12">{label}</label>

      <div
        className="mt5 uploadContent"
        onDrop={(e) => {
          handleDrop(e);
        }}
        onDragOver={(e) => {
          handleDragOver(e);
        }}
      >
        {selectedFile !== null && (
          <div className="selected">
            <p className="oxfordText">{selectedFile.name}</p>

            <div className="alterSelection mt10">
              <p
                className="font12 charcoalText"
                onClick={() => handleSelectFile()}
              >
                Change
              </p>
              <p
                className="font12 charcoalText"
                onClick={() => handleRemoveFile()}
              >
                Remove
              </p>
            </div>
          </div>
        )}

        {selectedFile === null && (
          <p className="font12">
            Drag a clear photo or{" "}
            <span
              onClick={() => handleSelectFile()}
              onChange={(e) => onFileSelected(e)}
            >
              Select File{" "}
              <input
                type="file"
                ref={fileRef}
                onChange={(picSelector) => {
                  encodeImageFileAsURL();
                  var reader = new FileReader();

                  reader.onload = function (e) {
                    // get loaded data and render thumbnail.

                    console.log(e.target.result);
                  };

                  // read the image file as a data URL.
                  reader.readAsDataURL(picSelector.target.files[0]);
                }}
              />
            </span>
          </p>
        )}

        <p className="infoLabel font8 oxfordText">
          Supported file type: PDF, JPEG, PNG. Max file size: 500kb
        </p>
      </div>
    </div>
  );
};

export default UploadArea;
