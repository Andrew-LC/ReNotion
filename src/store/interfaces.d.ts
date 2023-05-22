export interface RenderBlockState {
  id?: string,
  type?: string;
  value: string;
}


export interface Page {
  id: string,
  type: string,
  properties: {
    title: string,
  },
  content: RenderBlockState[]
}

