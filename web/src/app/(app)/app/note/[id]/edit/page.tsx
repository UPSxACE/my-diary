"use client";
import { Button, TextInput } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import revalidateNoteCache from "../../../../../../actions/revalidate-note-cache";
import useApi from "../../../../../../api/hook";
import ErrorAlert from "../../../../../../components/alerts/error-alert";
import Editor from "../../../../../../components/editor";
import useEditorInstance from "../../../../../../components/editor/hook";
import AppPageContainer from "../../../../../../components/page-containers/app-page-container";
import useOnce from "../../../../../../hooks/use-once";
import useTimeout from "../../../../../../hooks/use-timeout";
export default function EditNotePage({ params }: { params: { id: number } }) {
  const [loading, setLoading] = useState(true);
  const { done, isDone } = useOnce();

  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      content_raw: "",
    },
    validate: {
      title: (val) => (val.length < 3 ? "Title is too short" : null),
      content: (val) => (val.length < 1 ? "The content cannot be empty" : null),
      content_raw: (val) =>
        val.length < 1 ? "The content cannot be empty" : null,
    },
  });

  const editor = useEditorInstance({
    editable: false,
    content: "",
    onUpdate: ({ editor }) => {
      const json = JSON.stringify(editor.getJSON());
      const rawText = editor.getText();
      form.setFieldValue("content", json);
      form.setFieldValue("content_raw", rawText);
    },
  });

  const api = useApi();
  const router = useRouter();
  const timeout = useTimeout(4000);

  function handleSave(values: typeof form.values) {
    if (editor) {
      setLoading(true);
      editor.setEditable(false);
      api
        .putNoteById(params.id, values)
        .then(async (res) => {
          await revalidateNoteCache(params.id);
          router.push("/app/note/" + params.id);
        })
        .catch((e) => {
          // TODO: Error handling...
          console.log(e);
        });
    }
  }

  function handleSaveError(err: FormErrors) {
    timeout(() => {
      form.clearFieldError("content");
      form.clearFieldError("content_raw");
    });
  }

  useEffect(() => {
    if (editor?.isActive && !isDone) {
      api
        .getNoteById(params.id)
        .then((result) => {
          if (loading) {
            const { author, note } = result;
            form.setFieldValue("title", note.title);
            setLoading(false);
            editor?.setEditable(true);
            const dataJson = JSON.parse(note.content);
            form.setFieldValue("content", note.content);
            form.setFieldValue("content_raw", note.content_raw);
            editor?.commands.setContent(dataJson);
          }
        })
        .catch(() => {
          // TODO: handle error; display message notification
        });

      done();
    }
  }, [api, params, loading, editor, form, isDone, done]);

  return (
    <AppPageContainer
      secondary
      className="flex flex-col gap-3 p-4  sm:p-8 xl:gap-4 xl:p-12"
    >
      <header className="flex flex-col flex-wrap items-center gap-3 xs:flex-row">
        <h1 className="m-0 w-full text-3xl xs:w-auto">Update note</h1>
        <section
          id="action-buttons"
          className="flex w-full gap-4 xs:ml-auto xs:w-auto"
        >
          <Button
            component={Link}
            href={"/app/note/" + params.id}
            className="flex-1 xs:flex-auto"
            variant="default"
          >
            Discard
          </Button>
          <Button
            className="flex-1 xs:flex-auto"
            type="submit"
            form="new-note"
            loading={loading}
          >
            Save Note
          </Button>
        </section>
      </header>
      <article className="flex flex-1 flex-col">
        <form
          id="new-note"
          onSubmit={form.onSubmit(handleSave, handleSaveError)}
          className="relative flex flex-1 flex-col gap-3 xl:gap-4"
        >
          <ErrorAlert
            title={String(form.errors.content || form.errors.content_raw)}
            visible={Boolean(form.errors.content || form.errors.content_raw)}
          />
          <TextInput
            radius="xs"
            size="lg"
            classNames={{ input: "text-xl" }}
            placeholder={loading ? "Loading..." : "Note Title"}
            value={form.values.title}
            onChange={(event) => {
              form.setFieldValue("title", event.target.value);
            }}
            error={form.errors.title}
            disabled={loading}
          />

          <Editor editor={editor} />
        </form>
      </article>
    </AppPageContainer>
  );
}
