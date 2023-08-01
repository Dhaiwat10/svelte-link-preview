// add at the beginning of the file :
import json from '@rollup/plugin-json'

//...

// under the plugin line :
plugins: [
  json({
    compact: true
  }),
]
//...