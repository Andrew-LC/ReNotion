import { atom } from 'recoil'

interface RenderBlockState {
  id?: string,
  type?: string;
  value: string;
}

const exampleData: RenderBlockState[] = [
  {
    type: 'blockquote',
    value: 'Notion is a single space where you can think, write, and plan. Capture thoughts, manage projects, or even run an entire company — and do it exactly the way you want.'
  },
  {
    type: 'paragraph',
    value: 'It includes a tool for "clipping" content from webpages. It helps users schedule tasks, manage files, save documents, set reminders, keep agendas, and organize their work. LaTeX support allows writing and pasting equations in block or inline form.'
  }
];



const blockState = atom({
  key: 'blockState',
  default: exampleData
})


const valueState = atom({
  key: 'valueState',
  default: ''
})


export { blockState, valueState }
