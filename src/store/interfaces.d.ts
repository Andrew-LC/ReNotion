export interface RenderBlockState {
  id?: string,
  type?: string;
  value: string;
}


export interface Page {
  page_id: string,
  owner_id: string
  title: string,
  content: RenderBlockState[]
}

