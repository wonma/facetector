import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import ImageSearchForm from './components/ImageSearchForm/ImageSearchForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
// import Clarifai from 'clarifai'
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

// const app = new Clarifai.App({
//   apiKey: '61feadaf01f14a0b9f76fc02eaf5bf7d'
// });

const initialState = {
  input: '',
  imgUrl: '',
  box: [],  // coordinates
  loading: 'none', // loading svg
  noImgAtStart: 'none',
  imgLoaded: false,
  err: 'noErr',
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
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

  // sign in API request하면서 user정보를 res(밑의 argument에서는 'data')로 받아옴
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
    }})
  }

  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  // img load 실패 시 --> default 에러 문구를 안보이게 한다.
  onImgLoadErr = () => {
    document.querySelector('#img-box').classList.add('hide-text')
  }

  // img load 성공 시 --> default 에러 문구 안보이게 하는 것을 해제한다.
  onImgLoad = () => {
    document.querySelector('#img-box').classList.remove('hide-text')
  }

  onRouteChange = (routeName) => {
    this.setState({ route: routeName })
  }

  // lot out 버튼 누르면 setState가 첫 상태로 리셋 됨
  onLogOut = () => {
    this.setState(initialState)
  }

  onClickEvent = () => {
    
    this.setState({
      imgUrl: this.state.input, // input 박스에 입력된 것 최종적으로 imgUrl state에 업뎃되게.
      noImgAtStart: 'block',    // 박스 전체 div 보이게 (이거의 영향력을 아직 잘 모르겠음)
      box: [],          // box표시 없게
      loading: 'block', // loading 아이콘 보이게
      err: 'noErr'      // no-result박스가 아닌 result박스가 보이게 (result박스는 이미지, 로딩바, 바운딩박스 포함)
    })

    // app.models.predict('a403429f2ddf4b49b307e318f00e528b', this.state.input)
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input // id정보 보내서 해당 id인 유저의 database내 entries 값만 영향미치게
      })
    }).then(result => result.json())
      .then(response => {
        if (response) {
          this.updateBoxsize(this.calculatePosition(response))

          this.setState({ 
            loading: 'none', // loading 아이콘 안보이게
            err: 'noErr' // 대신 이미지 검색 결과 박스란은 보이게
          })

          fetch('http://localhost:3000/image', { // 특정 유저의 db의 entries값 increment하는 기능
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id // id정보 보내서 해당 id인 유저의 database내 entries 값만 영향미치게
            })
          }).then(response => response.json())
            .then(data => {
              this.setState(Object.assign(this.state.user, {entries: data}))
            })
            .catch(console.log)

        }
      })
      .catch(err => {
        console.log('Oops! Error Occurred',err)
        this.setState({err: 'err'})  // 이미지 좌표 패칭에 실패하면 err state로 된다.
      })
  }


  render() {
    return (
      <div className='App'>
        <Particles className='particles'
          params={particleOptions}
        />
        <Header           // 아래 두 개를 Navigation 컴포넌트에 전달하고 있음
          routeState={this.state.route} // home route state가 default인데, 아니게되면 log out 안보이도록.
          onRouteChange={this.onRouteChange} // log out버튼에 셋팅되어 있음. 누르면 signIn route로 setState되도록.
          onLogOut={this.onLogOut}
        /> 
        {
          this.state.route === 'signin' || this.state.route === 'signup' 
            ? <Hero           // 아래 세 개를 signIn, singUp 컴포넌트에 전달하고 있음

                loadUser={this.loadUser} // signIn request 성공하면 트리거되어서 user state에 정보 받아오도록
                routeState={this.state.route}  // (signIn route가 default) 
                onRouteChange={this.onRouteChange} // 가입하러가기 누르면 signUp 화면 렌더 + signIn 누르면 home 화면 렌더

              />
          : <div>
              <Rank name={this.state.user.name} rank={this.state.user.entries} />
              <ImageSearchForm
                onInputChange={this.onInputChange}
                onClickEvent={this.onClickEvent} />
              <FaceRecognition
                imageUrl={this.state.imgUrl}
                boxPosition={this.state.box}
                isLoading={this.state.loading}
                isError={this.state.err}
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
