"use client";
import { Avatar, TypographyStylesProvider } from "@mantine/core";
import { useEffect } from "react";
// import highlight.js languanges to register
import hljs from "highlight.js/lib/core";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import css from "highlight.js/lib/languages/css";
import go from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import objectivec from "highlight.js/lib/languages/objectivec";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import r from "highlight.js/lib/languages/r";
import swift from "highlight.js/lib/languages/swift";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
// import highlight.js style
import "highlight.js/styles/atom-one-dark.css";
import {
  to12HourTimeString,
  toDateDMYString,
} from "../../../../../../utils/date";
// import "highlight.js/styles/atom-one-light.css";
import { generateHTML } from "@tiptap/html";
import { IoPersonCircleOutline } from "react-icons/io5";
import { editorExtensions } from "../../../../../../components/editor/hook";

hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("php", php);
hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("r", r);
hljs.registerLanguage("obj", objectivec);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("go", go);

interface NoteData {
  author: {
    id: number;
    username: string;
    avatar_url: string;
  };
  note: {
    title: string;
    content: string;
    created_at: string;
  };
}

interface ArticleProps {
  data: NoteData;
}

export default function Article(props: ArticleProps) {
  const {
    data: { author, note },
  } = props;

  const created_at_date = new Date(note.created_at);
  const created_at_dmy = toDateDMYString(created_at_date);
  const created_at_hours = to12HourTimeString(created_at_date);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const dataJson = JSON.parse(note.content);
  const dataHtml = generateHTML(dataJson, editorExtensions);

  return (
    <TypographyStylesProvider>
      <article id="note-view" className="flex flex-col gap-10">
        <header className="flex flex-col">
          <div className="mb-10 flex">
            <h1 className="text-5xl">{note.title}</h1>
          </div>
          <div className="flex items-center border-x-0 border-y border-solid border-mantine-gray-3  py-1 text-mantine-dimmed dark:border-mantine-dark-4">
            <div className="flex items-center gap-2 font-semibold">
              <Avatar
                radius="xl"
                size="lg"
                classNames={{
                  root: "h-auto w-auto min-w-0 min-h-0",
                  placeholder: "bg-transparent text-mantine-gray-5", //"bg-transparent",
                  image: "h-[2.375rem] w-[2.375rem]",
                }}
                src={null}
              >
                <IoPersonCircleOutline size={40} />
              </Avatar>
              {author.username}
            </div>
            <div className="ml-auto flex flex-col text-right ">
              <span>{created_at_dmy}</span>
              <span>{created_at_hours}</span>
            </div>
          </div>
        </header>
        <section
          id="note-content"
          dangerouslySetInnerHTML={{
            __html: dataHtml,
          }}
        />
        <footer></footer>
      </article>
    </TypographyStylesProvider>
  );
}
