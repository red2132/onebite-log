import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

const initialState = {
  isOpen: false,
};
const useProfileEdtiorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: "ProfileEditorModalStore" },
  ),
);

export const useOpenProfileEditorModal = () => {
  const open = useProfileEdtiorModalStore((store) => store.actions.open);
  return open;
};

export const useCloseProfileEditorModal = () => {
  const close = useProfileEdtiorModalStore((store) => store.actions.close);
  return close;
};

export const useProfileEditorModal = () => {
  const store = useProfileEdtiorModalStore();
  return store;
};
