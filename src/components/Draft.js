
import React, { Component } from 'react';

// Draft-Js
import { convertFromRaw, EditorState } from 'draft-js'
// eslint-disable-next-line import/no-unresolved
import Editor, { composeDecorators } from 'draft-js-plugins-editor'

// Plugins
import createImagePlugin from 'draft-js-image-plugin';
// eslint-disable-next-line import/no-unresolved
import createFocusPlugin from 'draft-js-focus-plugin';
// eslint-disable-next-line import/no-unresolved
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
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

const focusPlugin = createFocusPlugin()
const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(
  focusPlugin.decorator,
  blockDndPlugin.decorator
)
const imagePlugin = createImagePlugin({ decorator })

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
  persistPlugin()
]

/* eslint-disable */
const initialState = {
    "entityMap": {
        "0": {
            "type": "image",
            "mutability": "IMMUTABLE",
            "data": {
                "src": "http://via.placeholder.com/350x150"
            }
        }
    },
    "blocks": [{
        "key": "9gm3s",
        "text": "You can have images in your text field which are draggable. Hover over the image press down your mouse button and drag it to another position inside the editor.",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
    }, {
        "key": "ov7r",
        "text": " ",
        "type": "atomic",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [{
            "offset": 0,
            "length": 1,
            "key": 0
        }],
        "data": {}
    }, {
        "key": "e23a8",
        "text": "You can checkout the alignment tool plugin documentation to see how to build a compatible block plugin …",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
    }]
};
/* eslint-enable */

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


