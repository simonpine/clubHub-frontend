import { useState, useEffect } from 'react';

function Bg({ rot }) {
  const [circle1, setCircle1] = useState('-150px')
  const [circle2, setCircle2] = useState('-150px')
  const [rotation, setRotation] = useState('')

  useEffect(() => {
    if (rot) {
      setRotation('rota')
    }
  }, [])
  window.addEventListener("scroll", () => {
    const pix = window.pageYOffset
    setCircle1(`${(pix * 1.7) - 150}px`)
    setCircle2(`${(pix * 1.7) - 150}px`)

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
      <div style={{
        width: '700px',
        height: '700px',
        bottom: '-400px',
        left: circle2,
        backgroundColor: '#4F6273',
      }} className='circle'></div>
    </div>
  );
}

export default Bg;