import React, { useRef, useState } from "react";
import PageHeader from "../layout/PageHeader";
import InputField from "../../ui/form-elements/InputField";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../util/axios";
import { toast } from "react-toastify";

import SubmitButton from "./../../ui/form-elements/SubmitButton";
import { setPermissionsGroups } from "../../../redux/slices/permissionsGroups";
import CheckField from "../../ui/form-elements/CheckField";

const CreatePermission = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const permissions = useSelector((state) => state.permissions.permissions);
  const permissionsGroups = useSelector(
    (state) => state.permissionsGroups.permissionsGroups
  );
  const [formData, setFormData] = useState({ permissions: [] });
  const [loading, setLoading] = useState(false);

  const handleAddPermission = (e, passedPermission) => {
    const checked = e.target.checked;
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, passedPermission],
      });
    } else {
      const filteredPermessions = formData.permissions.filter(
        (permission) => permission.id !== passedPermission.id
      );
      setFormData({ ...formData, permissions: filteredPermessions });
    }
  };

  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    url: "/groups/",
    headers: headersList,
    data: formData,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.request(requestOptions);
      toast.success(`${formData.name} permissions group Created Successfully`);
      dispatch(setPermissionsGroups([...permissionsGroups, response.data]));
      formRef.current.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Create Permissions" />
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card">
            <form
              className="row m-0 form-ui"
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="col-12 p-2 mb-2">
                <InputField
                  htmlFor="name"
                  label="Group & Permissions Name"
                  id="groupOfPermissionsName"
                  placeholder="Write Here"
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="col-12 p-2">
                <h6 className="simiLabel">
                  Assign Group Permissions to employee
                </h6>
              </div>
              {permissions.map((p) => (
                <div className="col-lg-4 col-md-6 col-12 p-2">
                  <CheckField
                    key={p.id}
                    label={p.codename}
                    name={p.name}
                    id={p.id}
                    onChange={(e) => handleAddPermission(e, p)}
                  />
                </div>
              ))}
              <div className="col-12 p-2 d-flex justify-content-end">
                <SubmitButton
                  loading={loading}
                  name="Create"
                  className="w-25"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePermission;
