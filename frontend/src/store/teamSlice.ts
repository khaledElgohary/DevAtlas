import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TeamState = {
    selectedTeamId: string | null;
};

const initialState: TeamState = {
    selectedTeamId: null,
};

const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        setSelectedTeamId(state, action: PayloadAction<string | null>) {
            state.selectedTeamId = action.payload;
        },
    },
});

export const { setSelectedTeamId } = teamSlice.actions;
export default teamSlice.reducer;