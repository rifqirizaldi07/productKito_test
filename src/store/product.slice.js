import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchApi from "../config/fetchApi";
import _ from "lodash";

// create slice
const name = 'data'
const initialState = createInitialState()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const slice = createSlice({ name, initialState, extraReducers })

// exports
export const productsActions = { ...slice.actions, ...extraActions }
export const productsReducer = slice.reducer

// implementation
function createInitialState() {
    return {
        all: {
            data: null,
            error: false,
            loading: true
        },
        detail: {
            data: null,
            error: false,
            loading: false
        }
    }
}

function createExtraActions() {
    return {
        getAll: getAll(),
        getDetail: getDetail(),
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async ({ param }) => {
                const query = !_.isEmpty(param) ? new URLSearchParams(param).toString() : ''
                const data = await fetchApi.get(`/${name}?${query}`)
                return data
            }
        )
    }

    function getDetail() {
        return createAsyncThunk(
            `${name}/getDetail`,
            async ({ id }) => {
                const data = await fetchApi.get(`/${name}/${id}`)
                return data
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...getAll(),
        ...getDetail()
    };

    function getAll() {
        const { pending, fulfilled, rejected } = extraActions.getAll

        return {
            [pending]: (state) => {
                state.all = {
                    error: false,
                    loading: true
                }
            },
            [fulfilled]: (state, action) => {
                state.all = {
                    data: action.payload,
                    error: false,
                    loading: false
                }
            },
            [rejected]: (state, action) => {
                state.all = {
                    data: action.error,
                    loading: false,
                    error: true
                }
            }
        }
    }

    function getDetail() {
        const { pending, fulfilled, rejected } = extraActions.getDetail

        return {
            [pending]: (state) => {
                state.detail = {
                    error: false,
                    loading: true
                }
            },
            [fulfilled]: (state, action) => {
                state.detail = {
                    data: action.payload,
                    error: false,
                    loading: false
                }
            },
            [rejected]: (state, action) => {
                state.detail = {
                    data: action.error,
                    loading: false,
                    error: true
                }
            }
        }
    }
}