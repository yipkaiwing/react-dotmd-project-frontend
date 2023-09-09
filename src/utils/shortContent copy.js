const shortContent = (content, previewlength) => {
  const maxLength = 100;
  if (content.length > maxLength) { 
    return content.substring(0, previewlength || maxLength) + '...';
  } else {
    return content;
  }
}

export default shortContent;