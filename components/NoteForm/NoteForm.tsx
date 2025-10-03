
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';
import type { NoteTag, CreateNoteRequest } from '@/types/note';
import css from './NoteForm.module.css';

export interface NoteFormValues {
    title: string;
    content: string;
    tag: NoteTag;
}

export interface NoteFormProps {
    onSubmit: (values: CreateNoteRequest) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
    initialValues?: Partial<NoteFormValues>;
}

const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title must be at most 50 characters')
      .required('Title is required'),
    content: Yup.string()
      .max(500, 'Content must be at most 500 characters'),
    tag: Yup.string()
      .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const)
      .required('Tag is required'),
});

const defaultInitialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
};

function NoteForm({ onSubmit, onCancel, isSubmitting = false, initialValues = {} }: NoteFormProps) {
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
    },
  });

  const handleSubmit = (values: NoteFormValues) => {
    createNoteMutation.mutate(values);
  };

  const combinedInitialValues = { ...defaultInitialValues, ...initialValues };

    return (
        <Formik
          initialValues={combinedInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
            {({ isValid, dirty }) => (
                <Form className={css.form}>
                    <div className={css.formGroup}>
                        <label htmlFor="title">Title</label>
                        <Field
                          id="title"
                          type="text"
                          name="title"
                          className={css.input}
                    />
                    <ErrorMessage name="title" component="span" className={css.error} />
                    </div>

                    <div className= {css.formGroup}>
                      <label htmlFor="content">Content</label>
                      <Field
                        as="textarea"
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                      />
                      <ErrorMessage name="content" component="span" className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="tag">Tag</label>
                        <Field as="select" id="tag" name="tag" className={css.select}>
                            <option value="Todo">Todo</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </Field>
                        <ErrorMessage name="tag" component="span" className={css.error} />
                    </div>

                    <div className={css.actions}>
                        <button 
                          type="button"
                          className={css.cancelButton}
                          onClick={onCancel}
                          disabled={createNoteMutation.isPending}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className={css.submitButton}
                            disabled={!isValid || !dirty || createNoteMutation.isPending}
                          >
                            {createNoteMutation.isPending ? 'Creating...' : 'Create note'}
                          </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default NoteForm;