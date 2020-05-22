const INITIAL_STATE = {};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    // console.log('load state is', JSON.stringify(serializedState));
    if (serializedState === null) {
      return INITIAL_STATE;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return INITIAL_STATE;
  }
};

export const saveState = (state) => {
  try {
    // console.log(`save state is ${JSON.stringify(state)}`);
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {}
};
