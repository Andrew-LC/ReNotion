import { atom } from 'recoil'

interface RenderBlockState {
  id?: string,
  type?: string;
  value: string;
}

const exampleData: RenderBlockState[] = [
  {
    id: '7e46e7f9-58f2-4f21-8448-82b0f86cde11',
    type: 'blockquote',
    value: 'Notion is a single space where you can think, write, and plan. Capture thoughts, manage projects, or even run an entire company — and do it exactly the way you want.'
  },
  {
    id: '035da4f9-3b08-4083-b2e3-3cf1b88197cb',
    type: 'paragraph',
    value: 'It includes a tool for "clipping" content from webpages. It helps users schedule tasks, manage files, save documents, set reminders, keep agendas, and organize their work. LaTeX support allows writing and pasting equations in block or inline form.'
  }
];



const blockState = atom({
  key: 'blockState',
  default: []
})


const valueState = atom({
  key: 'valueState',
  default: ''
})


const menuState = atom({
  key: 'menuState',
  default: {
    isActive: false,
    x: 0,
    y: 0
  }
})


export { blockState, valueState, menuState }
