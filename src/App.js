import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header'
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
      },
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
      imgUrl:''
    }
  }
    //콜백 될 기능 정의
  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

    //콜백 될 기능 정의
  onClickEvent = async () => {
    await this.setState({
      imgUrl: this.state.input
    })

    app.models.predict('eeed0b6733a644cea07cf4c60f87ebb7', this.state.imgUrl).then(
      function (response) {
        console.log(response)
      },
      function (err) {
        // there was an error
      }
    );

  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles'
          params={particleOptions}
        />
        <Header />  
        <Rank />  
        <ImageSearchForm 
          onInputChange={this.onInputChange} 
          onClickEvent={this.onClickEvent}/>
        <FaceRecognition 
          imageUrl={this.state.imgUrl} />
      </div>
    );
  }
}



export default App;
