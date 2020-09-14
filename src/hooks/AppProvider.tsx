import React, { createContext, useMemo } from "react";
import Actions, { actionInitialValue } from "./Actions";
import { IActionModel, IStateModel } from "../model/hooks.model";
import Reducers, { stateInitialValue } from "./Reducers";

export const ActionContext = createContext<IActionModel>(actionInitialValue);
export const StateContext = createContext<IStateModel>(stateInitialValue);

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

export const AppProvider = (props: any) => {
  // const history = useHistory();
  // const query = useQuery();
  const [state, dispatch] = React.useReducer((prevState: any, action: any) => {
    switch (action.type) {
      case Actions.TOGGLE_MODAL:
        return {
          ...prevState,
          openModal: action.modal.openModal,
          modalConfig: action.modal.modalConfig,
        };
      case Actions.FETCH_USER:
        return {
          ...prevState,
          user: action.user,
        };
      case Actions.SET_SELECTED_ORG:
        return {
          ...prevState,
          selectedOrg: action.selectedOrg,
        };
      case Actions.SET_USER_LOADING:
        return {
          ...prevState,
          userLoading: action.userLoading,
        };

      default:
    }
  }, stateInitialValue);

  const actionContext = useMemo(
    () => Reducers(dispatch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <ActionContext.Provider value={actionContext}>
      <StateContext.Provider value={state}>{props.children}</StateContext.Provider>
    </ActionContext.Provider>
  );
};
