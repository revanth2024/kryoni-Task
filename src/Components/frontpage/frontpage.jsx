import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./frontpage.css";
import { MdOutlineArrowBackIos } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Frontpage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [additionalDropdowns, setAdditionalDropdowns] = useState([]);

  const handleSchemaChange = (e) => {
    const selectedSchema = e.target.value;
    if (selectedSchema && !selectedSchemas.includes(selectedSchema)) {
      setSelectedSchemas([...selectedSchemas, selectedSchema]);
    }
  };

  const handleAddNewSchemaClick = () => {
    setAdditionalDropdowns([...additionalDropdowns, { id: Date.now() }]);
  };

  const availableSchemas = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
  ];

  const additionalSchemas = [
    { label: "Age", value: "age" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const [segmentName, setSegmentName] = useState("last_10_days_blog_visits");
  const [schema, setSchema] = useState([
    { key: "first_name", label: "First name" },
    { key: "last_name", label: "Last name" },
  ]);

  const handleSaveSegment = () => {
    const segmentData = {
      segment_name: segmentName,
      schema: schema.reduce((acc, field) => {
        acc.push({ [field.key]: field.label });
        return acc;
      }, []),
    };
    console.log(segmentData);

    toast.success("Saved Successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <div className="navbar-menu">
        <MdOutlineArrowBackIos />
        <span>View Audience</span>
      </div>
      <div className="segment-button">
        <button onClick={handleShow}>Save segment</button>
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="custom-offcanvas"
      >
        <Offcanvas.Header className="sidebar-header">
          <MdOutlineArrowBackIos />
          <Offcanvas.Title>Saving Segment</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="name-input">
            <p>Enter the Name of the Segment</p>
            <input type="text" placeholder="Name of the segment" />
            <p className="input-bottom">
              To save your segment, you need to add the schema to build the
              query
            </p>
          </div>
          <div className="status-color">
            <span>- User Traits</span>
            <span>- Group Traits</span>
          </div>
          <div className="main-table" style={{ marginTop: "40px" }}>
            <div className="addon-dropdown">
              <select name="name" id="name" className="dropdown">
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="gender">Gender</option>
              </select>
            </div>
          </div>
          <div className="main-table">
            <div className="addon-dropdown red-color">
              <select name="ac-name" id="ac-name" className="dropdown">
                <option value="ac-name">Account Name</option>
                <option value="ac-name">Account Name 1</option>
                <option value="ac-name">Account Name 2</option>
              </select>
            </div>
          </div>
          <div className="main-table">
            <div className="addon-dropdown update">
              <select
                name="schema"
                id="schema"
                className="dropdown"
                onChange={handleSchemaChange}
              >
                <option value="1">Add schema to segment</option>
                {availableSchemas.map((schema) => (
                  <option key={schema.value} value={schema.value}>
                    {schema.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {additionalDropdowns.map((dropdown) => (
            <div className="main-table" key={dropdown.id}>
              <div className="addon-dropdown update">
                <select className="dropdown">
                  <option value="">Select schema</option>
                  {additionalSchemas.map((schema) => (
                    <option key={schema.value} value={schema.value}>
                      {schema.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <div className="add-link">
            <span className="plus-icon">+</span>
            <a
              href="#" 
              className="update-link"
              onClick={(e) => {
                e.preventDefault();
                handleAddNewSchemaClick();
              }}
            >
              Add new schema
            </a>
          </div>

          <div className="save-div">
            <button className="save-button" onClick={handleSaveSegment}>
              Save the Segment
            </button>
            <button className="cancel-button">Cancel</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Frontpage;
