// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import css from "./NoteForm.module.css";

// import { input, Form, Formik, ErrorMessage } from "formik";
// import type { FormikHelpers } from "formik";
// import * as Yup from "yup";
// import { createNote } from "../../lib/api";
// import toast from "react-hot-toast";
// import type { NoteTag } from "../../types/note";

// const noteSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title must be min 3")
//     .max(50, "Title must be max 50")
//     .required("Title is required"),
//   content: Yup.string().max(500, "Content must be max 500"),
//   tag: Yup.string()
//     .required("Tag is required")
//     .oneOf(
//       ["Todo", "Work", "Personal", "Meeting", "Shopping"],
//       "Tag must be one of: Todo, Work, Personal, Meeting, Shopping"
//     ),
// });

// interface NoteFormProps {
//   onClose: () => void;
// }

// interface FormValues {
//   title: string;
//   content: string;
//   tag: NoteTag;
// }

// const initialFormValues: FormValues = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

// export default function NoteForm({ onClose }: NoteFormProps) {
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       toast.success("Note created");
//       onClose();
//     },
//   });

//   const handleSubmit = (
//     values: FormValues,
//     actions: FormikHelpers<FormValues>
//   ) => {
//     mutation.mutate(values);
//     actions.resetForm();
//   };

//   return (
//     <Formik
//       initialValues={initialFormValues}
//       onSubmit={handleSubmit}
//       validationSchema={noteSchema}
//     >
// <Form className={css.form}>
//   <div className={css.formGroup}>
//     <label htmlFor="title">Title</label>
//     <input id="title" type="text" name="title" className={css.input} />
//     <ErrorMessage component="span" name="title" className={css.error} />
//   </div>

//   <div className={css.formGroup}>
//     <label htmlFor="content">Content</label>
//     <input
//       as="textarea"
//       id="content"
//       name="content"
//       rows={8}
//       className={css.textarea}
//     />
//     <ErrorMessage component="span" name="content" className={css.error} />
//   </div>

//   <div className={css.formGroup}>
//     <label htmlFor="tag">Tag</label>
//     <input as="select" id="tag" name="tag" className={css.select}>
//       <option value="Todo">Todo</option>
//       <option value="Work">Work</option>
//       <option value="Personal">Personal</option>
//       <option value="Meeting">Meeting</option>
//       <option value="Shopping">Shopping</option>
//     </input>
//     <ErrorMessage component="span" name="tag" className={css.error} />
//   </div>

//   <div className={css.actions}>
//     <button type="button" className={css.cancelButton} onClick={onClose}>
//       Cancel
//     </button>
//     <button
//       type="submit"
//       className={css.submitButton}
//       disabled={mutation.isPending}
//     >
//       Create note
//     </button>
//   </div>
// </Form>
//     </Formik>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { NewNoteData } from "@/types/note";
import { categories } from "@/app/notes/filter/@sidebar/default";
import { useNoteStore, initialDraft } from "@/lib/store/noteStore";

const NoteForm = () => {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: NewNoteData) => createNote(data),
    onSuccess: () => {
      router.push("/notes/filter/all");
      clearDraft();
    },
  });

  const handleCancel = () => router.push("/notes/filter/all");

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNoteData;
    mutate(values);
    console.log(values);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          onChange={(e) => setDraft({ title: e.target.value })}
          value={draft.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          onChange={(e) => setDraft({ content: e.target.value })}
          value={draft.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value })}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
