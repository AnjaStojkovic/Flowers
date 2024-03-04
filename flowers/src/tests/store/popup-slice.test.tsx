import { PopupState, closePopup, openPopup } from "../../store/popup-slice";
import popupReducer from "../../store/popup-slice";

describe("popupReducer", () => {
  it("should handle opening popup", () => {
    const initialState: PopupState = {
      isOpen: false,
      type: "login",
    };

    const action = { type: openPopup.type, payload: "createAccount" };

    const newState = popupReducer(initialState, action);

    expect(newState.isOpen).toEqual(true);
    expect(newState.type).toEqual("createAccount");
  });
});

it("should handle closing popup", () => {
  const initialState: PopupState = {
    isOpen: true,
    type: "createAccount",
  };

  const newState = popupReducer(initialState, closePopup());

  expect(newState).toEqual({
    isOpen: false,
    type: "createAccount",
  });
});
