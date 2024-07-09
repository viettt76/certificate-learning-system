import clsx from 'clsx';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '~/assets/imgs/slides/slide1.png';
import slide2 from '~/assets/imgs/slides/slide2.jpg';
import slide3 from '~/assets/imgs/slides/slide3.jpg';
import styles from './Slide.module.scss';

const Slide = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className={clsx(styles['wrapper'])}>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img className={clsx(styles['img'])} width={'100%'} src={slide1} alt="" />
                    <Carousel.Caption className="fz-16">
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className={clsx(styles['img'])} width={'100%'} src={slide2} alt="" />
                    <Carousel.Caption className="fz-16">
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className={clsx(styles['img'])} width={'100%'} src={slide3} alt="" />
                    <Carousel.Caption className="fz-16">
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Slide;
