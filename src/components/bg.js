import { useState, useEffect } from 'react';
// import circle1Png from '../img/Untitled-1.png'
// import circle2Png from '../img/Untitled-2.png'

function Bg({ rot }) {
  const [circle1, setCircle1] = useState('-400px')
  const [circle2, setCircle2] = useState('-400px')
  const [rotation, setRotation] = useState('')

  useEffect(() => {
    if (rot) {
      setRotation('rota')
    }
  }, [rot])
  window.addEventListener("scroll", () => {
    const pix = window.pageYOffset
    setCircle1(`${(pix * 0.7) - 400}px`)
    setCircle2(`${(pix * 0.7) - 400}px`)

  });
  return (
    <div className={'bgCont ' + rotation} >
      <div className="BlurBack"></div>
      <div style={{
        width: '800px',
        height: '800px',
        top: '-450px',
        right: circle1,
        backgroundColor: '#d6ad7b',
      }} className='circle'></div>
     
      {/* <img className='circle' style={{
        width: '1500px',
        height: '1500px',
        top: '-700px',
        right: circle1,
      }} src={circle1Png} alt='backgraoundCircle' /> */}
      <div style={{
        width: '700px',
        height: '700px',
        bottom: '-400px',
        left: circle2,
        backgroundColor: '#4F6273',
      }} className='circle'></div>
      {/* <img className='circle' style={{
        width: '1500px',
        height: '1500px',
        bottom: '-700px',
        left: circle2,
      }} src={circle2Png} alt='backgraoundCircle'  /> */}
    </div>
  );
}

export default Bg;