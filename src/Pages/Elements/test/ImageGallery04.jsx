import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import ImageGallery02 from '../../Components/ImageGallery/ImageGallery02'


const ImageGalleryPage04 = () => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  const [data, setData] = useState(null)
  const [loading, setLoading] =useState(false)
  
  useEffect(() => {
    const GetData = async () => {
      await axios.get(`${host}/api/catalog-infos?populate=deep`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setData(res.data.data)
        setLoading(true)
      })
    }
    GetData()
  },[])
  return (
    <>
      {loading && <section className="py-[130px] cover-background lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: `url(https://via.placeholder.com/1920x800)` }}>
        <div className="absolute top-0 left-0 w-full h-full bg-darkgray opacity-75"></div>
        <Container>
          <Row className="items-center justify-center">
            <Col xl={6} lg={7} md={10} className="relative text-center">
              <h1 className="text-white font-medium text-[42px] leading-[49px] mb-0 sm:text-[30px] sm:leading-[40px]">{data[0].attributes.title}</h1>
            </Col>
          </Row>
        </Container>
      </section>}
            
      {loading && <section className="border-bottom border-color-extra-light-gray px-[10%] lg:px-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row>
            <ImageGallery02 theme="image-gallery-01" data={data} overlay={["#df1b1b", "#df1b1b", "#d62121", "#ce2525", "#c72c2c"]} className="" animation={fadeIn} />
          </Row>
        </Container>
      </section>}
    </>
  )
}

export default ImageGalleryPage04