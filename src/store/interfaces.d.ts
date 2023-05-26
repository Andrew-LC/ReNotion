export interface RenderBlockState {
  id?: string,
  type?: string;
  value: string;
}


export interface Page {
  id: string,
  title: string,
  content: RenderBlockState[]
}

