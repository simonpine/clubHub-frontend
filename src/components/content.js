import clubHub from '../img/clubHub.svg'
import img7 from '../img/7.jpg'
import img8 from '../img/8.jpg'
function Content(){
    return(
        <div className='contContiner'>
        <div className='Content'>
          <p className='p1'>After analyzing the conflicts that are generated between universities through social networks, we were able to identify how some university students seek to attract attention through offensive comments towards other universities. Which creates intolerant and toxic environments among students.</p>
          <div className='img8'>
            <img src={img7} alt='Painting tools' />
          </div>
          <div className='logoCenter'>
            <img src={clubHub} alt='clubHub, app logo' />
          </div>
          <div className='img7'>
            <img src={img8} alt='Arduino' />
          </div>
          <p className='p2'>Therefore, through the UHub initiative, we seek to bring together different students from Colombian universities in friendly spaces, in which people can share their tastes as a group and individually, making them aware of how they can get along with people from other universities.</p>
        </div>
      </div>
    )
}
export default Content