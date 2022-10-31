import React, { useEffect } from "react";

import Button from "../components/UI/Button";
import Table from "../components/tables/Table";
import EditUser from "../components/Modal/EditUser";

import classes from "./asset/css/StandardMain.module.css";

function UserManagementPage() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstname",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        firstname: "firstname1",
        lastName: "hau1",
        age: 10,
        city: "...",
        status: "...",
      },
      {
        firstname: "firstname10",
        lastName: "hau2",
        age: 11,
        city: "...",
        status: "...",
      },
      {
        firstname: "firstname9",
        lastName: "hau3",
        age: 10,
        city: "...",
        status: "...",
      },
      {
        firstname: "firstname8",
        lastName: "hau4",
        age: 11,
        city: "...",
        status: "...",
      },
      {
        firstname: "firstname7",
        lastName: "hau5",
        age: 10,
        city: "...",
        status: "...",
      },
      {
        firstname: "firstname6",
        lastName: "hau6",
        age: 11,
        city: "...",
        status: "...",
      },
      {
        firstname: "firstname5",
        lastName: "hau7",
        age: 10,
        city: "...",
        status: "...",
      },
      {
        firstname: "firstname4",
        lastName: "hau8",
        age: 11,
        city: "...",
        status: "...",
      },
      {
        firstname: "firstname3",
        lastName: "hau9",
        age: 10,
        city: "...",
        status: "...",
      },
      {
        firstname: "firstname2",
        lastName: "hau10",
        age: 11,
        city: "...",
        status: "...",
      },
      {
        firstname: "firstname3",
        lastName: "hau9",
        age: 10,
        city: "...",
        status: "...",
      },
      {
        firstname: "firstname2",
        lastName: "hau10",
        age: 11,
        city: "...",
        status: "...",
      },
    ],
    []
  );

  const [state, setState] = React.useState(true);
  const [rowSelected, setRowSelected] = React.useState("");

  useEffect(() => {
    setState(!state);
  }, [rowSelected]);

  const closeHandler = () => {
    setRowSelected("");
    alert("firstname`s row selected " + rowSelected);
  };

  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>COMIC MANAGEMENT</p>
      </div>

      <div className={classes.col_md_12}>
        <div className={classes.tile}>
          <div className={classes.tile_body}>
            <div className={`${classes.row} ${classes.element_button}`}>
              <div className={classes.col_sm_2}>
                <Button
                  className={classes.add_btn}
                  onClick={() => alert("add btn effected")}
                >
                  Add
                </Button>
              </div>
            </div>
            <Table
              columns={columns}
              data={data}
              navi={null}
              setRowSelected={setRowSelected}
            ></Table>
          </div>
        </div>
      </div>
      {rowSelected && <EditUser onClose={closeHandler} />}
    </>
  );
}

export default UserManagementPage;
