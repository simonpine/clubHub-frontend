import img1 from '../img/2.jpg'
import img2 from '../img/4.jpg'
import img3 from '../img/5.jpg'

function Title(){
    return (
        <div className='TitleCont'>
            <h1 className='mainTitle'>
                <div className='img1'>
                    <img src={img1} alt='Women taking books' />
                </div>
                All <span className='thinFill'>in one place</span>
                <div className='img2'>
                    <img src={img2} alt='Child playing piano' />
                </div>
                <div className='img3'>
                    <img src={img3} alt='Volleyball match' />
                </div>
                <div className='topMargin'>
                    UHub
                </div></h1>
        </div>
    )
}
export default Title
