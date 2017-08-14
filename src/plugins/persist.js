import { convertToRaw } from 'draft-js'

export default () => ({
  onChange: (editorState) => {
    const content = editorState.getCurrentContent()
    const raw = convertToRaw(content)
    console.log('TODO: Perist', raw)
    return editorState
  }
})
