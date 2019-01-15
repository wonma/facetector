import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import ImageSearchForm from './components/ImageSearchForm/ImageSearchForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import 'tachyons'

const particleOptions = {
  particles: {
    number: {
      value: 50,
      density: {
      enable: true,
      value_area: 800
      }
    },
    size: {
      value: 3
    },
    color: {
      value: '#a7f9f4'
    },
    line_linked: {
      color: '#a7f9f4'
    }
  }
}

const app = new Clarifai.App({
  apiKey: '61feadaf01f14a0b9f76fc02eaf5bf7d'
});


class App extends Component {
  constructor() {
    super()
    this.state = {
      input:'',
      imgUrl:'',
      box: [],  // coordinates
      loading: 'none', // loading svg
      noImgAtStart: 'none', 
      imgLoaded: false,
      err: 'noErr',
      route: 'signin'
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000') // 헉..... 3001로 했었음..
  //     .then(response => response.json())
  // }


  calculatePosition = (resp) => {
    const arrayOfBoxes = []
    const img = document.querySelector('#targetImg')
    const width = Number(img.width)
    const height = Number(img.height)

    resp.outputs[0].data.regions.forEach(eachRegion => {
      const { top_row, left_col, bottom_row, right_col } = eachRegion.region_info.bounding_box
      const caculatedResult = {
        top: height * top_row,
        right: width - width * right_col,
        bottom: height - height * bottom_row,
        left: width * left_col
      }
      arrayOfBoxes.push(caculatedResult)
    })
    
    return arrayOfBoxes
  }

  updateBoxsize = (box) => {
    this.setState({ box: box})
  }

  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  onImgLoadErr = () => {
    document.querySelector('#img-box').classList.add('hide-text')
  }

  onImgLoad = () => {
    document.querySelector('#img-box').classList.remove('hide-text')
  }

  onClickEvent = () => {
    
    this.setState({
      imgUrl: this.state.input,
      noImgAtStart: 'block',
      box: [],
      loading: 'block',
      err: 'noErr'
    })

    app.models.predict('a403429f2ddf4b49b307e318f00e528b', this.state.input)
      .then(response => {
        if (response) {
          this.updateBoxsize(this.calculatePosition(response))
          this.setState({ loading: 'none', err: 'noErr' })
        }
      })
      .catch(err => {
        console.log('Oops! Error Occurred',err)
        this.setState({err: 'err'})
      })
  }

  onRouteChange = (routeName) => {
    this.setState({ route: routeName})
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles'
          params={particleOptions}
        />
        <Header routeState={this.state.route} onRouteChange={this.onRouteChange} />
        {
          this.state.route === 'signin' || this.state.route === 'signup' 
          ? <Hero routeState={this.state.route} onRouteChange={this.onRouteChange} />
          : <div>
              <Rank />
              <ImageSearchForm
                onInputChange={this.onInputChange}
                onClickEvent={this.onClickEvent} />
              <FaceRecognition
                imageUrl={this.state.imgUrl}
                boxPosition={this.state.box}
                isLoading={this.state.loading}
                onError={this.state.err}
                noImgAtStart={this.state.noImgAtStart}
                onImgLoadErr={this.onImgLoadErr}
                onImgLoad={this.onImgLoad} />
            </div>
        }        
      </div>
    );
  }
}



export default App;
