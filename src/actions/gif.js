export async function get() {
  const _ = await fetch(`http://thecatapi.com/api/images/get?api_key=Mjc3MTAz&format=xml`);
  const text = await _.text();
  const xml = (new window.DOMParser()).parseFromString(text, "text/xml");
  // response->data->images->image
  let image = xml.firstElementChild
  while (image.tagName !== 'image') image = image.firstElementChild

  const props = image.children;
  const data = { url: '', id: '' };
  for (let i = 0; i < props.length; ++i) {
    const { textContent: text, tagName } = props[i];
    if (data[tagName] !== undefined) {
      data[tagName] = text;
    }
  }

  return data;
}

export async function nextCat(dispatch) {
  dispatch(gifLoading(true));
  const { url: catUrl, id: imageId } = await get();
  dispatch({ type: 'CHANGE_CAT', catUrl, imageId});
}

export function touchStart(touch) {
  const { pageX, pageY } = touch;
  return { type: 'GIF_TOUCH_START', pageX, pageY};
}

export function touchMove(touch) {
  const { pageX, pageY } = touch;
  return { type: 'GIF_TOUCH_MOVE', pageX, pageY};
}

export function touchEnd() {
  return { type: 'GIF_TOUCH_END' };
}

export function touchCancel() {
  return { type: 'GIF_TOUCH_CANCEL' };
}

export function gifLoading(isLoading) {
  return { type: 'GIF_LOADING', isGifLoading: isLoading };
}