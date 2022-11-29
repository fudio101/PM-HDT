import React, { useEffect, useState } from "react";

import Button from "../components/UI/Button";
import Table from "../components/tables/Table";
import EditUser from "../components/Modal/EditUser";
import Usertable from "../components/tables/UserTabe";

import { ToastContainer, toast } from "react-toastify";

import { useDispatch } from "react-redux";
import {
  getAllUsers,
  newUser,
  updateUser,
  deleteUser,
} from "../store/actions/userAction";
import { unwrapResult } from "@reduxjs/toolkit";

import classes from "./asset/css/StandardMain.module.css";

function UserManagementPage() {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const [state, setState] = React.useState(true);
  const [rowSelected, setRowSelected] = React.useState("");
  const [users, setUsers] = useState([]);
  const [isNewAction, setIsNewAction] = useState(false);
  const [inputData, setInputData] = useState({ role_id: 1 });

  const fetchAllUsers = async () => {
    setUsers(unwrapResult(await dispatch(getAllUsers())));
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    setState(!state);
  }, [rowSelected]);

  const closeHandler = () => {
    setRowSelected("");
    setIsNewAction(false);
  };

  //new
  const newUserHandler = async (e) => {
    e.preventDefault();
    try {
      // for (let [key, value] of Object.entries(inputData)) {
      //   console.log(`${key}: ${value}`);
      //   formData.append(key, value);
      // }
      // console.log(inputData);
      unwrapResult(await dispatch(newUser(inputData)));
      toast("User Account Created Successfully", {
        type: "success",
      });
      setRowSelected("");
      fetchAllUsers();
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  //update
  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      for (let [key, value] of Object.entries(inputData)) {
        if (value === null || value === "" || key === "email") {
          delete inputData[`${key}`];
        }
      }
      unwrapResult(
        await dispatch(updateUser({ id: rowSelected.id, user: inputData }))
      );
      toast("User Account Update Successfully", {
        type: "success",
      });
      setRowSelected("");
      fetchAllUsers();
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  //delete
  const deleteUserHandler = async (e) => {
    try {
      unwrapResult(await dispatch(deleteUser(rowSelected.id)));
      toast("User Account Deleted Successfully", {
        type: "success",
      });
      setRowSelected("");
      fetchAllUsers();
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>USER MANAGEMENT</p>
      </div>

      <div className={classes.col_md_12}>
        <div className={classes.tile}>
          <div className={classes.tile_body}>
            <div className={`${classes.row} ${classes.element_button}`}>
              <div className={classes.col_sm_2}>
                <Button
                  className={classes.add_btn}
                  onClick={() => {
                    setRowSelected(!rowSelected);
                    setIsNewAction(true);
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
            <Usertable
              columns={columns}
              data={users}
              setRowSelected={setRowSelected}
              userSelectedData={rowSelected}
            ></Usertable>
          </div>
        </div>
      </div>
      {rowSelected && (
        <EditUser
          isNew={isNewAction}
          userSelectedData={rowSelected}
          onClose={closeHandler}
          onConfirm={newUserHandler}
          onDelete={deleteUserHandler}
          onUpdate={updateUserHandler}
          setInputData={setInputData}
        />
      )}
      <ToastContainer position="bottom-right" newestOnTop />
    </>
  );
}

export default UserManagementPage;
