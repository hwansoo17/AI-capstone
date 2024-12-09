import { create } from "zustand";

const useInterviewStore = create((set) => ({
  applyedJob: "",
  requiredCompetency: "",
  preferentialTreatment: "",
  idealTalent: "",
  selfIntroduction: [{ question: "", answer: "" }],
  category: "",
  questions: [],
  setApplyedJob: (value) => set({ applyedJob: value }),
  setRequiredCompetency: (value) => set({ requiredCompetency: value }),
  setPreferentialTreatment: (value) => set({ preferentialTreatment: value }),
  setIdealTalent: (value) => set({ idealTalent: value }),
  setSelfIntroduction: (value) => set({ selfIntroduction: value }),
  setCategory: (value) => set({ category: value }),
  setQuestions: (value) => set({ questions: value }),
}));
export default useInterviewStore;