import { RenderBlockState, Page } from "./interfaces"
import { v4 as uuidv4 } from 'uuid';

function generateUUID() {
  return uuidv4();
}

const exampleData: RenderBlockState[] = [
  {
    id: '7e46e7f9-58f2-4f21-8448-82b0f86cde11',
    type: 'blockquote',
    value: 'Notion is a single space where you can think, write, and plan.Capture thoughts, manage projects, or even run an entire company — and do it exactly the way you want.'
  },
  {
    id: '035da4f9-3b08-4083-b2e3-3cf1b88197cb',
    type: 'paragraph',
    value: 'It includes a tool for "clipping" content from webpages.It helps users schedule tasks, manage files, save documents, set reminders, keep agendas, and organizetheir work.LaTeX support allows writing and pasting equations in block or inline form.'
  }
];


const exampleBlue: RenderBlockState[] = [
  {
    id: "898933",
    type: "blockquote",
    value: "I don’t understand the beauty of a Picasso painting. Couldn’t I paint something like that? - Yatora",
  },
  {
    id: "1234-e3e",
    type: "paragraph",
    value: "Second-year high school student Yatora Yaguchi is bored with his normal life. He studies well and plays around with his friends, but in truth, he does not enjoy either of those activities. Bound by norms, he secretly envies those who do things differently.",
  },
  {
    id: "12333430-90",
    type: "paragraph",
    value: "That is until he discovers the joy of drawing. When he sees a painting made by a member of the Art Club, Yatora becomes fascinated with the colors used in it. Later, in an art exercise, he tries to convey his language without words but instead through painting. After that experience, Yatora finds himself so invested in art that he decides that it is what he wants to do for a living. But there stand multiple obstacles in his way: his parents who are hesitant over his unique choices, his more experienced peers, and the study of a subject much deeper than he initially expected.",
  }
]


export const pagexample: Page = {
  id: `${generateUUID()}`,
  type: "page",
  properties: {
    title: "Notion"
  },
  content: exampleData as RenderBlockState
}

const pagexample2: Page = {
  id: `${generateUUID()}`,
  type: "page",
  properties: {
    title: "Blue Period"
  },
  content: exampleBlue
}

export const blankpage: Page = {
  id: `${generateUUID()}`,
  type: "page",
  properties: {
    title: "Untitled"
  },
  content: []
}

export const pagesexample = [pagexample, pagexample2];
