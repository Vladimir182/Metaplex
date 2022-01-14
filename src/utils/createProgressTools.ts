import { combine } from "effector";
import { createEntry } from "state/utils";

export function createProgressTools<T, TContent>(
  getContent: (state: T) => TContent,
  defaultState: T
) {
  const $progress = createEntry<T>(defaultState);
  const $progressContent = $progress.$node.map(getContent);

  const $progressIsOpen = $progress.$node.map((progressState) =>
    progressState === defaultState ? false : true
  );
  return {
    $progress,
    $progressIsOpen,
    $progressContent,
    $progressMeta: combine(
      $progressContent,
      $progressIsOpen,
      (content, isOpen) => ({ ...content, isOpen })
    ),
  };
}
