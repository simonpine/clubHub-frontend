import clubHub from '../img/clubHub.svg'
import img7 from '../img/7.jpg'
import img8 from '../img/8.jpg'
function Content(){
    return(
        <div className='contContiner'>
        <div className='Content'>
          <p className='p1'>In my last school year I noticed an interesting initiative that the school was applying around new club-type spaces, which take place during breaks. At first these had a great impact in the community because they encouraged students to do things they liked, but after a couple of months I have seen how they have been left behind.</p>
          <div className='img8'>
            <img src={img7} alt='Painting tools' />
          </div>
          <div className='logoCenter'>
            <img src={clubHub} alt='clubHub, app logo' />
          </div>
          <div className='img7'>
            <img src={img8} alt='Arduino' />
          </div>
          <p className='p2'>This sudden lack of interest must have been caused by several background problems, and from what I see and have come to talk with colleagues, one of these problems is the organization and communication between members, since they are from different grades. Therefore, this web application seeks to connect students with the teacher, their classmates and the club itself.</p>
        </div>
      </div>
    )
}
export default Content