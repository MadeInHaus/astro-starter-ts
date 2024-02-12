import * as React from 'react';
import cx from 'clsx';

import '@madeinhaus/carousel/dist/index.css';

import Carousel from '@madeinhaus/carousel';

import styles from './CarouselWrapper.module.scss';

interface CarouselWrapperProps {
    dogs: string[];
}

const CarouselWrapper: React.FC<CarouselWrapperProps> = ({ dogs }) => {
    return (
        <div className="carousel-wrapper">
            <Carousel className={styles.carousel} itemClassName={styles.item}>
                {dogs.map((dog: string, index: number) => (
                    <div key={index} className={styles.itemContainer}>
                        <div className={styles.index}>{index}</div>
                        <img className={cx(styles.image, styles.loaded)} src={dog} alt="" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselWrapper;
