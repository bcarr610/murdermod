'use strict';

module.exports = bytes => {
  return bytes > 1024 // KB
    ? (
      bytes > 1048576 // MB
        ? (
          bytes > 1073741824 // GB
            ? `${(bytes / Math.pow(1024, 3)).toFixed(2)} GB`
            : `${(bytes / Math.pow(1024, 2)).toFixed(2)} MB`
        )
        : `${(bytes / 1024).toFixed(2)} KB`
    )
    : `${bytes} Bytes`
}
