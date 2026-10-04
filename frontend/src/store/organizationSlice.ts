import { createSlice , type PayloadAction } from "@reduxjs/toolkit";

type OrganizationState = {
    selectedOrganizationId: string | null;
}

const initialState: OrganizationState = {
    selectedOrganizationId: null,
};

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        selectOrganization: (state, action: PayloadAction<string | null>) => {
            state.selectedOrganizationId = action.payload;
        },
    },
});

export const { selectOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;