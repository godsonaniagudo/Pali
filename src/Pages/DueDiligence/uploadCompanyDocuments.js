import Button from "../../Components/Button/button";
import logo from "../../Assets/img/logoPlain.svg";
import "./styles/styles.css";
import UploadArea from "../../Components/UploadArea/uploadArea";
import Notification from "../../Components/Notification/notification";
import { capitalize } from "../../helpers/formatStrings";
import { useState } from "react";
import postProtected from "../../helpers/requests/postProtected";
import patchProtected from "../../helpers/requests/patchProtected";
import { useHistory } from "react-router";

const UploadCompanyDocuments = () => {
  const [coi, setCoi] = useState("");
  const [cac, setCac] = useState("");
  const [moa, setMoa] = useState("");
const history = useHistory()

  const [notification, setNotification] = useState({
    text: "",
    type: "",
  });

  const showNotification = (text, type) => {
    const temp = {
      ...notification,
    };
    temp["text"] = text;
    temp["type"] = type;
    setNotification(temp);
  };

  const closeNotification = () => {
    const temp = {
      ...notification,
    };
    temp["text"] = "";
    temp["type"] = "";
    setNotification(temp);
  };

  const validateFields = () => {
    if (coi === "") {
      showNotification("Certificate of Incorporation is required", "Error");
    } else if (cac === "") {
      showNotification("Form CAC 1.1 is required", "Error");
    } else if (moa === "") {
      showNotification("Memorandum and Articles of Association", "Error");
    } else {
      closeNotification();
      uploadDocuments();
    }
  };

  const uploadDocuments = async () => {
    try {
      const uploadCoi = await postProtected("/document/upload/coi", {
        file: coi,
      });
      const uploadCac = await postProtected("/document/upload/cac", {
        file: cac,
      });
      const uploadMoa = await postProtected("/document/upload/mou", {
        file: moa,
      });

      if (uploadCoi.status && uploadCac.status && uploadMoa.status) {
        saveCompanyDocuments(
          uploadCoi.data.filename,
          uploadCac.data.filename,
          uploadMoa.data.filename
        );
      } else if (!uploadCoi.status) {
        showNotification(uploadCoi.message, "Error");
      } else if (!uploadCac.status) {
        showNotification(uploadCac.message, "Error");
      } else if (!uploadMoa.status) {
        showNotification(uploadMoa.message, "Error");
      }
    } catch (error) {
      showNotification(error.message, "Error");
    }
  };

  const saveCompanyDocuments = async (coiUrl, cacUrl, moaUrl) => {
    try {
      const saveCompanyDocuments = await patchProtected("/company/update/document", {
        coi: coiUrl,
        cac: cacUrl,
        mou: moaUrl,
      });

      if (saveCompanyDocuments.status){
        localStorage.setItem("company", JSON.stringify(saveCompanyDocuments.data.company));
        toSuccessPage()
      } else {
        showNotification(saveCompanyDocuments.message, "Error")
      } 
    } catch (error) {
        showNotification(error.message, "Error")
    }
  };

  const toSuccessPage = () => {
    history.push("/due-diligence/success");
  }

  return (
    <div className="uploadCompanyDocuments">
      {notification.text !== "" && (
        <Notification
          text={capitalize(notification.text)}
          type={notification.type}
          close={() => closeNotification()}
        />
      )}
      <a href="/">
        <img alt="logo" src={logo} />
      </a>
      <div className="content">
        <div>
          <p className="oxfordText font24 headerText weight500">
            Select the Owners of your company
          </p>
          <p className="mt20 font14 charcoalText">
            All documents are handled with complete confidentiality and they are
            purely retained for legal compliance reasons.
          </p>
        </div>

        <UploadArea
          label="Certificate of Incorporation"
          onFileSelect={(url) => setCoi(url)}
        />

        <UploadArea label="Form CAC 1.1" onFileSelect={(url) => setCac(url)} />

        <UploadArea
          label="Memorandum and Articles of Association"
          onFileSelect={(url) => setMoa(url)}
        />

        <div className="buttonContainer">
          <Button
            label="Submit"
            onClick={() => {
              validateFields();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadCompanyDocuments;
