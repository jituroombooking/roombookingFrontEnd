import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { addRoom, updateRoom } from "../../../Redux/Slice/room";

import style from "./addRoom.module.scss";
import Loading from "../../../Component/Loading/Loading";

const initialState = {
  bhavanName: "",
  noOfBedperRoom: 0,
  landmark: "",
  noOfRooms: 0,
  roomAmount: 0,
};

function AddRoom() {
  const [roomData, setRoomData] = useState({ ...initialState });
  const [sameBedFlag, setSameBedFlag] = useState(true);
  const [generatedRooms, setGeneratedRooms] = useState([]);
  const [formvalidation, setFormValidation] = useState(false);

  const { state } = useLocation();
  const dispatch = useDispatch();
  const AddRoomSlice = useSelector((state) => state.room);

  useEffect(() => {
    console.log(state, " <>? MAIN");
    if (state?.roomEditData) {
      const { rooms, ...restProps } = state.roomEditData;
      setGeneratedRooms([...rooms]);
      setRoomData(restProps);
    }
  }, [state]);

  const updateRoomData = () => {
    if (
      roomData.bhavanName === "" &&
      roomData.landmark === "" &&
      generatedRooms.length === 0
    ) {
      setFormValidation(true);
    } else {
      roomData.totalNoOfRooms = generatedRooms.reduce(
        (sum, data) => sum + data.noOfBed,
        0
      );
      roomData.rooms = generatedRooms;
      console.log(roomData, " <>?");
      dispatch(updateRoom(roomData));
      // setRoomData(initialState);
      // setGeneratedRooms([]);
      // setFormValidation(false);
    }
  };

  const submitRoomData = () => {
    if (
      roomData.bhavanName === "" &&
      roomData.landmark === "" &&
      generatedRooms.length === 0
    ) {
      setFormValidation(true);
    } else {
      roomData.totalNoOfRooms = generatedRooms.reduce(
        (sum, data) => sum + data.noOfBed,
        0
      );
      roomData.rooms = generatedRooms;
      console.log(roomData, " <>?");
      dispatch(addRoom(roomData));
      setRoomData(initialState);
      setGeneratedRooms([]);
      setFormValidation(false);
    }
  };

  const generateRooms = () => {
    setGeneratedRooms(
      [...Array(roomData.noOfRooms)].map((m, i) => {
        return {
          roomNumber: i + 1,
          noOfBed: sameBedFlag ? parseInt(roomData.noOfBedperRoom) : 0,
          availabel: true,
          used: 0,
          bookedFrom: "",
          bookedTill: "",
          bookerIds: [],
        };
      })
    );
  };
  return (
    <div className={style.roomContainer}>
      {AddRoomSlice.loading ? (
        <Loading />
      ) : (
        <div className={style.bulkRoomUpload}>
          <div className={style.formRow}>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Bhavan name*</labal>
              <div className={style.formItem}>
                <input
                  className={style.eventInput}
                  value={roomData.bhavanName}
                  onChange={(e) =>
                    setRoomData({ ...roomData, bhavanName: e.target.value })
                  }
                />
                {formvalidation && roomData.bhavanName === "" && (
                  <div className={style.formValidationError}>
                    Bhavan name is required
                  </div>
                )}
              </div>
            </div>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Landmark*</labal>
              <div className={style.formItem}>
                <input
                  className={style.eventInput}
                  value={roomData.landmark}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      landmark: e.target.value,
                    })
                  }
                />
                {formvalidation && roomData.landmark === "" && (
                  <div className={style.formValidationError}>
                    Landmark is required
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={style.formRow}>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Amount per room</labal>
              <div className={style.formItem}>
                <input
                  type="number"
                  className={style.eventInput}
                  onChange={(e) =>
                    setRoomData({ ...roomData, roomAmount: e.target.value })
                  }
                  value={roomData.roomAmount}
                />
              </div>
            </div>
            <div className={`${style.formItem} ${style.checkboxContainer}`}>
              <input
                type="checkbox"
                checked={sameBedFlag}
                onChange={() => {
                  setGeneratedRooms([]);
                  setSameBedFlag((state) => !state);
                }}
              />
              <label>All the rooms have same beds</label>
            </div>
          </div>
          <div className={style.formRow}>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Number of rooms*</labal>
              <div className={style.formItem}>
                <input
                  type="number"
                  className={style.eventInput}
                  value={roomData.noOfRooms}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      noOfRooms: parseInt(e.target.value),
                    })
                  }
                />
                {formvalidation && roomData.noOfRooms === 0 && (
                  <div className={style.formValidationError}>
                    No of rooms is required
                  </div>
                )}
              </div>
            </div>
            {sameBedFlag && (
              <div className={style.formItem}>
                <labal className={style.eventLabel}>Bed per room*</labal>
                <div className={style.formItem}>
                  <input
                    className={style.eventInput}
                    value={roomData.noOfBedperRoom}
                    type="number"
                    onChange={(e) =>
                      setRoomData({
                        ...roomData,
                        noOfBedperRoom: e.target.value,
                      })
                    }
                  />
                  {formvalidation && roomData.noOfBedperRoom === 0 && (
                    <div className={style.formValidationError}>
                      No of bed rooms is required
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className={style.formRow}>
            <div className={style.formItem}>
              <button onClick={generateRooms} className={style.genRoomBtn}>
                Generate room for bed
              </button>
              {formvalidation && generatedRooms.length === 0 && (
                <div className={style.formValidationError}>
                  Room Generation is required
                </div>
              )}
            </div>
          </div>
          <div className={`${style.formRow} ${style.generatedRoomContainer}`}>
            {generatedRooms.map((m, i) => (
              <div className={style.generateRoomsItem}>
                <div className={style.generatedInputContainer}>
                  <label>Room Number</label>
                  <input
                    className={style.generatedInputItem}
                    value={m.roomNumber}
                    onChange={(e) => {
                      generatedRooms[i].roomNumber =
                        e.target.value === "" ? 0 : parseInt(e.target.value);
                      setGeneratedRooms([...generatedRooms]);
                    }}
                  />
                </div>
                <div className={style.generatedInputContainer}>
                  <label>No of Bed</label>
                  <input
                    type="number"
                    className={style.generatedInputItem}
                    value={m.noOfBed}
                    onChange={(e) => {
                      generatedRooms[i].noOfBed = parseInt(e.target.value);
                      setGeneratedRooms([...generatedRooms]);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={style.formDevider} />
          <div className={style.btnContainer}>
            <button
              className={style.resetBtn}
              onClick={() => setRoomData(initialState)}
            >
              Reset
            </button>

            {state?.roomEditData ? (
              <button
                className={style.submitbtn}
                onClick={() => updateRoomData()}
              >
                Update Room
              </button>
            ) : (
              <button
                className={style.submitbtn}
                onClick={() => submitRoomData()}
              >
                Add Room
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddRoom;
