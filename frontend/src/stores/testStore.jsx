import { create } from 'zustand'

export const testStore = create((set) => ({
  token: '',
  payload: null,
  createToken: (newToken) => set({ token: newToken }),
  createPayload: (newPayload) => set({ payload: newPayload }),
}))