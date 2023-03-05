import { Circles, ColorRing } from "react-loader-spinner"


export function CircularLoadingWithMultipleCircle(){
    return  <Circles
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
}

export function ColorRingLoading() {
  return  <ColorRing
  visible={true}
  height="25"
  width="40"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
  
}