import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FacultyList = (props) => {
  const navigate = useNavigate();
  const deleteFaculty = async (fcultyid) => {
    try {
      // const tem = await axios.put("http://localhost:5000/api/admin/deleteFaculty",{fact: fcultyid});
      // console.log(tem.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <table class="table table-hover table-bordered table-striped">
          <thead>
            <tr className="font-size-14">
              <th scope="col">Department</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.allfacultylist &&
              props.allfacultylist.map((faculty) => (
                <tr key={faculty?._id} className="font-size-14">
                  <td scope="row">
                    {faculty?.Department || faculty?.department}
                  </td>
                  <td scope="row">{faculty?.name}</td>
                  <td scope="row">{faculty?.email}</td>
                  <td scope="row">
                    <button
                      className="btn btn-danger btn-style"
                      onClick={() => deleteFaculty(faculty?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FacultyList;