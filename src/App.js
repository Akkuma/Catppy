import React from 'react';
import { connect } from 'react-redux';
import Cards, { Card } from 'react-swipe-deck';
import './App.css';
import { love, hate } from  './actions/vote';
import { nextCat, gifLoading} from './actions/gif';


function render({ dispatch, catUrl, imageId, isGifLoading }) {
  const lover = love(dispatch);
  const hater = hate(dispatch);

  let img = null;
  if (catUrl) {
    const imgCard = [<Card onSwipeLeft={_ => hater(imageId)} onSwipeRight={_ => lover(imageId)} key={imageId}>
      <img alt="cat" className="App__gif" src={catUrl} onError={_ => nextCat(dispatch)} onLoad={_ => dispatch(gifLoading(false))}/>
    </Card>];
    
    img = <Cards size={['100%', '100%']} cardSize={['100%', '100%']}>{imgCard}</Cards>
  }

  return (
    <main>
      <section className="App">
        <header className="App__title">
          <h1>The Catppiest Place on Earth</h1>
        </header>
        
        <div className="App__gif-container">
          <span style={isGifLoading ? {} : {display:'none'}}>Loading...</span>
          <div className="App__gif-loading-container" style={isGifLoading ? {display:'none'} : {}}>
            {img}
          </div>
        </div>

        <button className="App__vote App__vote--love" disabled={!catUrl} onClick={() => lover(imageId)}>Love It</button>
        <button className="App__vote App__vote--hate" disabled={!catUrl} onClick={() => hater(imageId)}>Hate It</button>
      </section>
    </main>
  );
}

function mapStateToProps (state, ownProps) {
  return {
    catUrl: state.catUrl,
    imageId: state.imageId,
    isGifLoading: state.isGifLoading,
  }
}

export default connect(mapStateToProps)(render);
