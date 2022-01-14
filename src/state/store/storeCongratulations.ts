import { createEvent, restore } from "effector";

export const setShowStoreCongratulations = createEvent<boolean>();
export const $showStoreCongratulations = restore(
  setShowStoreCongratulations,
  false
);
