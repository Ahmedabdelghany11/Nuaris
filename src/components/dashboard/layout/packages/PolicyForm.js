import React, { useState, useEffect } from "react";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import CancellationPolicy from "../shared/CancellationPolicy";

const PolicyForm = ({ setForm, tripPackage }) => {
  const [loading, setLoading] = useState(false);
  const packageId = sessionStorage.getItem("package_id");
  const navigate = useNavigate();

  const [weatherEditorState, setWeatherEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [rulesEditorState, setRulesEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [allowedItemsEditorState, setAllowedItemsEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const cancelationCountInitial = {
    cancel_before: "",
    percentage: "",
    type: "select",
  };
  const [formData, setFormData] = useState({
    cancellation_policy: [cancelationCountInitial],
  });

  useEffect(() => {
    if (tripPackage) {
      const weatherContent = tripPackage.policy?.weather_restrictions;
      const rulesContent = tripPackage.policy?.rules_and_instructions;
      const allowedItemsContent =
        tripPackage.policy?.allowed_and_not_allowed_items;

      if (weatherContent) {
        const contentState = convertFromRaw(JSON.parse(weatherContent));
        const editorState = EditorState.createWithContent(contentState);
        setWeatherEditorState(editorState);
      }

      if (rulesContent) {
        const contentState = convertFromRaw(JSON.parse(rulesContent));
        const editorState = EditorState.createWithContent(contentState);
        setRulesEditorState(editorState);
      }

      if (allowedItemsContent) {
        const contentState = convertFromRaw(JSON.parse(allowedItemsContent));
        const editorState = EditorState.createWithContent(contentState);
        setAllowedItemsEditorState(editorState);
      }
    }
  }, [tripPackage]);

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Package Time & Price");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const rawWeatherContent = convertToRaw(
        weatherEditorState.getCurrentContent()
      );
      const rawRulesContent = convertToRaw(
        rulesEditorState.getCurrentContent()
      );
      const rawAllowedItemsContent = convertToRaw(
        allowedItemsEditorState.getCurrentContent()
      );
      const response = await axios.patch(`/trip-packages/${packageId}/`, {
        policy: {
          ...formData,
          weather_restrictions: JSON.stringify(rawWeatherContent),
          rules_and_instructions: JSON.stringify(rawRulesContent),
          allowed_and_not_allowed_items: JSON.stringify(rawAllowedItemsContent),
        },
      });
      if (response) {
        toast.success("Policies Saved Successfully");
        navigate("/dashboard/trip-packages");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Renting Policy & Cancellation Policy</h6>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Weather Restriction</label>
            <Editor
              editorState={weatherEditorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(newEditorState) =>
                setWeatherEditorState(newEditorState)
              }
            />
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Rules and instructions</label>
            <Editor
              editorState={rulesEditorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(newEditorState) =>
                setRulesEditorState(newEditorState)
              }
            />
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Allowed and not allowed items on board</label>
            <Editor
              editorState={allowedItemsEditorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(newEditorState) =>
                setAllowedItemsEditorState(newEditorState)
              }
            />
          </div>
        </div>
        <CancellationPolicy
          formData={formData}
          setFormData={setFormData}
          cancelationCountInitial={cancelationCountInitial}
        />
        <div className="col-12 p-2 pt-4 d-flex gap-3 ">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            className="save_btn ms-auto"
            loading={loading}
            name="Save"
          />
        </div>
      </div>
    </form>
  );
};

export default PolicyForm;
