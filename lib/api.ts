import axios from "axios";
import type { Note, CreateNoteRequest, UpdateNoteRequest, NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
    },
});


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
  totalNotes: number;
}

export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
    tag?: NoteTag;
}

export const noteService = {
    fetchNotes: async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
        try {
            const response = await api.get<FetchNotesResponse>('/notes', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching notes:', error);
            throw new Error('Failed to fetch notes');
        }
    },

    fetchNoteById: async (id: string): Promise<Note> => {
        try {
            const response = await api.get<Note>(`/notes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching note ${id}:`, error);
            throw new Error('Failed to fetch note');
        }
    },

    createNote: async (noteData: CreateNoteRequest): Promise<Note> => {
        try {
            const response = await api.post<Note>('/notes', noteData);
            return response.data;
        } catch (error) {
            console.error('Error creating note:', error);
            throw new Error('Failed to create note');
        }
    },

    updateNote: async (id: string, noteData: UpdateNoteRequest): Promise<Note> => {
        try {
            const response = await api.patch<Note>(`/notes/${id}`, noteData);
            return response.data;
        } catch (error) {
            console.error(`Error updating note ${id}:`, error);
            throw new Error('Failed to update note');
        }
    },

    deleteNote: async (id: string): Promise<Note> => {
        try {
            const response = await api.delete<Note>(`/notes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting note ${id}:`, error);
            throw new Error('Failed to delete note');
        }
    },
};

export const fetchNotes = noteService.fetchNotes;
export const fetchNoteById = noteService.fetchNoteById;
export const createNote = noteService.createNote;
export const updateNote = noteService.updateNote;
export const deleteNote = noteService.deleteNote;