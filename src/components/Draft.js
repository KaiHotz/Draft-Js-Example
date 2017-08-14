
import React, { Component } from 'react';

// Draft-Js
import { convertFromRaw, EditorState } from 'draft-js'
// eslint-disable-next-line import/no-unresolved
import Editor, { composeDecorators } from 'draft-js-plugins-editor'

// Plugins
// eslint-disable-next-line import/no-unresolved
import createImagePlugin from 'draft-js-image-plugin'
// eslint-disable-next-line import/no-unresolved
import createVideoPlugin from 'draft-js-video-plugin'
// eslint-disable-next-line import/no-unresolved
import createFocusPlugin from 'draft-js-focus-plugin'
// eslint-disable-next-line import/no-unresolved
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin'
// eslint-disable-next-line import/no-unresolved
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin'
// eslint-disable-next-line import/no-unresolved
import persistPlugin from '../plugins/persist'

//Buttons
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons'

// Styles
// eslint-disable-line import/no-unresolved
import '../styles/editorStyles.css'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import 'draft-js-image-plugin/lib/plugin.css'

//Sample Data
import initialState from '../sampleData'

const focusPlugin = createFocusPlugin()
const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(
  focusPlugin.decorator,
  blockDndPlugin.decorator
)

const imagePlugin = createImagePlugin({ decorator })
const videoPlugin = createVideoPlugin({ decorator })

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
  ]
})
const { InlineToolbar } = inlineToolbarPlugin

const plugins = [
  inlineToolbarPlugin,
  blockDndPlugin,
  focusPlugin,
  imagePlugin,
  videoPlugin,
  persistPlugin()
]



class DraftEditor extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState))
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div className='editor' onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <InlineToolbar />
      </div>
    );
  }
}

export default DraftEditor





