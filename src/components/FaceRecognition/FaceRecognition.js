import React from 'react'
import BoundingBoxes from '../BoundingBoxes/BoundingBoxes'
import './FaceRecognition.css'

const FaceRecognition = ({ onRouteChange, name, imageUrl, boxPosition, foundFaces, isLoading, isError, noImgAtStart, onImgLoad, onImgLoadErr }) => {
    return (
            <div className='resultBox'>
                <div className='center' style={{ display: noImgAtStart }} >
                { isError === 'noErr' // 이미지 좌표 fetching실패 시 onError값이 err가 되며 대체문구가 렌더된다
                    // (a) Failed Result
                    ? <div className='search-result' > 
                    
                        <div id='img-box'>
                            <img className='search-result__img' //(display:block) 
                                id='targetImg' 
                                onLoad={onImgLoad}     // -->이건 이미지가 다 로딩되어 떴을 때를 의미한다
                                onError={onImgLoadErr} // --> 여기서 'onError' attribute의 존재는 img자체에 error가 났을 시
                                src={imageUrl}         //     onImgLoadErr를 작동시키라는 뜻이다 (div #img-box의 display에 영향을 줌)
                                alt='detection result' 
                                width='500px' 
                                height='auto' />
                        </div>
                        
                        <div className='loading' style={{display: isLoading}}>
                            <svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
                                <path fill="#1ff4e4" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
                                c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z" transform="rotate(177.16 50 50)">
                                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="2s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                                </path>
                                <path fill="#1ff4e4" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
                                c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z" transform="rotate(-354.321 50.0003 50.0003)">
                                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="-360 50 50" repeatCount="indefinite"></animateTransform>
                                </path>
                                <path fill="#1ff4e4" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
                                    L82,35.7z" transform="rotate(177.16 50 50)">
                                        <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="2s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                                    </path>
                            </svg>
                        </div>

                    <p id='foundFaces' className='found-faces'> +{foundFaces} </p>

                        <BoundingBoxes boxPosition={boxPosition} />
                      </div>

                    // (b) No Result
                    : <div className='search-noResult'>
                        {'Please check the image address.'}
                      </div>
                    
                }
            </div>
                {name === 'guest'
                    ? <a className='goRegister' onClick={() => onRouteChange('signup')}>{'Register & Save Score!'}</a>
                    : <p style={{ display: 'none' }}> </p>
                }
            </div>

            
    )
}

export default FaceRecognition